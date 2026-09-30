import { cmsFetch } from './client';
import type { HomepageResponse } from '@/types/homepage';

const HOMEPAGE_REVALIDATE_SECONDS = 60;

export async function getHomepage(): Promise<HomepageResponse['data']> {
  const response = await cmsFetch<HomepageResponse>(
    '/api/homepage?populate=heroImage',
    {
      next: {
        revalidate: HOMEPAGE_REVALIDATE_SECONDS,
      },
    },
  );

  return response.data;
}