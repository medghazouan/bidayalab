// app/(pages)/services/page.tsx
'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import ServicesList from '@/components/sections/services/ServicesList';
import PricingSection from '@/components/sections/services/PricingSection';
import OrderModal from '@/components/sections/services/OrderModal';

export default function ServicesPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenOrderModal = useCallback((plan: any) => {
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
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="services-page"
    >
      <ServicesList />
      <PricingSection onOpenOrderModal={handleOpenOrderModal} />
      <OrderModal 
        isOpen={modalState.isOpen} 
        plan={modalState.selectedPlan} 
        onClose={handleCloseModal}
      />
    </motion.section>
  );
}
