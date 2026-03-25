# BidayaLab.com — Full SEO Audit Report
**Date:** March 25, 2026  
**URL:** https://www.bidayalab.com/  
**Business Type Detected:** Digital Agency / B2B Services  
**Framework:** Next.js (Server-Side Rendered)

---

## Executive Summary

### Overall SEO Health Score: 58/100

```
Technical SEO:     68/100  ██████▊░░░  (25%)
Content Quality:   50/100  █████░░░░░  (25%)
On-Page SEO:       55/100  █████▌░░░░  (20%)
Schema:            10/100  █░░░░░░░░░  (10%)
Performance (CWV): 72/100  ███████▏░░  (10%)
Images:            85/100  ████████▌░  (5%)
AI Search (GEO):   55/100  █████▌░░░░  (5%)
```

**Weighted Score: 58/100**

### Top 5 Critical Issues
1. **❌ NO Schema/Structured Data** — Zero JSON-LD markup found. Missing Organization, WebSite, Service schemas
2. **❌ Duplicate H1 tags** — 2 H1s found on homepage (should be exactly 1)
3. **❌ Canonical URL mismatch** — Canonical points to `https://bidayalab.com` but site is served at `https://www.bidayalab.com/`
4. **❌ Title tag has duplicate brand name** — Shows "... | BidayaLab | BidayaLab" in browser tab
5. **❌ /services page missing from sitemap** — Navigation links to /services but it's not in sitemap.xml

### Top 5 Quick Wins
1. Add Organization + WebSite JSON-LD schema (high impact, 30 min)
2. Fix canonical to include `www` prefix (5 min)
3. Merge two H1s into one H1 + one subtitle element (15 min)
4. Fix duplicate brand name in title tag (5 min)
5. Add /services to sitemap.xml (5 min)

---

## 1. Technical SEO — 68/100

### Category Breakdown

| Category | Status | Score | Notes |
|----------|--------|-------|-------|
| Crawlability | ✅ | 85/100 | robots.txt well configured |
| Indexability | ⚠️ | 55/100 | Canonical mismatch is serious |
| Security | ✅ | 80/100 | HTTPS enforced |
| URL Structure | ✅ | 90/100 | Clean, descriptive URLs |
| Mobile | ✅ | 85/100 | Viewport set, responsive design |
| Core Web Vitals | ⚠️ | 72/100 | Font preloading good, but 6 font files is heavy |
| Structured Data | ❌ | 0/100 | No JSON-LD found |
| JS Rendering | ✅ | 85/100 | Next.js SSR, content in initial HTML |
| IndexNow | ⚠️ | 30/100 | Not implemented |

### 1.1 Crawlability ✅
- **robots.txt:** Well configured
  - Blocks `/dashboard/`, `/api/`, `/admin/` ✅
  - Allows GPTBot, ChatGPT-User, ClaudeBot, Google-Extended ✅
  - Blocks Bytespider, CCBot (training crawlers) ✅
  - References sitemap.xml ✅
- **XML Sitemap:** Present at `/sitemap.xml` with 23 URLs ✅
  - All URLs have `<lastmod>` dates ✅
  - ⚠️ **Missing `/services` page** — linked in navigation but absent from sitemap
- **JavaScript Rendering:** Next.js with SSR — content is in initial HTML ✅

### 1.2 Indexability ⚠️
- **Canonical tag:** `<link rel="canonical" href="https://bidayalab.com"/>`
  - **❌ CRITICAL: Missing `www` prefix.** Site serves at `https://www.bidayalab.com/` but canonical points to `https://bidayalab.com`. This creates a www vs non-www conflict. Google may choose either version unpredictably.
  - **Fix:** Change to `https://www.bidayalab.com/` (or set up a 301 redirect from non-www to www)
- **Meta robots:** `index, follow` ✅
- **Googlebot directives:** `index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1` ✅ (allows full rich results)
- **Hreflang:** Not present (acceptable if single-language site)
- **Duplicate content:** No obvious issues

### 1.3 Security ✅
- HTTPS enforced ✅
- SSL certificate valid ✅
- Security headers: Cannot fully verify from HTML alone, recommend checking via securityheaders.com

### 1.4 URL Structure ✅
- Clean URLs: `/about`, `/services`, `/works`, `/blogs`, `/contact` ✅
- Logical hierarchy: `/works/pets-house-adoption`, `/blogs/ai-automation-sme-growth-profitability` ✅
- Hyphenated, lowercase ✅
- No query parameters for content pages ✅

### 1.5 Mobile ✅
- Viewport meta tag present ✅
- Responsive CSS with `md:` and `lg:` breakpoints (Tailwind) ✅
- Mobile-first indexing ready ✅

### 1.6 Core Web Vitals ⚠️
- **LCP hints:**
  - Hero images preloaded ✅
  - Logo preloaded ✅
  - ⚠️ 6 font files preloaded (TTF, OTF, WOFF2) — heavy for initial load. Consider subsetting or reducing font variants.
- **INP hints:**
  - Scripts loaded with `async` ✅
  - framer-motion loaded (animation library) — ⚠️ can add JS weight
- **CLS hints:**
  - Logo images have explicit `width`/`height` ✅
  - Service images use `data-nimg="fill"` with absolute positioning (Next.js pattern) ✅

### 1.7 IndexNow ⚠️
- Not implemented. Recommended for faster indexing on Bing, Yandex, Naver.

---

## 2. On-Page SEO — 55/100

### 2.1 Title Tag ⚠️
```
Digital Transformation Agency for SMEs | AI & Web Solutions | BidayaLab
```
- Length: ~72 characters — **slightly over the 50-60 char recommendation** (may get truncated in SERPs)
- Primary keyword present: "Digital Transformation Agency" ✅
- **❌ Browser tab shows "... | BidayaLab | BidayaLab"** — duplicate brand suffix. The page title from the fetch shows the brand name appended twice.
- **Recommendation:** Shorten to `Digital Transformation Agency for SMEs | BidayaLab` (52 chars)

### 2.2 Meta Description ✅
```
We help ambitious startups and SMEs scale with AI automation, custom web development, 
and visual storytelling. Let's build your digital future together.
```
- Length: ~156 characters ✅ (within 150-160 range)
- Compelling, includes keywords ✅
- Call to action present ✅

### 2.3 Heading Structure ❌

| Level | Count | Content |
|-------|-------|---------|
| H1 | **2** ❌ | "Your Strategic Partner for Digital Transformation." + "Let's Scale Your Business." |
| H2 | 6 | "Full-Spectrum Digital Capabilities.", "Selected Case Studies.", "What Clients Say About Us.", "Latest Insights.", "Questions? Answers.", "Let's Grow Together." |
| H3 | 3 | "AI Automation", "Web Development", "Visual Storytelling" |
| H4 | 1 | "Ahmed Benali" (testimonial) |

**Issues:**
- **❌ Two H1 tags** — Must have exactly 1 H1 per page. "Your Strategic Partner for Digital Transformation." should be demoted to a subtitle/tagline (`<p>` or `<span>`), keeping only "Let's Scale Your Business." as H1.
- ⚠️ H2s use decorative formatting ("Full-Spectrum**\n**Digital Capabilities.") — the line breaks inside headings may affect how search engines parse them.
- ⚠️ H4 used for testimonial author name — skip from H2 to H4 breaks hierarchy. Should be H3 or styled `<p>`.

### 2.4 Internal Linking ⚠️
- Navigation links: Home, About, Services, Work, Blog, Contact, Privacy, Terms
- Only 2 CTA links found on homepage ("Let's Talk Growth" → /contact, "Get in Touch" → /contact)
- ⚠️ **No contextual internal links** within content sections (e.g., service descriptions don't link to individual service pages)
- ⚠️ Blog post links not visible in extracted content (may be dynamically loaded)

### 2.5 Keyword Optimization ⚠️
- **Keywords meta:** `digital transformation agency, AI automation for business, web development for startups, SME digital solutions, business automation services, custom web development agency, AI chatbot development, startup web agency, digital growth partner, BidayaLab`
- Primary keyword "digital transformation agency" appears in title and content ✅
- ⚠️ Homepage content is relatively thin — primarily section headings with brief descriptions
- ⚠️ No keyword usage in H2/H3 headings (they use creative/branded language instead of search-optimized terms)

---

## 3. Schema & Structured Data — 10/100

### ❌ NO Schema Markup Found

Zero JSON-LD, Microdata, or RDFa detected on the homepage. This is a **major missed opportunity**.

### Required Schema for This Business Type

| Schema Type | Priority | Status |
|------------|----------|--------|
| Organization | Critical | ❌ Missing |
| WebSite (with SearchAction) | Critical | ❌ Missing |
| Service (×3) | High | ❌ Missing |
| WebPage | High | ❌ Missing |
| BreadcrumbList | Medium | ❌ Missing |
| Review/AggregateRating | Medium | ❌ Missing |

### Recommended JSON-LD — Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "BidayaLab",
  "url": "https://www.bidayalab.com",
  "logo": "https://www.bidayalab.com/assets/icons/newlogo.png",
  "description": "Digital transformation agency helping SMEs scale with AI automation, web development, and visual storytelling.",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "url": "https://www.bidayalab.com/contact"
  },
  "sameAs": [
    "[YOUR_LINKEDIN_URL]",
    "[YOUR_TWITTER_URL]",
    "[YOUR_INSTAGRAM_URL]"
  ],
  "foundingDate": "[YEAR]",
  "areaServed": "[YOUR_TARGET_REGIONS]",
  "knowsAbout": ["AI Automation", "Web Development", "Visual Storytelling", "Digital Transformation"]
}
```

### Recommended JSON-LD — WebSite

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "BidayaLab",
  "url": "https://www.bidayalab.com"
}
```

### Recommended JSON-LD — Service (repeat for each service)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Automation",
  "description": "We automate your workflows with intelligent chatbots and seamless CRM integrations.",
  "provider": {
    "@type": "Organization",
    "name": "BidayaLab"
  },
  "serviceType": "AI Automation Services",
  "areaServed": "[YOUR_TARGET_REGIONS]"
}
```

---

## 4. Content Quality & E-E-A-T — 50/100

### E-E-A-T Breakdown

| Factor | Score | Key Signals |
|--------|-------|-------------|
| Experience | 12/25 | Case studies exist but no details visible on homepage |
| Expertise | 10/25 | No team bios, credentials, or author information |
| Authoritativeness | 10/25 | No external proof, awards, or citations visible |
| Trustworthiness | 18/25 | Privacy policy ✅, Terms ✅, HTTPS ✅, Contact page ✅ |

### Issues
- **❌ No team/founder bios** — Who is behind BidayaLab? No expertise signals
- **❌ No case study details on homepage** — "Selected Case Studies" section has no visible project details or results
- **⚠️ Only 1 testimonial** — "Ahmed Benali, CEO, TechVentures" is the only social proof
- **⚠️ No publication dates** on any homepage content
- **⚠️ FAQ section appears to have only 1 visible answer** — needs expansion
- **⚠️ Homepage content is thin** — mostly section headings and brief taglines, estimated ~400-500 words of unique content (minimum 500 for homepage)

### Recommendations
1. Add a "Team" or "About the Founder" section with credentials
2. Show 3-5 testimonials with company logos
3. Add metrics to case studies (e.g., "Increased conversions by 40%")
4. Expand FAQ to 5-7 questions with detailed answers
5. Add more descriptive content to each service section

---

## 5. Images — 85/100

### Image Audit Summary

| Metric | Status | Count |
|--------|--------|-------|
| Total Images | - | 6 |
| Missing Alt Text | ✅ | 0 |
| WebP Format | ✅ | 4/6 (service + testimonial images) |
| Lazy Loading | ✅ | 4/6 (below-fold correctly lazy-loaded) |
| Dimensions Set | ✅ | 2/6 explicit, 4/6 via CSS fill |
| srcSet/Responsive | ✅ | 6/6 |

### Details
- **Logo:** `alt="Bidayalab"`, width/height set, NOT lazy-loaded (correct for above-fold) ✅
- **Service images:** WebP format, descriptive alt text ("AI Automation", "Web Development", "Visual Storytelling"), responsive srcSet ✅
- **Testimonial image:** WebP, alt text present ✅

### Minor Issues
- ⚠️ Logo alt text is "Bidayalab" — could be more descriptive: "BidayaLab - Digital Transformation Agency Logo"
- ⚠️ Hero/LCP image: No `fetchpriority="high"` attribute on the main hero image
- ⚠️ Only 6 images total on homepage — consider adding project screenshots, team photos, or partner logos for richer content

---

## 6. AI Search Readiness (GEO) — 55/100

### AI Crawler Access ✅
| Crawler | Status |
|---------|--------|
| GPTBot (OpenAI) | ✅ Allowed |
| ChatGPT-User (OpenAI) | ✅ Allowed |
| ClaudeBot (Anthropic) | ✅ Allowed |
| Google-Extended (Gemini) | ✅ Allowed |
| PerplexityBot | ⚠️ Not explicitly mentioned (default: allowed) |
| Bytespider (ByteDance) | 🚫 Blocked |
| CCBot (Common Crawl) | 🚫 Blocked |

### llms.txt ❌
- No `/llms.txt` file detected. This emerging standard helps AI crawlers understand your site structure.

### Citability Score: Low ⚠️
- ❌ No self-contained answer blocks (134-167 words) that AI can extract and cite
- ❌ No specific statistics, data points, or quotable facts on homepage
- ❌ No question-based headings (e.g., "What is digital transformation?")
- ⚠️ Content is marketing-focused, not informational — low AI citation potential for the homepage

### SSR Check ✅
- Next.js with server-side rendering — critical content is in initial HTML ✅
- AI crawlers do NOT execute JavaScript, so SSR is essential

### Recommendations
1. **Create `/llms.txt`** file with site structure and key pages
2. **Add PerplexityBot** explicitly to robots.txt Allow rules
3. **Add data points** to homepage (e.g., "Helped 50+ SMEs automate their workflows")
4. **Create question-based blog content** optimized for AI citation
5. **Build entity presence** on Wikipedia, Reddit, YouTube, LinkedIn for brand mention signals

---

## 7. Sitemap Analysis

### Sitemap: https://www.bidayalab.com/sitemap.xml

| Metric | Value |
|--------|-------|
| Total URLs | 23 |
| Pages | 7 (home, about, works, blogs, contact, privacy, terms) |
| Case Studies | 7 |
| Blog Posts | 9 |
| Last Modified | 2026-03-25 (today) |

### Issues
- **❌ Missing `/services`** — linked in navigation but not in sitemap
- ⚠️ All core pages share the same `lastmod` timestamp — suggests auto-generated dates rather than actual modification tracking
- ⚠️ Blog posts all share `2026-02-13` lastmod — no individual update tracking

---

## Priority Action Plan

### 🔴 Critical (Fix Immediately)

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| 1 | Add Organization + WebSite JSON-LD schema | High — enables rich results, brand knowledge panel | 30 min |
| 2 | Fix canonical URL to `https://www.bidayalab.com/` | High — prevents indexing confusion | 5 min |
| 3 | Fix duplicate H1 (keep 1, demote other) | High — heading structure is a core ranking signal | 15 min |
| 4 | Fix duplicate "BidayaLab" in title tag | Medium — affects CTR in SERPs | 5 min |

### 🟠 High Priority (Fix Within 1 Week)

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| 5 | Add Service schema for all 3 services | Medium — rich result eligibility | 30 min |
| 6 | Add `/services` page to sitemap | Medium — ensures indexing | 5 min |
| 7 | Add team/founder bio for E-E-A-T | High — trust and expertise signals | 1-2 hrs |
| 8 | Expand testimonials to 3-5 | Medium — social proof for E-E-A-T | 1 hr |
| 9 | Add `fetchpriority="high"` to hero/LCP image | Medium — improves LCP score | 5 min |

### 🟡 Medium Priority (Fix Within 1 Month)

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| 10 | Create `/llms.txt` file | Medium — AI search visibility | 30 min |
| 11 | Add PerplexityBot to robots.txt | Low-Med — AI search coverage | 5 min |
| 12 | Expand FAQ section to 5-7 questions | Medium — content depth + AI citability | 1-2 hrs |
| 13 | Add contextual internal links in service descriptions | Medium — link equity distribution | 30 min |
| 14 | Add BreadcrumbList schema | Low-Med — SERP enhancement | 15 min |
| 15 | Optimize heading text for keywords | Medium — ranking signals | 30 min |

### 🟢 Low Priority (Backlog)

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| 16 | Implement IndexNow for Bing/Yandex | Low — faster non-Google indexing | 1 hr |
| 17 | Add more descriptive logo alt text | Low — accessibility + image SEO | 5 min |
| 18 | Reduce font file count (6 → 2-3) | Low — performance micro-optimization | 1-2 hrs |
| 19 | Add Review/AggregateRating schema | Low-Med — requires real review data | 30 min |
| 20 | Build Wikipedia/Reddit brand presence | High long-term — AI citation signals | Ongoing |

---

## Comparison: What Changed Since Last Audit

Based on the improvements visible in the current site:

| Element | Status |
|---------|--------|
| robots.txt with AI crawler rules | ✅ Well done |
| Sitemap.xml | ✅ Present |
| Meta description | ✅ Good |
| Open Graph tags | ✅ Complete |
| Twitter Card tags | ✅ Complete |
| Googlebot directives | ✅ Optimal |
| WebP image format | ✅ Implemented |
| Next.js Image optimization | ✅ Using srcSet |
| Responsive design | ✅ Tailwind breakpoints |
| All images have alt text | ✅ Achieved |

**The biggest remaining gaps are: Schema markup, canonical URL fix, and H1 structure.**

---

*Report generated using Claude SEO skill methodology. For live SERP data, backlink analysis, and Core Web Vitals field data, consider running with DataForSEO, Ahrefs, or Semrush MCP integrations.*
