export default function Loading() {
  return (
    <article>
      <header className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

          <div className="mt-4 h-12 w-full animate-pulse rounded bg-slate-200 sm:h-14" />

          <div className="mt-3 h-12 w-4/5 animate-pulse rounded bg-slate-200 sm:h-14" />

          <div className="mt-6 h-6 w-full animate-pulse rounded bg-slate-200" />

          <div className="mt-6 h-4 w-32 animate-pulse rounded bg-slate-200" />
        </div>
      </header>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="aspect-video w-full animate-pulse rounded-2xl bg-slate-200" />

          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            <div className="h-5 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-5 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-5 w-5/6 animate-pulse rounded bg-slate-200" />

            <div className="h-5 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-5 w-4/5 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      </section>
    </article>
  );
}