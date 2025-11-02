// app/contact/page.tsx
'use client';

import dynamic from 'next/dynamic';
import ContactSection from '@/components/sections/contact/ContactSection';

// Lazy load the contact section to improve initial page load
const DynamicContactSection = dynamic(
  () => import('@/components/sections/contact/ContactSection'),
  { 
    loading: () => <div className="flex justify-center items-center min-h-[50vh]"><div className="animate-pulse text-[#beff01]">Loading...</div></div>,
    ssr: true
  }
);

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Optimized Animated Background - Reduced GPU load */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Static Gradient Mesh - Using pure CSS for better performance */}
        <div 
          className="absolute inset-0 opacity-30 animate-gradient-mesh"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(190, 255, 1, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
            backgroundSize: '200% 200%'
          }}
        />

        {/* Static Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        
        {/* Reduced to 1 orb for better performance */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#beff01]/10 rounded-full blur-xl animate-orb-1" />

        {/* Simplified scanning line */}
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#beff01]/30 to-transparent animate-scan-line" />

        {/* Vignette Effect - Static */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-40" />
      </div>

      {/* Main Content - Lazy loaded */}
      <main className="relative z-10 pt-24">
        <DynamicContactSection />
      </main>

      <style jsx global>{`
        @keyframes gradient-mesh {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
        }
        
        @keyframes orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }
        
        @keyframes scan-line {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(200vh); }
        }
        
        .animate-gradient-mesh {
          animation: gradient-mesh 30s ease-in-out infinite;
        }
        
        .animate-orb-1 {
          animation: orb-1 20s ease-in-out infinite;
        }
        
        .animate-scan-line {
          animation: scan-line 12s linear infinite;
        }
      `}</style>
    </div>
  );
}