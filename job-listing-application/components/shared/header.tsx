import React from 'react';
import { ModeToggle } from '../mode-toggler';

export default function HeaderComponent() {
  return (
    <header className="w-full border-b bg-background/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Job Finder Portal</h1>
        <ModeToggle />
      </div>
    </header>
  );
}
