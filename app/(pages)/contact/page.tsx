'use client';

import dynamic from 'next/dynamic';

const ContactSection = dynamic(() => import('@/components/sections/contact/ContactSection'), {
  loading: () => <div className="h-screen bg-zinc-900 animate-pulse" />,
});

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactSection />
    </div>
  );
}
