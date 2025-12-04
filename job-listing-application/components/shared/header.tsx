'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { IconLogout, IconUser } from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';
import { ModeToggle } from '../mode-toggler';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function HeaderComponent() {
  const { data: session, status } = useSession();

  return (
    <header className="w-full border-b bg-background/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href={'/'}
          className="text-sm md:text-2xl font-bold tracking-tight"
        >
          Job Finder Portal
        </Link>

        <div className="flex items-center justify-center gap-3">
          {/* Desktop view */}
          <div className="hidden md:flex items-center justify-center gap-3">
            {status === 'authenticated' ? (
              <>
                <span className="text-sm font-bold">
                  Hello, {session.user?.name?.substring(0, 2)}
                </span>
                <Button
                  onClick={() =>
                    signOut({ redirect: true, callbackUrl: '/auth/sign-in' })
                  }
                  variant="destructive"
                  className="text-xs cursor-pointer"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                asChild
                variant="ghost"
                className="cursor-pointer text-xs"
              >
                <Link href={'/auth/sign-in'}>Sign in</Link>
              </Button>
            )}
            <ModeToggle />
          </div>

          {/* Mobile dropdown only for authenticated users */}
          {status === 'authenticated' && (
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-10 w-10 p-0 rounded-full"
                  >
                    <IconUser />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background">
                  <DropdownMenuItem disabled>
                    Hello, {session.user?.name?.split(' ')[0]}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      signOut({ redirect: true, callbackUrl: '/auth/sign-in' })
                    }
                  >
                    Logout
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ModeToggle />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
