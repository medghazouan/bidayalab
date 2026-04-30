'use client';

import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale, t, localeHref } from '@/lib/i18n';

const TESTIMONIALS_BY_LOCALE = {
    en: [
        {
            id: 1,
            name: 'Ahmed Benali',
            position: 'CEO',
            company: 'TechVentures',
            quote: 'From day one, they got what we were trying to do—make our brand feel accessible, human, and forward-looking. The rebrand has completely reshaped how we show up in the market.',
            image: '/testimonials/avatar-1.webp',
        },
        {
            id: 2,
            name: 'Sara Mansouri',
            position: 'Marketing Director',
            company: 'GrowthLab',
            quote: 'Working with BidayaLab was transformative. They understood our vision instantly and delivered beyond expectations. Our conversion rates have never been higher.',
            image: '/testimonials/avatar-2.webp',
        },
        {
            id: 3,
            name: 'Youssef El Amrani',
            position: 'Founder',
            company: 'InnovateMa',
            quote: "The team’s attention to detail and creative approach set them apart. They didn’t just build a website—they built a complete digital experience.",
            image: '/testimonials/avatar-3.webp',
        },
    ],
    fr: [
        {
            id: 1,
            name: 'Ahmed Benali',
            position: 'CEO',
            company: 'TechVentures',
            quote: "Dès le premier jour, ils ont compris ce qu’on cherchait — une marque accessible, humaine, tournée vers l’avenir. Le rebrand a totalement transformé notre présence sur le marché.",
            image: '/testimonials/avatar-1.webp',
        },
        {
            id: 2,
            name: 'Sara Mansouri',
            position: 'Directrice Marketing',
            company: 'GrowthLab',
            quote: "Travailler avec BidayaLab a tout changé. Ils ont saisi notre vision tout de suite et ont dépassé nos attentes. Nos taux de conversion n’ont jamais été aussi hauts.",
            image: '/testimonials/avatar-2.webp',
        },
        {
            id: 3,
            name: 'Youssef El Amrani',
            position: 'Fondateur',
            company: 'InnovateMa',
            quote: "L’attention au détail et l’approche créative les distinguent. Ils n’ont pas juste construit un site — ils ont construit une expérience digitale complète.",
            image: '/testimonials/avatar-3.webp',
        },
    ],
} as const;

const STATS_BY_LOCALE = {
    en: [
        { value: '150+', label: 'Brands Transformed' },
        { value: '48h', label: 'Average Turnaround' },
        { value: '98%', label: 'Client Retention Rate' },
    ],
    fr: [
        { value: '150+', label: 'Marques transformées' },
        { value: '48h', label: 'Délai moyen de réponse' },
        { value: '98 %', label: 'Taux de fidélisation' },
    ],
} as const;

export default function Testimonials() {
    const lang = useLocale();
    const featuredTestimonials = TESTIMONIALS_BY_LOCALE[lang];
    const stats = STATS_BY_LOCALE[lang];
    const headerCopy = {
        label: { en: 'Testimonials', fr: 'Témoignages' },
        titleA: { en: "Operators we’ve", fr: "Des opérateurs pour qui on" },
        titleB: { en: 'moved the number for.', fr: 'a fait bouger le chiffre.' },
        description: {
            en: 'Quotes from founders whose conversion, ops or launch metric we agreed to move — and did. Numbers verified from their analytics, not invented for the website.',
            fr: "Citations de fondateurs dont on a accepté de bouger un indicateur — conversion, ops ou ROI de lancement — et qu’on a bougé. Chiffres vérifiés sur leurs analytics, pas inventés pour le site.",
        },
        outroLead: { en: 'Ready to be our next success story?', fr: 'Prêts à être la prochaine réussite ?' },
        outroSpan: { en: "Let’s make it happen.", fr: "On la met en route ensemble." },
        outroCta: { en: 'Get in Touch', fr: 'Nous contacter' },
    } as const;
    const [activeIndex, setActiveIndex] = useState(0);
    const activeTestimonial = featuredTestimonials[activeIndex];

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % featuredTestimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length);
    };

    // Auto-rotate testimonials every 5 seconds with progress tracking
    const [progress, setProgress] = useState(0);
    const INTERVAL_DURATION = 5000;
    const TICK_INTERVAL = 200;
    const activeIndexRef = useRef(activeIndex);

    useEffect(() => {
        activeIndexRef.current = activeIndex;
    }, [activeIndex]);

    useEffect(() => {
        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + (100 / (INTERVAL_DURATION / TICK_INTERVAL));
                if (newProgress >= 100) {
                    setActiveIndex((activeIndexRef.current + 1) % featuredTestimonials.length);
                    return 0;
                }
                return newProgress;
            });
        }, TICK_INTERVAL);

        return () => clearInterval(progressTimer);
    }, []);

    return (
        <section
            id="testimonials-section"
            className="relative bg-transparent border-t border-zinc-900"
            style={{ fontFamily: "'Inter Display', 'Inter', sans-serif" }}
        >
            {/* Section Header */}
            <div className="w-full px-4 md:px-8 pt-20 md:pt-32 pb-10 md:pb-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-block mb-2"
                >
                    <div className="flex items-center gap-3 px-5 py-2.5 bg-[#beff01]">
                        <span className="text-sm font-louis font-bold text-black uppercase tracking-wide">{t(lang, headerCopy.label)}</span>
                        <svg aria-hidden="true" className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </div>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-louis font-bold text-white leading-[1.05] tracking-tight mb-4"
                >
                    {t(lang, headerCopy.titleA)}<br />
                    <span className="text-[#beff01]">{t(lang, headerCopy.titleB)}</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-zinc-400 font-louis max-w-3xl"
                >
                    {t(lang, headerCopy.description)}
                </motion.p>
            </div>

            {/* Main Content */}
            <div className="px-4 md:px-8 pb-20 md:pb-32">

                {/* Featured Testimonial Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12"
                >
                    {/* Left - Photo */}
                    <div className="relative aspect-square max-w-md">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTestimonial.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                                className="relative w-full h-full bg-zinc-800 overflow-hidden"
                            >
                                <Image
                                    src={activeTestimonial.image}
                                    alt={`Photo of ${activeTestimonial.name}, ${activeTestimonial.position} at ${activeTestimonial.company}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 400px"
                                    className="object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = `https://ui-avatars.com/api/?name=${activeTestimonial.name}&size=400&background=1a1a1a&color=beff01`;
                                    }}
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Person Info Below Photo */}
                        <div className="mt-6">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTestimonial.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h4 className="text-xl font-louis font-bold text-white">{activeTestimonial.name}</h4>
                                    <p className="text-zinc-400 font-louis">
                                        {activeTestimonial.position}, <span className="text-[#beff01]">{activeTestimonial.company}</span>
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right - Quote */}
                    <div className="flex flex-col justify-center">
                        <div className="text-6xl text-white font-serif mb-6">"</div>

                        <AnimatePresence mode="wait">
                            <motion.p
                                key={activeTestimonial.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="text-2xl md:text-3xl lg:text-4xl font-louis text-white leading-relaxed mb-8"
                            >
                                {activeTestimonial.quote}
                            </motion.p>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <div className="flex items-center gap-2" role="group" aria-label="Testimonial navigation">
                            <button
                                onClick={prevTestimonial}
                                aria-label="Previous testimonial"
                                className="w-12 h-12 border border-zinc-700 flex items-center justify-center text-white hover:bg-zinc-800 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                            </button>
                            <button
                                onClick={nextTestimonial}
                                aria-label="Next testimonial"
                                className="w-12 h-12 border border-zinc-700 flex items-center justify-center text-white hover:bg-zinc-800 transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Progress Line Indicators */}
                <div className="flex gap-2 mb-4 pt-6" role="tablist" aria-label="Testimonial indicators">
                    {featuredTestimonials.map((t, i) => (
                        <button
                            key={t.id}
                            role="tab"
                            aria-selected={i === activeIndex}
                            aria-label={`Testimonial ${i + 1} of ${featuredTestimonials.length}: ${t.name}`}
                            onClick={() => {
                                setActiveIndex(i);
                                setProgress(0);
                            }}
                            className="flex-1 h-1 bg-zinc-800 overflow-hidden cursor-pointer group"
                        >
                            <div
                                className={`h-full transition-all ease-linear ${i <= activeIndex
                                    ? 'bg-[#beff01]'
                                    : 'bg-zinc-700 w-0 group-hover:w-full group-hover:bg-zinc-600'
                                    }`}
                                style={{
                                    width: i === activeIndex ? `${progress}%` : i < activeIndex ? '100%' : undefined,
                                    transition: i === activeIndex ? 'width 50ms linear' : 'width 300ms ease-out'
                                }}
                            />
                        </button>
                    ))}
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 md:gap-8 py-8 border-b border-zinc-800">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-3xl md:text-5xl font-louis font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-xs md:text-sm text-zinc-400 font-louis">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Clutch verified-reviews widget */}
                <div className="py-8 border-b border-zinc-800 flex justify-center">
                    <Script
                        src="https://widget.clutch.co/static/js/widget.js"
                        strategy="afterInteractive"
                    />
                    <div
                        className="clutch-widget"
                        data-url="https://widget.clutch.co"
                        data-widget-type="4"
                        data-height="auto"
                        data-nofollow="false"
                        data-expandifr="true"
                        data-scale="100"
                        data-reviews=""
                        data-clutchcompany-id="2641022"
                    />
                </div>

                {/* Bottom CTA Row - Same as FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-4"
                >
                    <p className="text-zinc-400 font-louis text-lg md:text-xl text-left">
                        {t(lang, headerCopy.outroLead)}{" "}
                        <span className="text-white">{t(lang, headerCopy.outroSpan)}</span>
                    </p>
                    <a
                        href={localeHref(lang, '/contact')}
                        className="w-full md:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#beff01] text-black font-louis font-bold text-lg transition-all duration-300 hover:bg-white"
                    >
                        {t(lang, headerCopy.outroCta)}
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
