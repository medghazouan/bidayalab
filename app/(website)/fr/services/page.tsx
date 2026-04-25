import { Metadata } from 'next';
import ServicesContent from '@/components/pages/services/ServicesContent';

export const metadata: Metadata = {
  title: 'Services — Automatisation IA · Web · Marque | BidayaLab',
  description:
    "Automatisation IA, ingénierie web Next.js / Shopify Hydrogen, marque & motion. Livraison senior, prix transparents, garantie mesuré ou refait.",
  alternates: {
    canonical: 'https://www.bidayalab.com/fr/services',
    languages: {
      en: 'https://www.bidayalab.com/services',
      fr: 'https://www.bidayalab.com/fr/services',
      'x-default': 'https://www.bidayalab.com/services',
    },
  },
  openGraph: {
    title: 'Services — BidayaLab',
    description:
      "Outcomes, pas livrables. Audit gratuit 30 min, devis chiffré sous 48 h.",
    url: 'https://www.bidayalab.com/fr/services',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function FrenchServicesPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.bidayalab.com/fr' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.bidayalab.com/fr/services' },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ServicesContent />
    </>
  );
}
