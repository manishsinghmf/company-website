import BlogCard from '@/components/blog/BlogCard';
import { getBlogPosts } from '@/lib/cms/blog';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main>
      <h1>Blog</h1>

      {posts.length === 0 ? (
        <p>No blog posts are available at the moment.</p>
      ) : (
        posts.map((post) => (
          <BlogCard
            key={post.documentId}
            post={post}
          />
        ))
      )}
    </main>
  );
}