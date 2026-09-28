import { cmsFetch } from './client';
import type {
  Service,
  StrapiCollectionResponse,
} from '@/types/service';

export async function getServices(): Promise<Service[]> {
  const response = await cmsFetch<StrapiCollectionResponse<Service>>(
    '/api/services?populate=image',
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  return response.data;
}