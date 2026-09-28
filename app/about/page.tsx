import TeamCard from '@/components/team/TeamCard';
import { getSiteSettings } from '@/lib/cms/site';
import { getTeamMembers } from '@/lib/cms/team';

export default async function AboutPage() {
  const [siteSettings, teamMembers] = await Promise.all([
    getSiteSettings(),
    getTeamMembers(),
  ]);

  return (
    <main>
      <section>
        <h1>About Us</h1>

        <p>{siteSettings.mission}</p>
        <p>{siteSettings.vision}</p>
      </section>

      <section>
        <h2>Our Team</h2>

        {teamMembers.length === 0 ? (
          <p>No team members are available at the moment.</p>
        ) : (
          teamMembers.map((member) => (
            <TeamCard
              key={member.documentId}
              member={member}
            />
          ))
        )}
      </section>
    </main>
  );
}