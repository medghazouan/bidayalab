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
      {/* Main Content */}
      <main id="main-content" className="relative w-full">
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
