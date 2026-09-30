import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import BlogContent from '@/components/blog/BlogContent';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/cms/blog';
import { getCmsUrl } from '@/lib/cms/url';

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
          alt: post.coverImage.alternativeText ?? post.title,
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
    <article>
      <header className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Insights
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            {post.excerpt}
          </p>

          <time
            dateTime={post.publishedDate}
            className="mt-6 block text-sm font-medium text-slate-500"
          >
            {post.publishedDate}
          </time>
        </div>
      </header>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={getCmsUrl(post.coverImage.url)}
              alt={post.coverImage.alternativeText ?? post.title}
              width={post.coverImage.width}
              height={post.coverImage.height}
              priority
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            <BlogContent content={post.content} />
          </div>
        </div>
      </section>
    </article>
  );
}