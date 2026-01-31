'use client';

import dynamic from 'next/dynamic';

const ContactSection = dynamic(() => import('@/components/sections/contact/ContactSection'), {
  loading: () => <div className="h-screen bg-zinc-900 animate-pulse" />,
});

export default function ContactContent() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Main Content */}
      <main className="relative z-10 pt-24">
        <ContactSection />
      </main>
    </div>
  );
}
