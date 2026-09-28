import ServiceCard from '@/components/services/ServiceCard';
import { getServices } from '@/lib/cms/services';

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main>
      <h1>Our Services</h1>

      {services.length === 0 ? (
        <p>No services are available at the moment.</p>
      ) : (
        services.map((service) => (
          <ServiceCard
            key={service.documentId}
            service={service}
          />
        ))
      )}
    </main>
  );
}