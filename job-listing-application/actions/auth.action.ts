'use server';

import { sendEmail } from '@/lib/email';
import { prisma } from '@/lib/prisma';
import VerifyOtpTemplate from '@/template/EmailVerificationTemplate';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import dayjs from 'dayjs';

interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export async function generateAndSendOtp(email: string, name?: string) {
  await prisma.oTP.deleteMany({
    where: { identifier: email },
  });

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);

  await prisma.oTP.create({
    data: {
      identifier: email,
      token: hashedOtp,
      expires: new Date(Date.now() + 10 * 60 * 1000),
    },
  });

  await sendEmail({
    to: email,
    subject: 'Your Verification Code',
    react: VerifyOtpTemplate({
      userName: name ?? '',
      otp,
      timestamp: dayjs().format('DD MMM YYYY'),
    }),
  });
}

export async function signupUser(data: SignupData) {
  const { name, email, password, confirmPassword } = data;

  if (password !== confirmPassword) throw new Error('Passwords do not match');

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      emailVerified: null,
    },
  });

  await generateAndSendOtp(email, name);

  redirect('/auth/verify-email?email=' + encodeURIComponent(email));
}

export async function verifyOtp(email: string, otp: string) {
  const record = await prisma.oTP.findFirst({
    where: { identifier: email },
    orderBy: { expires: 'desc' },
  });

  if (!record) throw new Error('OTP not found');

  if (record.expires < new Date()) throw new Error('OTP expired');

  const isValid = await bcrypt.compare(otp, record.token);
  if (!isValid) throw new Error('Invalid OTP');

  await prisma.user.update({
    where: { email },
    data: { emailVerified: new Date() },
  });

  await prisma.oTP.delete({ where: { id: record.id } });

  return { success: true };
}
