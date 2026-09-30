export default function Loading() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

          <div className="mt-4 h-12 w-56 animate-pulse rounded bg-slate-200" />

          <div className="mt-6 h-6 max-w-xl animate-pulse rounded bg-slate-200" />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-slate-200"
            >
              <div className="aspect-4/3 animate-pulse bg-slate-200" />

              <div className="space-y-4 p-6">
                <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />

                <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />

                <div className="h-4 w-full animate-pulse rounded bg-slate-200" />

                <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}