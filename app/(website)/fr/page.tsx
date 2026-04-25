import type { Metadata } from 'next';
import HomeContent from '@/components/pages/home/HomeContent';

export const metadata: Metadata = {
  title: 'BidayaLab — Agence digitale à Marrakech',
  description:
    "Agence senior à Marrakech : automatisation IA (n8n + GPT/Claude), ingénierie web Next.js / Shopify Hydrogen, marque & motion. Audit gratuit de 30 minutes, garantie mesuré ou refait.",
  alternates: {
    canonical: 'https://www.bidayalab.com/fr',
    languages: {
      en: 'https://www.bidayalab.com/',
      fr: 'https://www.bidayalab.com/fr',
      'x-default': 'https://www.bidayalab.com/',
    },
  },
  openGraph: {
    title: 'BidayaLab — Agence digitale à Marrakech',
    description:
      "Outcomes, pas livrables. Audit gratuit de 30 min, devis chiffré sous 48 h, garantie mesuré ou refait.",
    url: 'https://www.bidayalab.com/fr',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FrenchHomePage() {
  return <HomeContent />;
}
