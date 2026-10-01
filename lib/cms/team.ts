import { cmsFetch } from './client';
import type {
  StrapiTeamCollectionResponse,
  TeamMember,
} from '@/types/team';

const TEAM_REVALIDATE_SECONDS = Number(
  process.env.TEAM_REVALIDATE_SECONDS ?? 60,
);

export async function getTeamMembers(): Promise<TeamMember[]> {
  const response = await cmsFetch<StrapiTeamCollectionResponse>(
    '/api/teams?populate=photo',
    {
      next: {
        revalidate: TEAM_REVALIDATE_SECONDS,
      },
    },
  );

  return response.data;
}