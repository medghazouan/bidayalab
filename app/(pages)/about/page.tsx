// app/(pages)/about/page.tsx
'use client';

import dynamic from 'next/dynamic';

// Lazy load components for better performance
const AboutHero = dynamic(() => import('@/components/sections/about/AboutHero'), {
  loading: () => <div className="h-[40vh] flex items-center justify-center"><div className="animate-pulse text-[#beff01]">Loading...</div></div>,
  ssr: true
});

const Experience = dynamic(() => import('@/components/sections/about/Experience'), {
  loading: () => <div className="h-[20vh] flex items-center justify-center"><div className="animate-pulse text-[#beff01]">Loading...</div></div>,
  ssr: true
});

const Education = dynamic(() => import('@/components/sections/about/Education'), {
  loading: () => <div className="h-[20vh] flex items-center justify-center"><div className="animate-pulse text-[#beff01]">Loading...</div></div>,
  ssr: true
});

const Testimonials = dynamic(() => import('@/components/sections/about/Testimonials'), {
  loading: () => <div className="h-[30vh] flex items-center justify-center"><div className="animate-pulse text-[#beff01]">Loading...</div></div>,
  ssr: true
});

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Optimized Background with CSS Animations */}
      <div className="fixed inset-0 pointer-events-none" style={{ willChange: 'transform' }}>
        {/* Static Gradient Mesh with CSS Animation */}
        <div 
          className="absolute inset-0 opacity-30 animate-gradient-mesh"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(190, 255, 1, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
            backgroundSize: '200% 200%'
          }}
        />

        {/* Static Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        
        {/* Reduced to 2 orbs (from 4) - Using CSS animations for better performance */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#beff01]/10 rounded-full blur-2xl animate-orb-1" style={{ willChange: 'transform' }} />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-2xl animate-orb-2" style={{ willChange: 'transform' }} />

        {/* Single scanning line (reduced from 2) - Using CSS animation */}
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#beff01]/30 to-transparent animate-scan-line" />
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-scan-line-reverse" />

        {/* Noise Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        />

        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-40" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-24">
        <AboutHero />
        
        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16">
          <div className="relative">
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
            <div 
              className="absolute top-0 left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-[#beff01]/50 to-transparent animate-divider"
            />
          </div>
        </div>

        <Experience />
        
        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16">
          <div className="relative">
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
            <div 
              className="absolute top-0 left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-[#beff01]/50 to-transparent animate-divider-delayed"
            />
          </div>
        </div>

        <Education />
        
        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16">
          <div className="relative">
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
            <div 
              className="absolute top-0 left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-[#beff01]/50 to-transparent animate-divider-more-delayed"
            />
          </div>
        </div>

        <Testimonials />
      </main>

      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gradient-mesh {
          0%, 100% { background-position: 0% 0%, 100% 100%, 50% 50%; }
          50% { background-position: 100% 100%, 0% 0%, 100% 0%; }
        }
        
        @keyframes orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -40px) scale(1.2); }
        }
        
        @keyframes orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 40px) scale(1.3); }
        }
        
        @keyframes scan-line {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(200vh); }
        }
        
        @keyframes scan-line-reverse {
          0% { transform: translateY(200vh); }
          100% { transform: translateY(-100vh); }
        }
        
        @keyframes divider-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        .animate-gradient-mesh {
          animation: gradient-mesh 20s ease-in-out infinite;
        }
        
        .animate-orb-1 {
          animation: orb-1 15s ease-in-out infinite;
        }
        
        .animate-orb-2 {
          animation: orb-2 18s ease-in-out infinite;
        }
        
        .animate-scan-line {
          animation: scan-line 8s linear infinite;
        }
        
        .animate-scan-line-reverse {
          animation: scan-line-reverse 10s linear infinite 3s;
        }
        
        .animate-divider {
          animation: divider-slide 3s linear infinite;
        }
        
        .animate-divider-delayed {
          animation: divider-slide 3s linear infinite 1.5s;
        }
        
        .animate-divider-more-delayed {
          animation: divider-slide 3s linear infinite 3s;
        }
      `}</style>
    </div>
  );
}