import { Metadata } from 'next';
import HomeContent from '@/components/pages/home/HomeContent';

export const metadata: Metadata = {
  title: 'Digital Transformation Agency for SMEs | BidayaLab',
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
    canonical: 'https://www.bidayalab.com/'
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
        "name": "What services does Bidayalab offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer a comprehensive suite of digital services including brand strategy & identity design, web development, digital marketing, AI automation solutions, and visual storytelling through photo & video production. Each service is tailored to help businesses grow and stand out in the digital landscape."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a typical project take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Project timelines vary based on scope and complexity. A brand identity project typically takes 4-6 weeks, web development ranges from 6-12 weeks, and ongoing marketing campaigns are structured monthly. We provide detailed timelines during our initial consultation."
        }
      },
      {
        "@type": "Question",
        "name": "What is your pricing structure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer flexible pricing models including project-based fees, retainer packages, and custom solutions. Pricing is determined by project scope, deliverables, and timeline. Contact us for a personalized quote tailored to your specific needs."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work with international clients?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! We work with clients globally. Our team is experienced in remote collaboration and we use modern tools to ensure seamless communication across different time zones. We have successfully delivered projects for clients in Europe, North America, and the Middle East."
        }
      },
      {
        "@type": "Question",
        "name": "What makes Bidayalab different from other agencies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We combine creative excellence with data-driven strategy. Our team brings together expertise in branding, development, marketing, and AI—all under one roof. This integrated approach ensures cohesive results and eliminates the need for multiple agency partnerships."
        }
      },
      {
        "@type": "Question",
        "name": "How do we get started?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply reach out through our contact form or book a free discovery call. We will discuss your goals, challenges, and vision. From there, we will propose a tailored strategy and roadmap to bring your project to life."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer ongoing support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We believe in building long-term partnerships. All our projects include post-launch support, and we offer ongoing maintenance and optimization packages to ensure your digital assets continue to perform at their best."
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