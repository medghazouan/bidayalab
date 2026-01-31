import React, { useState, useMemo } from 'react';
import { Check, Zap, Crown, Shield, Rocket, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';

export interface PricingPlan {
  _id: string;
  id?: string;
  name: string;
  tagline?: string;
  price?: number;
  currency?: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  isCustom?: boolean;
}

interface PricingResponse {
  success: boolean;
  plans: PricingPlan[];
}

interface PricingSectionProps {
  onOpenOrderModal: (plan: PricingPlan) => void;
}

export default function PricingSection({ onOpenOrderModal }: PricingSectionProps) {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  // Use React Query for better caching and request deduplication
  const { data, isLoading, error } = useQuery<PricingResponse | PricingPlan[]>({
    queryKey: ['pricing-plans'],
    queryFn: async () => {
      const response = await fetch('/api/pricing');
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();

      return result;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes cache
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // Memoize sorted plans to avoid re-sorting on every render
  const plans = useMemo(() => {
    if (!data) {

      return [];
    }

    // Handle different response formats
    let plansArray: PricingPlan[] = [];

    // Check if data is an array (direct plans array)
    if (Array.isArray(data)) {

      plansArray = data;
    }
    // Check if data has a plans property
    else if (data && typeof data === 'object' && 'plans' in data) {

      plansArray = data.plans || [];
    }
    // Check if data has a data property (nested structure)
    else if (data && typeof data === 'object' && 'data' in data) {

      const nestedData = (data as Record<string, unknown>).data;
      if (Array.isArray(nestedData)) {
        plansArray = nestedData;
      } else if (nestedData && typeof nestedData === 'object' && 'plans' in nestedData) {
        plansArray = (nestedData as { plans: PricingPlan[] }).plans || [];
      }
    }



    if (!plansArray || plansArray.length === 0) {
      return [];
    }

    // Sort plans: Starter first (left), Growth middle (center), Custom last (right)
    const desktopOrder: Record<string, number> = { 'Starter': 0, 'Growth': 1, 'Custom': 2 };
    return [...plansArray].sort((a, b) => {
      const orderA = desktopOrder[a.name] ?? 999;
      const orderB = desktopOrder[b.name] ?? 999;
      return orderA - orderB;
    });
  }, [data]);

  const getPlanIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'starter': return <Rocket className="w-6 h-6" />;
      case 'growth': return <Crown className="w-6 h-6" />;
      case 'custom': return <Shield className="w-6 h-6" />;
      default: return <Zap className="w-6 h-6" />;
    }
  };

  const handleOrderClick = (plan: PricingPlan) => {
    if (onOpenOrderModal) {
      onOpenOrderModal(plan);
    }
  };

  // Show error state
  if (error) {
    return (
      <section className="min-h-screen py-32 px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500 text-xl">Error loading pricing plans. Please try again later.</p>
          <p className="text-gray-400 mt-2">{error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </section>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <section className="min-h-screen py-32 px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#beff01] border-t-transparent"></div>
          <p className="text-gray-400 mt-4">Loading pricing plans...</p>
        </div>
      </section>
    );
  }

  // Show empty state
  if (!plans || plans.length === 0) {
    return (
      <section className="min-h-screen py-32 px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-xl">No pricing plans available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="relative max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Creative Section Header - Left Aligned & Bold */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-400 text-xs font-mono uppercase tracking-widest mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#beff01]" />
              Investment Options
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tight"
            >
              SIMPLE<br />
              <span className="text-[#beff01]">PRICING</span>
            </motion.h2>
          </div>

          <div className="lg:pb-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zinc-400 leading-relaxed max-w-lg"
            >
              Transparent packages designed for growth. No hidden fees, just <span className="text-white font-medium">real results</span>.
            </motion.p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => {
            const isCustom = plan.isCustom;
            const isGrowth = plan.name === 'Growth';

            // Desktop: Starter (left), Growth (center scaled), Custom (right)
            // Mobile: Growth first
            const shouldScale = isGrowth;

            return (
              <div
                key={plan._id}
                onMouseEnter={() => setHoveredPlan(plan._id)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`
                  relative group
                  ${shouldScale ? 'lg:scale-110 z-10' : 'z-0'}
                  transition-all duration-500 ease-out
                  ${hoveredPlan === plan._id ? 'scale-105' : ''}
                  ${isGrowth ? 'md:order-first lg:order-none' : ''}
                `}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Card */}
                <div className={`
                  relative h-full rounded-3xl overflow-hidden
                  ${isGrowth
                    ? 'bg-gradient-to-br from-[#beff01]/20 via-[#beff01]/10 to-black border-2 border-[#beff01] shadow-2xl shadow-[#beff01]/30'
                    : 'bg-zinc-900/50 backdrop-blur-sm border border-zinc-800'
                  }
                  transition-all duration-300
                  ${hoveredPlan === plan._id ? 'border-[#beff01]/50 shadow-xl shadow-[#beff01]/10' : ''}
                `}>
                  {/* Glow Effect */}
                  {isGrowth && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#beff01]/15 via-transparent to-transparent opacity-50"></div>
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#beff01]/20 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#beff01]/10 rounded-full blur-3xl"></div>
                    </>
                  )}

                  {/* Content */}
                  <div className="relative p-8 md:p-10">
                    {/* Icon & Name */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`
                        w-14 h-14 rounded-2xl flex items-center justify-center
                        ${isGrowth
                          ? 'bg-[#beff01] text-black shadow-lg shadow-[#beff01]/50'
                          : 'bg-zinc-800 text-[#beff01]'
                        }
                        group-hover:scale-110 transition-transform duration-300
                      `}>
                        {getPlanIcon(plan.name)}
                      </div>

                      {!isGrowth && !isCustom && (
                        <div className="text-right">
                          <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">Save Time</span>
                        </div>
                      )}
                    </div>

                    {/* Plan Name */}
                    <h3 className="text-3xl font-black text-white mb-2 tracking-tight">
                      {plan.name}
                    </h3>

                    {/* Tagline */}
                    {plan.tagline && (
                      <p className="text-gray-400 text-sm font-medium mb-6">
                        {plan.tagline}
                      </p>
                    )}

                    {/* Price */}
                    <div className="mb-8 pb-8 border-b border-zinc-800">
                      {plan.price ? (
                        <>
                          <div className="flex items-baseline gap-2 mb-2">
                            <span className={`
                              text-5xl md:text-6xl font-black tracking-tight
                              ${isGrowth ? 'text-[#beff01]' : 'text-white'}
                            `}>
                              {plan.price.toLocaleString()}
                            </span>
                            <span className="text-2xl text-gray-400 font-bold">{plan.currency || 'USD'}</span>
                          </div>
                          <p className="text-sm text-gray-500 font-medium">
                            {plan.period === 'one-time' ? 'One-time investment' : plan.period}
                          </p>
                        </>
                      ) : (
                        <div className="py-4">
                          <span className="text-4xl font-black text-white">Let&apos;s Talk</span>
                          <p className="text-sm text-gray-500 mt-2 font-medium">Custom pricing for your needs</p>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed mb-8 text-sm">
                      {plan.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-4 mb-10">
                      {plan.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 group/item"
                          style={{
                            animation: `fadeInUp 0.5s ease-out ${idx * 0.05}s both`
                          }}
                        >
                          <div className={`
                            w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                            ${isGrowth
                              ? 'bg-[#beff01]/20 border border-[#beff01]'
                              : 'bg-zinc-800 border border-zinc-700'
                            }
                            group-hover/item:scale-110 transition-transform
                          `}>
                            <Check className={`w-3 h-3 ${isGrowth ? 'text-[#beff01]' : 'text-gray-400'} stroke-[3]`} />
                          </div>
                          <span className="text-gray-300 text-sm leading-relaxed flex-1">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleOrderClick(plan)}
                      className={`
                        w-full py-4 rounded-2xl font-bold text-base
                        relative overflow-hidden group/btn
                        transition-all duration-300
                        ${isGrowth
                          ? 'bg-[#beff01] text-black hover:bg-[#a8e600] shadow-lg shadow-[#beff01]/30 hover:shadow-2xl hover:shadow-[#beff01]/40'
                          : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700 hover:border-[#beff01]/50'
                        }
                      `}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isCustom ? "Let's Discuss" : 'Get Started'}
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                      {isGrowth && (
                        <div className="absolute inset-0 bg-gradient-to-r from-[#a8e600] to-[#beff01] opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}