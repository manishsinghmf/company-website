import Image from 'next/image';

import { getCmsUrl } from '@/lib/cms/url';
import type { TeamMember } from '@/types/team';

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <article>
      <Image
        src={getCmsUrl(member.photo.url)}
        alt={member.photo.alternativeText ?? member.name}
        width={member.photo.width}
        height={member.photo.height}
      />

      <h2>{member.name}</h2>

      <p>{member.role}</p>

      <p>{member.bio}</p>
    </article>
  );
}