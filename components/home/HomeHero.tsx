import Image from 'next/image';
import Link from 'next/link';

import type { Homepage } from '@/types/homepage';
import { getCmsUrl } from '@/lib/cms/url';

interface HomeHeroProps {
  homepage: Homepage;
}

export default function HomeHero({ homepage }: HomeHeroProps) {
  const {
    heroTitle,
    heroSubtitle,
    primaryCtaLabel,
    primaryCtaLink,
    secondaryCtaLabel,
    secondaryCtaLink,
    heroImage,
  } = homepage;

  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_35%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-28">
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Digital Product Engineering
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {heroTitle}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            {heroSubtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={primaryCtaLink}
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {primaryCtaLabel}
            </Link>

            <Link
              href={secondaryCtaLink}
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {secondaryCtaLabel}
            </Link>
          </div>
        </div>

        {heroImage && (
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
            <Image
              src={getCmsUrl(heroImage.url)}
              alt={heroImage.alternativeText ?? heroTitle}
              width={heroImage.width}
              height={heroImage.height}
              className="h-auto w-full object-cover"
              priority
            />

            <div className="absolute inset-0 bg-linear-to-t from-slate-950/30 via-transparent to-transparent" />
          </div>
        )}
      </div>
    </section>
  );
}