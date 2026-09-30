import HomeHero from '@/components/home/HomeHero';
import LatestInsights from '@/components/home/LatestInsights';
import ServicesPreview from '@/components/home/ServicesPreview';
import WhyVimaTech from '@/components/home/WhyVimaTech';
import { getBlogPosts } from '@/lib/cms/blog';
import { getHomepage } from '@/lib/cms/homepage';
import { getServices } from '@/lib/cms/services';
import { getSiteSettings } from '@/lib/cms/site';

export default async function HomePage() {
  const [homepage, services, siteSettings, posts] = await Promise.all([
    getHomepage(),
    getServices(),
    getSiteSettings(),
    getBlogPosts(),
  ]);

  return (
    <>
      <HomeHero homepage={homepage} />

      <ServicesPreview services={services} />

      <WhyVimaTech
        mission={siteSettings.mission}
        vision={siteSettings.vision}
      />


      <LatestInsights posts={posts.slice(0, 3)} />
    </>
  );
}