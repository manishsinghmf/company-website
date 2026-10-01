import { cmsFetch } from './client';
import type { SiteSettings, StrapiResponse } from '@/types/site';


const SITE_SETTINGS_REVALIDATE_SECONDS = Number(
  process.env.SITE_SETTINGS_REVALIDATE_SECONDS ?? 60,
);

export async function getSiteSettings(): Promise<SiteSettings> {
  const response = await cmsFetch<StrapiResponse<SiteSettings>>(
    '/api/site-setting',
    {
      next: {
        revalidate: SITE_SETTINGS_REVALIDATE_SECONDS,
      },
    },
  );

  return response.data;
}