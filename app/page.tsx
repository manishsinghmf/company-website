import { getSiteSettings } from '@/lib/cms/site';

export default async function HomePage() {
  const siteSettings = await getSiteSettings();

  return (
    <main>
      <h1>{siteSettings.companyName}</h1>

      <p>{siteSettings.mission}</p>

      <p>{siteSettings.vision}</p>
    </main>
  );
}