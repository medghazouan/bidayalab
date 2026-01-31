'use client';

import dynamic from 'next/dynamic';
import Hero from "@/components/sections/home/Hero";

// Dynamically import components that are below the fold
const OurApproach = dynamic(() => import('@/components/sections/home/OurApproach'), {
  loading: () => <div className="h-[500px]" />,
});
const Services = dynamic(() => import('@/components/sections/home/Services'), {
  loading: () => <div className="h-[600px]" />,
});
const Process = dynamic(() => import('@/components/sections/home/Process'), {
  loading: () => <div className="h-[500px]" />,
});
const Works = dynamic(() => import('@/components/sections/home/Works'), {
  loading: () => <div className="h-[500px]" />,
});
const Pricing = dynamic(() => import('@/components/sections/home/Pricing'), {
  loading: () => <div className="h-[600px]" />,
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

export default function HomeContent() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Main Content */}
      <main className="relative z-10 pt-18">
        <Hero />
        <OurApproach />
        <Services />
        <Process />
        <Works />
        <Pricing />
        <Testimonials />
        <Blogs />
        <FAQ />
        <CallToAction />
      </main>
    </div>
  );
}
