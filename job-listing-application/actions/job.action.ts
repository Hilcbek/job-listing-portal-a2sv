'use server';

import { axiosInstance } from '@/config/axios';
import { JobPosting, JobPostingsResponse } from '@/types/job.type';
import axios from 'axios';

interface SearchProps {
  search?: string;
}
export async function getJobs({
  search,
}: SearchProps): Promise<JobPostingsResponse> {
  try {
    const { data } = await axiosInstance.get<JobPostingsResponse>(
      '/dummy.json'
    );

    let filteredJobs: JobPosting[] = data.job_postings;

    if (search) {
      const query = search.toLowerCase();
      filteredJobs = filteredJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.about.required_skills.some((skill) =>
            skill.toLowerCase().includes(query)
          )
        );
      });
    }

    return { job_postings: filteredJobs };
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.message || err.message || 'Failed to fetch jobs'
      );
    }
    throw new Error('Unexpected error while fetching jobs');
  }
}

export async function getSingleJob(id: string): Promise<JobPosting> {
  try {
    const { data } = await axiosInstance.get<JobPostingsResponse>(
      '/dummy.json'
    );

    const job = data.job_postings.find((job) => job.id === id);

    if (!job) {
      throw new Error(`Job with ID ${id} not found`);
    }

    return job;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.message || err.message || 'Failed to fetch job'
      );
    }
    throw new Error('Unexpected error while fetching job');
  }
}
