import { cmsFetch } from './client';
import type { SiteSettings, StrapiResponse } from '@/types/site';

export async function getSiteSettings(): Promise<SiteSettings> {
  const response = await cmsFetch<StrapiResponse<SiteSettings>>(
    '/api/site-setting',
  );

  return response.data;
}