'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

// Featured Testimonials Data
const featuredTestimonials = [
    {
        id: 1,
        name: 'Ahmed Benali',
        position: 'CEO',
        company: 'TechVentures',
        quote: 'From day one, they got what we were trying to do—make our brand feel accessible, human, and forward-looking. The rebrand has completely reshaped how we show up in the market.',
        image: '/testimonials/avatar-1.png',
    },
    {
        id: 2,
        name: 'Sara Mansouri',
        position: 'Marketing Director',
        company: 'GrowthLab',
        quote: 'Working with Bidayalab was transformative. They understood our vision instantly and delivered beyond expectations. Our conversion rates have never been higher.',
        image: '/testimonials/avatar-2.png',
    },
    {
        id: 3,
        name: 'Youssef El Amrani',
        position: 'Founder',
        company: 'InnovateMa',
        quote: 'The team\'s attention to detail and creative approach set them apart. They didn\'t just build a website—they built a complete digital experience.',
        image: '/testimonials/avatar-3.png',
    },
];

// Stats Data
const stats = [
    { value: '$2.4M', label: 'Revenue generated for clients', company: 'TechVentures' },
    { value: '4.8x', label: 'Average engagement increase', company: 'GrowthLab' },
    { value: '97%', label: 'Client satisfaction rate', company: 'InnovateMa' },
];

// Testimonial Cards Data
const testimonialCards = [
    {
        id: 1,
        company: 'Nexus Digital',
        icon: '◆',
        quote: 'Our product was always strong under the hood, but we struggled to express that clearly. Now, the platform feels sharp, modern, and incredibly intuitive—it\'s made onboarding so much smoother.',
        stats: [
            { value: '60%', label: 'Training time reduction' },
            { value: '$2.3M', label: 'Annual efficiency savings' },
        ],
        person: {
            name: 'Karim Tazi',
            position: 'COO',
            company: 'Nexus Digital',
            image: '/testimonials/person-1.png',
        },
    },
    {
        id: 2,
        company: 'Velocity',
        icon: '◎',
        quote: 'We knew our tech was solid, but the brand didn\'t reflect that. After the redesign, everything just clicked—sales calls got easier, and people finally \'got\' what we do.',
        stats: [
            { value: '500x', label: 'Social reach gained' },
            { value: '95%', label: 'Lead approval rate' },
        ],
        person: {
            name: 'Laila Bennani',
            position: 'CEO',
            company: 'Velocity',
            image: '/testimonials/person-2.png',
        },
    },
    {
        id: 3,
        company: 'Zenith Labs',
        icon: '✦',
        quote: 'We came in with a fuzzy idea and left with a brand that feels completely aligned with our mission. The team really understood our product and turned that into something emotionally resonant.',
        stats: [
            { value: '4.6x', label: 'Conversion frequency' },
            { value: '0.8 sec', label: 'Avg response time' },
        ],
        person: {
            name: 'Omar Alaoui',
            position: 'VP of Product',
            company: 'Zenith Labs',
            image: '/testimonials/person-3.png',
        },
    },
];

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeTestimonial = featuredTestimonials[activeIndex];

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % featuredTestimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length);
    };

    // Auto-rotate testimonials every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % featuredTestimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id="testimonials-section"
            className="relative bg-[#000000] border-t border-zinc-900"
            style={{ fontFamily: "'Inter Display', 'Inter', sans-serif" }}
        >
            {/* Section Header - Same design as Services/Process/Works */}
            <div className="w-full px-4 md:px-8 pt-20 md:pt-32 pb-10 md:pb-16">
                {/* Creative Modern Label */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-block mb-2"
                >
                    <div className="flex items-center gap-3 px-5 py-2.5 bg-[#beff01]">
                        <span className="text-sm font-louis font-bold text-black uppercase tracking-wide">Testimonials</span>
                        <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-survalia text-white leading-[1.05] tracking-tight mb-4"
                >
                    What Clients<br />
                    <span className="text-[#beff01]">Say About Us.</span>
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-zinc-400 font-louis max-w-3xl"
                >
                    Real results from real partnerships. See how we've helped ambitious brands scale faster and look better doing it.
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
                                    alt={activeTestimonial.name}
                                    fill
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
                        {/* Quote Mark */}
                        <div className="text-6xl text-white font-serif mb-6">"</div>

                        {/* Quote Text */}
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
                        <div className="flex items-center gap-2">
                            <button
                                onClick={prevTestimonial}
                                className="w-12 h-12 border border-zinc-700 flex items-center justify-center text-white hover:bg-zinc-800 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextTestimonial}
                                className="w-12 h-12 border border-zinc-700 flex items-center justify-center text-white hover:bg-zinc-800 transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Company Tabs */}
                <div className="flex flex-wrap gap-8 md:gap-16 mb-6 border-t border-zinc-800 pt-6">
                    {featuredTestimonials.map((t, i) => (
                        <button
                            key={t.id}
                            onClick={() => setActiveIndex(i)}
                            className={`flex items-center gap-2 text-sm font-louis font-medium uppercase tracking-wider transition-colors ${i === activeIndex ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
                                }`}
                        >
                            <span className="text-lg">✦</span>
                            {t.company}
                        </button>
                    ))}
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 py-8 border-t border-b border-zinc-800">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="text-center md:text-left"
                        >
                            <div className="flex items-center gap-2 text-zinc-500 text-sm font-louis mb-2">
                                <span>✦</span>
                                {stat.company}
                            </div>
                            <div className="text-4xl md:text-5xl font-louis font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-zinc-400 font-louis">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Testimonial Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonialCards.map((card, i) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="bg-zinc-900/50 border border-zinc-800 p-6 md:p-8 flex flex-col"
                        >
                            {/* Company Header */}
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-white text-lg">{card.icon}</span>
                                <span className="text-white font-louis font-medium">{card.company}</span>
                            </div>

                            {/* Quote */}
                            <div className="flex-1">
                                <span className="text-2xl text-zinc-600 font-serif">"</span>
                                <p className="text-white font-louis leading-relaxed mb-6">
                                    {card.quote}
                                </p>
                            </div>


                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-6 pt-6 border-t border-zinc-800">
                                {card.stats.map((stat, j) => (
                                    <div key={j}>
                                        <div className="text-2xl md:text-3xl font-louis font-bold text-white">{stat.value}</div>
                                        <div className="text-xs text-zinc-500 font-louis">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Person */}
                            <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-800">
                                    <Image
                                        src={card.person.image}
                                        alt={card.person.name}
                                        fill
                                        className="object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = `https://ui-avatars.com/api/?name=${card.person.name}&size=40&background=1a1a1a&color=beff01`;
                                        }}
                                    />
                                </div>
                                <div>
                                    <div className="text-white font-louis font-medium text-sm">{card.person.name}</div>
                                    <div className="text-zinc-500 font-louis text-xs">
                                        {card.person.position}, <span className="text-white">{card.person.company}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
