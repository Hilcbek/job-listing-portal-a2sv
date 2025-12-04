'use server';

import { axiosInstance } from '@/config/axios';
import { jobReponseType, searchJobParams, singleJobReponse } from '@/types/job.type';
import axios from 'axios';

export async function getJobs(
  params: searchJobParams
): Promise<jobReponseType> {
  try {
    const data = await axiosInstance.get<jobReponseType>(
      `/opportunities/search?query=${params.q}`,
      {
        params,
      }
    );

    return data.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.message || err.message || 'Failed to fetch jobs'
      );
    }
    throw new Error('Unexpected error while fetching jobs');
  }
}

export async function getSingleJob(id: string): Promise<singleJobReponse> {
  try {
    const data = await axiosInstance.get<singleJobReponse>(
      `/opportunities/${id}`
    );

    if (!data.data) {
      throw new Error(`Job with ID ${id} not found`);
    }


    return data.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.message || err.message || 'Failed to fetch job'
      );
    }
    throw new Error('Unexpected error while fetching job');
  }
}
