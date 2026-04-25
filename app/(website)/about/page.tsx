import { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About BidayaLab | Digital Transformation Agency for SMEs',
  description: 'BidayaLab is a Marrakech-based digital transformation agency helping SMEs scale with AI automation, web development, and visual storytelling. Learn about our mission, team, and values.',
  openGraph: {
    title: 'About BidayaLab | Digital Transformation Agency',
    description: 'Marrakech-based agency helping SMEs scale with AI, web development, and visual storytelling.',
    url: 'https://www.bidayalab.com/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About BidayaLab | Digital Transformation Agency',
    description: 'Marrakech-based agency helping SMEs scale with AI, web development, and visual storytelling.',
  },
  alternates: {
    canonical: 'https://www.bidayalab.com/about',
    languages: {
      en: 'https://www.bidayalab.com/about',
      fr: 'https://www.bidayalab.com/fr/about',
      'x-default': 'https://www.bidayalab.com/about',
    },
  }
};

export default function AboutPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.bidayalab.com" },
      { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.bidayalab.com/about" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutPageClient />
    </>
  );
}
