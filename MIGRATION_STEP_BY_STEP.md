# 🚀 NEXT.JS TO REACT MIGRATION - STEP-BY-STEP GUIDE

## 📋 PHASE 1: CREATE NEW REACT PROJECT

### **Step 1.1: Create Vite + React + TypeScript Project**

```bash
# Create new project
npm create vite@latest meddigital-react -- --template react-ts

# Navigate to project
cd meddigital-react

# Install dependencies
npm install
```

### **Step 1.2: Install Required Dependencies**

```bash
# Core dependencies
npm install react-router-dom @emailjs/browser

# UI/Animation libraries (keep same versions)
npm install framer-motion@12.23.24 lucide-react@0.546.0

# Styling
npm install tailwindcss@3.4.1 postcss autoprefixer
npm install clsx tailwind-merge

# Optional: React Query for caching
npm install @tanstack/react-query@5.90.5

# Dev dependencies
npm install -D @types/node
```

### **Step 1.3: Initialize Tailwind CSS**

```bash
npx tailwindcss init -p
```

---

## 📁 PHASE 2: PROJECT STRUCTURE SETUP

### **Step 2.1: Create Folder Structure**

```bash
mkdir -p src/{components,pages,data,services,hooks,types}
mkdir -p src/components/{layout,sections,projects}
mkdir -p src/components/sections/{home,about,services,works,contact,category}
mkdir -p public/assets/{icons,images}
```

### **Step 2.2: Copy Tailwind Configuration**

Copy from Next.js project:
- `tailwind.config.js` → Keep as is
- `app/globals.css` → Rename to `src/index.css`

Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',           // ✅ ADD THIS
    './src/**/*.{js,ts,jsx,tsx}',  // ✅ UPDATE THIS
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#beff01',
          hover: '#a8e600',
          dark: '#8bc900',
        },
      },
      // ... rest of your config
    },
  },
  plugins: [],
};
```

### **Step 2.3: Update index.css**

Copy `app/globals.css` content to `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Your custom styles */
@layer base {
  body {
    @apply bg-black text-white;
  }
}

/* Keep all your custom animations and styles */
```

---

## 📊 PHASE 3: DATA MIGRATION

### **Step 3.1: Export Data from MongoDB**

Create a script to export your data (run this in your Next.js project):

```typescript
// scripts/export-data.ts
import clientPromise from '@/lib/mongodb';
import fs from 'fs';

async function exportData() {
  const client = await clientPromise;
  const db = client.db('meddigital');

  // Export projects
  const projects = await db.collection('projects').find({}).toArray();
  fs.writeFileSync(
    'exported-data/projects.json',
    JSON.stringify(projects, null, 2)
  );

  // Export testimonials
  const testimonials = await db.collection('testimonials').find({}).toArray();
  fs.writeFileSync(
    'exported-data/testimonials.json',
    JSON.stringify(testimonials, null, 2)
  );

  // Export pricing
  const pricing = await db.collection('pricing').find({}).toArray();
  fs.writeFileSync(
    'exported-data/pricing.json',
    JSON.stringify(pricing, null, 2)
  );

  console.log('✅ Data exported successfully!');
}

exportData();
```

Run:
```bash
mkdir exported-data
npx tsx scripts/export-data.ts
```

### **Step 3.2: Create Static Data Files**

Copy exported JSON files to React project:

```bash
cp exported-data/*.json meddigital-react/src/data/
```

Create TypeScript interfaces in `src/types/index.ts`:

```typescript
export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  category: 'web-dev' | 'social-media' | 'paid-ads';
  featured: boolean;
  order: number;
  createdAt: string;
  // Add other fields based on your data
}

export interface Testimonial {
  _id: string;
  name: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  createdAt: string;
}

export interface PricingPlan {
  _id: string;
  name: string;
  tagline: string;
  price: number;
  currency: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  isCustom: boolean;
}
```

---

## 🔧 PHASE 4: ROUTING SETUP

### **Step 4.1: Create App Router**

Create `src/App.tsx`:

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Works from './pages/Works';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import CategoryPage from './pages/CategoryPage';

// Create QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000, // 10 minutes
      gcTime: 60 * 60 * 1000, // 1 hour
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-black text-white">
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/works" element={<Works />} />
            <Route path="/works/:slug" element={<ProjectDetail />} />
            <Route path="/works/category/:slug" element={<CategoryPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
```

### **Step 4.2: Update main.tsx**

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initEmailJS } from './services/emailjs';

// Initialize EmailJS
initEmailJS();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 🎨 PHASE 5: COMPONENT MIGRATION

### **Step 5.1: Migration Checklist for Each Component**

For EVERY component, make these changes:

#### **A. Update Imports**

```typescript
// ❌ REMOVE (Next.js specific)
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

// ✅ ADD (React equivalents)
import { Link, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
```

#### **B. Replace Image Component**

```typescript
// ❌ BEFORE
<Image 
  src="/logo.svg" 
  alt="Logo" 
  width={50} 
  height={50}
  priority
/>

// ✅ AFTER
<img 
  src="/logo.svg" 
  alt="Logo" 
  className="w-[50px] h-[50px]"
/>
```

#### **C. Replace Link Component**

```typescript
// ❌ BEFORE
<Link href="/about">About</Link>

// ✅ AFTER
<Link to="/about">About</Link>
```

#### **D. Replace Dynamic Imports**

```typescript
// ❌ BEFORE
const Works = dynamic(() => import('@/components/sections/home/Works'), {
  loading: () => <div>Loading...</div>,
});

// ✅ AFTER
const Works = lazy(() => import('@/components/sections/home/Works'));

// Usage:
<Suspense fallback={<div>Loading...</div>}>
  <Works />
</Suspense>
```

#### **E. Replace usePathname**

```typescript
// ❌ BEFORE
import { usePathname } from 'next/navigation';
const pathname = usePathname();

// ✅ AFTER
import { useLocation } from 'react-router-dom';
const location = useLocation();
const pathname = location.pathname;
```

#### **F. Remove 'use client' Directives**

```typescript
// ❌ REMOVE THIS LINE
'use client';

// All components are client-side in React
```

---

### **Step 5.2: Navbar Component Example**

`src/components/layout/Navbar.tsx`:

```typescript
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';  // ✅ CHANGED
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();  // ✅ CHANGED from usePathname
  const pathname = location.pathname;  // ✅ ADDED

  // ... rest of component logic (keep as is)

  return (
    <nav className={/* ... */}>
      <Link to="/" className="text-2xl font-bold">  {/* ✅ CHANGED */}
        <span className="text-[#beff01]">MED</span>DIGITAL
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className={pathname === '/' ? 'text-[#beff01]' : ''}>
          Home
        </Link>
        <Link to="/about" className={pathname === '/about' ? 'text-[#beff01]' : ''}>
          About
        </Link>
        {/* ... more links */}
      </div>
    </nav>
  );
}
```

---

### **Step 5.3: Create Page Components**

Example: `src/pages/Home.tsx`:

```typescript
import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/sections/home/Hero';

// Lazy load below-the-fold components
const Works = lazy(() => import('@/components/sections/home/Works'));
const CallToAction = lazy(() => import('@/components/sections/home/CallToAction'));

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        {/* ... background animations ... */}
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-24">
        <Hero />
        
        <Suspense fallback={<div className="h-[500px]" />}>
          <Works />
        </Suspense>
        
        <Suspense fallback={<div className="h-[300px]" />}>
          <CallToAction />
        </Suspense>
      </main>
    </div>
  );
}
```

---

### **Step 5.4: Update Works Component (Data Fetching)**

`src/components/sections/home/Works.tsx`:

```typescript
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';  // ✅ CHANGED
import projectsData from '@/data/projects.json';  // ✅ IMPORT STATIC DATA
import type { Project } from '@/types';

export default function Works() {
  // ✅ REPLACE API CALL WITH STATIC DATA
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['projects', 'featured'],
    queryFn: async () => {
      // Simulate async operation for consistency
      return new Promise<Project[]>((resolve) => {
        setTimeout(() => {
          const featured = projectsData
            .filter((p: any) => p.featured)
            .slice(0, 3);
          resolve(featured as Project[]);
        }, 100);
      });
    },
    staleTime: Infinity, // Static data never goes stale
  });

  // ... rest of component
}
```

---

## 📧 PHASE 6: EMAILJS INTEGRATION

Follow the complete guide in `EMAILJS_INTEGRATION_GUIDE.md`.

**Summary:**
1. Create EmailJS account
2. Set up email templates
3. Install `@emailjs/browser`
4. Create `src/services/emailjs.ts`
5. Update Contact form
6. Update Order modal

---

## ✅ PHASE 7: TESTING

### **Test Checklist:**

- [ ] **Routing**
  - [ ] Home page loads
  - [ ] All navigation links work
  - [ ] Dynamic routes work (`/works/:slug`)
  - [ ] Browser back/forward buttons work

- [ ] **Components**
  - [ ] All images display correctly
  - [ ] All animations work (Framer Motion)
  - [ ] Mobile menu works
  - [ ] Responsive design works

- [ ] **Forms**
  - [ ] Contact form submits successfully
  - [ ] Order modal submits successfully
  - [ ] Email received in inbox
  - [ ] Form validation works
  - [ ] Error handling works

- [ ] **Data**
  - [ ] Projects display correctly
  - [ ] Testimonials display correctly
  - [ ] Pricing plans display correctly
  - [ ] Category filtering works

---

## 🚀 PHASE 8: BUILD & DEPLOY

### **Build for Production:**

```bash
npm run build
```

### **Preview Production Build:**

```bash
npm run preview
```

### **Deploy to Vercel/Netlify:**

```bash
# Vercel
npm install -g vercel
vercel

# Netlify
npm install -g netlify-cli
netlify deploy --prod
```

---

## 📊 MIGRATION SUMMARY

| Task | Status | Time Estimate |
|------|--------|---------------|
| Create React project | ⏳ | 30 min |
| Copy Tailwind config | ⏳ | 15 min |
| Export data to JSON | ⏳ | 30 min |
| Set up routing | ⏳ | 1 hour |
| Migrate components | ⏳ | 3-4 hours |
| EmailJS integration | ⏳ | 1-2 hours |
| Testing | ⏳ | 2-3 hours |
| **Total** | **⏳** | **9-12 hours** |

---

## 🎉 NEXT STEPS

1. Start with Phase 1 (Create React project)
2. Follow each phase in order
3. Test thoroughly after each phase
4. Refer to `EMAILJS_INTEGRATION_GUIDE.md` for form setup
5. Deploy when all tests pass

**Good luck with your migration!** 🚀

