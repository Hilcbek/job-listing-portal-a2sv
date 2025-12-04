import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import type { ReactElement } from 'react';
import type { Transporter } from 'nodemailer';

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  react: ReactElement;
  from?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    content?: string | Buffer;
    path?: string;
  }>;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  timestamp: number;
}

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!transporter) {
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS
    ) {
      throw new Error(
        'Missing required SMTP environment variables: SMTP_HOST, SMTP_USER, SMTP_PASS'
      );
    }

    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },

      pool: true,
      maxConnections: 5,
      maxMessages: 100,

      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 30000,
    });
  }

  return transporter;
}

export async function sendEmail(
  options: SendEmailOptions
): Promise<SendEmailResult> {
  const startTime = Date.now();

  try {
    const html = await render(options.react, {
      pretty: false,
    });

    const emailTransporter = getTransporter();

    const mailOptions = {
      from:
        options.from ||
        process.env.SMTP_FROM ||
        '"App" <noreply@yourdomain.com>',
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      html,
      ...(options.replyTo && { replyTo: options.replyTo }),
      ...(options.cc && {
        cc: Array.isArray(options.cc) ? options.cc.join(', ') : options.cc,
      }),
      ...(options.bcc && {
        bcc: Array.isArray(options.bcc) ? options.bcc.join(', ') : options.bcc,
      }),
      ...(options.attachments && { attachments: options.attachments }),
    };

    const info = await sendWithRetry(emailTransporter, mailOptions);

    const result: SendEmailResult = {
      success: true,
      messageId: info.messageId,
      timestamp: Date.now(),
    };

    console.log(
      `Email sent successfully to ${options.to} in ${
        Date.now() - startTime
      }ms`,
      {
        messageId: info.messageId,
      }
    );

    return result;
  } catch (error: any) {
    const result: SendEmailResult = {
      success: false,
      error: error.message || 'Unknown error occurred',
      timestamp: Date.now(),
    };

    console.error(
      `❌ Email failed to ${options.to} after ${Date.now() - startTime}ms:`,
      {
        error: error.message,
        stack: error.stack,
      }
    );

    return result;
  }
}

async function sendWithRetry(
  transporter: Transporter,
  mailOptions: any,
  maxRetries = 3
): Promise<any> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const info = await transporter.sendMail(mailOptions);
      return info;
    } catch (error: any) {
      lastError = error;

      if (
        error.code === 'EAUTH' ||
        error.code === 'ECONNREFUSED' ||
        error.responseCode === 535
      ) {
        throw error;
      }

      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        console.log(
          `Email attempt ${attempt} failed, retrying in ${delay}ms...`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

export async function sendBatchEmails(
  emails: SendEmailOptions[]
): Promise<SendEmailResult[]> {
  console.log(`📧 Starting batch send of ${emails.length} emails`);

  const results = await Promise.allSettled(
    emails.map((emailOptions) => sendEmail(emailOptions))
  );

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      return {
        success: false,
        error: result.reason?.message || 'Unknown error',
        timestamp: Date.now(),
      };
    }
  });
}

export async function verifyEmailConnection(): Promise<boolean> {
  try {
    const emailTransporter = getTransporter();
    await emailTransporter.verify();
    console.log('✅ SMTP connection verified successfully');
    return true;
  } catch (error: any) {
    console.error('❌ SMTP connection verification failed:', error.message);
    return false;
  }
}

export async function sendTransactionalEmail(
  to: string,
  subject: string,
  react: ReactElement
): Promise<SendEmailResult> {
  return sendEmail({ to, subject, react });
}

export async function sendNotificationEmail(
  to: string | string[],
  subject: string,
  react: ReactElement,
  options?: { cc?: string[]; bcc?: string[] }
): Promise<SendEmailResult> {
  return sendEmail({
    to,
    subject,
    react,
    ...options,
  });
}

export async function closeEmailConnection(): Promise<void> {
  if (transporter) {
    transporter.close();
    transporter = null;
    console.log('📪 Email transporter closed');
  }
}
