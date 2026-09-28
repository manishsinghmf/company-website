import { cmsFetch } from './client';
import type {
  StrapiTeamCollectionResponse,
  TeamMember,
} from '@/types/team';

export async function getTeamMembers(): Promise<TeamMember[]> {
  const response = await cmsFetch<StrapiTeamCollectionResponse>(
    '/api/teams?populate=photo',
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  return response.data;
}