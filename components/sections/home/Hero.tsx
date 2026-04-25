'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useLocale, t, localeHref } from '@/lib/i18n';

// Defer Spline loading until after page is interactive
const Spline = dynamic(
    () => import('@splinetool/react-spline').then((mod) => mod.default),
    {
        ssr: false,
        loading: () => null
    }
);

export default function Hero() {
    const [showSpline, setShowSpline] = useState(false);
    const lang = useLocale();

    const copy = {
        eyebrow: { en: 'Outcomes, not deliverables · Marrakech', fr: 'Résultats, pas livrables · Marrakech' },
        h1a: { en: 'We don’t sell', fr: 'On ne vend pas' },
        h1b: { en: 'websites.', fr: 'des sites.' },
        h1c: { en: 'We sell measurable growth.', fr: 'On vend de la croissance mesurée.' },
        sub: {
            en: 'AI automation, web engineering and brand systems built by senior operators. Every project ships with a measured outcome attached — or we rebuild it on us.',
            fr: 'Automatisation IA, ingénierie web et systèmes de marque livrés par des opérateurs seniors. Chaque projet est livré avec un résultat mesuré — ou on le refait sans frais.',
        },
        primaryEyebrow: { en: '30-min call · 0 MAD · No deck, no pitch', fr: 'Appel 30 min · 0 MAD · Sans deck, sans pitch' },
        primaryCta: { en: 'Get my growth audit', fr: 'Réserver mon audit gratuit' },
        secondaryEyebrow: { en: 'See the numbers we’ve shipped', fr: 'Voir les chiffres que l’on a livrés' },
        secondaryCta: { en: 'View case studies', fr: 'Voir les études de cas' },
        scarcity1: { en: '3 active projects this quarter', fr: '3 projets actifs ce trimestre' },
        scarcity2: { en: 'Replies in < 24h', fr: 'Réponse en < 24h' },
        scarcity3: { en: 'Measured-or-reworked guarantee', fr: 'Garantie mesuré ou refait' },
    } as const;

    // Defer Spline loading by 1.5s to let the page become interactive first
    useEffect(() => {
        const timer = setTimeout(() => setShowSpline(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    const scrollToWorks = () => {
        const worksSection = document.getElementById('works-section');
        if (worksSection) {
            worksSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative w-full min-h-[100dvh] bg-black text-white flex items-end overflow-hidden">

            {/* Robot - only loaded after page is interactive */}
            {showSpline && (
                <div className="absolute inset-y-0 right-0 w-full lg:w-[65%] z-0 scale-110 origin-right hero-fade-in">
                    <Spline scene="https://prod.spline.design/1cGkc8CVxlalgcaC/scene.splinecode" />
                </div>
            )}

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[1]" />

            {/* Content: Bottom Left */}
            <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 md:px-12 pb-12 md:pb-24 pt-32">

                <div className="max-w-full lg:max-w-4xl hero-slide-up">
                    {/* Title Part 1 — Marketing angle */}
                    <span className="block text-xs md:text-base uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#beff01] font-louis mb-3 md:mb-4">
                        {t(lang, copy.eyebrow)}
                    </span>

                    {/* Title Part 2 — Outcome-first */}
                    <h1 className="font-louis font-bold text-[10vw] sm:text-[9vw] md:text-[8vw] leading-[0.95] tracking-tighter text-white uppercase">
                        {t(lang, copy.h1a)}<br />
                        <span className="inline">{t(lang, copy.h1b)}</span><br />
                        <span className="inline text-zinc-500">{t(lang, copy.h1c)}</span>
                    </h1>

                    {/* Sub-lead — PAS framing + risk reversal */}
                    <p className="mt-6 md:mt-8 max-w-2xl text-base md:text-lg lg:text-xl text-zinc-300 font-louis leading-relaxed">
                        {t(lang, copy.sub)}
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-8 md:mt-12 hero-slide-up-delayed">
                    {/* Primary CTA — Free audit hook (reciprocity + low friction) */}
                    <div className="flex flex-col items-start">
                        <span className="text-xs md:text-sm text-zinc-400 mb-2 font-louis tracking-wide">{t(lang, copy.primaryEyebrow)}</span>
                        <Link
                            href={localeHref(lang, '/contact')}
                            className="group px-6 md:px-10 py-4 md:py-5 bg-[#beff01] text-black text-base md:text-lg font-bold font-louis uppercase tracking-wider transition-all flex items-center justify-center gap-2 md:gap-3"
                        >
                            <span>{t(lang, copy.primaryCta)}</span>
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                    </div>

                    {/* Secondary CTA — Social proof anchor */}
                    <div className="flex flex-col items-start">
                        <span className="text-xs md:text-sm text-zinc-400 mb-2 font-louis tracking-wide">{t(lang, copy.secondaryEyebrow)}</span>
                        <button
                            onClick={scrollToWorks}
                            className="px-6 md:px-10 py-4 md:py-5 bg-white/10 backdrop-blur-sm text-white text-base md:text-lg font-bold font-louis uppercase tracking-wider hover:bg-white hover:text-black transition-all text-center cursor-pointer"
                        >
                            {t(lang, copy.secondaryCta)}
                        </button>
                    </div>
                </div>

                {/* Scarcity → honest, conversion-aligned */}
                <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm text-zinc-400 font-louis tracking-wide hero-slide-up-delayed">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#beff01] animate-pulse" /> {t(lang, copy.scarcity1)}</span>
                    <span className="hidden md:inline text-zinc-700">|</span>
                    <span>{t(lang, copy.scarcity2)}</span>
                    <span className="hidden md:inline text-zinc-700">|</span>
                    <span>{t(lang, copy.scarcity3)}</span>
                </div>

            </div>
        </section>
    );
}
