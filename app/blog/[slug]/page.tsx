import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import {
  getBlogPostBySlug,
  getBlogPosts,
} from '@/lib/cms/blog';

import { getCmsUrl } from '@/lib/cms/url';
import BlogContent from '@/components/blog/BlogContent';

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: getCmsUrl(post.coverImage.url),
          width: post.coverImage.width,
          height: post.coverImage.height,
          alt:
            post.coverImage.alternativeText ??
            post.title,
        },
      ],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: BlogDetailPageProps) {
  const { slug } = await params;

  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <article>
        <h1>{post.title}</h1>

        <p>{post.publishedDate}</p>

        <Image
          src={getCmsUrl(post.coverImage.url)}
          alt={
            post.coverImage.alternativeText ??
            post.title
          }
          width={post.coverImage.width}
          height={post.coverImage.height}
        />

        <p>{post.excerpt}</p>
        <BlogContent content={post.content} />
      </article>
    </main>
  );
}