import TeamCard from '@/components/team/TeamCard';
import { getSiteSettings } from '@/lib/cms/site';
import { getTeamMembers } from '@/lib/cms/team';

export default async function AboutPage() {
  const [siteSettings, teamMembers] = await Promise.all([
    getSiteSettings(),
    getTeamMembers(),
  ]);

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              About us
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {siteSettings.companyName}
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Building digital experiences with purpose.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-indigo-600">
                Our mission
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
                What drives us
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {siteSettings.mission}
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-indigo-600">
                Our vision
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
                Where we are heading
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {siteSettings.vision}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Our team
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Meet the people behind the work
            </h2>
          </div>

          <div className="mt-10">
            {teamMembers.length === 0 ? (
              <p className="text-slate-600">
                No team members are available at the moment.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member) => (
                  <TeamCard
                    key={member.documentId}
                    member={member}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}