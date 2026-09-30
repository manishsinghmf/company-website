import TeamCard from '@/components/team/TeamCard';
import { getTeamMembers } from '@/lib/cms/team';

export default async function TeamPage() {
  const members = await getTeamMembers();

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Our people
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Meet Our Team
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Meet the people behind our products, technology, and digital
              solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              The team
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              People who make it happen
            </h2>
          </div>

          {members.length === 0 ? (
            <p className="mt-10 text-slate-600">
              No team members are available at the moment.
            </p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => (
                <TeamCard
                  key={member.documentId}
                  member={member}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}