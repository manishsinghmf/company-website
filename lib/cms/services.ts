import { cmsFetch } from './client';
import type {
  Service,
  StrapiCollectionResponse,
} from '@/types/service';

const SERVICE_REVALIDATE_SECONDS = Number(
  process.env.SERVICE_REVALIDATE_SECONDS ?? 60,
);

export async function getServices(): Promise<Service[]> {
  const response = await cmsFetch<StrapiCollectionResponse<Service>>(
    '/api/services?populate=image',
    {
      next: {
        revalidate: SERVICE_REVALIDATE_SECONDS,
      },
    },
  );

  return response.data;
}