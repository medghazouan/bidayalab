import { Metadata } from 'next';
import ContactContent from '@/components/pages/contact/ContactContent';

export const metadata: Metadata = {
  title: 'Start Your Project | Bidayalab',
  description: 'Ready to scale? Contact Bidayalab for expert Web Development, AI Solutions, and Strategic Branding. Get a response within 24 hours.',
  keywords: ['Contact Bidayalab', 'Hire AI Agency', 'Web Development Quote', 'Digital Agency Contact'],
};

export default function ContactPage() {
  return <ContactContent />;
}
