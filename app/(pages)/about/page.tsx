// app/(pages)/about/page.tsx
'use client';

import { useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Lazy load components for better performance
const AboutHero = dynamic(() => import('@/components/sections/about/AboutHero'), {
  loading: () => <div className="h-screen bg-zinc-900 animate-pulse" />,
});

const Experience = dynamic(() => import('@/components/sections/about/Experience'), {
  loading: () => <div className="h-96 bg-zinc-900 animate-pulse" />,
});

const Education = dynamic(() => import('@/components/sections/about/Education'), {
  loading: () => <div className="h-96 bg-zinc-900 animate-pulse" />,
});

const Testimonials = dynamic(() => import('@/components/sections/about/Testimonials'), {
  loading: () => <div className="h-96 bg-zinc-900 animate-pulse" />,
});

export default function AboutPage() {
  return (
    <div className="space-y-24 py-12">
      <AboutHero />
      <Experience />
      <Education />
      <Testimonials />
    </div>
  );
}
