import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      role?: string;
      username?: string;
      emailVerified?: Date | null;
      image?: string | null;
      createdAt?: Date;
      updatedAt?: Date;
    } & DefaultSession['user'];
  }

  /**
   * Returned by `getToken` and `jwt` callback
   */
  interface User extends DefaultUser {
    id: string;
    role?: string;

    username?: string;
    emailVerified?: Date | null;
    image?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role?: string;
    password?: string;
    username?: string;
    emailVerified?: Date | null;
    image?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }
}
