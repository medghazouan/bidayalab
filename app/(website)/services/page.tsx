import { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'AI Automation & Web Development Services | BidayaLab',
  description: 'From intelligent AI chatbots to high-performance websites, we build digital solutions that scale your business. Explore our services and let\'s grow together.',
  keywords: [
    'AI automation services',
    'web development services',
    'business chatbot development',
    'custom website development',
    'workflow automation',
    'video production for brands',
    'visual storytelling agency',
    'digital solutions for SMEs'
  ],
  openGraph: {
    title: 'AI Automation & Web Development Services | BidayaLab',
    description: 'We build digital solutions that scale your business. AI chatbots, custom websites, and premium visual content.',
    url: 'https://bidayalab.com/services',
    type: 'website',
  },
  alternates: {
    canonical: 'https://bidayalab.com/services'
  }
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
