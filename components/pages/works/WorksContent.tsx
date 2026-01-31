'use client';

import WorksGrid from '@/components/sections/works/WorksGrid';
import CallToAction from '@/components/sections/home/CallToAction';

export default function WorksContent() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Main Content */}
      <main className="relative z-10 pt-24">
        <WorksGrid />
        <CallToAction />
      </main>
    </div>
  );
}
