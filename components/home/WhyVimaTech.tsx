interface WhyVimaTechProps {
  mission: string;
  vision: string;
}

export default function WhyVimaTech({
  mission,
  vision,
}: WhyVimaTechProps) {
  return (
    <section className="bg-slate-950 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Why VimaTech
            </p>

            <h2 className="mt-4 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
              Technology should make business simpler, not more complex.
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <article className="border-t border-white/15 pt-6">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
                Our mission
              </p>

              <p className="mt-4 text-lg leading-8 text-slate-200">
                {mission}
              </p>
            </article>

            <article className="border-t border-white/15 pt-6">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
                Our vision
              </p>

              <p className="mt-4 text-lg leading-8 text-slate-200">
                {vision}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}