import { Metadata } from 'next';
import AboutPageClient from '@/app/(website)/about/AboutPageClient';

export const metadata: Metadata = {
  title: 'À propos de BidayaLab | Agence digitale à Marrakech',
  description:
    "Studio senior à Marrakech : automatisation IA, ingénierie web Next.js / Shopify Hydrogen, marque & motion. On vend des résultats mesurés, pas des livrables.",
  alternates: {
    canonical: 'https://www.bidayalab.com/fr/about',
    languages: {
      en: 'https://www.bidayalab.com/about',
      fr: 'https://www.bidayalab.com/fr/about',
      'x-default': 'https://www.bidayalab.com/about',
    },
  },
  openGraph: {
    title: 'À propos de BidayaLab — Agence digitale à Marrakech',
    description:
      "Outcomes, pas livrables. Audit gratuit de 30 min, devis chiffré sous 48 h, garantie mesuré ou refait.",
    url: 'https://www.bidayalab.com/fr/about',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function FrenchAboutPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.bidayalab.com/fr' },
      { '@type': 'ListItem', position: 2, name: 'À propos', item: 'https://www.bidayalab.com/fr/about' },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutPageClient />
    </>
  );
}
