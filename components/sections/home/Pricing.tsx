'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

interface PricingPlan {
    _id: string;
    name: string;
    tagline?: string;
    price: number;
    currency: string;
    period: string;
    description?: string;
    features: string[];
    popular?: boolean;
    isCustom?: boolean;
}

// Services from our 3 categories
const services = [
    // AI Automation
    'Chatbots',
    'Workflow Automation',
    'Lead Generation',
    'Email Automation',
    'CRM Integration',
    // Web Development
    'Custom Websites',
    'E-commerce',
    'Web Apps',
    'Landing Pages',
    'API Development',
    // Visual Storytelling
    'Video Production',
    'Photography',
    'Motion Graphics',
    'Brand Films',
    'Product Shoots',
];

// Fallback data
const fallbackPlans: PricingPlan[] = [
    {
        _id: '1',
        name: 'Starter',
        tagline: 'For startups and small teams',
        price: 9999,
        currency: 'MAD',
        period: 'month',
        features: ['1-3 custom-designed pages', 'Basic branding (colors, fonts, logo)', 'Mobile responsive layout', 'Simple animations', 'Contact form integration', 'Email support'],
        popular: false,
        isCustom: false,
    },
    {
        _id: '2',
        name: 'Growth',
        tagline: 'For growing businesses',
        price: 24999,
        currency: 'MAD',
        period: 'month',
        features: ['Everything in Starter', '4-8 custom-designed pages', 'CMS integration (blog, portfolio)', 'Custom animations & transitions', 'Basic SEO setup', 'Priority email & chat support'],
        popular: true,
        isCustom: false,
    },
    {
        _id: '3',
        name: 'Custom',
        tagline: 'For enterprise needs',
        price: 0,
        currency: 'MAD',
        period: 'project',
        description: 'For businesses with specialized needs or ambitious projects. Together, we will craft a tailored solution that fits you perfectly.',
        features: ['Everything in Growth', 'Full design system', 'Tailored solutions & integrations', 'Dedicated senior designers (2+)', 'Flexible timelines & ongoing support', 'Pause or cancel anytime'],
        popular: false,
        isCustom: true,
    },
];

// Feature bullet icon - Diamond shape
function FeatureBullet({ isPopular = false }: { isPopular?: boolean }) {
    return (
        <span className={`flex-shrink-0 w-4 h-4 flex items-center justify-center ${isPopular ? 'text-black' : 'text-[#beff01]'}`}>
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                <path d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6L8 0Z" />
            </svg>
        </span>
    );
}

// Regular Pricing Card
function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US').format(price);
    };

    const isPopular = plan.popular;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative p-6 md:p-8 flex flex-col h-full ${isPopular
                    ? 'bg-[#beff01] border border-[#beff01]'
                    : 'bg-zinc-900/50 border border-zinc-800'
                }`}
        >
            {/* Popular Badge */}
            {isPopular && (
                <div className="absolute top-6 right-6">
                    <span className="px-3 py-1 bg-black text-[#beff01] text-xs font-louis font-bold uppercase tracking-wide">
                        Most popular
                    </span>
                </div>
            )}

            {/* Plan Header */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <span className={`font-louis text-sm ${isPopular ? 'text-black/50' : 'text-zinc-500'}`}>//</span>
                    <h3 className={`text-xl md:text-2xl font-louis font-bold ${isPopular ? 'text-black' : 'text-white'}`}>{plan.name}</h3>
                </div>
                {plan.tagline && (
                    <p className={`font-louis text-sm ${isPopular ? 'text-black/70' : 'text-zinc-400'}`}>{plan.tagline}</p>
                )}
            </div>

            {/* Price */}
            <div className={`mb-6 pb-6 border-b ${isPopular ? 'border-black/20' : 'border-zinc-800'}`}>
                <div className="flex items-end gap-1">
                    <span className={`text-4xl md:text-5xl lg:text-6xl font-louis font-bold ${isPopular ? 'text-black' : 'text-white'}`}>
                        {formatPrice(plan.price)}
                    </span>
                    <span className={`font-louis text-lg mb-2 ${isPopular ? 'text-black/60' : 'text-zinc-400'}`}>
                        {plan.currency}/{plan.period}
                    </span>
                </div>
            </div>

            {/* Features */}
            <div className="flex-1 mb-8">
                <p className={`font-louis text-sm uppercase tracking-wide mb-4 ${isPopular ? 'text-black/60' : 'text-zinc-500'}`}>What&apos;s included</p>
                <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <FeatureBullet isPopular={isPopular} />
                            <span className={`font-louis text-sm ${isPopular ? 'text-black' : 'text-zinc-300'}`}>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* CTA Button */}
            <Link
                href="/contact"
                className={`w-full py-4 flex items-center justify-center gap-2 font-louis font-medium transition-all duration-300 ${isPopular
                        ? 'bg-black text-white hover:bg-zinc-900'
                        : 'bg-transparent border border-zinc-700 text-white hover:border-white'
                    }`}
            >
                Choose this plan
                <ArrowUpRight className="w-4 h-4" />
            </Link>

            {/* Billing Note */}
            <p className={`text-center font-louis text-xs mt-4 ${isPopular ? 'text-black/60' : 'text-zinc-500'}`}>
                Billed {plan.period === 'month' ? 'Monthly' : 'Per Project'}
            </p>
        </motion.div>
    );
}

// Custom Plan Card (Full Width) with integrated marquee
function CustomPlanCard({ plan }: { plan: PricingPlan }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-zinc-900/50 border border-zinc-800 overflow-hidden"
        >
            {/* Main Content */}
            <div className="p-6 md:p-8 lg:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Left Side */}
                    <div>
                        {/* Plan Header */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-zinc-500 font-louis text-sm">//</span>
                            <h3 className="text-xl md:text-2xl font-louis font-bold text-white">{plan.name} plan</h3>
                        </div>

                        {/* Description */}
                        {plan.description && (
                            <p className="text-zinc-400 font-louis text-base leading-relaxed mb-8 max-w-md">
                                {plan.description}
                            </p>
                        )}

                        {/* Custom Label */}
                        <div className="mb-4">
                            <span className="text-6xl md:text-7xl lg:text-8xl font-survalia text-white">Custom</span>
                        </div>
                        <p className="text-zinc-500 font-louis text-sm mb-8">/tailored payment plan</p>

                        {/* CTA Button */}
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#beff01] text-black font-louis font-bold hover:bg-[#a8e000] transition-colors"
                        >
                            Get Custom Quote
                            <ArrowUpRight className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Right Side - Features */}
                    <div>
                        <p className="text-zinc-500 font-louis text-sm uppercase tracking-wide mb-6">What&apos;s included</p>
                        <ul className="space-y-4">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <FeatureBullet />
                                    <span className="text-zinc-300 font-louis">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Integrated Services Marquee - Part of custom plan card */}
            <div className="border-t border-zinc-800 bg-zinc-900/80 overflow-hidden">
                <div className="py-4 flex">
                    <motion.div
                        className="flex gap-12 whitespace-nowrap"
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 25,
                                ease: "linear",
                            },
                        }}
                    >
                        {[...services, ...services].map((service, i) => (
                            <span key={i} className="flex items-center gap-3 text-zinc-400 font-louis text-sm uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#beff01]" />
                                {service}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

export default function Pricing() {
    const { data: plans = [], isLoading } = useQuery<PricingPlan[]>({
        queryKey: ['pricing-plans'],
        queryFn: async () => {
            const response = await fetch('/api/pricing');
            if (!response.ok) throw new Error('Failed to fetch');
            return response.json();
        },
        staleTime: 10 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    // Use fetched plans or fallback
    const displayPlans = plans.length > 0 ? plans : fallbackPlans;

    // Separate regular plans from custom plan
    const regularPlans = displayPlans.filter(p => !p.isCustom);
    const customPlan = displayPlans.find(p => p.isCustom);

    return (
        <section
            id="pricing-section"
            className="relative bg-[#000000] border-t border-zinc-900"
        >
            {/* Section Header */}
            <div className="w-full px-4 md:px-8 pt-20 md:pt-32 pb-10 md:pb-16">
                {/* Label */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-block mb-2"
                >
                    <div className="flex items-center gap-3 px-5 py-2.5 bg-[#beff01]">
                        <span className="text-sm font-louis font-bold text-black uppercase tracking-wide">Pricing</span>
                        <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-survalia text-white leading-[1.05] tracking-tight mb-4"
                >
                    Simple<br />
                    <span className="text-[#beff01]">Pricing.</span>
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-zinc-400 font-louis max-w-3xl"
                >
                    Transparent pricing for every stage of growth. No hidden fees, no surprises.
                </motion.p>
            </div>

            {/* Pricing Content */}
            <div className="px-4 md:px-8 pb-20 md:pb-32">
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#beff01] border-t-transparent"></div>
                    </div>
                ) : (
                    <>
                        {/* Regular Plans Grid (2 columns) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {regularPlans.slice(0, 2).map((plan, index) => (
                                <PricingCard key={plan._id} plan={plan} index={index} />
                            ))}
                        </div>

                        {/* Third Plan (if exists, before custom) */}
                        {regularPlans.length > 2 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                {regularPlans.slice(2).map((plan, index) => (
                                    <PricingCard key={plan._id} plan={plan} index={index + 2} />
                                ))}
                            </div>
                        )}

                        {/* Custom Plan (Full Width) - Includes marquee */}
                        {customPlan && <CustomPlanCard plan={customPlan} />}
                    </>
                )}
            </div>
        </section>
    );
}
