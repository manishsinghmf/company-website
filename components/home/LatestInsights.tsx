import Link from 'next/link';

import BlogCard from '@/components/blog/BlogCard';
import type { BlogPost } from '@/types/blog';

interface LatestInsightsProps {
  posts: BlogPost[];
}

export default function LatestInsights({
  posts,
}: LatestInsightsProps) {
  const latestPosts = posts.slice(0, 3);

  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Insights
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Ideas, technology, and engineering
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              Explore our latest perspectives on software, technology,
              and building digital products.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center text-sm font-semibold text-slate-900 transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4"
          >
            View all insights
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </Link>
        </div>

        {latestPosts.length > 0 ? (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogCard key={post.documentId} post={post} />
            ))}
          </div>
        ) : (
          <p className="mt-12 rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600">
            No insights are available yet.
          </p>
        )}
      </div>
    </section>
  );
}