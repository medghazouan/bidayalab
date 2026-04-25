import type { SeedBlog } from './types';

const COMMON = {
  category: 'digital-marketing' as const,
  publicationDate: '2026-02-09T09:00:00.000Z',
  authorName: 'Mohamed El Kechchad',
  readingTime: 7,
  image:
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
};

export const post05_en: SeedBlog = {
  ...COMMON,
  lang: 'en',
  slug: 'website-cost-morocco-2026-honest-pricing',
  alternateSlug: 'cout-site-web-maroc-2026-prix-honnetes',
  title: 'How much does a professional website actually cost in Morocco in 2026?',
  excerpt:
    'A senior agency\'s honest 2026 pricing breakdown for Moroccan businesses. Real budgets from 8,000 MAD (template) to 220,000 MAD (custom multilingual e-commerce). What you should pay, and what you\'re paying for.',
  text: `
<p><strong>TL;DR — A serious professional website in Morocco in 2026 costs between 25,000 MAD (a custom-designed brochure built on a fast headless stack) and 220,000+ MAD (a multilingual headless e-commerce build).</strong> Below 8,000 MAD, you are buying a template flip — which is fine for a side project, not for a business. Above 80,000 MAD, you should be getting custom design, custom code, and a measured-result commitment.</p>

<h2>What are the real website pricing tiers in Morocco?</h2>

<table>
<thead><tr><th>Tier</th><th>Price (MAD)</th><th>What you get</th><th>Right for…</th></tr></thead>
<tbody>
<tr><td>Template flip</td><td>4,000 – 8,000</td><td>Pre-built theme, 5 pages, no SEO work, no integrations</td><td>Hobby projects, side hustles</td></tr>
<tr><td>WordPress + page builder</td><td>10,000 – 25,000</td><td>Custom-ish theme, 10–20 pages, basic SEO, contact form</td><td>Local services, single-location SMEs</td></tr>
<tr><td>Custom design + Next.js or Webflow</td><td>25,000 – 70,000</td><td>Custom design, performance-grade build, technical SEO, JSON-LD</td><td>Serious SMEs, B2B, professional services</td></tr>
<tr><td>Custom build + integrations</td><td>70,000 – 140,000</td><td>Custom design + custom backend logic + CRM/ERP integrations + multilingual</td><td>Mid-market companies, scale-ups</td></tr>
<tr><td>Headless e-commerce</td><td>110,000 – 220,000+</td><td>Shopify Hydrogen / Next.js + headless CMS + commerce logic</td><td>DTC brands &gt;2M MAD/year</td></tr>
</tbody>
</table>

<h2>Why is there such a wide range?</h2>

<p>Five drivers explain almost all the variance:</p>

<p><strong>(1) Design.</strong> A pre-built theme costs nothing. Custom design costs 20,000–60,000 MAD because a senior designer spends 60–120 hours making it bespoke to your brand. Most of the time, the design <em>is</em> the product.</p>

<p><strong>(2) Number of locales.</strong> A French-only site is 1×. Adding English doubles content engineering time. Adding Arabic (RTL) adds another ~40% on top because every layout has to be tested in both directions.</p>

<p><strong>(3) Integrations.</strong> A static contact form is free. CRM sync, payment, n8n workflow triggers, real-time calendar booking, multi-step quote builders — each one is real engineering work.</p>

<p><strong>(4) CMS expectations.</strong> "Editable by my team" can mean a lot of things. Section-by-section editing in a headless CMS is more work than fixed page templates, but pays off for years.</p>

<p><strong>(5) Performance and SEO commitment.</strong> An agency that commits in writing to LCP &lt; 1s and Lighthouse Mobile &gt; 95 spends 30–50 extra hours per project on optimization. Most agencies don't, which is why most Moroccan business websites still load in 3+ seconds.</p>

<h2>What should I pay if I'm an SME in Marrakech, Casablanca or Rabat?</h2>

<p>Honest recommendation, by company size:</p>

<ul>
<li><strong>Solo / freelancer / single-location service business:</strong> 15,000–35,000 MAD on a custom-designed Next.js or Webflow build. Anything below 12,000 MAD is a template flip and you'll outgrow it in 18 months.</li>
<li><strong>SME, 5–25 employees, single locale:</strong> 35,000–75,000 MAD. Custom design, technical SEO, JSON-LD, contact + lead capture, headless CMS for blog.</li>
<li><strong>SME, 5–25 employees, multilingual (FR/AR/EN):</strong> 60,000–110,000 MAD. Add hreflang, locale switcher, translation workflow.</li>
<li><strong>Mid-market, 25–150 employees, custom flows:</strong> 110,000–180,000 MAD. CRM integration, custom calculators, gated content, multi-step funnels.</li>
<li><strong>DTC e-commerce brand, &gt;2M MAD/year revenue:</strong> 110,000–220,000+ MAD on Shopify Hydrogen or Next.js Commerce.</li>
</ul>

<h2>Why are some Moroccan agencies charging 4× more than others?</h2>

<p>Two legitimate reasons and one not-legitimate reason:</p>

<p><strong>Legitimate.</strong> (1) Senior-only delivery — the person on the call is the person on the build, with 5+ years of experience. (2) Performance and SEO commitments in writing — measured-or-reworked guarantees, LCP commitments, organic traffic parity at day 30.</p>

<p><strong>Not legitimate.</strong> Brand markup. If an agency is 4× pricier than a comparable shop and the only differentiator is fancy office space and a polished sales deck, you are paying for the office space.</p>

<h2>What we charge at BidayaLab</h2>

<p>Our starting prices in 2026:</p>

<ul>
<li>AI Automation: <strong>from 28,000 MAD</strong></li>
<li>Web Engineering: <strong>from 45,000 MAD</strong></li>
<li>Brand & Motion: <strong>from 38,000 MAD</strong></li>
</ul>

<p>We publish them up front because you should know the order of magnitude before you ever talk to us. Final scope is fixed in writing after a free 30-minute audit. Every project ships with a measured outcome attached. <a href="/contact">Book the audit.</a></p>
`,
  faq: [
    {
      q: 'Why do some agencies refuse to give a price before a discovery call?',
      a: 'Two reasons. One legitimate: scope genuinely varies, and they want to understand the project before quoting. One less legitimate: anchor-pricing — they want to read your budget before quoting. We publish starting prices to remove the second.',
    },
    {
      q: 'Does Webflow work for a serious Moroccan business website?',
      a: 'Yes, for brochure-style sites and marketing sites under ~30 pages with simple integrations. For e-commerce, complex backend logic, or AI-driven features, Webflow hits its limits and Next.js is the better choice.',
    },
    {
      q: 'How much does monthly hosting and maintenance cost?',
      a: 'For a Next.js site on Vercel + a headless CMS: 0–400 MAD/month for most SMEs. For a WordPress site: 200–800 MAD/month for managed hosting + plugin licenses + security tooling. For Shopify Hydrogen: Shopify subscription (around 360 MAD/month) + 0–200 MAD for Vercel/Oxygen.',
    },
    {
      q: 'Should I pay 50% upfront?',
      a: '40–50% upfront is industry-standard in Morocco for agency work. We split: 40% on signature, 30% at design approval, 30% at launch. If an agency wants 100% upfront, walk away.',
    },
    {
      q: 'How long should a website project take?',
      a: 'Brochure sites: 4–8 weeks. Mid-market with integrations: 8–14 weeks. Headless e-commerce: 10–16 weeks. Anything advertised at 7 days is a template flip with your logo on it.',
    },
  ],
};

export const post05_fr: SeedBlog = {
  ...COMMON,
  lang: 'fr',
  slug: 'cout-site-web-maroc-2026-prix-honnetes',
  alternateSlug: 'website-cost-morocco-2026-honest-pricing',
  title: 'Combien coûte vraiment un site web professionnel au Maroc en 2026 ?',
  excerpt:
    'La grille de prix honnête d\'une agence senior pour les entreprises marocaines en 2026. Budgets réels de 8 000 MAD (template) à 220 000 MAD (e-commerce headless multilingue). Ce que vous devriez payer, et pour quoi.',
  text: `
<p><strong>TL;DR — Un vrai site web professionnel au Maroc en 2026 coûte entre 25 000 MAD (vitrine au design custom sur stack headless rapide) et 220 000+ MAD (e-commerce headless multilingue).</strong> En-dessous de 8 000 MAD, vous achetez un template retourné — acceptable pour un projet perso, pas pour une entreprise. Au-dessus de 80 000 MAD, vous devriez avoir du design custom, du code custom, et un engagement résultat mesuré.</p>

<h2>Quels sont les vrais paliers de prix au Maroc ?</h2>

<table>
<thead><tr><th>Palier</th><th>Prix (MAD)</th><th>Ce que vous obtenez</th><th>Adapté à…</th></tr></thead>
<tbody>
<tr><td>Template flip</td><td>4 000 – 8 000</td><td>Theme pré-fait, 5 pages, aucun travail SEO, aucune intégration</td><td>Projets persos, side hustles</td></tr>
<tr><td>WordPress + page builder</td><td>10 000 – 25 000</td><td>Theme semi-custom, 10–20 pages, SEO basique, formulaire contact</td><td>Services locaux, PME mono-site</td></tr>
<tr><td>Design custom + Next.js ou Webflow</td><td>25 000 – 70 000</td><td>Design sur mesure, build de qualité performance, SEO technique, JSON-LD</td><td>PME sérieuses, B2B, services pros</td></tr>
<tr><td>Build custom + intégrations</td><td>70 000 – 140 000</td><td>Design custom + logique backend custom + intégrations CRM/ERP + multilingue</td><td>Mid-market, scale-ups</td></tr>
<tr><td>E-commerce headless</td><td>110 000 – 220 000+</td><td>Shopify Hydrogen / Next.js + CMS headless + logique commerce</td><td>Marques DTC &gt;2M MAD/an</td></tr>
</tbody>
</table>

<h2>Pourquoi un écart aussi large ?</h2>

<p>Cinq facteurs expliquent quasiment toute la variance :</p>

<p><strong>(1) Le design.</strong> Un theme pré-fait coûte zéro. Un design custom coûte 20 000–60 000 MAD parce qu'un designer senior y passe 60 à 120 heures pour le rendre unique à votre marque. La plupart du temps, le design <em>est</em> le produit.</p>

<p><strong>(2) Le nombre de locales.</strong> Un site français-seul, c'est 1×. Ajouter l'anglais double le travail d'engineering de contenu. Ajouter l'arabe (RTL) ajoute encore ~40% par-dessus parce que chaque layout doit être testé dans les deux sens.</p>

<p><strong>(3) Les intégrations.</strong> Un formulaire de contact statique coûte zéro. Sync CRM, paiement, déclenchement de workflows n8n, réservation calendrier temps-réel, builders de devis multi-étapes — chacun est un vrai chantier d'engineering.</p>

<p><strong>(4) Les attentes CMS.</strong> "Éditable par mon équipe" peut vouloir dire beaucoup de choses. L'édition section-par-section dans un CMS headless demande plus de boulot que des templates fixes, mais paye sur des années.</p>

<p><strong>(5) L'engagement performance et SEO.</strong> Une agence qui s'engage par écrit sur un LCP &lt; 1s et un Lighthouse Mobile &gt; 95 passe 30 à 50 heures supplémentaires par projet sur l'optimisation. La plupart des agences ne le font pas — c'est pourquoi la plupart des sites d'entreprises marocaines chargent encore en 3+ secondes.</p>

<h2>Que devrais-je payer si je suis une PME à Marrakech, Casablanca ou Rabat ?</h2>

<p>Recommandation honnête, par taille d'entreprise :</p>

<ul>
<li><strong>Solo / freelance / service mono-site :</strong> 15 000–35 000 MAD sur un build Next.js ou Webflow au design custom. Tout ce qui est en-dessous de 12 000 MAD est un template retourné et vous le dépasserez en 18 mois.</li>
<li><strong>PME, 5–25 employés, locale unique :</strong> 35 000–75 000 MAD. Design custom, SEO technique, JSON-LD, capture lead, CMS headless pour le blog.</li>
<li><strong>PME, 5–25 employés, multilingue (FR/AR/EN) :</strong> 60 000–110 000 MAD. Ajout hreflang, switcher de locale, workflow de traduction.</li>
<li><strong>Mid-market, 25–150 employés, flows custom :</strong> 110 000–180 000 MAD. Intégration CRM, calculateurs custom, contenu gated, funnels multi-étapes.</li>
<li><strong>Marque e-commerce DTC, &gt;2M MAD/an de CA :</strong> 110 000–220 000+ MAD sur Shopify Hydrogen ou Next.js Commerce.</li>
</ul>

<h2>Pourquoi certaines agences marocaines facturent-elles 4× plus que d'autres ?</h2>

<p>Deux raisons légitimes et une non-légitime :</p>

<p><strong>Légitime.</strong> (1) Livraison senior-only — la personne au call est la personne au build, avec 5+ ans d'expérience. (2) Engagements performance et SEO par écrit — garanties measured-or-reworked, engagements LCP, parité de trafic organique au jour 30.</p>

<p><strong>Non-légitime.</strong> Le markup de marque. Si une agence est 4× plus chère qu'un shop comparable et que le seul différenciateur est un open-space classe et un sales deck léché, vous payez pour l'open-space.</p>

<h2>Ce que nous facturons chez BidayaLab</h2>

<p>Nos prix de départ en 2026 :</p>

<ul>
<li>Automatisation IA : <strong>à partir de 28 000 MAD</strong></li>
<li>Web Engineering : <strong>à partir de 45 000 MAD</strong></li>
<li>Brand & Motion : <strong>à partir de 38 000 MAD</strong></li>
</ul>

<p>Nous les publions parce que vous devriez connaître l'ordre de grandeur avant même de nous parler. Le périmètre final est fixé par écrit après un audit gratuit de 30 minutes. Chaque projet est livré avec un résultat mesuré attaché. <a href="/contact">Réservez l'audit.</a></p>
`,
  faq: [
    {
      q: 'Pourquoi certaines agences refusent-elles de donner un prix avant un appel découverte ?',
      a: 'Deux raisons. Une légitime : le périmètre varie vraiment, et elles veulent comprendre le projet avant de chiffrer. Une moins légitime : anchor-pricing — elles veulent lire votre budget avant de chiffrer. Nous publions les prix de départ pour supprimer la deuxième.',
    },
    {
      q: 'Webflow convient-il à un site sérieux pour entreprise marocaine ?',
      a: 'Oui, pour des sites vitrine et marketing en-dessous de ~30 pages avec des intégrations simples. Pour l\'e-commerce, la logique backend complexe, ou les fonctionnalités IA, Webflow atteint ses limites et Next.js est meilleur.',
    },
    {
      q: 'Combien coûte l\'hébergement et la maintenance mensuels ?',
      a: 'Pour un site Next.js sur Vercel + CMS headless : 0–400 MAD/mois pour la plupart des PME. Pour un WordPress : 200–800 MAD/mois en hébergement managé + licences plugins + outils de sécurité. Pour Shopify Hydrogen : abonnement Shopify (environ 360 MAD/mois) + 0–200 MAD pour Vercel/Oxygen.',
    },
    {
      q: 'Faut-il payer 50% d\'avance ?',
      a: '40 à 50% d\'avance est standard au Maroc pour le travail d\'agence. Nous splittons : 40% à la signature, 30% à validation du design, 30% au lancement. Si une agence veut 100% d\'avance, partez.',
    },
    {
      q: 'Combien de temps doit prendre un projet site web ?',
      a: 'Sites vitrine : 4 à 8 semaines. Mid-market avec intégrations : 8 à 14 semaines. E-commerce headless : 10 à 16 semaines. Tout ce qui est annoncé en 7 jours est un template retourné avec votre logo dessus.',
    },
  ],
};
