import Image from 'next/image';

import { getCmsUrl } from '@/lib/cms/url';
import type { TeamMember } from '@/types/team';

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <Image
          src={getCmsUrl(member.photo.url)}
          alt={member.photo.alternativeText ?? member.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold tracking-tight text-slate-950">
          {member.name}
        </h3>

        <p className="mt-1 text-sm font-medium text-indigo-600">
          {member.role}
        </p>

        {member.bio && (
          <p className="mt-4 text-sm leading-6 text-slate-600">
            {member.bio}
          </p>
        )}
      </div>
    </article>
  );
}