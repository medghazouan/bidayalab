'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Zap, ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useLocale, t, localeHref } from '@/lib/i18n';

interface Project {
  id: string;
  _id?: string;
  title: string;
  category: string;
  thumbnail: string;
  slug: string;
  clientName?: string; // Updated to match API
  year?: string;
  createdAt?: string;
  description?: string;
}

const getCategoryDisplay = (category: string) => {
  const categoryMap: Record<string, string> = {
    'creative-studio': 'Branding',
    'digital-development': 'Development',
    'web_development': 'Web Development', // Added mapping 
    'digital-marketing': 'Marketing',
    'visual_storytelling': 'Visual Storytelling', // Updated key to match DB (visual_storytelling)
    'ai_automation': 'AI & Automation', // Updated key to match DB (ai_automation)
  };
  return categoryMap[category] || category.replace(/_/g, ' '); // Fallback: replace underscores with spaces
};

const getYearFromDate = (dateString?: string) => {
  if (!dateString) return new Date().getFullYear().toString();
  return new Date(dateString).getFullYear().toString();
};

// Custom Project Card matching the screenshot design
function WorkCard({ project, index, lang }: { project: Project; index: number; lang: 'en' | 'fr' }) {
  const getAssetUrl = (path: string) => {
    if (!path) return null;
    if (path.startsWith("/") || path.startsWith("http")) return path;
    return `/uploads/projects/${path}`;
  };

  const assetUrl = getAssetUrl(project.thumbnail);
  const clientName = project.clientName || project.title;
  const year = project.year || getYearFromDate(project.createdAt);
  const description = project.description || '';

  return (
    <Link href={localeHref(lang, `/works/${project.slug}`)} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.6,
          delay: index * 0.15,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="group relative w-full h-full min-h-[380px] md:min-h-[450px] overflow-hidden bg-zinc-900 cursor-pointer"
      >
        {/* Project Image with creative parallax + rotation effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 transition-all duration-[1.2s] ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.15] group-hover:rotate-[2deg]">
            {assetUrl ? (
              <Image
                src={assetUrl}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                <span className="text-zinc-600 font-bold text-2xl uppercase">{clientName}</span>
              </div>
            )}
          </div>

          {/* Dark overlay - cinematic vignette effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 group-hover:from-black/90 group-hover:via-black/50 group-hover:to-black/40 transition-all duration-700" />

          {/* Strong Noise/Grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.35] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Category Badge - Top Left (always visible) */}
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-block bg-white text-black text-xs font-louis font-medium uppercase tracking-wider px-3 py-1.5">
            {getCategoryDisplay(project.category)}
          </span>
        </div>

        {/* Year - Top Right */}
        <div className="absolute top-4 right-4 z-20">
          <span className="text-white/70 text-sm font-louis font-medium">
            /{year}
          </span>
        </div>

        {/* Client Name - Centered (Visible by default, Hides on Hover) */}
        <div className="absolute inset-0 flex items-center justify-center z-10 overflow-hidden pointer-events-none">
          {/* Main client name - fades out and scales down on hover */}
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-louis font-black text-white tracking-tight text-center px-6 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:opacity-0 group-hover:scale-90 group-hover:blur-sm">
            {clientName}
          </h3>
        </div>

        {/* Bottom Content - Project Title moves up on hover, Description slides in */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8">
          {/* Project Title - Moves up on hover with creative motion */}
          <h4
            className="text-xl md:text-2xl font-louis font-bold text-white mb-2 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-y-[-8px] group-hover:scale-[1.02]"
          >
            {project.title}
          </h4>

          {/* Separator Line - expands from left on hover */}
          <div
            className="h-[2px] bg-[#beff01] mb-3 w-12 group-hover:w-20 transition-all duration-500 ease-out origin-left"
          />

          {/* Description - slides up and fades in with blur effect on hover */}
          {description && (
            <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500">
              <p
                className="text-zinc-300 text-sm md:text-base font-louis leading-relaxed line-clamp-2 translate-y-[20px] opacity-0 blur-[4px] group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-0 transition-all duration-700 delay-150 ease-[cubic-bezier(0.33,1,0.68,1)]"
              >
                {description}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}



// Stats Card Component with count-up animation
function StatsCard({ lang }: { lang: 'en' | 'fr' }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const targetCount = 27;

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = targetCount / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= targetCount) {
          setCount(targetCount);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: 0.45,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="relative w-full h-full min-h-[380px] md:min-h-[450px] bg-transparent flex flex-col justify-between p-8"
    >
      {/* Stats Content */}
      <div className="flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <span className="text-7xl md:text-8xl lg:text-9xl font-louis font-bold text-white leading-none">
            {count}<sup className="text-4xl md:text-5xl align-top text-[#beff01]">+</sup>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-lg md:text-xl text-zinc-400 font-louis mt-4"
        >
          <span className="font-semibold text-white">{lang === 'fr' ? 'projets livrés' : 'projects delivered'}</span><br />
          {lang === 'fr' ? "avec exigence dans " : 'with excellence across '}
          <span className="font-semibold text-white">{lang === 'fr' ? 'plusieurs secteurs.' : 'multiple industries.'}</span>
        </motion.p>
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Link
          href={localeHref(lang, '/works')}
          className="group inline-flex items-center justify-center gap-2 w-full bg-[#beff01] text-black font-louis font-bold text-base py-4 px-6 transition-all duration-300 hover:bg-white"
        >
          {lang === 'fr' ? 'Tout voir' : 'View all'}
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function Works() {
  const lang = useLocale();
  const headerCopy = {
    label: { en: 'Works', fr: 'Réalisations' },
    titleA: { en: 'The numbers', fr: 'Les chiffres' },
    titleB: { en: "we’ve shipped.", fr: "qu’on a livrés." },
    description: {
      en: "Each case below ships with a metric attached — conversion lift, ops automated, launch ROI — pulled from the client’s own analytics, not invented for the portfolio.",
      fr: "Chaque cas ci-dessous est livré avec un indicateur — lift de conversion, opérations automatisées, ROI de lancement — issu des analytics du client, pas inventé pour le portfolio.",
    },
    emptyTitle: { en: 'Currently Cooking Up Some Amazing Projects', fr: 'Nouveaux projets en cours de préparation' },
    emptyBody: {
      en: "We’re working on some exciting new work right now. But here’s the thing—",
      fr: "On est en train de finaliser plusieurs projets. Mais voici l’idée—",
    },
    emptyHighlight: {
      en: 'your project could be the next showcase piece',
      fr: 'votre projet pourrait être le prochain cas vitrine',
    },
    emptyCta: { en: "Let’s Create Your Success Story", fr: "Démarrons votre histoire à succès" },
    emptyOutro: { en: ". Let’s make something incredible together.", fr: ". Construisons quelque chose d’incroyable ensemble." },
  } as const;
  const { data, isLoading } = useQuery<{ success: boolean; projects: Project[] }>({
    queryKey: ['projects', 'featured'],
    queryFn: async () => {
      const response = await fetch('/api/projects?limit=3&featured=diverse');
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const projects = data?.projects?.slice(0, 3) || [];
  const loading = isLoading;

  return (
    <section
      id="works-section"
      className="relative bg-transparent border-t border-zinc-900"
      style={{ fontFamily: "'Inter Display', 'Inter', sans-serif" }}
    >
      {/* Section Header - Same design as Services/Process */}
      <div className="w-full px-4 md:px-8 pt-20 md:pt-32 pb-10 md:pb-16">
        {/* Creative Modern Label */}
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

        {/* Big Title */}
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

        {/* Description */}
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

      {/* Projects 2x2 Grid */}
      <div className="px-4 md:px-8 pb-20 md:pb-32">
        {loading ? (
          <div className="flex items-center justify-center py-20" role="status" aria-label="Loading projects">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#beff01] border-t-transparent"></div>
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50"
          >
            <Zap className="w-16 h-16 text-[#beff01] mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">
              {t(lang, headerCopy.emptyTitle)}
            </h3>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              {t(lang, headerCopy.emptyBody)}
              <span className="text-white font-semibold"> {t(lang, headerCopy.emptyHighlight)}</span>{t(lang, headerCopy.emptyOutro)}
            </p>
            <Link
              href={localeHref(lang, '/contact')}
              className="inline-flex items-center gap-3 bg-[#beff01] text-black font-bold px-10 py-5 hover:bg-[#a8e600] transition-all"
            >
              <span>{t(lang, headerCopy.emptyCta)}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Row 1: 2 Projects */}
            {projects[0] && <WorkCard project={projects[0]} index={0} lang={lang} />}
            {projects[1] && <WorkCard project={projects[1]} index={1} lang={lang} />}

            {/* Row 2: 1 Project + Stats Card */}
            {projects[2] && <WorkCard project={projects[2]} index={2} lang={lang} />}
            <StatsCard lang={lang} />
          </div>
        )}
      </div>
    </section>
  );
}
