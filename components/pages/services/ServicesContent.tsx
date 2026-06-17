'use client';

import Link from 'next/link';
import { useLocale, t, localeHref } from '@/lib/i18n';

const SERVICES_BY_LOCALE = {
  en: [
    {
      number: '01',
      title: 'AI Automation',
      tagline: 'Outcomes, not chatbots. We sell hours back to your team.',
      description:
        'We deploy n8n, Make and GPT/Claude agents that wipe out 60–80% of repetitive ops in 30 days. Lead capture, CRM sync, support routing, reporting — all measured in hours saved per month and shipped with the SOPs and dashboards to prove it.',
      capabilities: [
        'n8n & Make automation',
        'GPT & Claude agents',
        'CRM sync (HubSpot, Salesforce, Pipedrive)',
        'Lead scoring & nurture',
        'Email · WhatsApp bots',
        'KPI dashboards',
      ],
      results: '−94% manual hours / month, average across last 6 builds.',
      image: '/assets/images/services/ai-automation.webp',
      alt: 'AI automation workflow and chatbot integration for small business',
      priceFrom: 'From 28,000 MAD · 2–4 weeks',
    },
    {
      number: '02',
      title: 'Web Engineering',
      tagline: 'Sites measured on revenue, not deliverables.',
      description:
        'Next.js and Shopify Hydrogen builds engineered for sub-1s LCP, 3%+ conversion and SEO/AEO/GEO ranking. We replace the slow WordPress build that’s costing you customers — and prove the lift in revenue per visitor within 30 days of launch.',
      capabilities: [
        'Next.js & React engineering',
        'Shopify Hydrogen / headless',
        'Conversion funnels',
        'CMS integration',
        'API & integrations',
        'Core Web Vitals · SEO',
      ],
      results: '+218% average conversion lift on Shopify rebuilds.',
      image: '/assets/images/services/web-development.webp',
      alt: 'Custom web development and e-commerce solutions for SMEs',
      priceFrom: 'From 45,000 MAD · 6–10 weeks',
    },
    {
      number: '03',
      title: 'Brand & Motion',
      tagline: 'A brand system that earns its price tag.',
      description:
        'Identity, motion, product film and editorial photo — built so your launch isn’t mistaken for the competitor next to you on the shelf. We work with founders who know the brand is the moat.',
      capabilities: [
        'Brand identity systems',
        'Motion design',
        'Product & lifestyle film',
        'Editorial photography',
        'Launch systems',
        'Social cuts at scale',
      ],
      results: '×3.4 launch-film engagement vs. industry baseline.',
      image: '/assets/images/services/visual-storytelling.webp',
      alt: 'Brand film and photography production for digital marketing',
      priceFrom: 'From 38,000 MAD · 4–6 weeks',
    },
  ],
  fr: [
    {
      number: '01',
      title: 'Automatisation IA',
      tagline: 'Des résultats, pas des chatbots. On rachète des heures à votre équipe.',
      description:
        "On déploie n8n, Make et des agents GPT / Claude qui éliminent 60–80 % des tâches répétitives en 30 jours. Capture de leads, sync CRM, routage support, reporting — tout mesuré en heures économisées par mois, livré avec les procédures et tableaux de bord pour le prouver.",
      capabilities: [
        'Automatisation n8n & Make',
        'Agents GPT & Claude',
        'Sync CRM (HubSpot, Salesforce, Pipedrive)',
        'Scoring & nurturing leads',
        'Bots Email · WhatsApp',
        'Tableaux de bord KPI',
      ],
      results: '−94 % d’heures manuelles / mois, moyenne sur les 6 derniers builds.',
      image: '/assets/images/services/ai-automation.webp',
      alt: 'Automatisation IA et intégration de chatbot pour PME',
      priceFrom: 'À partir de 28 000 MAD · 2–4 semaines',
    },
    {
      number: '02',
      title: 'Ingénierie Web',
      tagline: 'Des sites mesurés sur le revenu, pas sur des livrables.',
      description:
        "Builds Next.js et Shopify Hydrogen, mesurés sur LCP < 1 s, conversion > 3 % et ranking SEO / AEO / GEO. On remplace le WordPress lent qui vous coûte des clients — et on prouve le lift de revenus par visiteur dans les 30 jours après lancement.",
      capabilities: [
        'Ingénierie Next.js & React',
        'Shopify Hydrogen / headless',
        'Tunnels de conversion',
        'Intégration CMS',
        'API & intégrations',
        'Core Web Vitals · SEO',
      ],
      results: '+218 % de lift de conversion moyen sur les refontes Shopify.',
      image: '/assets/images/services/web-development.webp',
      alt: 'Développement web sur-mesure et e-commerce pour PME',
      priceFrom: 'À partir de 45 000 MAD · 6–10 semaines',
    },
    {
      number: '03',
      title: 'Marque & Motion',
      tagline: 'Un système de marque qui justifie son prix.',
      description:
        "Identité, motion, film produit et photo éditoriale — conçu pour que votre lancement ne soit pas confondu avec le concurrent d’à côté. On travaille avec des fondateurs qui savent que la marque est le fossé.",
      capabilities: [
        'Systèmes d’identité de marque',
        'Motion design',
        'Film produit & lifestyle',
        'Photographie éditoriale',
        'Systèmes de lancement',
        'Cuts réseaux sociaux à l’échelle',
      ],
      results: '×3,4 d’engagement sur les films de lancement vs baseline industrie.',
      image: '/assets/images/services/visual-storytelling.webp',
      alt: 'Production de film de marque et photographie pour marketing digital',
      priceFrom: 'À partir de 38 000 MAD · 4–6 semaines',
    },
  ],
} as const;

export default function ServicesContent() {
  const lang = useLocale();
  const services = SERVICES_BY_LOCALE[lang];
  const c = {
    eyebrow: { en: 'What We Do', fr: 'Ce qu’on fait' },
    h1a: { en: 'Outcomes, not', fr: 'Résultats, pas' },
    h1b: { en: 'Deliverables.', fr: 'livrables.' },
    intro: {
      en: 'AI automation, web engineering and brand systems — every engagement ships with a measured outcome attached. Senior-only delivery, capped intake, written guarantee.',
      fr: "Automatisation IA, ingénierie web et systèmes de marque — chaque mission est livrée avec un résultat mesuré attaché. Livraison 100 % senior, prises limitées, garantie écrite.",
    },
    capLabel: { en: 'Capabilities', fr: 'Compétences' },
    priceLabel: { en: 'Pricing', fr: 'Tarification' },
    ctaTitleA: { en: 'Stop guessing.', fr: 'Arrêtez de deviner.' },
    ctaTitleB: { en: 'Get the number.', fr: 'Obtenez le chiffre.' },
    ctaLead: {
      en: 'Free 30-min audit with a senior operator. You leave with a written highest-leverage fix and an honest price tag.',
      fr: "Audit gratuit de 30 min avec un opérateur senior. Vous repartez avec un correctif à plus fort levier écrit et un tarif honnête.",
    },
    ctaCta: { en: 'Book my audit', fr: 'Réserver mon audit' },
  } as const;

  return (
    <main className="relative bg-[#050505] min-h-screen text-white selection:bg-[#beff01] selection:text-black font-louis">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-end pb-20 pt-40 px-4 md:px-12 border-b border-white/5">
        <div className="max-w-7xl w-full mx-auto">
          <span className="block text-xs uppercase tracking-[0.2em] text-[#beff01] font-bold mb-4">
            {t(lang, c.eyebrow)}
          </span>
          <h1 className="text-[10vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase text-white mb-8">
            {t(lang, c.h1a)}<br />
            <span className="text-zinc-600">{t(lang, c.h1b)}</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl border-l-2 border-[#beff01] pl-6">
            {t(lang, c.intro)}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-[1920px] mx-auto px-4 md:px-8 py-20">
        <div className="flex flex-col gap-24 md:gap-32">
          {services.map((service) => (
            <article
              key={service.number}
              id={`service-${service.number}`}
              className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start"
            >
              <div className="relative aspect-[16/10] bg-zinc-900 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={1200}
                  height={750}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              <div className="flex flex-col gap-6">
                <span className="text-[#beff01] text-sm font-bold uppercase tracking-widest">[{service.number}]</span>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white">
                  {service.title}
                </h2>
                <p className="text-xl text-zinc-300 font-light italic">{service.tagline}</p>
                <p className="text-zinc-400 leading-relaxed">{service.description}</p>

                <div className="mt-4">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 block">{t(lang, c.capLabel)}</span>
                  <div className="flex flex-wrap gap-2">
                    {service.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="px-3 py-1.5 border border-zinc-700 text-white text-xs font-medium uppercase tracking-wide"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 p-6 border border-[#beff01]/20 bg-[#beff01]/5">
                  <p className="text-[#beff01] font-bold text-lg">{service.results}</p>
                </div>

                {service.number === '01' && (
                  <Link
                    href={localeHref(lang, '/tools/roi-calculator')}
                    className="inline-flex items-center gap-2 text-[#beff01] text-sm font-bold uppercase tracking-wider hover:text-white transition-colors mt-1"
                  >
                    → {t(lang, { en: 'Calculate your automation ROI', fr: 'Calculez votre ROI d’automatisation' })}
                  </Link>
                )}

                <div className="mt-2">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block">{t(lang, c.priceLabel)}</span>
                  <p className="text-zinc-300 font-medium">{service.priceFrom}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 md:px-12 border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-white">
            {t(lang, c.ctaTitleA)}<br />{t(lang, c.ctaTitleB)}
          </h2>
          <p className="text-zinc-400 text-lg mb-10">{t(lang, c.ctaLead)}</p>
          <Link
            href={localeHref(lang, '/contact')}
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#beff01] text-black font-black uppercase tracking-wider text-lg hover:bg-white transition-colors"
          >
            {t(lang, c.ctaCta)}
          </Link>
        </div>
      </section>
    </main>
  );
}
