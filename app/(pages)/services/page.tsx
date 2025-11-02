// app/(pages)/services/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ServicesList from '@/components/sections/services/ServicesList';
import PricingSection from '@/components/sections/services/PricingSection';
import OrderModal from '@/components/sections/services/OrderModal';

export default function ServicesPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenOrderModal = (plan: any) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedPlan(null);
    }, 300);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Optimized Animated Background - Reduced GPU load */}
      <div className="fixed inset-0 pointer-events-none" style={{ willChange: 'transform' }}>
        {/* Static Gradient Mesh - CSS animation for better performance */}
        <div 
          className="absolute inset-0 opacity-30 animate-gradient-mesh"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(190, 255, 1, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
            backgroundSize: '200% 200%',
          }}
        />

        {/* Static Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        
        {/* Reduced to 2 orbs (from 4) - CSS animations */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#beff01]/10 rounded-full blur-2xl animate-orb-1" style={{ willChange: 'transform' }} />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-2xl animate-orb-2" style={{ willChange: 'transform' }} />

        {/* Single scanning line - CSS animation */}
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
        {/* Hero Section */}

        {/* Services List Section */}
        <ServicesList />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16">
          <div className="relative">
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-[#beff01]/50 to-transparent"
            />
          </div>
        </div>

        {/* Pricing Section */}
        <PricingSection onOpenOrderModal={handleOpenOrderModal} />
      </main>

      {/* Order Modal */}
      <OrderModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        plan={selectedPlan}
      />

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
          animation: orb-2 18s ease-in-out infinite 2s;
        }
        
        .animate-scan-line {
          animation: scan-line 8s linear infinite;
        }
      `}</style>
    </div>
  );
}