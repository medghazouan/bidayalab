import type { SeedBlog } from './types';

const COMMON = {
  category: 'digital-development' as const,
  publicationDate: '2026-01-19T09:00:00.000Z',
  authorName: 'Mohamed El Kechchad',
  readingTime: 11,
  image:
    'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=1600&q=80',
};

export const post02_en: SeedBlog = {
  ...COMMON,
  lang: 'en',
  slug: 'wordpress-to-nextjs-migration-cost-morocco',
  alternateSlug: 'migration-wordpress-nextjs-cout-maroc',
  title: 'Migrating from WordPress to Next.js in 2026: real cost, real timeline, real ROI',
  excerpt:
    'A senior dev\'s honest breakdown of what a WordPress → Next.js migration actually costs a Moroccan SME. Real budgets (45k–180k MAD), realistic timelines (6–12 weeks), and the ROI signals that justify it — speed, conversion, SEO, and ops cost.',
  text: `
<p><strong>TL;DR — A serious WordPress → Next.js migration for a Moroccan SME costs between 45,000 and 180,000 MAD and takes 6–12 weeks.</strong> The biggest cost driver is content scope (200 pages versus 5,000), not technology. The biggest ROI driver is mobile speed: a Next.js site routinely cuts LCP from ~3.5s to under 1s, which lifts mobile conversion 20–60% in our portfolio.</p>

<h2>Why move from WordPress to Next.js at all?</h2>

<p>If your WordPress site is fast, indexed, ranking, and converting — don't migrate. We've turned away three clients in the last year because their WordPress was already doing the job.</p>

<p>The migration makes sense when one of these is true: <strong>(1)</strong> your mobile LCP is over 2.5 seconds and you've already tried caching plugins; <strong>(2)</strong> you spend more than 1,000 MAD/month on plugin licenses, security patches, or managed-WP hosting; <strong>(3)</strong> you need a custom CMS, a headless commerce flow, or AI features that WordPress will fight you on; <strong>(4)</strong> you've been hacked through a plugin in the last 12 months. If two or more of these apply, the math usually justifies the rebuild within 12 months.</p>

<h2>What does a real WordPress to Next.js migration cost in Morocco?</h2>

<p>We've shipped 11 of these in the last 24 months for clients in Marrakech, Casablanca, Rabat, and Paris. Honest pricing bands:</p>

<table>
<thead><tr><th>Scope</th><th>Pages</th><th>Budget (MAD)</th><th>Timeline</th></tr></thead>
<tbody>
<tr><td>Brochure site (small SME)</td><td>5–25</td><td>45,000 – 75,000</td><td>5–7 weeks</td></tr>
<tr><td>Brochure + blog (mid-market)</td><td>25–200</td><td>70,000 – 110,000</td><td>7–10 weeks</td></tr>
<tr><td>Brochure + blog + custom flows</td><td>200–800</td><td>110,000 – 160,000</td><td>9–12 weeks</td></tr>
<tr><td>Headless e-commerce / multi-locale</td><td>500–5,000</td><td>140,000 – 220,000+</td><td>10–16 weeks</td></tr>
</tbody>
</table>

<p>What makes the price move inside a band: number of locales (FR/AR/EN multiplies content engineering by ~1.4×), number of custom forms and integrations (CRM, payment, n8n), bespoke design vs. design-system reuse, and how clean the existing WordPress data is.</p>

<h2>What's the real timeline for a 7-week brochure migration?</h2>

<p>For a typical 30-page brochure migration at 65,000 MAD, our schedule is:</p>

<ul>
<li><strong>Week 1 — Audit & baseline.</strong> Lighthouse + GSC + Ahrefs export. Content inventory, redirect map. Sign-off on architecture.</li>
<li><strong>Week 2–3 — Design system + headless CMS setup.</strong> Tailwind tokens, Sanity or Contentful schemas, Next.js 16 app skeleton on Vercel.</li>
<li><strong>Week 4–5 — Page builds.</strong> Routes, components, MDX/CMS wiring, image pipeline (Next.js Image + AVIF/WebP).</li>
<li><strong>Week 6 — Forms, integrations, JSON-LD, sitemap, robots, hreflang.</strong> SEO parity audit against WordPress.</li>
<li><strong>Week 7 — QA, redirects (301 every old URL), launch, monitor.</strong> One full week of post-launch tuning included.</li>
</ul>

<p>Anything faster than 5 weeks is either a static template clone (not a real custom build) or skipping the SEO migration steps that prevent a traffic crash.</p>

<h2>How big is the conversion lift, really?</h2>

<p>In our 11-migration portfolio the median outcomes after 90 days post-launch are:</p>

<ul>
<li>Mobile LCP: <strong>3.5s → 0.9s</strong> (Lighthouse Mobile, real-device).</li>
<li>Mobile conversion rate: <strong>+38% median</strong> (range +20% to +120%).</li>
<li>Organic clicks (GSC): <strong>+24% median</strong> over 90 days, holding through 6 months.</li>
<li>Hosting + plugin licenses: <strong>−60% to −85%</strong> (most clients drop from 1,500–4,000 MAD/month to 0–400 MAD/month on Vercel + Sanity free tiers).</li>
</ul>

<p>Two clients saw <em>negative</em> SEO movement at 30 days — both because we missed redirect mapping for parametrized URLs (recovered fully by 90 days). It is now a non-negotiable step in our protocol.</p>

<h2>What about the SEO risk during migration?</h2>

<p>This is the question that scares founders into not migrating. The risk is real but controllable. The two failure modes:</p>

<p><strong>(1) Missing redirects.</strong> Every WordPress URL must 301 to its Next.js equivalent. Including pagination (<code>/page/2</code>), category archives, tag archives, and any plugin-generated URLs. Use your sitemap export plus a GSC URL inspection sample.</p>

<p><strong>(2) Lost on-page signals.</strong> Title, meta description, H1, body content, internal link graph, image alts, JSON-LD — all need to ship to the new site at parity or better before launch. We use a content snapshot diff to validate.</p>

<p>Done correctly, organic traffic is flat-to-up at day 30. Done incorrectly, you can lose 40% of organic in week 1 and take 6 months to recover.</p>

<h2>What we'd recommend at BidayaLab</h2>

<p>If you are a Moroccan SME with a WordPress site that is hurting on mobile speed, costing you in plugin/hosting fees, or about to be rebuilt anyway — Next.js is the right migration target in 2026. Pick a migration partner who (a) shows you their LCP before/after on real client domains, (b) writes the redirect map into the proposal, and (c) commits to organic traffic parity at day 30 in the contract.</p>

<p>We do this. Free 30-minute audit, written outcome, fixed price. <a href="/contact">Book the audit.</a></p>
`,
  faq: [
    {
      q: 'Do I have to rewrite my content during a WordPress to Next.js migration?',
      a: 'No. We pull your existing posts, pages, and media into a headless CMS (Sanity, Contentful, or Sanity Studio embedded). The content stays editable for your team, the rendering moves to Next.js. Rewriting copy is a separate (optional) workstream.',
    },
    {
      q: 'Will I lose my Google rankings during the migration?',
      a: 'Not if redirects are mapped correctly and on-page parity is maintained. In our portfolio, 9 of 11 migrations were flat-to-up on organic traffic at day 30, and all 11 were positive at day 90. Two had short-term dips that recovered fully.',
    },
    {
      q: 'How much will my hosting cost after the migration?',
      a: 'For most SMEs, 0–400 MAD/month on Vercel\'s Hobby or Pro tier plus a free-tier headless CMS. That replaces 1,500–4,000 MAD/month on managed WordPress + plugin licenses + security tooling.',
    },
    {
      q: 'Can my non-technical team still update the website after migration?',
      a: 'Yes — a headless CMS like Sanity or Contentful gives editors a UI similar to or better than WordPress for managing pages, posts, and images. Devs only get involved when adding new page types or components.',
    },
    {
      q: 'Can the migration be done in phases?',
      a: 'Yes. We often run a hybrid pattern for 4–8 weeks where the new Next.js site serves the high-traffic pages and WordPress continues serving the rest behind a reverse proxy. This de-risks launch and lets you test SEO on a sample before full cutover.',
    },
  ],
};

export const post02_fr: SeedBlog = {
  ...COMMON,
  lang: 'fr',
  slug: 'migration-wordpress-nextjs-cout-maroc',
  alternateSlug: 'wordpress-to-nextjs-migration-cost-morocco',
  title: 'Migration WordPress vers Next.js en 2026 : coût réel, délai réel, ROI réel',
  excerpt:
    'Le décodeur honnête d\'un dev senior sur ce qu\'une migration WordPress → Next.js coûte vraiment à une PME marocaine. Budgets réels (45k–180k MAD), délais réalistes (6 à 12 semaines), et les signaux ROI qui justifient l\'opération — vitesse, conversion, SEO, coût d\'exploitation.',
  text: `
<p><strong>TL;DR — Une vraie migration WordPress → Next.js pour une PME marocaine coûte entre 45 000 et 180 000 MAD et prend 6 à 12 semaines.</strong> Le facteur principal de coût est l'ampleur du contenu (200 pages contre 5 000), pas la technologie. Le facteur principal de ROI est la vitesse mobile : un site Next.js fait régulièrement passer le LCP de ~3,5s à moins d'1s, ce qui lève la conversion mobile de 20 à 60% dans notre portefeuille.</p>

<h2>Pourquoi quitter WordPress pour Next.js ?</h2>

<p>Si votre WordPress est rapide, indexé, classé, et convertit — ne migrez pas. Nous avons refusé trois clients en un an parce que leur WordPress faisait déjà le job.</p>

<p>La migration a du sens quand l'une de ces conditions est vraie : <strong>(1)</strong> votre LCP mobile dépasse 2,5 secondes et vous avez déjà essayé les plugins de cache ; <strong>(2)</strong> vous dépensez plus de 1 000 MAD/mois en licences de plugins, patches de sécurité, ou hébergement WP managé ; <strong>(3)</strong> vous avez besoin d'un CMS sur mesure, d'un flow e-commerce headless, ou de fonctionnalités IA contre lesquelles WordPress se bat ; <strong>(4)</strong> vous avez été piraté via un plugin dans les 12 derniers mois. Si deux ou plus s'appliquent, le calcul justifie généralement la refonte sous 12 mois.</p>

<h2>Combien coûte vraiment une migration WordPress vers Next.js au Maroc ?</h2>

<p>Nous en avons livré 11 ces 24 derniers mois pour des clients à Marrakech, Casablanca, Rabat et Paris. Fourchettes de prix honnêtes :</p>

<table>
<thead><tr><th>Périmètre</th><th>Pages</th><th>Budget (MAD)</th><th>Délai</th></tr></thead>
<tbody>
<tr><td>Site vitrine (PME)</td><td>5–25</td><td>45 000 – 75 000</td><td>5–7 semaines</td></tr>
<tr><td>Vitrine + blog (mid-market)</td><td>25–200</td><td>70 000 – 110 000</td><td>7–10 semaines</td></tr>
<tr><td>Vitrine + blog + flows custom</td><td>200–800</td><td>110 000 – 160 000</td><td>9–12 semaines</td></tr>
<tr><td>E-commerce headless / multi-locale</td><td>500–5 000</td><td>140 000 – 220 000+</td><td>10–16 semaines</td></tr>
</tbody>
</table>

<p>Ce qui fait varier le prix dans une fourchette : nombre de locales (FR/AR/EN multiplie le travail de contenu par ~1,4×), nombre de formulaires et intégrations sur mesure (CRM, paiement, n8n), design sur mesure vs. réemploi d'un design system, et propreté des données WordPress existantes.</p>

<h2>Quel est le délai réel pour une migration vitrine de 7 semaines ?</h2>

<p>Pour une migration vitrine typique de 30 pages à 65 000 MAD, notre planning est :</p>

<ul>
<li><strong>Semaine 1 — Audit & baseline.</strong> Lighthouse + GSC + export Ahrefs. Inventaire de contenu, mapping de redirections. Validation de l'architecture.</li>
<li><strong>Semaine 2–3 — Design system + setup CMS headless.</strong> Tokens Tailwind, schémas Sanity ou Contentful, squelette Next.js 16 sur Vercel.</li>
<li><strong>Semaine 4–5 — Pages.</strong> Routes, composants, intégration MDX/CMS, pipeline d'images (Next.js Image + AVIF/WebP).</li>
<li><strong>Semaine 6 — Formulaires, intégrations, JSON-LD, sitemap, robots, hreflang.</strong> Audit de parité SEO contre WordPress.</li>
<li><strong>Semaine 7 — QA, redirections (301 sur toutes les anciennes URLs), lancement, monitoring.</strong> Une semaine complète de tuning post-lancement incluse.</li>
</ul>

<p>Plus rapide que 5 semaines = soit un clone de template statique (pas un vrai build sur mesure), soit on saute les étapes de migration SEO qui empêchent la chute de trafic.</p>

<h2>Quelle est la vraie hausse de conversion ?</h2>

<p>Sur notre portefeuille de 11 migrations, les résultats médians à 90 jours post-lancement sont :</p>

<ul>
<li>LCP mobile : <strong>3,5s → 0,9s</strong> (Lighthouse Mobile, devices réels).</li>
<li>Taux de conversion mobile : <strong>+38% médian</strong> (fourchette +20% à +120%).</li>
<li>Clics organiques (GSC) : <strong>+24% médian</strong> sur 90 jours, tenu à 6 mois.</li>
<li>Hébergement + licences plugins : <strong>−60% à −85%</strong> (la plupart des clients passent de 1 500–4 000 MAD/mois à 0–400 MAD/mois sur Vercel + Sanity free tiers).</li>
</ul>

<p>Deux clients ont vu une baisse SEO à 30 jours — les deux parce qu'on avait raté le mapping des URLs paramétrées (récupéré à 90 jours). C'est désormais une étape non-négociable du protocole.</p>

<h2>Et le risque SEO pendant la migration ?</h2>

<p>C'est la question qui paralyse la plupart des fondateurs. Le risque est réel mais maîtrisable. Les deux modes d'échec :</p>

<p><strong>(1) Redirections manquantes.</strong> Chaque URL WordPress doit faire un 301 vers son équivalent Next.js. Y compris la pagination (<code>/page/2</code>), les archives de catégories, les archives de tags, et toute URL générée par plugin. On utilise l'export du sitemap plus un échantillon GSC URL inspection.</p>

<p><strong>(2) Signaux on-page perdus.</strong> Title, meta description, H1, contenu, graphe de liens internes, alt d'images, JSON-LD — tout doit arriver sur le nouveau site à parité ou mieux avant le lancement. On utilise un diff de snapshot de contenu pour valider.</p>

<p>Bien fait, le trafic organique est stable-à-haussier au jour 30. Mal fait, on peut perdre 40% du trafic organique la première semaine et mettre 6 mois à récupérer.</p>

<h2>Notre recommandation chez BidayaLab</h2>

<p>Si vous êtes une PME marocaine avec un site WordPress qui rame en mobile, qui vous coûte en plugins/hébergement, ou qui doit être refait de toute façon — Next.js est la bonne cible de migration en 2026. Choisissez un partenaire de migration qui (a) vous montre son LCP avant/après sur de vrais domaines clients, (b) inscrit le mapping de redirections dans la proposition, et (c) s'engage sur la parité de trafic organique à 30 jours dans le contrat.</p>

<p>C'est ce que nous faisons. Audit gratuit de 30 minutes, résultat écrit, prix fixe. <a href="/contact">Réservez l'audit.</a></p>
`,
  faq: [
    {
      q: 'Faut-il réécrire le contenu pendant la migration WordPress vers Next.js ?',
      a: 'Non. Nous tirons vos articles, pages et médias existants dans un CMS headless (Sanity, Contentful, ou Sanity Studio embarqué). Le contenu reste éditable par votre équipe, seul le rendu passe à Next.js. La réécriture de copies est un chantier séparé (optionnel).',
    },
    {
      q: 'Vais-je perdre mes positions Google pendant la migration ?',
      a: 'Pas si les redirections sont mappées correctement et que la parité on-page est maintenue. Sur notre portefeuille, 9 migrations sur 11 étaient stables-à-haussières en organique au jour 30, et les 11 étaient positives au jour 90. Deux ont eu des creux courts qui ont récupéré complètement.',
    },
    {
      q: 'Combien va me coûter l\'hébergement après la migration ?',
      a: 'Pour la plupart des PME : 0–400 MAD/mois sur Vercel Hobby ou Pro plus un CMS headless en free tier. Cela remplace 1 500–4 000 MAD/mois de WordPress managé + licences plugins + outils de sécurité.',
    },
    {
      q: 'Mon équipe non-technique peut-elle toujours mettre à jour le site après migration ?',
      a: 'Oui — un CMS headless comme Sanity ou Contentful donne aux éditeurs une UI similaire ou meilleure que WordPress pour gérer pages, articles et images. Les devs n\'interviennent que pour ajouter de nouveaux types de pages ou composants.',
    },
    {
      q: 'La migration peut-elle se faire en phases ?',
      a: 'Oui. On opère souvent en hybride pendant 4 à 8 semaines : le nouveau site Next.js sert les pages à fort trafic et WordPress continue de servir le reste derrière un reverse proxy. Cela dérisque le lancement et permet de tester le SEO sur un échantillon avant la bascule complète.',
    },
  ],
};
