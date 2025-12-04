import { getJobs } from '@/actions/job.action';
import JobCard from '@/components/shared/job-card';
import JobSearch from '@/components/input-search';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronsUpDownIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { Opportunity } from '@/types/job.type';
import { Metadata } from 'next';

interface JobsPageProps {
  searchParams?: Promise<{ search?: string }>;
}

export const metadata: Metadata = {
  title: 'Jobs',
  description: 'Jobs list',
};

export default async function JobsPage({ searchParams }: JobsPageProps) {
  // Await the promise
  const resolvedParams = searchParams ? await searchParams : {};
  const searchQuery = resolvedParams.search || '';

  // Pass dynamic search query to API
  const data = await getJobs({ q: searchQuery });
  const jobs: Opportunity[] = data.data;

  return (
    <div className="w-full h-full flex-col px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <header className="flex w-full flex-col md:flex-row items-start md:items-center justify-between py-3 gap-3">
        <h1 className="text-lg md:text-2xl font-bold">Opportunities</h1>

        <div className="flex items-center gap-2 justify-end">
          <JobSearch />

          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer w-32" asChild>
              <Button
                variant="outline"
                className="items-center justify-between flex"
              >
                Sort by <ChevronsUpDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                Most relevant
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Top rated
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Most viewed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div
        className={clsx(
          `${
            jobs.length > 0 ? 'grid' : 'flex'
          } gap-3 grid-cols-1 md:grid-cols-2 items-center justify-center w-full`
        )}
      >
        {jobs.length === 0 ? (
          <div className="w-full py-20 flex flex-col items-center justify-center text-center text-gray-500">
            <h2 className="text-xl font-semibold mb-2">No jobs found</h2>
            <p className="text-gray-400">
              We couldn’t find any job postings matching your search.
            </p>
          </div>
        ) : (
          jobs.map((job: Opportunity) => <JobCard job={job} key={job.id} />)
        )}
      </div>
    </div>
  );
}
