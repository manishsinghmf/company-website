import Image from 'next/image';
import type { Service } from '@/types/service';
import { getCmsUrl } from '@/lib/cms/url';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article>
      <h2>{service.title}</h2>

      <p>{service.description}</p>

      <p>Price: ${service.price}</p>

      <Image
        src={getCmsUrl(service.image.url)}
        alt={service.image.alternativeText ?? service.title}
        width={service.image.width}
        height={service.image.height}
      />
    </article>
  );
}