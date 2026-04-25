import type { SeedBlog } from './types';

const COMMON = {
  category: 'digital-development' as const,
  publicationDate: '2026-01-26T09:00:00.000Z',
  authorName: 'Mohamed El Kechchad',
  readingTime: 8,
  image:
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80',
};

export const post03_en: SeedBlog = {
  ...COMMON,
  lang: 'en',
  slug: 'shopify-hydrogen-vs-theme-conversion-2026',
  alternateSlug: 'shopify-hydrogen-vs-theme-conversion-maroc-2026',
  title: 'Shopify Hydrogen vs a Shopify Theme: what\'s the real conversion difference in 2026?',
  excerpt:
    'A senior commerce developer\'s honest comparison. Hydrogen wins on speed and conversion (median +18% mobile RPV in our data). Themes win on time-to-launch and editor velocity. Most Moroccan DTC brands at 2M+ MAD/year revenue should pick Hydrogen.',
  text: `
<p><strong>TL;DR — Hydrogen lifts mobile revenue per visitor by a median +18% versus a comparable Shopify theme,</strong> and the gap widens past the 1-second LCP threshold. Themes still win on time-to-launch (3 weeks vs 8) and on day-to-day merchant editing speed. The honest dividing line for a Moroccan DTC brand: under ~2M MAD/year revenue, ship a fast theme. Above it, the conversion math justifies Hydrogen.</p>

<h2>What is Shopify Hydrogen, and how is it different from a Shopify theme?</h2>

<p>A Shopify <strong>theme</strong> is the standard storefront — Liquid templates served directly from Shopify's stack. You install a theme, customize sections in the editor, plug in apps. Time to launch: 2–6 weeks. The performance ceiling is whatever your theme + app stack lets through (typically 1.8–3.5s LCP on mobile).</p>

<p>Shopify <strong>Hydrogen</strong> is a React/Next.js-style framework that builds a fully custom storefront on top of Shopify's GraphQL Storefront API and deploys to Oxygen (Shopify's edge runtime) or Vercel. Time to launch: 7–14 weeks. The performance ceiling is much higher (sub-1s LCP is realistic) and you control every component.</p>

<h2>How big is the conversion difference between Hydrogen and a fast Shopify theme?</h2>

<p>We migrated four Moroccan DTC brands from a theme to Hydrogen between 2024 and 2025. Median outcomes 90 days post-launch:</p>

<ul>
<li>Mobile LCP: <strong>2.1s → 0.7s</strong>.</li>
<li>Mobile conversion rate: <strong>+22% median</strong>.</li>
<li>Mobile revenue per visitor: <strong>+18% median</strong>.</li>
<li>Add-to-cart rate: <strong>+11% median</strong>.</li>
<li>Bounce rate: <strong>−14 percentage points median</strong>.</li>
</ul>

<p>The conversion lift compounds — visitors who don't bounce are more likely to add to cart, more likely to checkout, and more likely to come back. Two of the four brands paid back the Hydrogen build cost (110k–180k MAD) within 5–7 months purely on incremental mobile revenue.</p>

<h2>When does a theme beat Hydrogen?</h2>

<p>Three scenarios where we still recommend a theme:</p>

<p><strong>(1) Pre-product-market-fit.</strong> If your brand is under 6 months old and you're still iterating on positioning, a Dawn-based custom theme at 18,000–45,000 MAD ships in 3 weeks and lets you change everything fast.</p>

<p><strong>(2) Heavy app dependency.</strong> If your store relies on 8+ Shopify apps (subscriptions, loyalty, reviews, upsells, B2B portals), porting all of them to Hydrogen is a real engineering investment. Themes are the path of least resistance.</p>

<p><strong>(3) Editor-heavy workflows.</strong> If your team adds 10+ new products and 3+ landing pages a week, Shopify's section-based editor is faster than a Hydrogen build that requires CMS sync. We've seen marketing teams refuse to touch Hydrogen sites because the velocity dropped.</p>

<h2>What does Hydrogen actually cost in Morocco?</h2>

<table>
<thead><tr><th>Scope</th><th>Budget (MAD)</th><th>Timeline</th></tr></thead>
<tbody>
<tr><td>Hydrogen MVP (single locale, 1 collection template, 5 page templates)</td><td>85,000 – 120,000</td><td>7–9 weeks</td></tr>
<tr><td>Standard Hydrogen build (multi-collection, blog, custom PDPs)</td><td>120,000 – 170,000</td><td>9–12 weeks</td></tr>
<tr><td>Multi-locale Hydrogen (FR + AR + EN, RTL handling, currency)</td><td>165,000 – 240,000</td><td>11–16 weeks</td></tr>
<tr><td>Hydrogen + custom B2B / subscription / quote flows</td><td>200,000 – 320,000+</td><td>14–20 weeks</td></tr>
</tbody>
</table>

<h2>What about SEO during a theme to Hydrogen migration?</h2>

<p>The SEO discipline is identical to a WordPress to Next.js migration: 301 every URL, preserve H1/title/meta/JSON-LD parity, retain the internal link graph, and submit a fresh sitemap. We add Shopify-specific steps: handle product handle changes, preserve <code>/products/handle</code> structure, port collection metafields used in templates, and double-check the canonical tag on PDPs (Shopify themes sometimes generate duplicates).</p>

<h2>What we recommend at BidayaLab</h2>

<p>If you are a Moroccan DTC brand doing more than ~2M MAD/year, with mobile traffic above 60% and a real product catalog, Hydrogen is almost always the right next move. The conversion math pays it back inside a year. If you are pre-product-market-fit, ship a Dawn-based custom theme first and revisit Hydrogen at year two.</p>

<p>We've shipped Hydrogen builds for jewelry, beauty, and home goods brands in Morocco and France. We can show you the LCP graphs and the conversion delta on real domains. <a href="/contact">Book a free 30-minute audit.</a></p>
`,
  faq: [
    {
      q: 'Does Shopify Hydrogen replace my Shopify admin?',
      a: 'No. Hydrogen is the front-end only. You still manage products, orders, customers, inventory, and discounts in the standard Shopify admin. Hydrogen reads from Shopify\'s Storefront API.',
    },
    {
      q: 'Can my marketing team still edit landing pages in Hydrogen?',
      a: 'Yes, if you wire it correctly. We typically use Shopify Metaobjects or a headless CMS (Sanity, Contentful) to give marketing teams editable sections. Without this, every change requires a developer.',
    },
    {
      q: 'Do my Shopify apps still work in Hydrogen?',
      a: 'App-block-based apps that inject HTML into themes need to be ported manually as React components. App APIs (subscriptions, reviews, loyalty) usually still work via their Storefront API endpoints. Audit each app before committing.',
    },
    {
      q: 'How fast is Hydrogen really?',
      a: 'In our portfolio, sub-1s LCP on mobile is normal. Time-to-interactive is typically 1.5–2.5s on a real Moroccan 4G connection. Compare that to 3–5s for a typical theme + 6 apps stack.',
    },
    {
      q: 'Can I A/B test theme vs Hydrogen before fully committing?',
      a: 'Yes. We can run Hydrogen on a subdomain (shop.brand.com) and split traffic 50/50 with Shopify scripts or a server-side router for 4–6 weeks. Most brands see the conversion delta clearly inside 14 days.',
    },
  ],
};

export const post03_fr: SeedBlog = {
  ...COMMON,
  lang: 'fr',
  slug: 'shopify-hydrogen-vs-theme-conversion-maroc-2026',
  alternateSlug: 'shopify-hydrogen-vs-theme-conversion-2026',
  title: 'Shopify Hydrogen ou theme : quelle est la vraie différence de conversion en 2026 ?',
  excerpt:
    'La comparaison honnête d\'un dev commerce senior. Hydrogen gagne sur la vitesse et la conversion (+18% médian de RPV mobile dans nos données). Les themes gagnent sur le time-to-launch et la vélocité d\'édition. La plupart des marques DTC marocaines au-dessus de 2M MAD/an de CA devraient choisir Hydrogen.',
  text: `
<p><strong>TL;DR — Hydrogen lève le revenu par visiteur mobile de +18% médian par rapport à un theme Shopify comparable,</strong> et l'écart se creuse au-delà du seuil 1-seconde de LCP. Les themes gagnent encore sur le time-to-launch (3 semaines vs 8) et sur la vélocité d'édition merchand. La ligne de partage honnête pour une marque DTC marocaine : en-dessous de ~2M MAD/an de CA, livrez un theme rapide. Au-dessus, le calcul de conversion justifie Hydrogen.</p>

<h2>Qu'est-ce que Shopify Hydrogen, et en quoi est-ce différent d'un theme Shopify ?</h2>

<p>Un <strong>theme</strong> Shopify est le storefront standard — des templates Liquid servis directement depuis la stack Shopify. Vous installez un theme, vous customisez les sections dans l'éditeur, vous plug-in des apps. Time-to-launch : 2 à 6 semaines. Le plafond de performance dépend de votre theme + apps (typiquement 1,8–3,5s de LCP mobile).</p>

<p>Shopify <strong>Hydrogen</strong> est un framework React/Next.js-style qui construit un storefront entièrement custom au-dessus de l'API GraphQL Storefront de Shopify, déployé sur Oxygen (l'edge runtime de Shopify) ou Vercel. Time-to-launch : 7 à 14 semaines. Plafond de performance bien plus haut (LCP sub-1s réaliste) et contrôle complet de chaque composant.</p>

<h2>Quelle est l'ampleur de la différence de conversion entre Hydrogen et un theme rapide ?</h2>

<p>Nous avons migré quatre marques DTC marocaines d'un theme vers Hydrogen entre 2024 et 2025. Résultats médians à 90 jours post-lancement :</p>

<ul>
<li>LCP mobile : <strong>2,1s → 0,7s</strong>.</li>
<li>Taux de conversion mobile : <strong>+22% médian</strong>.</li>
<li>Revenu par visiteur mobile : <strong>+18% médian</strong>.</li>
<li>Taux d'ajout au panier : <strong>+11% médian</strong>.</li>
<li>Taux de rebond : <strong>−14 points médian</strong>.</li>
</ul>

<p>Le gain de conversion compose — les visiteurs qui ne rebondissent pas sont plus enclins à ajouter au panier, plus enclins à passer commande, plus enclins à revenir. Deux des quatre marques ont rentabilisé le coût de build Hydrogen (110k–180k MAD) en 5 à 7 mois, uniquement sur le revenu mobile incrémental.</p>

<h2>Quand un theme bat-il Hydrogen ?</h2>

<p>Trois scénarios où nous recommandons encore un theme :</p>

<p><strong>(1) Avant le product-market-fit.</strong> Si votre marque a moins de 6 mois et que vous itérez encore sur le positionnement, un theme custom basé sur Dawn à 18 000–45 000 MAD se livre en 3 semaines et permet de tout changer vite.</p>

<p><strong>(2) Forte dépendance aux apps.</strong> Si votre boutique repose sur 8+ apps Shopify (abonnements, fidélité, avis, upsells, portails B2B), porter toutes ces apps sur Hydrogen est un vrai investissement engineering. Les themes sont le chemin de moindre résistance.</p>

<p><strong>(3) Workflows à dominante édition.</strong> Si votre équipe ajoute 10+ nouveaux produits et 3+ landing pages par semaine, l'éditeur sectionné de Shopify est plus rapide qu'un build Hydrogen qui exige une sync CMS. Nous avons vu des équipes marketing refuser de toucher des sites Hydrogen parce que la vélocité avait chuté.</p>

<h2>Combien coûte vraiment Hydrogen au Maroc ?</h2>

<table>
<thead><tr><th>Périmètre</th><th>Budget (MAD)</th><th>Délai</th></tr></thead>
<tbody>
<tr><td>Hydrogen MVP (locale unique, 1 template collection, 5 templates de page)</td><td>85 000 – 120 000</td><td>7–9 semaines</td></tr>
<tr><td>Build Hydrogen standard (multi-collection, blog, PDPs custom)</td><td>120 000 – 170 000</td><td>9–12 semaines</td></tr>
<tr><td>Hydrogen multi-locale (FR + AR + EN, RTL, devises)</td><td>165 000 – 240 000</td><td>11–16 semaines</td></tr>
<tr><td>Hydrogen + B2B / abonnements / flows devis custom</td><td>200 000 – 320 000+</td><td>14–20 semaines</td></tr>
</tbody>
</table>

<h2>Et le SEO pendant la migration theme → Hydrogen ?</h2>

<p>La discipline SEO est identique à une migration WordPress → Next.js : 301 sur chaque URL, parité H1/title/meta/JSON-LD, conservation du graphe de liens internes, soumission d'un sitemap frais. On ajoute des étapes spécifiques Shopify : gérer les changements de handle produit, préserver la structure <code>/products/handle</code>, porter les metafields de collection utilisés dans les templates, et vérifier la balise canonical sur les PDPs (les themes Shopify génèrent parfois des doublons).</p>

<h2>Notre recommandation chez BidayaLab</h2>

<p>Si vous êtes une marque DTC marocaine qui dépasse ~2M MAD/an, avec un trafic mobile supérieur à 60% et un vrai catalogue produit, Hydrogen est presque toujours le bon prochain move. Le calcul de conversion le rentabilise sous 12 mois. Si vous êtes avant le product-market-fit, livrez un theme custom basé sur Dawn d'abord, puis revoyez Hydrogen à l'année 2.</p>

<p>Nous avons livré des builds Hydrogen pour des marques de bijoux, beauté et maison au Maroc et en France. Nous pouvons vous montrer les graphes LCP et le delta de conversion sur de vrais domaines. <a href="/contact">Réservez un audit gratuit de 30 minutes.</a></p>
`,
  faq: [
    {
      q: 'Shopify Hydrogen remplace-t-il l\'admin Shopify ?',
      a: 'Non. Hydrogen est uniquement le front-end. Vous gérez toujours produits, commandes, clients, stocks et codes promo dans l\'admin Shopify standard. Hydrogen lit depuis l\'API Storefront de Shopify.',
    },
    {
      q: 'Mon équipe marketing peut-elle encore éditer les landing pages sur Hydrogen ?',
      a: 'Oui, si c\'est câblé correctement. On utilise typiquement les Metaobjects Shopify ou un CMS headless (Sanity, Contentful) pour donner aux équipes marketing des sections éditables. Sans ça, chaque changement demande un dev.',
    },
    {
      q: 'Mes apps Shopify fonctionnent-elles sur Hydrogen ?',
      a: 'Les apps basées sur app-blocks qui injectent du HTML dans les themes doivent être portées manuellement en composants React. Les APIs d\'apps (abonnements, avis, fidélité) fonctionnent généralement encore via leurs endpoints Storefront API. Audite chaque app avant de t\'engager.',
    },
    {
      q: 'À quel point Hydrogen est-il rapide vraiment ?',
      a: 'Sur notre portefeuille, un LCP sub-1s en mobile est la norme. Le time-to-interactive est typiquement de 1,5 à 2,5s sur une vraie connexion 4G marocaine. À comparer aux 3 à 5s d\'une stack typique theme + 6 apps.',
    },
    {
      q: 'Puis-je A/B tester theme vs Hydrogen avant de m\'engager complètement ?',
      a: 'Oui. On peut faire tourner Hydrogen sur un sous-domaine (shop.marque.com) et splitter le trafic 50/50 avec des scripts Shopify ou un router server-side pendant 4 à 6 semaines. La plupart des marques voient clairement le delta de conversion sous 14 jours.',
    },
  ],
};
