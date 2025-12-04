'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ErrorProps {
  error: any;
}

export default function ErrorPage({ error }: ErrorProps) {
  console.error(error);

  // Determine error type
  let title = 'Something went wrong';
  let description = 'An unexpected error occurred. Please try again later.';

  if (error?.status === 404) {
    title = 'Page Not Found';
    description = "We couldn't find the page you're looking for.";
  } else if (error?.status === 403) {
    title = 'Access Forbidden';
    description = "You don't have permission to access this page.";
  } else if (error?.status === 500) {
    title = 'Internal Server Error';
    description = 'Oops! Something went wrong on our server.';
  } else if (error?.message) {
    description = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ type: 'spring', stiffness: 120 }}
          className="inline-block mb-4"
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
        </motion.div>

        <motion.h1
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-3xl font-bold text-gray-800 mb-2"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-gray-600 mb-6"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center gap-4"
        >
          <Button asChild variant="default">
            <Link href="/">Go Home</Link>
          </Button>
          <Button onClick={() => window.location.reload()} variant="outline">
            Retry
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
