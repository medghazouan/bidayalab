'use client';

import dynamic from 'next/dynamic';

const ContactSection = dynamic(() => import('@/components/sections/contact/ContactSection'), {
  loading: () => <div className="h-screen bg-zinc-900 animate-pulse" />,
});

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Optimized Animated Background - Reduced GPU load */}
      <div className="fixed inset-0 pointer-events-none" style={{ willChange: 'transform' }}>
        {/* Static Gradient Mesh - Converted from Framer Motion to CSS for better performance */}
        <div 
          className="absolute inset-0 opacity-30 animate-gradient-mesh"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(190, 255, 1, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
            backgroundSize: '200% 200%',
          }}
        />

        {/* Static Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        
        {/* Reduced to 2 orbs (from 4) - Using CSS animations for better performance */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#beff01]/10 rounded-full blur-2xl animate-orb-1" style={{ willChange: 'transform' }} />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-2xl animate-orb-2" style={{ willChange: 'transform' }} />

        {/* Single scanning line (reduced from 2) - Using CSS animation */}
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#beff01]/30 to-transparent animate-scan-line" />

        {/* Noise Texture Overlay - Static */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        />

        {/* Vignette Effect - Static */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-40" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-24">
        <ContactSection />
      </main>

      <style jsx>{`
        @keyframes gradient-mesh {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(0.9); }
          66% { transform: translate(20px, -40px) scale(1.1); }
        }

        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        .animate-gradient-mesh {
          animation: gradient-mesh 15s ease infinite;
        }

        .animate-orb-1 {
          animation: orb-1 20s ease-in-out infinite;
        }

        .animate-orb-2 {
          animation: orb-2 25s ease-in-out infinite;
        }

        .animate-scan-line {
          animation: scan-line 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
