import PageHero from '@/components/common/PageHero';
import ApplicationCenter from '@/components/sections/ApplicationCenter';
import { applications, businessAreas } from '@/lib/data/applications';

export default function ApplicationsPage() {
  const availableCount = applications.filter((a) => a.isAvailable).length;

  return (
    <>
      <PageHero
        badge="Application Center"
        heading="Discover PRORYN "
        headingHighlight="Business Applications"
        subheading="Browse and launch the applications that power PRORYN BusinessOS — from CRM and Sales to HR, Projects and beyond. Search by name, capability or business area to find the right tool for your team."
        stats={[
          { value: String(applications.length), label: 'Applications' },
          { value: String(availableCount), label: 'Available Now' },
          { value: String(businessAreas.length), label: 'Business Areas' },
        ]}
      />

      <ApplicationCenter applications={applications} businessAreas={businessAreas} />
    </>
  );
}
