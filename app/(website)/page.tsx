import { Metadata } from 'next';
import HomeContent from '@/components/pages/home/HomeContent';

export const metadata: Metadata = {
  title: { absolute: 'Digital Transformation Agency in Marrakech | BidayaLab' },
  description: "BidayaLab : agence de transformation digitale à Marrakech. IA, développement web et branding avec résultats mesurés garantis. Audit gratuit de 30 min.",
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
    canonical: 'https://www.bidayalab.com/',
    languages: {
      en: 'https://www.bidayalab.com/',
      fr: 'https://www.bidayalab.com/fr',
      'x-default': 'https://www.bidayalab.com/',
    },
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
        "name": "How is BidayaLab different from a freelancer or a generalist agency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Three differences. (1) We commit to a measured outcome on every project — conversion lift, hours saved, revenue per visitor — written into the proposal, not a vague brief. (2) Senior-only team, no juniors learning on your budget. (3) AI automation, web engineering and brand sit in one studio, so your funnel ships as a system, not as four disconnected vendors."
        }
      },
      {
        "@type": "Question",
        "name": "What does a project actually cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Web from 45,000 MAD. AI automation builds from 28,000 MAD. Brand systems from 38,000 MAD. We publish starting prices instead of hiding them behind a discovery call — you should know the order of magnitude before you talk to us. Final scope is fixed in writing after the free 30-min audit."
        }
      },
      {
        "@type": "Question",
        "name": "How long until I see real results?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI automation: 2–4 weeks to first measurable hours saved. Web/Shopify rebuild: 6–10 weeks to launch, conversion lift typically visible within 30 days post-launch. Brand systems: 4–6 weeks to a launchable identity. Every project ships with a baseline measurement at week 1 and a result snapshot at handover."
        }
      },
      {
        "@type": "Question",
        "name": "What if the project does not hit the agreed result?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We rebuild on our time until it does. The measured-or-reworked guarantee is written into the contract — not a marketing line. We can do this because we only take on engagements where we have line-of-sight to the outcome, which is also why availability is intentionally limited."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work with clients outside Morocco?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. ~40% of current engagements are EU/MENA (France, UAE, KSA, North America). The team is remote-first, fluent in French/Arabic/English, and we run a 9 AM–9 PM Morocco-time window which covers GMT to EST without late nights."
        }
      },
      {
        "@type": "Question",
        "name": "Why are you only running 3 projects per quarter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Because the guarantee is real. Senior-only delivery + a written outcome means we cap intake to keep quality non-negotiable. Slots open quarterly — if this one is full we will tell you straight and put you in the next intake instead of slow-walking you."
        }
      },
      {
        "@type": "Question",
        "name": "What happens after launch — do we lose you?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Every build includes a 30-day measurement window after handover where we tune until the metric is hit. After that you can keep us on a retainer (analytics, iteration, new features) or take it fully in-house — your codebase, your dashboards, your accounts."
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