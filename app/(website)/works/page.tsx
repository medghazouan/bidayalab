import { Metadata } from 'next';
import WorksPageClient from './WorksPageClient';

export const metadata: Metadata = {
  title: 'Our Work | Digital Transformation Case Studies | BidayaLab',
  description: 'Explore our portfolio of AI automation, custom web development, and visual storytelling projects. See how we\'ve helped businesses scale and succeed.',
  keywords: [
    'digital agency portfolio',
    'web development case studies',
    'AI automation projects',
    'startup website examples',
    'SME digital transformation',
    'business automation examples'
  ],
  openGraph: {
    title: 'Our Work | BidayaLab Portfolio',
    description: 'See how we\'ve helped ambitious businesses scale with AI, web, and visual solutions.',
    url: 'https://www.bidayalab.com/works',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.bidayalab.com/works',
    languages: {
      en: 'https://www.bidayalab.com/works',
      fr: 'https://www.bidayalab.com/fr/works',
      'x-default': 'https://www.bidayalab.com/works',
    },
  }
};

export default function WorksPage() {
  return <WorksPageClient />;
}