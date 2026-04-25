import { Metadata } from 'next';
import ContactContent from '@/components/pages/contact/ContactContent';

export const metadata: Metadata = {
  title: 'Let\'s Build Something Amazing Together | Contact BidayaLab',
  description: 'Ready to scale your business? Let\'s talk about AI automation, web development, or visual storytelling. We respond within 24 hours.',
  keywords: [
    'contact digital agency',
    'hire AI automation agency',
    'web development consultation',
    'digital transformation partner',
    'business automation quote',
    'startup digital services'
  ],
  openGraph: {
    title: 'Let\'s Build Something Amazing Together | BidayaLab',
    description: 'Ready to scale? Contact us for AI automation, web development, and visual storytelling services.',
    url: 'https://www.bidayalab.com/contact',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.bidayalab.com/contact',
    languages: {
      en: 'https://www.bidayalab.com/contact',
      fr: 'https://www.bidayalab.com/fr/contact',
      'x-default': 'https://www.bidayalab.com/contact',
    },
  }
};

export default function ContactPage() {
  return <ContactContent />;
}
