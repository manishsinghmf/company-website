import Link from 'next/link';

export default function BlogNotFound() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Blog
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Blog post not found
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
          The blog post you are looking for does not exist or may have been
          removed.
        </p>

        <Link
          href="/blog"
          className="mt-8 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Back to Blog
        </Link>
      </div>
    </section>
  );
}