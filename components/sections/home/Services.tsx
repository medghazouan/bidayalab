'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { useLocale, type Locale } from '@/lib/i18n';

// BidayaLab's services — EN/FR translations
const SERVICES_BY_LOCALE = {
    en: [
        {
            id: 'service1',
            number: '01',
            title: 'AI Automation',
            description: 'Cut 60–80% of repetitive ops in 30 days. We map the bottleneck, deploy n8n / Make / GPT agents, and hand you a system that works while you sleep — with the SOPs and dashboards to prove it.',
            categories: ['n8n Workflows', 'GPT Agents', 'CRM Sync', 'Lead Scoring', 'Email · WhatsApp Bots', 'KPI Dashboards'],
            image: '/assets/images/services/ai-automation.webp',
            alt: 'AI automation workflow and chatbot integration for small business',
        },
        {
            id: 'service2',
            number: '02',
            title: 'Web Engineering',
            description: 'Sites that load in under 1s and convert above 3%. Next.js, Shopify Hydrogen, headless CMS — engineered for SEO, speed and revenue. We replace the slow WordPress build that’s costing you customers.',
            categories: ['Next.js Builds', 'Shopify Hydrogen', 'Conversion Funnels', 'Headless CMS', 'API Integrations', 'CWV · SEO'],
            image: '/assets/images/services/web-development.webp',
            alt: 'Custom web development and e-commerce solutions by BidayaLab',
        },
        {
            id: 'service3',
            number: '03',
            title: 'Brand & Motion',
            description: 'A brand system that earns the price tag. Identity, motion, product film and editorial photo — built so your launch isn’t mistaken for the competitor next to you on the shelf.',
            categories: ['Brand Identity', 'Motion Design', 'Product Film', 'Editorial Photo', 'Launch Systems', 'Social Cuts'],
            image: '/assets/images/services/visual-storytelling.webp',
            alt: 'Professional brand film and photography production for digital marketing',
        },
    ],
    fr: [
        {
            id: 'service1',
            number: '01',
            title: 'Automatisation IA',
            description: 'On supprime 60–80 % des tâches répétitives en 30 jours. On cartographie le goulot, on déploie n8n / Make / agents GPT, et on vous remet un système qui tourne pendant que vous dormez — avec les procédures et tableaux de bord pour le prouver.',
            categories: ['Workflows n8n', 'Agents GPT', 'Sync CRM', 'Scoring leads', 'Bots Email · WhatsApp', 'Tableaux de bord'],
            image: '/assets/images/services/ai-automation.webp',
            alt: 'Automatisation IA et intégration de chatbot pour PME',
        },
        {
            id: 'service2',
            number: '02',
            title: 'Ingénierie Web',
            description: 'Des sites qui chargent en moins d’une seconde et qui convertissent au-delà de 3 %. Next.js, Shopify Hydrogen, CMS headless — mesurés sur le SEO, la vitesse et le chiffre d’affaires. On remplace le WordPress lent qui vous coûte des clients.',
            categories: ['Sites Next.js', 'Shopify Hydrogen', 'Tunnels de conversion', 'CMS Headless', 'Intégrations API', 'CWV · SEO'],
            image: '/assets/images/services/web-development.webp',
            alt: 'Développement web sur-mesure et e-commerce par BidayaLab',
        },
        {
            id: 'service3',
            number: '03',
            title: 'Marque & Motion',
            description: 'Un système de marque qui justifie le prix. Identité, motion, film produit et photo éditoriale — conçu pour que votre lancement ne soit pas confondu avec le concurrent d’à côté.',
            categories: ['Identité visuelle', 'Motion Design', 'Film produit', 'Photo éditoriale', 'Systèmes de lancement', 'Cuts réseaux sociaux'],
            image: '/assets/images/services/visual-storytelling.webp',
            alt: 'Production photo & vidéo pour marques marocaines premium',
        },
    ],
} as const;

type ServiceItem = (typeof SERVICES_BY_LOCALE)['en'][number];


export default function Services() {
    const lang: Locale = useLocale();
    const services = useMemo(() => SERVICES_BY_LOCALE[lang], [lang]);
    const headerCopy = useMemo(
        () => ({
            label: lang === 'fr' ? 'Services' : 'Services',
            titleA: lang === 'fr' ? 'Trois services.' : 'Three services.',
            titleB: lang === 'fr' ? 'Une promesse : un chiffre.' : 'One promise: a number.',
            description:
                lang === 'fr'
                    ? "Chaque mission est livrée avec un résultat mesuré — lift de conversion, heures économisées, revenus par visiteur. Si on ne l’atteint pas, on refait sur notre temps."
                    : 'Every engagement ships with a measured outcome attached — conversion lift, hours saved, revenue per visitor. If we don’t hit it, we rebuild on our time.',
            categoriesLabel: lang === 'fr' ? 'Catégories' : 'Categories',
        }),
        [lang],
    );
    const [activeServiceId, setActiveServiceId] = useState<string>(services[0].id);
    const [navState, setNavState] = useState<'top' | 'fixed' | 'bottom'>('top');
    const [bottomOffset, setBottomOffset] = useState<number>(0);
    const splitContainerRef = useRef<HTMLDivElement>(null);
    const cardsWrapperRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);

    // Calculate nav position state based on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (!splitContainerRef.current || !cardsWrapperRef.current || !navRef.current) return;

            const cardsRect = cardsWrapperRef.current.getBoundingClientRect();
            const navHeight = navRef.current.offsetHeight || 200;
            const fixedTop = 32; // Distance from viewport top when fixed

            // Cards wrapper bounds relative to viewport
            const cardsTop = cardsRect.top;
            const cardsBottom = cardsRect.bottom;

            // Determine state
            if (cardsTop > fixedTop) {
                // Cards haven't reached fixed position yet - nav scrolls with page
                setNavState('top');
            } else if (cardsBottom < fixedTop + navHeight) {
                // Bottom of cards is about to scroll past the nav - stick to bottom of CARDS
                setNavState('bottom');
                // Calculate the top offset to position nav at bottom of cards
                const cardsHeight = cardsWrapperRef.current.offsetHeight;
                setBottomOffset(cardsHeight - navHeight);
            } else {
                // In the middle - nav is fixed
                setNavState('fixed');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check initial state

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Calculate nav styles based on state - with smooth transitions
    const getNavStyles = (): React.CSSProperties => {
        const baseStyles: React.CSSProperties = {
            zIndex: 100,
            width: '25%',
            transition: 'top 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease'
        };

        switch (navState) {
            case 'fixed':
                return {
                    ...baseStyles,
                    position: 'fixed',
                    left: '32px',
                    top: '32px'
                };
            case 'bottom':
                return {
                    ...baseStyles,
                    position: 'absolute',
                    left: '32px',
                    top: `${bottomOffset}px`
                };
            case 'top':
            default:
                return {
                    ...baseStyles,
                    position: 'absolute',
                    left: '32px',
                    top: '0'
                };
        }
    };

    return (
        <section
            id="services-section"
            className="relative bg-transparent"
            style={{ fontFamily: "'Inter Display', 'Inter', sans-serif" }}
        >
            {/* Section Header */}
            <div className="w-full px-4 md:px-8 pt-20 md:pt-32 pb-10 md:pb-16">
                {/* Creative Modern Label */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-block mb-2"
                >
                    <div className="flex items-center gap-3 px-5 py-2.5 bg-[#beff01]">
                        <span className="text-sm font-louis font-bold text-black uppercase tracking-wide">{headerCopy.label}</span>
                        <svg aria-hidden="true" className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </div>
                </motion.div>

                {/* Big Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-louis font-bold text-white leading-[1.05] tracking-tight mb-4"
                >
                    {headerCopy.titleA}<br />
                    <span className="text-[#beff01]">{headerCopy.titleB}</span>
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-zinc-400 font-louis max-w-3xl"
                >
                    {headerCopy.description}
                </motion.p>
            </div>

            {/* Split-Screen Layout - container for nav positioning */}
            <div
                ref={splitContainerRef}
                className="relative px-4 md:px-8 pb-32"
            >
                {/* Left Side Navigation - Smooth animated positioning */}
                <motion.div
                    ref={navRef}
                    className="hidden lg:block"
                    style={getNavStyles()}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <nav className="flex flex-col gap-4">
                        {services.map((service, index) => {
                            const isActive = activeServiceId === service.id;
                            return (
                                <motion.a
                                    key={service.id}
                                    href={`#${service.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById(service.id)?.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start'
                                        });
                                    }}
                                    className="group relative flex items-center gap-4 cursor-pointer py-2"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                >
                                    {/* Animated accent line */}
                                    <motion.div
                                        className="absolute left-0 w-1 rounded-full bg-[#beff01]"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                            height: isActive ? '100%' : '0%',
                                            opacity: isActive ? 1 : 0
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            ease: [0.22, 1, 0.36, 1]
                                        }}
                                        style={{ top: 0 }}
                                    />

                                    {/* Service number */}
                                    <motion.span
                                        className="text-sm font-louis font-medium ml-4"
                                        animate={{
                                            color: isActive ? '#beff01' : '#666666',
                                            opacity: isActive ? 1 : 0.5
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        0{index + 1}
                                    </motion.span>

                                    {/* Service title */}
                                    <motion.span
                                        className="text-2xl md:text-3xl font-louis font-bold leading-none"
                                        animate={{
                                            color: isActive ? '#FFFFFF' : '#666666',
                                            x: isActive ? 8 : 0,
                                            scale: isActive ? 1.02 : 1
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            ease: [0.22, 1, 0.36, 1]
                                        }}
                                        whileHover={{
                                            color: '#FFFFFF',
                                            x: 4,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        {service.title}
                                    </motion.span>
                                </motion.a>
                            );
                        })}
                    </nav>

                    {/* Subtle gradient glow behind active item */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                            background: 'radial-gradient(ellipse at left, rgba(190, 255, 1, 0.3) 0%, transparent 70%)',
                            filter: 'blur(40px)'
                        }}
                    />
                </motion.div>

                {/* Right Side - Cards wrapper (used for bounds calculation) */}
                <div
                    ref={cardsWrapperRef}
                    className="lg:ml-[35%] flex flex-col"
                >
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            categoriesLabel={headerCopy.categoriesLabel}
                            index={index}
                            onInView={(inView) => {
                                if (inView) {
                                    setActiveServiceId(service.id);
                                }
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

// Service Card Component with 3D Reveal Effects
function ServiceCard({
    service,
    index,
    onInView,
    categoriesLabel,
}: {
    service: ServiceItem;
    index: number;
    onInView: (inView: boolean) => void;
    categoriesLabel: string;
}) {
    const cardRef = useRef<HTMLDivElement>(null);

    // Scroll-spy detection using IntersectionObserver with viewport
    useEffect(() => {
        if (!cardRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        onInView(true);
                    }
                });
            },
            {
                root: null,
                rootMargin: '-40% 0px -40% 0px',
                threshold: 0.1
            }
        );

        observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, [onInView]);

    return (
        <motion.div
            ref={cardRef}
            id={service.id}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.1
            }}
            className="flex flex-col bg-[#000000] scroll-mt-[32px] overflow-hidden"
        >
            {/* Large Image Section */}
            <motion.div
                className="relative w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-zinc-900"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <Image
                    src={service.image}
                    alt={service.alt || service.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 65vw"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>

            {/* Content Section - Grid Layout */}
            <div className="p-6 md:p-8 lg:p-10 bg-[#0a0a0a]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">

                    {/* Left Side - Title & Description */}
                    <div className="flex flex-col gap-4">
                        {/* Number + Title */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex items-baseline gap-3"
                        >
                            <span className="text-zinc-500 font-louis text-sm font-medium">
                                [{service.number}]
                            </span>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-louis font-bold text-white leading-tight">
                                {service.title}
                            </h3>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-zinc-400 font-louis text-sm md:text-base leading-relaxed max-w-md"
                        >
                            {service.description}
                        </motion.p>
                    </div>

                    {/* Right Side - Categories (Visible on all screens) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col gap-3"
                    >
                        <span className="text-zinc-500 font-louis text-xs uppercase tracking-wider">
                            {categoriesLabel}
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {service.categories.map((category, catIndex) => (
                                <motion.span
                                    key={category}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.3,
                                        delay: 0.5 + catIndex * 0.05
                                    }}
                                    whileHover={{
                                        backgroundColor: 'rgba(190, 255, 1, 0.1)',
                                        borderColor: '#beff01',
                                        color: '#beff01',
                                        transition: { duration: 0.2 }
                                    }}
                                    className="inline-flex items-center px-3 py-1.5 border border-zinc-700 rounded-sm text-white text-xs font-louis cursor-default transition-colors"
                                >
                                    {category}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
