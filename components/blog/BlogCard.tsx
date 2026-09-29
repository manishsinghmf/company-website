import Image from 'next/image';
import Link from 'next/link';

import { getCmsUrl } from '@/lib/cms/url';
import type { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({
  post,
}: BlogCardProps) {
  return (
    <article>
      <Image
        src={getCmsUrl(post.coverImage.url)}
        alt={
          post.coverImage.alternativeText ??
          post.title
        }
        width={post.coverImage.width}
        height={post.coverImage.height}
      />

      <p>{post.publishedDate}</p>

      <h2>{post.title}</h2>

      <p>{post.excerpt}</p>

      <Link href={`/blog/${post.slug}`}>
        Read more
      </Link>
    </article>
  );
}