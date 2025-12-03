'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const goToJobs = () => {
    router.push('/jobs');
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4 text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
        Find Your Dream Job
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
        Explore thousands of job opportunities from top companies and start your
        career today.
      </p>
      <Button
        onClick={goToJobs}
        className="cursor-pointer hover:scale-105 font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300"
      >
        Explore Jobs
      </Button>
    </div>
  );
}
