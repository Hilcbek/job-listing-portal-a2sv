'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { IconLogin, IconLogout } from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';
import { ModeToggle } from '../mode-toggler';

export default function HeaderComponent() {
  const { data: session, status } = useSession();

  return (
    <header className="w-full border-b bg-background/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href={'/'} className="text-2xl font-bold tracking-tight">
          Job Finder Portal
        </Link>
        <div className="flex items-center justify-center gap-3">
          {status === 'authenticated' ? (
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-bold">
                Hello, {session.user?.name?.substring(0, 2)}
              </span>
              <Button
                onClick={() =>
                  signOut({
                    redirect: true,
                    callbackUrl: '/auth/sign-in',
                  })
                }
                variant={'destructive'}
                className="text-xs cursor-pointer"
              >
                Logout <IconLogout />
              </Button>
            </div>
          ) : (
            <Button
              asChild
              variant={'ghost'}
              className="cursor-pointer text-xs"
            >
              <Link href={'/auth/sign-in'}>
                Sign in
                <IconLogin />
              </Link>
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
