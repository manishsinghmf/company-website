import BlogCard from '@/components/blog/BlogCard';
import { getBlogPosts } from '@/lib/cms/blog';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Insights
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Blog
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Explore our latest insights, ideas, and perspectives on
              technology and digital products.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Latest articles
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Insights from our team
            </h2>
          </div>

          {posts.length === 0 ? (
            <p className="mt-10 text-slate-600">
              No blog posts are available at the moment.
            </p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard
                  key={post.documentId}
                  post={post}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}