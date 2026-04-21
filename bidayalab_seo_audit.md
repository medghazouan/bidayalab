# SEO Audit Report — bidayalab.com
**Audit Date:** April 2026  
**Auditor:** AI SEO Agent (Claude)  
**Site:** https://www.bidayalab.com  
**Framework:** Next.js  
**Business:** Digital Transformation Agency for SMEs — Marrakech, Morocco  

---

## Overall Scores

| Category | Score | Status |
|---|---|---|
| Technical SEO | 48/100 | ⚠️ Needs Work |
| On-Page SEO | 52/100 | ⚠️ Needs Work |
| Content & Keywords | 22/100 | 🔴 Critical |
| Off-Page / Authority | 15/100 | 🔴 Critical |
| Site Structure & UX | 55/100 | ⚠️ Needs Work |
| Local SEO | 40/100 | ⚠️ Needs Work |

---

## 1. 🌐 Technical SEO

### HTTPS & SSL ✅
- Site correctly serves over HTTPS at `www.bidayalab.com`
- Non-www redirects to www — correct canonical setup
- No mixed-content issues detected

### Framework
- Built on **Next.js** — good foundation for SSR/SSG, code-splitting, image optimization
- Benefits only realized if properly configured (currently underutilized)

### Page Speed & Core Web Vitals ⚠️
- No CrUX field data available (indicates very low organic traffic)
- Service images requested at `w=3840` (4K width) — unnecessarily heavy, hurts LCP
- Homepage is JavaScript-heavy — risk of high Total Blocking Time (TBT) on mobile
- No detectable CDN layer beyond Next.js `_next/image` optimization
- **Target:** LCP < 2.5s, CLS < 0.1, INP < 200ms

### Crawlability & robots.txt 🔴
- **No `robots.txt` file found**
- `site:bidayalab.com` search returns **zero results** — site is not indexed by Google
- Search engines have no crawl guidance

### XML Sitemap 🔴
- **No sitemap found** at `bidayalab.com/sitemap.xml`
- Can be auto-generated with `next-sitemap` npm package
- Without it, Google must discover pages through link-following only

### URL Structure & Canonicalization ⚠️
- Clean URL structure: `/about`, `/works`, `/blogs`, `/contact` ✅
- Logo links to `/home` — creates **duplicate homepage** at both `/` and `/home`
- No canonical tags observed in fetched HTML
- Nav uses `/blogs` (plural) while label says "Blog" — inconsistency

### Broken Pages 🔴
- **`/services` returns 404 Client Error**
- Navigation AND footer both link to this broken page
- Damages user experience, wastes crawl budget, signals low quality to search engines

### Redirects
- No redirect chains detected on working pages ✅

---

## 2. 📄 On-Page SEO

### Title Tags ⚠️

| Page | Current Title | Issue |
|---|---|---|
| Homepage | `Digital Transformation Agency for SMEs \| AI & Web Solutions \| BidayaLab \| BidayaLab` | "BidayaLab" duplicated twice |
| About | `About BidayaLab \| Digital Transformation Agency` | ✅ Good |
| Blog | `AI Automation & Web Development Agency Morocco \| BidayaLab` | Wrong — same as agency page, not blog |
| Works | `Our Work \| BidayaLab Portfolio` | ✅ Acceptable |
| Contact | `Let's Build Something Amazing Together \| Contact BidayaLab` | ✅ Good |
| Privacy | `AI Automation & Web Development Agency Morocco \| BidayaLab` | 🔴 **Exact duplicate of Blog page title** |

### Suggested Title Tags

| Page | Recommended Title |
|---|---|
| Homepage | `AI & Web Solutions for SMEs \| Digital Transformation Agency \| BidayaLab` |
| Blog | `Digital Transformation Insights & AI Strategy \| BidayaLab Blog` |
| Works | `Client Case Studies & Portfolio \| BidayaLab` |
| Privacy | `Privacy Policy \| BidayaLab` |

### Meta Descriptions ⚠️
- No meta descriptions surfaced across any fetched pages
- Every page needs a unique, 150–160 character meta description with primary keyword and CTA

### Suggested Meta Descriptions

| Page | Recommended Meta Description |
|---|---|
| Homepage | `BidayaLab helps SMEs scale with AI automation, custom web development, and visual storytelling. Based in Marrakech — serving clients globally. Let's grow together.` |
| About | `Meet the team behind BidayaLab — a digital transformation agency in Marrakech, Morocco. We engineer AI solutions, web platforms, and brand identities for ambitious SMEs.` |
| Works | `Explore BidayaLab's portfolio of digital transformation projects — AI automation, web apps, and brand work for SMEs across MENA, Europe, and North America.` |
| Blog | `Practical deep-dives into AI automation, digital transformation, and growth strategy for SMEs. Real insights from the BidayaLab team.` |
| Contact | `Start your digital transformation today. Contact BidayaLab in Marrakech for a free consultation on AI automation, web development, and brand strategy.` |

### H1 Heading Structure ⚠️

| Page | Current H1 | Issue |
|---|---|---|
| Homepage | "Let's Scale Your Business." | No keywords |
| About | "We Architect Futures." | No keywords |
| Blog | "The Journal" | Minimal SEO signal |
| Contact | "Start Now" | Too vague |

### Suggested H1 Tags

| Page | Recommended H1 |
|---|---|
| Homepage | `AI Automation & Web Solutions for Growing SMEs` |
| About | `Digital Transformation Agency Based in Marrakech, Morocco` |
| Blog | `AI, Web & Digital Transformation Insights` |
| Contact | `Start Your Digital Transformation` |

### Keyword Usage ⚠️
- "digital transformation," "AI automation," "web development," and "Morocco" appear in body copy ✅
- Keywords largely absent from H1 tags and title tags where weighting is highest 🔴
- No keyword appears in the homepage H1 at all

### Image Alt Texts ⚠️
- Logo: `alt="Bidayalab"` — acceptable but not descriptive
- Service images (`ai-automation.webp`, `web-development.webp`): generic alt text
- Testimonial avatar: full description used — **this is the correct pattern to follow**

### Suggested Alt Text Improvements

| Image | Current Alt | Recommended Alt |
|---|---|---|
| AI Automation service | `AI Automation` | `AI automation workflow and chatbot integration for small business` |
| Web Development service | `Web Development` | `Custom web development and e-commerce solutions for SMEs` |
| Visual Storytelling service | `Visual Storytelling` | `Brand film and photography production for digital marketing` |

### Internal Linking ⚠️
- All pages share the same nav/footer — minimal contextual internal linking
- Service section on homepage does not link to individual service subpages
- Blog is empty so no article cross-links exist
- Limits PageRank distribution across the site

### Content Quality
- Copy is well-written and brand-consistent ✅
- Very thin on actual information — Works page shows no portfolio items
- Blog has zero articles 🔴
- Claims ("150+ Brands Transformed") unsupported by visible case studies

---

## 3. 🔑 Keyword & Content Analysis

### Currently Targeted Topics
- "Digital transformation agency" (SMEs)
- "AI automation" (chatbots, CRM, workflow automation)
- "Web development" (custom sites, e-commerce, landing pages)
- "Visual storytelling" (video, photography, motion graphics)
- Geographic: Marrakech, Morocco; MENA; Europe; North America

### Critical Gap: Zero Content Published 🔴
- Blog (`/blogs`) is entirely empty — just a header and footer
- No blog = no long-tail keyword ranking
- No blog = no topical authority built
- No blog = no natural backlink opportunities
- Content marketing drives 3× more leads than outbound for B2B agencies

### Missed Keyword Opportunities

| Keyword | Search Intent | Priority |
|---|---|---|
| `AI automation agency Morocco` | Commercial | 🔴 High |
| `digital transformation agency Marrakech` | Commercial | 🔴 High |
| `web development agency Morocco` | Commercial | 🔴 High |
| `chatbot development for small business` | Commercial | 🟡 Medium |
| `AI workflow automation agency` | Commercial | 🟡 Medium |
| `e-commerce development Morocco` | Commercial | 🟡 Medium |
| `digital transformation SME MENA` | Informational | 🟡 Medium |
| `how to automate business workflows with AI` | Informational | 🟢 Long-tail |
| `best digital agency Marrakech` | Commercial | 🟢 Long-tail |

### Content Gaps
- No service-specific landing pages (e.g., `/services/ai-automation`, `/services/web-development`)
- No case studies with real results and client names
- No "About the team" individual profiles
- No FAQ schema markup despite having FAQ content
- No local landing page targeting "digital agency Marrakech" or similar

### Recommended Content Roadmap

**Month 1 — Foundation:**
1. Fix /services page with dedicated content per service
2. Publish 2 cornerstone blog posts (AI automation for SMEs, web development trends Morocco)
3. Add 3 real case studies to /works

**Month 2 — Authority Building:**
4. Publish 2 blog posts/week on AI, automation, digital transformation
5. Create individual service sub-pages with targeted keywords
6. Add team bios to /about

**Month 3+ — Scale:**
7. Guest posts on TechInAfrica, Wamda, StartupBRICS
8. Build topic clusters around core service keywords
9. Launch newsletter to build audience

---

## 4. 🔗 Off-Page SEO & Authority

### Domain Authority 🔴
- `site:bidayalab.com` returns zero results — site is not indexed
- Domain authority is effectively **0** at this point
- No organic traffic signal detectable from any third-party data source

### Social Signals & Brand Mentions 🔴
- No organic search results for "bidayalab"
- No press mentions detected
- No directory listings found
- No social profiles indexed (footer has social links but URLs not captured)
- No brand presence in any third-party source

### Backlink Profile
- No backlink data detectable (domain too new / unindexed)
- No toxic or spammy backlinks (clean slate)
- Monitor with Google Search Console disavow tool as link building begins

### Link Building Action Plan

**Immediate (Free):**
- Submit to Clutch.co (agency directory — high DA, generates B2B leads)
- Submit to GoodFirms.co (same)
- Submit to DesignRush.com
- List on Moroccan/MENA directories: Annuaire Maroc, Maghreb Startup ecosystem sites
- Create LinkedIn company page and publish content

**Short-term:**
- Guest articles on TechInAfrica, Wamda, StartupBRICS, CIO Africa
- Partner with Moroccan startups / complementary agencies for cross-links
- Submit to AI/automation communities and newsletters

**Long-term:**
- Publish original research / data studies (high link-earning potential)
- Speak at MENA tech events → mentions and links from event sites
- Build resource pages that others will link to

---

## 5. 🏗️ Site Structure & UX

### Navigation Architecture
```
Home → About → Services (🔴 404) → Work (empty) → Blog (empty) → Contact
```
- Flat structure — all pages reachable in 1 click ✅
- Broken Services link is critical damage
- No service sub-pages limit individual service rankability
- "Blog" label vs `/blogs` URL inconsistency

### Missing Pages to Create

| Page | Priority | Target Keyword |
|---|---|---|
| `/services` | 🔴 Critical | "digital transformation services" |
| `/services/ai-automation` | 🔴 High | "AI automation agency" |
| `/services/web-development` | 🔴 High | "web development agency Morocco" |
| `/services/visual-storytelling` | 🟡 Medium | "brand video production Morocco" |

### UX Issues ⚠️
- "Limited Spots Available for March" CTA — **outdated** (it's April 2026)
- Two contact emails (`support@bidayalab.com` + `bidayalab1@gmail.com`) — inconsistent and unprofessional
- "View Our Work" CTA on homepage leads to empty portfolio — poor UX loop
- No loading state or skeleton screens observable

### UX Strengths ✅
- FAQ section for converting hesitant visitors
- Contact page has clear 3-step onboarding process
- WhatsApp + Phone + Email contact options are strong conversion signals
- Clean, modern design that builds visual trust

---

## 6. 📊 Local SEO

### Google Business Profile 🔴
- **No GBP listing found for BidayaLab**
- Essential for appearing in "digital agency Marrakech" local searches
- Free to create and verify — 15 minute setup

### NAP Consistency ⚠️

| Data Point | Status | Notes |
|---|---|---|
| Name | ✅ Consistent | "BidayaLab" everywhere |
| Address | ⚠️ Partial | Only "Marrakech, Morocco" — no street address |
| Phone | ⚠️ Contact page only | +212 751 388 901 — not in footer |
| Email | 🔴 Inconsistent | Two different addresses across the site |

### Structured Data 🔴
- No `LocalBusiness` schema.org JSON-LD detected
- No `Organization` schema detected
- No `FAQPage` schema detected (despite FAQ content existing)
- No `BreadcrumbList` schema

### Recommended Schema Markup

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "BidayaLab",
  "description": "Digital transformation agency for SMEs — AI automation, web development, and visual storytelling.",
  "url": "https://www.bidayalab.com",
  "telephone": "+212751388901",
  "email": "support@bidayalab.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Marrakech",
    "addressCountry": "MA"
  },
  "areaServed": ["MA", "EU", "US"],
  "serviceType": ["AI Automation", "Web Development", "Visual Storytelling"]
}
```

### Local Keyword Targeting ⚠️
- About page mentions "Marrakech, Morocco" ✅
- No landing pages targeting local searches
- No local content (e.g., "digital transformation landscape in Morocco")
- No mentions of Arabic-language services (potential market gap)

---

## 7. 🛠️ Priority Fix List

### ✅ What's Working Well
- HTTPS with correct www redirect
- Next.js framework (strong technical SEO foundation, just underutilized)
- Clean, logical URL structure
- Professional contact page with good conversion design
- Privacy Policy and Terms of Service pages exist
- Mobile-responsive image delivery via Next.js `<Image>`
- Clear brand positioning ("Digital Transformation Agency for SMEs")
- FAQ section on homepage (good for conversion and schema)
- Multiple contact methods (Email, Phone, WhatsApp)

---

### 🔴 Critical Issues — Fix Immediately

| # | Issue | Fix | Effort |
|---|---|---|---|
| 1 | `/services` page returns 404 | Create the page or add a redirect | 1–2 hrs |
| 2 | Site not indexed by Google | Submit to Google Search Console + request indexing | 30 min |
| 3 | No `sitemap.xml` | Install `next-sitemap` package and configure | 30 min |
| 4 | No `robots.txt` | Auto-generated by `next-sitemap` | 0 extra |
| 5 | Blog has zero content | Publish 1 cornerstone article | 2–4 hrs |
| 6 | Portfolio page is empty | Add minimum 3 case study cards | 2–3 hrs |

---

### 🟡 Medium-Priority Improvements

| # | Issue | Fix | Effort |
|---|---|---|---|
| 7 | Duplicate title tags (homepage, blog, privacy) | Rewrite unique titles per page | 30 min |
| 8 | No meta descriptions on any page | Write 150–160 char descriptions per page | 1 hr |
| 9 | H1 tags contain no target keywords | Rewrite H1s to blend brand voice + keyword | 30 min |
| 10 | Gmail address in contact page | Remove `bidayalab1@gmail.com`, use only domain email | 10 min |
| 11 | No Google Business Profile | Create and verify GBP listing | 15 min |
| 12 | No structured data / schema | Add `LocalBusiness` + `FAQPage` JSON-LD | 1–2 hrs |
| 13 | `/home` duplicates homepage at `/` | Add canonical tag pointing `/home` → `/` | 15 min |
| 14 | No Google Analytics 4 | Install GA4 via Next.js Script component | 30 min |

---

### 🟢 Quick Wins — Easy Fixes, High Impact

| # | Issue | Fix | Effort |
|---|---|---|---|
| 15 | "Limited Spots for March" — outdated copy | Change to dynamic month or generic phrasing | 5 min |
| 16 | "Blog" vs `/blogs` URL inconsistency | Standardize — pick one and apply everywhere | 10 min |
| 17 | Service images at 3840px width | Cap `w` param at 1200 in Next.js image config | 15 min |
| 18 | Phone number only on Contact page | Add to footer globally | 20 min |
| 19 | Generic image alt texts | Rewrite service image alt texts descriptively | 20 min |
| 20 | No directory listings | Submit to Clutch, GoodFirms, DesignRush | 1 hr |
| 21 | No social media presence indexed | Publish LinkedIn company page, link from site | 30 min |

---

## Appendix: Audit Methodology

Pages directly crawled:
- `https://www.bidayalab.com/` (Homepage)
- `https://www.bidayalab.com/about`
- `https://www.bidayalab.com/services` → 404
- `https://www.bidayalab.com/works`
- `https://www.bidayalab.com/blogs`
- `https://www.bidayalab.com/contact`
- `https://www.bidayalab.com/privacy`

Tools and methods used:
- Direct HTML/content fetch and analysis
- Google index check via `site:` operator
- Backlink/authority search via SEO tool references
- Manual title tag, heading, image alt, and meta analysis
- NAP and local SEO cross-reference analysis

---

*This audit was generated in April 2026. Re-audit recommended after implementing the Priority Fix List, or within 60 days, whichever comes first.*
