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
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.bidayalab.com/#faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What services does BidayaLab offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer AI automation (chatbots, workflow automation), custom web development (websites, web apps, e-commerce), and visual storytelling (video production, photography, motion graphics)."
        }
      },
      {
        "@type": "Question",
        "name": "Who is BidayaLab for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We work with ambitious startups and SMEs who have quality products or services and want to scale efficiently through smart automation and custom digital platforms."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a typical project take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Project timelines vary based on complexity. A simple website takes 2-4 weeks, while complex AI automation systems may take 6-12 weeks. We'll provide a detailed timeline during our initial consultation."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer ongoing support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We believe in building long-term partnerships. All our projects include post-launch support, and we offer ongoing maintenance and optimization packages."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeContent />
    </>
  );
}