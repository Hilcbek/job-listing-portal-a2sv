import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { type AuthOptions } from 'next-auth';
import bcrypt from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: 'Full Name', type: 'text' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        confirmPassword: { label: 'Confirm Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        let user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          if (credentials.password !== credentials.confirmPassword)
            throw new Error('Wrong username or email address!');

          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          user = await prisma.user.create({
            data: {
              name: credentials.name || credentials.email,
              email: credentials.email,
              password: hashedPassword,
            },
          });
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error('Wrong password!');

        if (!user.emailVerified) {
          throw new Error('Email not verified! please verify your email!');
        }

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (existingUser) {
          const existingAccount = await prisma.account.findFirst({
            where: {
              userId: existingUser.id,
              provider: 'google',
            },
          });

          if (!existingAccount) {
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: 'oauth',
                provider: 'google',
                providerAccountId: account.providerAccountId,
                access_token: account.access_token!,
                refresh_token: account.refresh_token!,
                expires_at: account.expires_at,
              },
            });
          }
        }
      }
      return true;
    },
  },
  debug: process.env.NODE_ENV === 'development',
};
