// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BASE_URL: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    NODE_ENV: 'development' | 'test' | 'production';
    NEXTAUTH_URL_INTERNAL: string;
    DATABASE_URL: string;
    SMTP_PASS: string;
    SMTP_HOST: string;
    SMTP_HOST: string;
    SMTP_SECURE: string;
    SMTP_FROM: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    BACKEND_BASE_URL:string;
  }
}
