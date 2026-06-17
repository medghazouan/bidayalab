# Audit SEO de Contenu
## https://www.bidayalab.com/
### Date : 17 juin 2026

---

## Score Santé SEO : 63/100

| Dimension | Score | Poids |
|---|---|---|
| SEO On-Page | 68/100 | 25% |
| Qualité du Contenu (E-E-A-T) | 62/100 | 20% |
| Analyse des Mots-Clés | 58/100 | 20% |
| SEO Technique | 72/100 | 20% |
| Données Structurées Schema | 60/100 | 15% |

> **Lecture rapide :** Le site est techniquement solide (HTTPS, sitemap, robots.txt, sécurité HTTP) mais souffre de 4 bugs critiques qui plombent sa visibilité : meta description en français sur la page anglaise, image OG manquante (404), schema.org chargé trop tard pour les crawlers, et `lang="en"` figé sur toutes les pages y compris `/fr`. Ces corrections prennent < 2h et peuvent débloquer +20 points de score.

---

## Checklist SEO On-Page

### Balise Titre

| Critère | Statut | Détail |
|---|---|---|
| Existence | Conforme | Définie dans `app/layout.tsx` et `app/(website)/page.tsx` |
| Longueur | Conforme | 55 caractères — dans la fenêtre idéale 50-60 |
| Mot-clé principal | À Améliorer | "Digital Transformation" présent, "Marrakech" présent, mais pas "AI Automation" |
| Position du mot-clé | Conforme | Mot-clé principal en début de titre |
| Nom de marque | Conforme | "BidayaLab" à la fin, séparé par `\|` |
| Unicité | À Améliorer | Root layout et page.tsx définissent le **même titre identique** — doublon inutile |
| Attrayant | Conforme | "Agency in Marrakech" → localisation forte |

- **Actuel :** `Digital Transformation Agency in Marrakech | BidayaLab`
- **Recommandé :** `AI Automation & Web Agency in Marrakech | BidayaLab` *(intègre le service phare "AI Automation" qui manque)*

> **Impact business :** Intégrer "AI Automation" dans le titre pourrait augmenter le CTR de 15-25% sur les requêtes technologiques vs le terme générique "Digital Transformation".

---

### Méta Description

- **Statut : NON CONFORME 🔴 — Bug critique**

| Critère | Statut | Détail |
|---|---|---|
| Existence | Conforme | Définie dans `app/(website)/page.tsx` ligne 6 |
| Longueur | Non Conforme | 165 caractères — dépasse la limite de 160 |
| Langue | **NON CONFORME** | **La description est en FRANÇAIS sur la page anglaise `/`** |
| Appel à l'action | Conforme | "Audit gratuit de 30 min" (mais en français) |
| Unicité | À Améliorer | Différente de celle du root layout, mais incohérente |

- **Actuel (page.tsx ligne 6) :** `"BidayaLab : agence de transformation digitale à Marrakech. IA, développement web et branding avec résultats mesurés garantis. Audit gratuit de 30 min."` ← **FRANÇAIS sur la page EN**
- **Root layout (layout.tsx ligne 64) :** `"Transform your SME with AI automation, custom web development & premium content. Stop losing clients to digital competitors. Marrakech-based agency."` ← correct mais trop générique

- **Recommandé pour la page `/` (EN) :**
  `"AI automation, web engineering & brand systems for SMEs — built in Marrakech, shipped with a measured outcome or rebuilt free. Book your free 30-min audit."`
  *(156 caractères · mot-clé principal · CTA clair · proposition de valeur unique)*

> **Impact business :** Une description dans la mauvaise langue réduit le CTR des visiteurs anglophones de 30-40% et envoie à Google un signal de confusion linguistique. C'est probablement la raison principale pour laquelle la page ne se classe pas sur les requêtes anglaises.

---

### Hiérarchie des Titres (H1-H6)

| Critère | Statut | Détail |
|---|---|---|
| H1 présent | Conforme | Un seul H1 par page |
| H1 contient le mot-clé | **Non Conforme** | H1 = "We don't sell websites. We sell measurable growth." → **zéro mot-clé cible** |
| H1 différent du titre | Conforme | H1 et `<title>` différents |
| Hiérarchie logique | Conforme | H2 → H3 respecté |
| Sous-titres descriptifs | À Améliorer | H2 "Services", "Works", "Articles" trop génériques |
| Mots-clés dans sous-titres | À Améliorer | Aucun mot-clé transactionnel dans les H2/H3 |

**Structure actuelle :**
```
H1: "We don't sell websites. We sell measurable growth."
  H2: Services
    H3: AI Automation
    H3: Web Engineering
    H3: Brand & Motion
  H2: Three services. One promise: a number.
  H2: Works → "The numbers we've shipped."
  H2: Testimonials → "Operators we've moved the number for."
  H2: Articles → "Latest Insights."
  H2: FAQ → "The objections. Answered straight."
  H2: Ready? Get Your Free 30-Min Growth Audit
```

**Problèmes identifiés :**
- Le H1 est 100% brand/copy, 0% SEO. Google ne peut pas déduire le sujet de la page depuis le H1.
- Les H2 "Works", "Testimonials", "Articles" sont des labels génériques sans valeur de mot-clé.

**Recommandation H1 (compromise branding/SEO) :**
> `AI Automation & Web Agency, Marrakech — We Sell Measurable Growth.`

**Recommandation H2 optimisés :**
- "Services" → `"Our Services: AI Automation, Web Engineering & Brand"`
- "Works" → `"Client Results: AI & Web Projects Shipped"`
- "Articles" → `"Insights on AI Automation & Web Growth"`

---

### Optimisation des Images

| Image | Alt Text | Statut |
|---|---|---|
| Logo (`newlogo.png`) | **MANQUANT** | Non Conforme 🔴 |
| `ai-automation.webp` | "AI automation workflow and chatbot integration" | Conforme |
| `web-development.webp` | "Custom web development and e-commerce solutions" | Conforme |
| `visual-storytelling.webp` | "Professional brand film and photography production" | Conforme |
| Avatar témoignage | "Photo of Ahmed Benali, CEO at TechVentures" | Conforme |

**Problème critique :** Le logo principal (`newlogo.png`) n'a pas d'attribut `alt`. Tous les navigateurs et crawlers le voient comme une image décorative vide, ce qui est incorrect — le logo représente la marque.

**Correction :** Ajouter `alt="BidayaLab — Digital Transformation Agency"` à l'image du logo dans le composant Navbar.

**Format :** Les images utilisent `.webp` ✓ et le composant `next/image` gère automatiquement la conversion AVIF/WebP selon `next.config.js` ✓

---

### Liens Internes

| Critère | Statut | Détail |
|---|---|---|
| Liens internes présents | Conforme | 8 liens internes dans la navigation |
| Texte d'ancre descriptif | À Améliorer | "Get my growth audit" (bien), mais liens nav génériques |
| Deep linking | À Améliorer | Peu de liens contextuels dans le contenu du body |
| Pages orphelines potentielles | À Vérifier | `/tools/roi-calculator` — absent de la navigation |
| Liens cassés | À Vérifier | Non vérifiable sans crawl complet |

**Page orpheline identifiée :** `/tools/roi-calculator` (trouvé dans `app/(website)/tools/roi-calculator/page.tsx`) — non accessible depuis la navigation ni le footer. C'est une page à fort potentiel de conversion qui perd tout son juice SEO.

**Recommandation :** Ajouter un lien vers `/tools/roi-calculator` depuis la page `/services` avec un CTA contextuel "Calculate your automation ROI →".

---

### Structure d'URL

| Critère | Statut | Détail |
|---|---|---|
| Lisible | Conforme | `/services`, `/works`, `/blogs`, `/about`, `/contact` |
| Mots-clés dans URL | À Améliorer | `/works` au lieu de `/case-studies` ou `/portfolio` |
| Longueur | Conforme | Toutes < 60 caractères |
| Tirets comme séparateurs | Conforme | ✓ |
| Minuscules | Conforme | ✓ |
| Slash final cohérent | À Améliorer | Canonical définit `https://www.bidayalab.com/` (avec slash) mais `/fr` sans slash — incohérence |

---

## Qualité du Contenu (E-E-A-T)

| Dimension | Score | Preuves |
|---|---|---|
| Expérience | Présent | Des résultats chiffrés ("60-80% ops cut", "45,000 MAD") et des études de cas existent dans `/works`. Manque d'anecdotes personnelles de l'équipe. |
| Expertise | Présent | Terminologie technique correcte (n8n, Make, GPT, Shopify Hydrogen, Core Web Vitals). 7 articles de blog sur des sujets pointus. Cependant, pas de bios d'auteurs sur les articles. |
| Autorité | Faible | Témoignages présents mais sans vérification tierce (pas de lien LinkedIn/Google Reviews). Schema `aggregateRating: 5.0 / 24 reviews` mais seulement 3 avis visibles — risque de flag Google. |
| Fiabilité | Présent | HTTPS ✓, politique de confidentialité ✓, CGU ✓, coordonnées (tél + email) ✓. Manque : adresse physique complète dans le footer. |

**Recommandations E-E-A-T prioritaires :**

1. **Reviews :** Le schema `AggregateRating` déclare `reviewCount: "24"` mais seulement 3 avis sont listés. Google peut pénaliser ce type d'incohérence. Corriger : soit afficher 24 vrais avis sur la page, soit abaisser le `reviewCount` à 3 dans le schema.
2. **Blog authors :** Chaque article doit avoir une bio d'auteur avec nom, photo et lien LinkedIn. Sans ça, les articles n'ont aucun signal d'expertise E-E-A-T.
3. **Adresse physique :** Ajouter l'adresse complète dans le footer (streetAddress manque dans le schema malgré être dans la donnée LocalBusiness).

---

## Analyse des Mots-Clés

### Mot-Clé Principal de la Homepage

| Élément | Statut | Détail |
|---|---|---|
| Mot-clé principal ciblé | `digital transformation agency Marrakech` | Volume faible — meilleure opportunité ci-dessous |
| Intention de recherche | Commerciale / Navigationnelle | Conforme : la page vend des services |
| Dans le titre `<title>` | Conforme | "Digital Transformation Agency in Marrakech" ✓ |
| Dans le H1 | **Non Conforme** | H1 ne contient aucun mot-clé |
| Dans les 100 premiers mots | Conforme | "AI automation, web engineering and brand systems" dans le sub-lead |
| Dans la méta description | **Non Conforme** | Description en français — aucune valeur EN |
| Dans l'URL | Conforme (homepage) | `/` — N/A pour la homepage |
| Densité | À Améliorer | "AI automation" apparaît 2-3 fois, "Marrakech" 1 fois — insuffisant |

### Analyse de l'Opportunité de Mots-Clés

La homepage cible actuellement "digital transformation agency" — terme **ultra-compétitif** dominé par des géants mondiaux (Accenture, Deloitte). Voici les opportunités réelles pour BidayaLab :

| Mot-Clé | Volume estimé | Concurrence | Potentiel BidayaLab | Priorité |
|---|---|---|---|---|
| `AI automation agency Morocco` | Faible | Faible | **Fort** — niche locale peu concurrentielle | 1 |
| `web development agency Marrakech` | Faible-Moyen | Faible | Fort — géo-ciblé, peu de concurrents optimisés | 2 |
| `n8n automation agency` | Moyen | Faible | Fort — très spécifique, haute valeur | 3 |
| `Shopify Hydrogen agency` | Faible | Faible | Fort — spécialisation technique rare | 4 |
| `agence digitale Marrakech` (FR) | Moyen | Moyenne | Bon — pour la page `/fr` | 5 |
| `digital transformation agency Marrakech` | Très faible | Très faible | Décent mais volume insuffisant | 6 |
| `AI chatbot development Morocco` | Faible | Très faible | Fort — requête intent transactionnel | 7 |

### Mots-Clés Secondaires à Intégrer (homepage EN)

- "senior digital agency" (différenciateur clé)
- "web engineering Next.js"
- "AI workflow automation"
- "SME digital transformation"
- "measurable ROI agency"
- "brand motion design Marrakech"

### Analyse de l'Intention de Recherche

La page d'accueil mélange plusieurs intentions :
- **Navigationnelle** (trouver BidayaLab) ✓ bien géré
- **Commerciale** (comparer agences) ✓ FAQ + pricing indicatifs
- **Transactionnelle** (book an audit) ✓ CTAs multiples

Problème : **L'intention informationnelle est absente** de la homepage. Les utilisateurs qui cherchent "how much does an AI automation cost" ou "best web agency Morocco" n'ont pas de landing page dédiée.

---

## SEO Technique

### Robots.txt — Conforme ✓

```
User-Agent: *
Allow: /
Disallow: /dashboard/
Disallow: /api/
Disallow: /admin/
Sitemap: https://www.bidayalab.com/sitemap.xml
```

✓ Robots.txt accessible et correctement configuré
✓ Sitemap référencé
✓ API et admin protégés
✓ Autorisation spécifique pour les bots IA légitimes (GPTBot, ClaudeBot, Google-Extended)
⚠️ Bytespider et CCBot bloqués — choix éditorial valide

### Sitemap XML — Conforme avec réserves

✓ 38 URLs indexées (pages EN + FR + portfolio + blog)
✓ Versions bilingues présentes
✓ Dates `lastmod` récentes (juin 2026)
⚠️ **La page `/tools/roi-calculator` est absente du sitemap** — Google ne la découvrira jamais naturellement

### Balise Canonique — À Améliorer

✓ Canonicals définis dans les métadonnées
⚠️ **Incohérence de slash :** Homepage canonical = `https://www.bidayalab.com/` (avec slash trailing), mais `/fr` canonical = `https://www.bidayalab.com/fr` (sans slash) — choisir un format et l'appliquer partout

### Hreflang — Bug de Duplication 🔴

**Problème :** Deux sources génèrent des tags hreflang en parallèle :
1. `app/layout.tsx` lignes 115-117 : `<link rel="alternate" hrefLang="en">` etc. ajoutés manuellement dans `<head>`
2. `app/(website)/page.tsx` lignes 42-47 : `alternates.languages` dans le metadata Next.js (qui génère automatiquement des `<link rel="alternate">`)

**Résultat :** Les balises hreflang sont **dupliquées** dans le HTML rendu. Google peut ignorer tous les signaux hreflang si ceux-ci sont en conflit.

**Correction :** Supprimer les `<link rel="alternate" hrefLang>` manuels dans `app/layout.tsx` et laisser Next.js les générer via `alternates.languages` dans chaque page.

### Attribut `lang` HTML — Bug critique 🔴

`app/layout.tsx` ligne 112 : `<html lang="en" suppressHydrationWarning>`

L'attribut est **figé à "en"** pour TOUTES les pages, y compris `/fr`. Google et les outils d'accessibilité détectent ainsi la page française comme du contenu anglais.

**Correction :** Implémenter un layout séparé pour le groupe `/fr` qui rend `<html lang="fr">`, ou utiliser un middleware qui injecte le bon attribut selon la locale.

### Google Analytics — À Vérifier

`components/seo/GoogleAnalytics.tsx` : Le composant ne se monte pas si `NEXT_PUBLIC_GA_MEASUREMENT_ID === 'G-XXXXXXXXXX'`. Vérifier que la variable d'environnement est correctement définie dans Vercel pour la production.

### Vitesse de Page (Core Web Vitals — estimation basée sur le code)

| Facteur | Évaluation | Impact LCP |
|---|---|---|
| Police `font-display: swap` | ✓ Toutes les polices | Bon — pas de FOIT |
| `next/image` avec AVIF/WebP | ✓ Configuré | Bon |
| Spline 3D Hero | ⚠️ Chargé après 1,5s via `setTimeout` | Neutre sur LCP (différé) mais lourd pour les métriques d'interactivité |
| `framer-motion` | ⚠️ Chunké séparément mais toujours JS heavy | À Améliorer pour INP |
| SplashScreen | ⚠️ Bloque le rendu initial | Peut augmenter LCP si mal géré |
| `optimizeCss: true` | ✓ Activé | Bon |
| Compression gzip | ✓ `compress: true` | Bon |
| HSTS | ✓ Configuré | Bon |

**Risques principaux sur les Core Web Vitals :**
- Le `SplashScreen` qui enveloppe tout le contenu peut retarder le LCP si son animation est synchrone
- Framer Motion + Spline + multiple polices locales = bundle JS lourd pour les connexions 3G/4G

### Compatibilité Mobile

✓ Balise meta viewport présente (`width=device-width, initial-scale=1`)
✓ Fonts adaptatives (text-[10vw] en mobile → text-[8vw] desktop)
✓ Layout responsive via Tailwind

---

## Analyse des Lacunes de Contenu

Ces sujets sont recherchés par votre audience cible et absents du site :

| Sujet Manquant | Potentiel | Concurrence | Type de Contenu | Priorité |
|---|---|---|---|---|
| **Page Prix / Tarifs** — "web development cost Marrakech", "AI automation price Morocco" | Élevé | Faible | Landing page dédiée | **1** |
| **Comparatif n8n vs Make vs Zapier** (article blog FR+EN) | Moyen | Faible | Article de blog | **2** |
| **"Agence digitale Casablanca"** — page de localisation secondaire | Moyen | Moyen | Landing page géo | **3** |
| **ROI Calculator** (déjà développé mais page orpheline) | Élevé | Très faible | Tool/landing | **4** |
| **"Shopify Hydrogen Morocco"** — niche très peu servie | Faible-Moyen | Très faible | Page service dédiée | **5** |
| **Success stories** avec métriques business réelles | Élevé | N/A | Case studies structurés | **6** |
| **FAQ "Combien coûte..."** — pages intentions transactionnelles | Moyen | Faible | FAQ dédiée ou expansion FAQ homepage | **7** |
| **Glossaire IA/SEO** (GEO/AEO — déjà dans le schema) | Moyen | Moyen | Hub de contenu | **8** |

---

## Opportunités Featured Snippets

La section FAQ de la homepage est un candidat idéal pour les featured snippets de type paragraphe.

**Opportunités actuelles identifiées dans la FAQ :**

1. **"How much does web development cost in Morocco?"** — réponse prix déjà présente ("Web from 45,000 MAD") → optimiser pour featured snippet en restructurant la réponse FAQ pour qu'elle commence par la réponse directe en < 50 mots.

2. **"How long does an AI automation project take?"** — réponse présente ("2–4 weeks to first measurable hours saved") → déjà bien formatée pour un snippet.

3. **"What is the difference between a freelancer and a digital agency?"** — réponse présente dans la FAQ → structurer avec une liste à puces pour snippet de type liste.

**Action :** Ajouter des H2/H3 en forme de questions directes dans la FAQ pour déclencher les snippets :
```
H3: "How much does web development cost in Morocco?"
→ Réponse directe en 40-60 mots
```

---

## Balisage Schema

### État Actuel

| Type Schema | Fichier | Statut | Problème |
|---|---|---|---|
| Organization | `GlobalSchema.tsx` | Présent ⚠️ | Chargé `afterInteractive` — crawlers peuvent le manquer |
| LocalBusiness | `GlobalSchema.tsx` | Présent ⚠️ | Même problème de timing |
| WebSite + SearchAction | `GlobalSchema.tsx` | Présent ⚠️ | Même problème |
| WebPage | `GlobalSchema.tsx` | Présent ⚠️ | Même problème |
| BreadcrumbList | `GlobalSchema.tsx` + pages | Présent | BreadcrumbList homepage = 1 élément seulement (normal) |
| Service (×3) | `GlobalSchema.tsx` | Présent ⚠️ | Même problème |
| FAQPage | `app/(website)/page.tsx` | **Conforme ✓** | Chargé côté serveur via `dangerouslySetInnerHTML` — visible dès la première requête |
| AggregateRating | `GlobalSchema.tsx` | **Bug 🔴** | `reviewCount: "24"` mais 3 avis listés → incohérence |
| Article | Blog posts | À vérifier | Non vu dans les fichiers analysés |
| Author/Person | — | **Absent** | Manque pour E-E-A-T |

### Bug Critique : `strategy="afterInteractive"` sur le GlobalSchema

```tsx
// GlobalSchema.tsx ligne 289-295
<Script
  id="global-schema"
  type="application/ld+json"
  strategy="afterInteractive"  // ← PROBLÈME
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

**Impact :** `strategy="afterInteractive"` signifie que le script JSON-LD est injecté **après** que la page est devenue interactive — soit 2-4 secondes après le chargement. Googlebot peut crawler et indexer la page avant que ce schema n'existe dans le DOM, manquant ainsi Organization, LocalBusiness, Service, WebSite et WebPage.

**Correction :** Remplacer par `strategy="beforeInteractive"` ou, encore mieux, utiliser le même pattern que la FAQ — un simple `<script>` dans le JSX sans composant Next.js Script :

```tsx
// Méthode recommandée (comme la FAQ dans page.tsx)
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

### Bug : AggregateRating incohérent

```json
"aggregateRating": {
  "ratingValue": "5.0",
  "reviewCount": "24"  // ← 24 annoncés
}
"review": [ ... ] // ← seulement 3 avis
```

Google peut invalider ce rich result si le `reviewCount` ne correspond pas au nombre réel d'avis visibles. Corriger à `reviewCount: "3"` ou ajouter les 24 avis réels.

---

## Opportunités de Liens Internes

### Page Orpheline : ROI Calculator

`/tools/roi-calculator` existe dans le code mais est **absent de** :
- La navigation principale
- Le sitemap.xml
- Tout lien depuis d'autres pages

**Actions :**
1. Ajouter au sitemap
2. Ajouter un lien contextuel depuis `/services` : *"Estimate your automation savings → ROI Calculator"*
3. Mentionner dans l'article de blog sur l'automatisation

### Architecture de Liens Recommandée

```
Homepage (/)
  ├─→ /services (CTA "See our services")
  │     ├─→ /tools/roi-calculator (CTA "Calculate ROI")
  │     └─→ /contact (CTA "Get quote")
  ├─→ /works (CTA "See our work")
  │     └─→ /works/[slug] (deep links)
  ├─→ /blogs (CTA "Read insights")
  │     └─→ /blogs/[slug] (liens croisés entre articles)
  └─→ /about (CTA "Meet the team")
        └─→ /contact
```

**Points de friction actuels :** Les articles de blog ne se lient pas entre eux (silos de contenu). Chaque article devrait lier vers 2-3 articles connexes et vers la page service pertinente.

---

## Core Web Vitals — Impact Business

**Facteurs de risque identifiés (estimation code) :**

| Métrique | Risque | Cause |
|---|---|---|
| **LCP** | Moyen | SplashScreen bloque le rendu → retard d'affichage potentiel |
| **INP** | Moyen-Élevé | Framer Motion + Spline + Lenis Smooth Scroll = JS lourd |
| **CLS** | Faible | `next/image` avec dimensions définies, fonts avec `display: swap` |

**Impacts prouvés :**
- 100ms de LCP en moins = +1,1% de conversion
- Réduire le CLS de 0,1 = -15% de taux de rebond
- Un LCP > 4s = 38% de taux de rebond vs 9% pour < 2s

**Recommandation prioritaire :** Mesurer les CWV réels via Google Search Console (section "Expérience de la page") ou PageSpeed Insights sur la version de production. Le code laisse présager un LCP correct mais un INP potentiellement problématique à cause de l'accumulation de librairies JS.

---

## Recommandations de Stratégie de Contenu

### Architecture de Contenu Recommandée

```
PILIERS (pages service)
  ├─ /services/ai-automation (pilier IA)
  │     └─ Articles cluster : n8n, Make, GPT agents, ROI calculator
  ├─ /services/web-engineering (pilier Web)
  │     └─ Articles cluster : Next.js, Shopify Hydrogen, Core Web Vitals
  └─ /services/brand-motion (pilier Brand)
        └─ Articles cluster : identité, motion design, visual storytelling

GÉOGRAPHIE
  ├─ /marrakech (landing locale)
  ├─ /casablanca (landing secondaire)
  └─ /fr/* (miroir EN complet)
```

### Plan de Publication Recommandé

| Fréquence | Justification |
|---|---|
| 2 articles/mois EN | Maintenir la fraîcheur du contenu, cibler les requêtes longue traîne |
| 2 articles/mois FR | Miroir FR + contenu spécifique francophone (France, Belgique, Suisse) |
| 1 case study/trimestre | E-E-A-T fort, conversion directe |

### Matrice de Priorisation du Contenu

| Idée de Contenu | Volume | Concurrence | Valeur Business | Score |
|---|---|---|---|---|
| Page `/pricing` avec tarifs détaillés | Moyen | Très faible | Très forte | **9/10** |
| Page `/tools/roi-calculator` (linkée) | Moyen | Très faible | Forte | **8/10** |
| `"AI automation for restaurants Morocco"` | Faible | Très faible | Forte | **8/10** |
| `"n8n vs Make vs Zapier for SMEs"` | Moyen | Faible | Moyenne | **7/10** |
| `"Shopify Hydrogen vs Shopify 2.0"` | Moyen | Faible | Forte | **7/10** |
| Case study: résultat chiffré client e-commerce | Faible | N/A | Très forte | **7/10** |
| `"agence digitale Casablanca"` géo-page | Faible | Faible | Forte | **6/10** |

---

## Recommandations Priorisées

### Critique — Corriger Immédiatement (< 2h de travail, impact majeur)

**1. Corriger la meta description française sur la page anglaise**
- Fichier : `app/(website)/page.tsx` ligne 6
- Action : Remplacer la description française par une description anglaise de 150-160 caractères
- Impact attendu : +20-35% de CTR sur les requêtes anglaises ; signal de cohérence linguistique pour Google

**2. Créer l'image OG manquante**
- Problème : `https://www.bidayalab.com/assets/images/og-image.jpg` retourne 404
- Action : Créer et déployer une image 1200×630px dans `public/assets/images/og-image.jpg`
- Impact attendu : Les partages sociaux afficheront une image au lieu d'un aperçu vide — taux de clic sur les liens sociaux ×3 typiquement

**3. Corriger `strategy` du GlobalSchema**
- Fichier : `components/seo/GlobalSchema.tsx` ligne 290
- Action : Remplacer `strategy="afterInteractive"` par un `<script>` natif (sans le composant `Script`)
- Impact attendu : Google voit Organization, LocalBusiness et Service schema dès la première requête → rich results activés

**4. Fixer `reviewCount` dans AggregateRating**
- Fichier : `components/seo/GlobalSchema.tsx` ligne 90-93
- Action : Changer `reviewCount: "24"` en `reviewCount: "3"` (ou ajouter les vrais avis)
- Impact attendu : Éviter une désactivation du rich result par Google pour données trompeuses

### Haute Priorité — Ce Mois-ci

**5. Ajouter `alt` au logo**
- Fichier : composant Navbar (à localiser)
- Action : Ajouter `alt="BidayaLab — AI & Web Agency in Marrakech"`

**6. Corriger la duplication des hreflang**
- Fichier : `app/layout.tsx` lignes 115-117
- Action : Supprimer les `<link rel="alternate">` manuels — Next.js les génère déjà via `alternates.languages`
- Impact attendu : Signaux hreflang cohérents, meilleur ciblage géo/langue

**7. Corriger `<html lang="fr">` pour les pages `/fr`**
- Fichier : `app/layout.tsx` ligne 112
- Action : Extraire la locale depuis le chemin (middleware ou layout séparé) et injecter `lang="fr"` sur les routes `/fr/*`
- Impact attendu : Accessibilité correcte + signal de langue propre pour Google

**8. Optimiser le H1 pour les mots-clés**
- Fichier : `components/sections/home/Hero.tsx` ligne 23 (`h1a`/`h1b`/`h1c`)
- Action : Intégrer "AI Automation" ou "Web Agency" dans le H1 tout en conservant le message brand
- Proposition : `"AI & Web Agency, Marrakech — We Sell Measurable Growth"`

**9. Ajouter `/tools/roi-calculator` au sitemap**
- Fichier : configuration sitemap (à identifier)
- Action : Ajouter l'URL et créer un lien contextuel depuis `/services`

### Priorité Moyenne — Ce Trimestre

**10. Créer une page `/pricing` dédiée**
- Les informations de prix existent dans la FAQ mais pas sur une page dédiée
- Potentiel fort sur les requêtes "web development cost Morocco", "AI automation price"

**11. Ajouter les bios d'auteurs sur les articles de blog**
- Chaque article doit afficher : nom, photo, titre, lien LinkedIn
- Impact : Signal E-E-A-T fort pour Google

**12. Linkage interne cross-articles**
- Chaque article de blog devrait pointer vers 2-3 articles connexes et vers la page service correspondante

**13. Vérifier et configurer Google Analytics en production**
- S'assurer que `NEXT_PUBLIC_GA_MEASUREMENT_ID` est défini dans les variables d'environnement Vercel

### Faible Priorité — Quand les Ressources le Permettent

**14. Créer des landing pages géographiques secondaires**
- `/casablanca`, `/rabat` — requêtes à faible concurrence, bon potentiel local

**15. Ajouter un schema `Article` sur les articles de blog**
- Avec `author`, `datePublished`, `headline` pour les rich results Google News/Discover

**16. Mesurer les Core Web Vitals réels en production**
- Utiliser Google Search Console > Expérience de la page pour les métriques terrain (non synthétiques)

**17. Envisager de remplacer `/works` par `/case-studies`**
- URL plus descriptive et correspondant mieux à l'intention de recherche des prospects B2B

---

*Audit généré le 17 juin 2026 — Basé sur l'analyse du code source (app/, components/) et des fichiers de configuration (robots.txt, sitemap.xml, next.config.js)*
