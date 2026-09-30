import ServiceCard from '@/components/services/ServiceCard';
import { getServices } from '@/lib/cms/services';

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              What we do
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Our Services
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              We design and build reliable digital solutions that help
              businesses turn ideas into scalable products.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Our expertise
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Technology services built around your needs
            </h2>
          </div>

          <div className="mt-10">
            {services.length === 0 ? (
              <p className="text-slate-600">
                No services are available at the moment.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <ServiceCard
                    key={service.documentId}
                    service={service}
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