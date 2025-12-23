import { Metadata } from 'next';
import HomeContent from '@/components/pages/home/HomeContent';

export const metadata: Metadata = {
  title: 'Digital Transformation Agency | Bidayalab',
  description: 'Bidayalab is a premier AI-Driven Digital Agency. We build high-performance websites, custom AI agents, and predictable revenue engines for ambitious brands.',
  keywords: ['Digital Transformation', 'AI Automation', 'Next.js Development', 'Growth Marketing', 'Bidayalab'],
  openGraph: {
    title: 'Digital Transformation Agency | Bidayalab',
    description: 'Bidayalab combines world-class development, design, and AI to scale your business.',
    url: 'https://bidayalab.com',
    type: 'website',
  },
};

export default function HomePage() {
  return <HomeContent />;
}