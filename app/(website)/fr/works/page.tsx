import { Metadata } from 'next';
import WorksPageClient from '@/app/(website)/works/WorksPageClient';

export const metadata: Metadata = {
  title: 'Réalisations | Études de cas mesurées | BidayaLab',
  description:
    "Études de cas avec chiffres : automatisation IA, refontes Next.js / Shopify Hydrogen, motion & marque. Lift de conversion, heures économisées, revenus par visiteur.",
  alternates: {
    canonical: 'https://www.bidayalab.com/fr/works',
    languages: {
      en: 'https://www.bidayalab.com/works',
      fr: 'https://www.bidayalab.com/fr/works',
      'x-default': 'https://www.bidayalab.com/works',
    },
  },
  openGraph: {
    title: 'Réalisations | BidayaLab',
    description:
      "Études de cas mesurées : conversion, ops automatisées, revenu par visiteur.",
    url: 'https://www.bidayalab.com/fr/works',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function FrenchWorksPage() {
  return <WorksPageClient />;
}
