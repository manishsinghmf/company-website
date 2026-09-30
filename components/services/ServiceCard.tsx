import Image from 'next/image';

import { getCmsUrl } from '@/lib/cms/url';
import type { Service } from '@/types/service';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
        <Image
          src={getCmsUrl(service.image.url)}
          alt={service.image.alternativeText ?? service.title}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-slate-950/20 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold tracking-tight text-slate-950">
          {service.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {service.description}
        </p>

        <div className="mt-6 border-t border-slate-100 pt-5">
          <p className="text-sm font-semibold text-slate-900">
            From ${service.price.toLocaleString()}
          </p>
        </div>
      </div>
    </article>
  );
}