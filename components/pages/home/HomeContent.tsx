'use client';

import dynamic from 'next/dynamic';
import Hero from "@/components/sections/home/Hero";

// Dynamically import components that are below the fold

const Services = dynamic(() => import('@/components/sections/home/Services'), {
  loading: () => <div className="h-[600px]" />,
});
const Works = dynamic(() => import('@/components/sections/home/Works'), {
  loading: () => <div className="h-[500px]" />,
});
const Testimonials = dynamic(() => import('@/components/sections/home/Testimonials'), {
  loading: () => <div className="h-[400px]" />,
});
const Blogs = dynamic(() => import('@/components/sections/home/Blogs'), {
  loading: () => <div className="h-[300px]" />,
});

const FAQ = dynamic(() => import('@/components/sections/home/FAQ'), {
  loading: () => <div className="h-[400px]" />,
});

const CallToAction = dynamic(() => import('@/components/sections/home/CallToAction'), {
  loading: () => <div className="h-[300px]" />,
});

import StackedSection from '@/components/ui/StackedSection';

export default function HomeContent() {
  return (
    <div className="relative min-h-screen bg-[#050505]">
      {/* Global Noise Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[5] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Main Content */}
      <main className="relative w-full">
        <StackedSection index={0}>
          <Hero />
        </StackedSection>

        <StackedSection index={1}>
          <Services />
        </StackedSection>

        <StackedSection index={2}>
          <Works />
        </StackedSection>

        <StackedSection index={3}>
          <Testimonials />
        </StackedSection>

        <StackedSection index={4}>
          <Blogs />
        </StackedSection>

        <StackedSection index={5}>
          <FAQ />
        </StackedSection>

        <StackedSection index={6}>
          <CallToAction />
        </StackedSection>
      </main>
    </div>
  );
}
