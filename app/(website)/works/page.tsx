import { Metadata } from 'next';
import WorksContent from '@/components/pages/works/WorksContent';

export const metadata: Metadata = {
  title: 'Digital Case Studies | Bidayalab',
  description: 'Explore our portfolio of AI-driven websites, mobile apps, and digital transformation projects. See how Bidayalab delivers results.',
  keywords: ['Bidayalab Portfolio', 'Web Development Case Studies', 'AI Projects', 'Digital Work'],
};

export default function WorksPage() {
  return <WorksContent />;
}