import { Metadata } from 'next';
import ContactContent from '@/components/pages/contact/ContactContent';

export const metadata: Metadata = {
  title: 'Contact — Audit gratuit 30 min | BidayaLab',
  description:
    "Parlons de votre projet : automatisation IA, refonte web ou identité de marque. Réponse écrite en moins de 24 h.",
  alternates: {
    canonical: 'https://www.bidayalab.com/fr/contact',
    languages: {
      en: 'https://www.bidayalab.com/contact',
      fr: 'https://www.bidayalab.com/fr/contact',
      'x-default': 'https://www.bidayalab.com/contact',
    },
  },
  openGraph: {
    title: 'Contact — BidayaLab',
    description:
      "Audit gratuit de 30 min avec un opérateur senior. Réponse en < 24 h.",
    url: 'https://www.bidayalab.com/fr/contact',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function FrenchContactPage() {
  return <ContactContent />;
}
