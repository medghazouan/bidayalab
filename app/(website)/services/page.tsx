// app/(pages)/services/page.tsx
'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import ServicesList from '@/components/sections/services/ServicesList';
import PricingSection from '@/components/sections/services/PricingSection';
import CallToAction from '@/components/sections/home/CallToAction';
import OrderModal from '@/components/sections/services/OrderModal';
import { PricingPlan } from '@/components/sections/services/PricingSection';

export default function ServicesPage() {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenOrderModal = useCallback((plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    const timer = setTimeout(() => {
      setSelectedPlan(null);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const modalState = useMemo(() => ({
    isOpen: isModalOpen,
    selectedPlan,
  }), [isModalOpen, selectedPlan]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Main Content */}
      <main className="relative z-10 pt-24">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="services-page"
        >
          <ServicesList />
          <PricingSection onOpenOrderModal={handleOpenOrderModal} />
          <CallToAction />
          <OrderModal
            isOpen={modalState.isOpen}
            plan={modalState.selectedPlan}
            onClose={handleCloseModal}
          />
        </motion.section>
      </main>
    </div>
  );
}
