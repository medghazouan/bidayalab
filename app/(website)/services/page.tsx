import { Metadata } from 'next';
import ServicesContent from '@/components/pages/services/ServicesContent';

export const metadata: Metadata = {
  title: 'Digital Transformation Services | AI, Web & Visual Solutions',
  description: "BidayaLab services: AI automation, web engineering and brand systems for ambitious SMEs. Marrakech-based senior agency — results measured, outcomes guaranteed.",
  keywords: [
    'AI automation agency Morocco',
    'web development agency Marrakech',
    'digital transformation services',
    'visual storytelling agency',
    'chatbot development for small business',
    'e-commerce development Morocco',
  ],
  openGraph: {
    title: 'Digital Transformation Services | BidayaLab',
    description: 'AI automation, custom web development, and visual storytelling for ambitious SMEs.',
    url: 'https://www.bidayalab.com/services',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.bidayalab.com/services',
    languages: {
      en: 'https://www.bidayalab.com/services',
      fr: 'https://www.bidayalab.com/fr/services',
      'x-default': 'https://www.bidayalab.com/services',
    },
  },
};

export default function ServicesPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bidayalab.com' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.bidayalab.com/services' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ServicesContent />
    </>
  );
}
