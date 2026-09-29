import { cmsFetch } from './client';

import type {
  BlogPost,
  StrapiBlogCollectionResponse,
} from '@/types/blog';

const BLOG_REVALIDATE_SECONDS = Number(
  process.env.BLOG_REVALIDATE_SECONDS ?? 60,
);

export async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await cmsFetch<StrapiBlogCollectionResponse>(
    '/api/blogs?populate=coverImage&sort=publishedDate:desc',
    {
      next: {
        revalidate: BLOG_REVALIDATE_SECONDS,
      },
    },
  );

  return response.data;
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const response = await cmsFetch<StrapiBlogCollectionResponse>(
    `/api/blogs?filters[slug][$eq]=${encodeURIComponent(
      slug,
    )}&populate=coverImage`,
    {
      next: {
        revalidate: BLOG_REVALIDATE_SECONDS,
      },
    },
  );

  return response.data[0] ?? null;
}