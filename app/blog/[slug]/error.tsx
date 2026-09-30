'use client';

interface BlogDetailErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BlogDetailError({
  reset,
}: BlogDetailErrorProps) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
          Error
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Something went wrong
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
          We could not load this blog post. Please try again.
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-8 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Try again
        </button>
      </div>
    </section>
  );
}