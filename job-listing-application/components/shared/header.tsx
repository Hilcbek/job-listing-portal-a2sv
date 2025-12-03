import React from 'react';
import { ModeToggle } from '../mode-toggler';
import Link from 'next/link';

export default function HeaderComponent() {
  return (
    <header className="w-full border-b bg-background/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href={'/'} className="text-2xl font-bold tracking-tight">Job Finder Portal</Link>
        <ModeToggle />
      </div>
    </header>
  );
}
