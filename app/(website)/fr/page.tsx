import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Agence digitale à Marrakech | BidayaLab',
  description:
    "Agence senior à Marrakech : automatisation IA (n8n + GPT/Claude), ingénierie web Next.js / Shopify Hydrogen, brand & motion. Audit gratuit de 30 minutes.",
  alternates: {
    canonical: 'https://www.bidayalab.com/fr',
    languages: {
      en: 'https://www.bidayalab.com/',
      fr: 'https://www.bidayalab.com/fr',
    },
  },
  openGraph: {
    title: 'BidayaLab — Agence digitale à Marrakech',
    description:
      'Outcomes, pas livrables. Audit gratuit de 30 min, devis chiffré sous 48 h, garantie mesuré-ou-refait.',
    url: 'https://www.bidayalab.com/fr',
    locale: 'fr_FR',
    type: 'website',
  },
};

/**
 * FR landing page — coming-soon style with the agency value proposition,
 * proof grid, and contact CTAs translated. The full FR mirror of the rest
 * of the site (services, works, blogs, about, contact) ships in a follow-up
 * once content is reviewed.
 */
export default function FrenchHomePage() {
  return (
    <main
      id="main-content"
      className="relative min-h-screen bg-[#050505] text-zinc-300 selection:bg-[#beff01] selection:text-black overflow-hidden"
    >
      {/* Aurora glow */}
      <div
        aria-hidden
        className="absolute -top-1/3 -right-1/4 w-[60vw] h-[60vw] rounded-full opacity-[0.18] blur-[120px] pointer-events-none"
        style={{ background: '#beff01' }}
      />
      <div
        aria-hidden
        className="absolute -bottom-1/3 -left-1/4 w-[60vw] h-[60vw] rounded-full opacity-[0.10] blur-[120px] pointer-events-none"
        style={{ background: '#ffffff' }}
      />
      {/* Dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.10] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <section className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pt-40 md:pt-48 pb-24">
        {/* Eyebrow */}
        <div className="mb-10 flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-[#beff01]">
            FR // 01
          </span>
          <span className="h-px w-12 bg-white/30" />
          <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-white/60">
            Marrakech
          </span>
        </div>

        {/* Heading */}
        <h1
          className="font-louis font-black uppercase tracking-tighter text-white leading-[0.85] max-w-5xl"
          style={{ fontSize: 'clamp(2.6rem, 7vw, 5.8rem)' }}
        >
          On construit des produits numériques{' '}
          <span className="text-[#beff01]">qui rapportent.</span>
        </h1>

        {/* Lede */}
        <p className="mt-8 text-zinc-300 text-lg md:text-xl leading-relaxed max-w-2xl font-sans">
          Outcomes, pas livrables. Une agence senior basée à Marrakech qui
          automatise les opérations de PME marocaines avec l&apos;IA, livre des
          sites Next.js mesurés sur le chiffre d&apos;affaires, et signe des
          identités de marque qui convertissent. Audit gratuit de 30 minutes,
          devis chiffré sous 48 h, garantie&nbsp;: mesuré ou refait.
        </p>

        {/* Proof grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 max-w-3xl">
          {[
            { value: '+218%', label: 'Lift conversion moyen' },
            { value: '−94%', label: 'Heures manuelles / mois' },
            { value: '< 24h', label: 'Réponse garantie' },
            { value: '3', label: 'Slots ce trimestre' },
          ].map((p) => (
            <div
              key={p.label}
              className="bg-[#050505] p-5 md:p-6 flex flex-col gap-2"
            >
              <div className="font-louis font-black text-[#beff01] text-3xl md:text-4xl tracking-tight leading-none">
                {p.value}
              </div>
              <div className="text-zinc-400 text-xs uppercase tracking-wider font-mono">
                {p.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="mailto:hello@bidayalab.com?subject=Audit%2030%20minutes%20%E2%80%94%20BidayaLab"
            className="inline-flex items-center gap-3 bg-[#beff01] text-black font-louis font-bold uppercase tracking-wide text-sm md:text-base px-6 md:px-8 py-3 md:py-4 hover:bg-white transition-colors"
          >
            Réserver l&apos;audit gratuit
            <span aria-hidden>→</span>
          </a>
          <Link
            href="/fr/blogs"
            className="inline-flex items-center gap-3 border border-white/20 text-white font-louis font-bold uppercase tracking-wide text-sm md:text-base px-6 md:px-8 py-3 md:py-4 hover:bg-white/5 transition-colors"
          >
            Lire le blog
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white font-mono text-[11px] tracking-[0.18em] uppercase transition-colors"
          >
            Voir la version anglaise
          </Link>
        </div>

        {/* Reassurance */}
        <div className="mt-20 grid md:grid-cols-3 gap-4 max-w-4xl">
          {[
            {
              k: 'Audit gratuit, 30 min',
              v: "On regarde vos données live (CrUX, GA, CRM) et on rend une liste de priorités écrite.",
            },
            {
              k: 'Devis chiffré sous 48 h',
              v: 'Périmètre, livrables, calendrier, objectif chiffré : tout par écrit.',
            },
            {
              k: 'Mesuré ou refait',
              v: "Si l'objectif n'est pas atteint au jalon convenu, on refait sans frais.",
            },
          ].map((x) => (
            <div
              key={x.k}
              className="border border-white/10 bg-zinc-950/40 p-5"
            >
              <div className="font-louis font-bold text-white text-base uppercase tracking-tight mb-2">
                {x.k}
              </div>
              <div className="text-zinc-400 text-sm leading-relaxed">{x.v}</div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="mt-16 text-zinc-500 text-xs font-mono tracking-[0.18em] uppercase max-w-2xl">
          Version française du site en cours d&apos;extension —{' '}
          <Link
            href="/fr/blogs"
            className="text-[#beff01] hover:underline"
          >
            le blog FR est déjà en ligne
          </Link>
          . Pour démarrer une mission, écrivez-nous à{' '}
          <a
            href="mailto:hello@bidayalab.com"
            className="text-white hover:text-[#beff01]"
          >
            hello@bidayalab.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
