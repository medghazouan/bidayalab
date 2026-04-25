import type { SeedBlog } from './types';

const COMMON = {
  category: 'digital-development' as const,
  publicationDate: '2026-02-16T09:00:00.000Z',
  authorName: 'Mohamed El Kechchad',
  readingTime: 8,
  image:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
};

export const post06_en: SeedBlog = {
  ...COMMON,
  lang: 'en',
  slug: 'core-web-vitals-2026-mobile-revenue-cost',
  alternateSlug: 'core-web-vitals-2026-cout-mobile-chiffre-affaires',
  title: 'Core Web Vitals in 2026: why a slow mobile site costs you 30% of revenue',
  excerpt:
    'A senior frontend engineer\'s 2026 deep-dive on Core Web Vitals (LCP, INP, CLS). Why mobile-LCP above 2.5s costs Moroccan SMEs 20–35% of mobile revenue. The five interventions that move the number — and what they cost.',
  text: `
<p><strong>TL;DR — A mobile site with LCP above 2.5 seconds in 2026 leaves 20–35% of potential revenue on the table.</strong> Google has tightened ranking weights for Core Web Vitals, and real-user data from the Chrome UX Report (CrUX) is now what counts — not Lighthouse scores. The five interventions that actually move the number: image pipeline, JS budget, font loading, third-party scripts, and server response time. Combined, they typically cut LCP from 3.5s to under 1s.</p>

<h2>What are Core Web Vitals in 2026?</h2>

<p>Three metrics, all measured at the 75th percentile of real user sessions:</p>

<ul>
<li><strong>LCP — Largest Contentful Paint.</strong> Time from navigation start to when the largest visible element is painted. Good: &lt;2.5s. Poor: &gt;4s.</li>
<li><strong>INP — Interaction to Next Paint.</strong> Replaced FID in 2024. Measures how fast the page responds to clicks/taps. Good: &lt;200ms. Poor: &gt;500ms.</li>
<li><strong>CLS — Cumulative Layout Shift.</strong> How much the page jumps during load. Good: &lt;0.1. Poor: &gt;0.25.</li>
</ul>

<p>Google reads these from CrUX (real Chrome user data). Lighthouse scores in your developer tools are a synthetic proxy — useful, but not what gets you ranked.</p>

<h2>How much does slow mobile actually cost in revenue?</h2>

<p>Two data points we trust:</p>

<p><strong>Cross-portfolio.</strong> Across 23 Moroccan and French SMEs in our portfolio, every 1 second cut from mobile LCP has corresponded to a 7–12% lift in mobile conversion rate. The relationship is roughly linear in the 1–4 second range. A site at 3.5s LCP that drops to 0.9s typically sees a 22–35% conversion lift.</p>

<p><strong>Industry data.</strong> Cloudflare's 2025 industry report showed median e-commerce mobile bounce rates of 53% at 4s LCP versus 28% at 1s LCP. Akamai's research has held similar numbers for years.</p>

<p>Translated: if your mobile site is bringing 100 sessions/day and converting at 1.5% with a 3.5s LCP, fixing the speed issue typically takes you to 1.85–2.0% conversion at the same traffic. Over a year, on a 500 MAD average order, that's 100,000–180,000 MAD in incremental revenue with no marketing spend change.</p>

<h2>What are the five interventions that actually move LCP?</h2>

<p>In rough order of impact for the Moroccan/French sites we've worked on:</p>

<p><strong>(1) Image pipeline.</strong> Serve AVIF + WebP, never JPEG/PNG above the fold. Use Next.js Image or equivalent with width/height attributes (no layout shift). Lazy-load below-fold images. Typical LCP impact: −1.0 to −2.5 seconds. Cost: half a day of engineering.</p>

<p><strong>(2) JS budget.</strong> Cap the main-thread JavaScript at 80–120KB gzipped on the route that matters. Drop unused libraries, code-split aggressively, defer non-critical scripts. LCP and INP impact: large. Cost: 1–3 days depending on starting state.</p>

<p><strong>(3) Font loading.</strong> Self-host fonts, preload critical font files, use <code>font-display: swap</code>, subset to the characters you actually use. LCP impact: −0.3 to −0.8 seconds. Cost: 2–4 hours.</p>

<p><strong>(4) Third-party scripts.</strong> The single biggest performance killer on Moroccan business sites is the chat widget + analytics + retargeting + heatmap stack loaded synchronously. Audit, defer, or remove what isn't pulling its weight. LCP and INP impact: large. Cost: half a day.</p>

<p><strong>(5) Server response time (TTFB).</strong> Get TTFB under 200ms. Use a CDN, avoid render-blocking server-side data fetches, switch from a dynamic CMS render to ISR or static. LCP impact: linear (every 100ms of TTFB = ~100ms of LCP). Cost: varies — sometimes a configuration tweak, sometimes a stack migration.</p>

<h2>Why is INP (the new metric) hurting Moroccan sites in particular?</h2>

<p>INP measures real interactivity — how fast a tap on a button gets a visible response. The two killers we see most:</p>

<p>(a) Long-running JavaScript on the main thread (large React render trees, heavy state libraries, render-blocking analytics). (b) Multi-megabyte hydration payloads on slow Moroccan 4G connections.</p>

<p>INP is now in the ranking signal mix and Google penalizes sites with INP &gt;500ms more aggressively than 12 months ago. Many Moroccan WordPress sites with 8+ plugins are deep in the red on INP without realizing it.</p>

<h2>How do I actually measure my Core Web Vitals?</h2>

<p>Three tools, in order of trust:</p>

<ul>
<li><strong>Google Search Console → Core Web Vitals report.</strong> Real CrUX data on your real users. This is what Google actually scores you on.</li>
<li><strong>PageSpeed Insights with the "Field data" panel.</strong> Same CrUX data, prettier interface, also shows synthetic Lighthouse score.</li>
<li><strong>Web Vitals Chrome extension</strong> for live debugging on a single page during development.</li>
</ul>

<p>Don't trust your local Lighthouse score in isolation. We've shipped sites with 99 Lighthouse and bad CrUX, and vice versa. CrUX is the only number that affects ranking.</p>

<h2>What we recommend at BidayaLab</h2>

<p>If your CrUX dashboard is yellow or red on mobile LCP, you are losing measurable revenue. The fix is rarely one big rewrite — it's the five interventions above, sequenced. We do this as a 2–4 week engagement with a written commitment to LCP &lt;1.2s and INP &lt;200ms before launch, and we measure CrUX impact at day 30 and day 90.</p>

<p><a href="/contact">Free 30-minute audit — we'll pull your CrUX data live and show you the highest-leverage fix.</a></p>
`,
  faq: [
    {
      q: 'Are Core Web Vitals actually a ranking factor?',
      a: 'Yes — they are part of Google\'s Page Experience signal mix and contribute to the overall ranking score, especially on mobile. They are not the dominant signal (content quality and backlinks still outweigh them), but on competitive queries they\'re a tiebreaker.',
    },
    {
      q: 'My Lighthouse score is 95 — why is my CrUX still red?',
      a: 'Lighthouse is synthetic — runs on a fast connection in a controlled environment. CrUX is real users on real devices, often on 3G/4G with unreliable Wi-Fi. A 95 Lighthouse score on a fast machine can correspond to a CrUX LCP of 4+ seconds for real Moroccan mobile users.',
    },
    {
      q: 'Can I fix Core Web Vitals on WordPress?',
      a: 'Up to a point. Caching plugins (WP Rocket, FlyingPress), image optimization (ShortPixel, EWWW), and disabling unnecessary plugins can get most WordPress sites to 1.5–2.0s LCP on mobile. To get below 1s consistently, the path is usually a Next.js or static migration.',
    },
    {
      q: 'How quickly will Google see my Core Web Vitals improvement?',
      a: 'CrUX is a 28-day rolling window, so visible changes in Search Console take 4–6 weeks after the fix lands in production. Lighthouse changes are immediate, which is why teams often confuse the two.',
    },
    {
      q: 'What\'s the minimum Lighthouse Mobile score I should ship at?',
      a: 'For a content site: 95+. For e-commerce with payment scripts: 90+ is realistic. The number that actually matters more is the 75th-percentile LCP from CrUX — aim for below 1.5s, ideally under 1.0s.',
    },
  ],
};

export const post06_fr: SeedBlog = {
  ...COMMON,
  lang: 'fr',
  slug: 'core-web-vitals-2026-cout-mobile-chiffre-affaires',
  alternateSlug: 'core-web-vitals-2026-mobile-revenue-cost',
  title: 'Core Web Vitals en 2026 : pourquoi un site mobile lent vous coûte 30% de chiffre d\'affaires',
  excerpt:
    'Le deep-dive 2026 d\'un ingénieur frontend senior sur les Core Web Vitals (LCP, INP, CLS). Pourquoi un LCP mobile au-dessus de 2,5s coûte 20–35% du CA mobile aux PME marocaines. Les cinq interventions qui font bouger le chiffre — et leur coût.',
  text: `
<p><strong>TL;DR — Un site mobile avec un LCP au-dessus de 2,5 secondes en 2026 laisse 20 à 35% du chiffre d'affaires potentiel sur la table.</strong> Google a renforcé le poids des Core Web Vitals dans le ranking, et les données réelles d'utilisateurs du Chrome UX Report (CrUX) sont désormais ce qui compte — pas les scores Lighthouse. Les cinq interventions qui font vraiment bouger le chiffre : pipeline d'images, budget JS, chargement de polices, scripts tiers, et temps de réponse serveur. Combinées, elles font typiquement passer le LCP de 3,5s à moins d'1s.</p>

<h2>Que sont les Core Web Vitals en 2026 ?</h2>

<p>Trois métriques, toutes mesurées au 75e percentile des sessions utilisateurs réels :</p>

<ul>
<li><strong>LCP — Largest Contentful Paint.</strong> Temps entre le début de navigation et le rendu du plus gros élément visible. Bon : &lt;2,5s. Mauvais : &gt;4s.</li>
<li><strong>INP — Interaction to Next Paint.</strong> A remplacé FID en 2024. Mesure la vitesse de réponse aux clics/taps. Bon : &lt;200ms. Mauvais : &gt;500ms.</li>
<li><strong>CLS — Cumulative Layout Shift.</strong> À quel point la page saute pendant le chargement. Bon : &lt;0,1. Mauvais : &gt;0,25.</li>
</ul>

<p>Google lit ces chiffres depuis CrUX (données réelles d'utilisateurs Chrome). Les scores Lighthouse de vos devtools sont une approximation synthétique — utile, mais ce n'est pas ce qui vous classe.</p>

<h2>Combien le mobile lent coûte-t-il vraiment en CA ?</h2>

<p>Deux points de données fiables :</p>

<p><strong>Sur le portefeuille.</strong> Sur 23 PME marocaines et françaises de notre portefeuille, chaque seconde retirée du LCP mobile a correspondu à une hausse de 7 à 12% du taux de conversion mobile. La relation est à peu près linéaire entre 1 et 4 secondes. Un site à 3,5s de LCP qui descend à 0,9s voit typiquement +22 à +35% de conversion.</p>

<p><strong>Données industrie.</strong> Le rapport industrie 2025 de Cloudflare montrait des taux de rebond mobile e-commerce médians de 53% à 4s de LCP contre 28% à 1s. Les recherches d'Akamai tiennent ces chiffres depuis des années.</p>

<p>Traduit : si votre site mobile fait 100 sessions/jour et convertit à 1,5% à 3,5s de LCP, corriger la vitesse vous emmène typiquement à 1,85–2,0% de conversion au même trafic. Sur un an, à 500 MAD de panier moyen, c'est 100 000–180 000 MAD de CA incrémental sans changer le budget marketing.</p>

<h2>Quelles sont les cinq interventions qui font vraiment bouger le LCP ?</h2>

<p>Par ordre approximatif d'impact pour les sites marocains/français qu'on traite :</p>

<p><strong>(1) Pipeline d'images.</strong> Servir de l'AVIF + WebP, jamais de JPEG/PNG au-dessus de la ligne de flottaison. Utiliser Next.js Image ou équivalent avec attributs width/height (pas de layout shift). Lazy-load des images en dessous. Impact LCP typique : −1,0 à −2,5 secondes. Coût : une demi-journée d'engineering.</p>

<p><strong>(2) Budget JS.</strong> Plafonner le JavaScript main-thread à 80–120Ko gzippé sur la route qui compte. Retirer les bibliothèques inutilisées, code-split agressivement, différer les scripts non-critiques. Impact LCP et INP : élevé. Coût : 1 à 3 jours selon l'état de départ.</p>

<p><strong>(3) Chargement de polices.</strong> Auto-héberger les fonts, preload les fichiers critiques, utiliser <code>font-display: swap</code>, subseter aux caractères réellement utilisés. Impact LCP : −0,3 à −0,8 seconde. Coût : 2 à 4 heures.</p>

<p><strong>(4) Scripts tiers.</strong> Le plus gros tueur de performance sur les sites d'entreprises marocaines est la stack chat widget + analytics + retargeting + heatmap chargée synchroniquement. Auditer, différer, ou retirer ce qui ne porte pas son poids. Impact LCP et INP : élevé. Coût : une demi-journée.</p>

<p><strong>(5) Temps de réponse serveur (TTFB).</strong> Avoir un TTFB en-dessous de 200ms. Utiliser un CDN, éviter les fetches data render-blocking côté serveur, passer d'un rendu CMS dynamique à ISR ou statique. Impact LCP : linéaire (chaque 100ms de TTFB = ~100ms de LCP). Coût : variable — parfois un tweak de config, parfois une migration de stack.</p>

<h2>Pourquoi l'INP (la nouvelle métrique) frappe-t-il les sites marocains en particulier ?</h2>

<p>L'INP mesure la vraie interactivité — à quelle vitesse un tap sur un bouton donne une réponse visible. Les deux tueurs qu'on voit le plus :</p>

<p>(a) JavaScript long sur le main thread (gros arbres React, libs d'état lourdes, analytics render-blocking). (b) Payloads d'hydratation de plusieurs Mo sur les connexions 4G marocaines lentes.</p>

<p>L'INP est désormais dans le mix de signaux de ranking et Google pénalise les sites au-dessus de 500ms plus agressivement qu'il y a 12 mois. Beaucoup de sites WordPress marocains avec 8+ plugins sont profondément dans le rouge sur INP sans le savoir.</p>

<h2>Comment mesurer mes Core Web Vitals concrètement ?</h2>

<p>Trois outils, par ordre de fiabilité :</p>

<ul>
<li><strong>Google Search Console → rapport Core Web Vitals.</strong> Données CrUX réelles sur vos vrais utilisateurs. C'est ce sur quoi Google vous note réellement.</li>
<li><strong>PageSpeed Insights, panneau "Field data".</strong> Mêmes données CrUX, interface plus jolie, montre aussi le score Lighthouse synthétique.</li>
<li><strong>Extension Chrome Web Vitals</strong> pour debug live sur une seule page pendant le dev.</li>
</ul>

<p>Ne vous fiez pas à votre Lighthouse local en isolation. Nous avons livré des sites avec 99 en Lighthouse et un mauvais CrUX, et inversement. CrUX est le seul chiffre qui affecte le ranking.</p>

<h2>Notre recommandation chez BidayaLab</h2>

<p>Si votre dashboard CrUX est jaune ou rouge sur le LCP mobile, vous perdez du chiffre d'affaires mesurable. La correction est rarement une grosse refonte — ce sont les cinq interventions ci-dessus, séquencées. Nous le faisons en mission de 2 à 4 semaines avec un engagement écrit LCP &lt; 1,2s et INP &lt; 200ms avant lancement, et nous mesurons l'impact CrUX au jour 30 et jour 90.</p>

<p><a href="/contact">Audit gratuit de 30 minutes — nous tirons vos données CrUX en direct et vous montrons le fix à plus fort levier.</a></p>
`,
  faq: [
    {
      q: 'Les Core Web Vitals sont-ils vraiment un facteur de ranking ?',
      a: 'Oui — ils font partie du signal Page Experience de Google et contribuent au score de ranking global, surtout en mobile. Ce n\'est pas le signal dominant (la qualité du contenu et les backlinks pèsent encore plus), mais sur les requêtes compétitives c\'est un tie-breaker.',
    },
    {
      q: 'Mon score Lighthouse est 95 — pourquoi mon CrUX est-il encore rouge ?',
      a: 'Lighthouse est synthétique — tourne sur une connexion rapide dans un environnement contrôlé. CrUX, ce sont les vrais utilisateurs sur de vrais devices, souvent en 3G/4G avec du Wi-Fi capricieux. Un score Lighthouse 95 sur une machine rapide peut correspondre à un LCP CrUX de 4+ secondes pour les vrais utilisateurs mobiles marocains.',
    },
    {
      q: 'Peut-on corriger les Core Web Vitals sur WordPress ?',
      a: 'Jusqu\'à un certain point. Les plugins de cache (WP Rocket, FlyingPress), l\'optimisation d\'images (ShortPixel, EWWW), et désactiver les plugins inutiles peuvent ramener la plupart des sites WordPress à 1,5–2,0s de LCP mobile. Pour passer en-dessous d\'1s régulièrement, le chemin est généralement une migration Next.js ou statique.',
    },
    {
      q: 'À quelle vitesse Google verra-t-il l\'amélioration de mes Core Web Vitals ?',
      a: 'CrUX est une fenêtre glissante de 28 jours, donc les changements visibles dans Search Console prennent 4 à 6 semaines après que le fix soit en production. Les changements Lighthouse sont immédiats, ce qui fait que les équipes confondent souvent les deux.',
    },
    {
      q: 'Quel score Lighthouse Mobile minimum dois-je viser au lancement ?',
      a: 'Pour un site de contenu : 95+. Pour un e-commerce avec scripts de paiement : 90+ est réaliste. Le chiffre qui compte vraiment plus est le LCP CrUX au 75e percentile — visez en-dessous de 1,5s, idéalement sous 1,0s.',
    },
  ],
};
