import { Metadata } from 'next';
import HomeContent from '@/components/pages/home/HomeContent';

export const metadata: Metadata = {
  title: 'Digital Transformation Agency for SMEs | AI & Web Solutions | BidayaLab',
  description: 'We help ambitious startups and SMEs scale with AI automation, custom web development, and visual storytelling. Let\'s build your digital future together.',
  keywords: [
    'digital transformation agency',
    'AI automation for business',
    'web development for startups',
    'SME digital solutions',
    'business automation services',
    'custom web development agency',
    'AI chatbot development',
    'startup web agency',
    'digital growth partner',
    'BidayaLab'
  ],
  openGraph: {
    title: 'Digital Transformation Agency for SMEs | BidayaLab',
    description: 'We help ambitious startups and SMEs scale with AI automation, custom web development, and visual storytelling. Let\'s build your digital future together.',
    url: 'https://www.bidayalab.com',
    siteName: 'BidayaLab',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.bidayalab.com/assets/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BidayaLab - Digital Transformation Agency'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Transformation Agency for SMEs | BidayaLab',
    description: 'AI automation, custom web development, and visual storytelling for ambitious businesses.',
  },
  alternates: {
    canonical: 'https://www.bidayalab.com'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function HomePage() {
  return <HomeContent />;
}