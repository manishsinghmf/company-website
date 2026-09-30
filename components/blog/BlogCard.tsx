import Image from 'next/image';
import Link from 'next/link';

import { getCmsUrl } from '@/lib/cms/url';
import type { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {/* Image */}
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-video overflow-hidden"
      >
        <Image
          src={getCmsUrl(post.coverImage.url)}
          alt={post.coverImage.alternativeText ?? post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-slate-500">
          {post.publishedDate}
        </p>

        <h2 className="mt-2 line-clamp-2 text-xl font-semibold leading-snug text-slate-900">
          {post.title}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-auto pt-5 text-sm font-semibold text-slate-900 transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}