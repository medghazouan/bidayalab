# 🔄 NEXT.JS TO REACT CONVERSION CHEAT SHEET

## 📦 IMPORTS

### **Navigation & Routing**

```typescript
// ❌ Next.js
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { redirect } from 'next/navigation';

// ✅ React Router
import { Link, useNavigate, useLocation, useSearchParams, Navigate } from 'react-router-dom';
```

### **Images**

```typescript
// ❌ Next.js
import Image from 'next/image';

// ✅ React
// Use standard <img> tag (no import needed)
```

### **Dynamic Imports**

```typescript
// ❌ Next.js
import dynamic from 'next/dynamic';

// ✅ React
import { lazy, Suspense } from 'react';
```

### **Metadata**

```typescript
// ❌ Next.js
import type { Metadata } from 'next';

// ✅ React
import { Helmet } from 'react-helmet-async';
```

---

## 🔗 LINKS

### **Basic Link**

```typescript
// ❌ Next.js
<Link href="/about">About</Link>

// ✅ React Router
<Link to="/about">About</Link>
```

### **Link with Styling**

```typescript
// ❌ Next.js
<Link href="/about" className="text-blue-500">
  About
</Link>

// ✅ React Router (same)
<Link to="/about" className="text-blue-500">
  About
</Link>
```

### **External Link**

```typescript
// ❌ Next.js
<Link href="https://example.com" target="_blank" rel="noopener noreferrer">
  External
</Link>

// ✅ React (use <a> tag)
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  External
</a>
```

---

## 🖼️ IMAGES

### **Static Image**

```typescript
// ❌ Next.js
<Image 
  src="/logo.svg" 
  alt="Logo" 
  width={100} 
  height={100}
  priority
/>

// ✅ React
<img 
  src="/logo.svg" 
  alt="Logo" 
  className="w-[100px] h-[100px]"
/>
```

### **Remote Image**

```typescript
// ❌ Next.js
<Image 
  src="https://example.com/image.jpg" 
  alt="Remote" 
  width={500} 
  height={300}
  quality={90}
/>

// ✅ React
<img 
  src="https://example.com/image.jpg" 
  alt="Remote" 
  className="w-[500px] h-[300px]"
  loading="lazy"
/>
```

### **Background Image**

```typescript
// ❌ Next.js
<div className="relative w-full h-64">
  <Image 
    src="/bg.jpg" 
    alt="Background" 
    fill
    style={{ objectFit: 'cover' }}
  />
</div>

// ✅ React
<div 
  className="w-full h-64 bg-cover bg-center"
  style={{ backgroundImage: 'url(/bg.jpg)' }}
/>
```

---

## 🧭 NAVIGATION & ROUTING

### **Get Current Path**

```typescript
// ❌ Next.js
import { usePathname } from 'next/navigation';
const pathname = usePathname();

// ✅ React Router
import { useLocation } from 'react-router-dom';
const location = useLocation();
const pathname = location.pathname;
```

### **Programmatic Navigation**

```typescript
// ❌ Next.js
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/about');
router.replace('/about');
router.back();

// ✅ React Router
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/about');
navigate('/about', { replace: true });
navigate(-1);
```

### **Query Parameters**

```typescript
// ❌ Next.js
import { useSearchParams } from 'next/navigation';
const searchParams = useSearchParams();
const query = searchParams.get('q');

// ✅ React Router
import { useSearchParams } from 'react-router-dom';
const [searchParams] = useSearchParams();
const query = searchParams.get('q');
```

### **Dynamic Route Parameters**

```typescript
// ❌ Next.js (app/works/[slug]/page.tsx)
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  return <div>{slug}</div>;
}

// ✅ React Router (src/pages/ProjectDetail.tsx)
import { useParams } from 'react-router-dom';
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  return <div>{slug}</div>;
}
```

---

## 🔄 DYNAMIC IMPORTS

### **Component Lazy Loading**

```typescript
// ❌ Next.js
import dynamic from 'next/dynamic';

const Works = dynamic(() => import('@/components/sections/home/Works'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

// Usage
<Works />

// ✅ React
import { lazy, Suspense } from 'react';

const Works = lazy(() => import('@/components/sections/home/Works'));

// Usage
<Suspense fallback={<div>Loading...</div>}>
  <Works />
</Suspense>
```

---

## 📄 METADATA / SEO

### **Page Title & Meta Tags**

```typescript
// ❌ Next.js
export const metadata: Metadata = {
  title: 'About | MEDDIGITAL',
  description: 'Learn more about us',
};

// ✅ React (install react-helmet-async first)
import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About | MEDDIGITAL</title>
        <meta name="description" content="Learn more about us" />
      </Helmet>
      {/* page content */}
    </>
  );
}
```

---

## 📡 DATA FETCHING

### **Fetch Data from API**

```typescript
// ❌ Next.js (Server Component)
export default async function Page() {
  const res = await fetch('/api/projects');
  const data = await res.json();
  return <div>{data.projects.length} projects</div>;
}

// ✅ React (Client Component with React Query)
import { useQuery } from '@tanstack/react-query';

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      return res.json();
    }
  });

  if (isLoading) return <div>Loading...</div>;
  return <div>{data.projects.length} projects</div>;
}
```

### **Static Data (No API)**

```typescript
// ❌ Next.js (with API route)
const res = await fetch('/api/projects');
const data = await res.json();

// ✅ React (import JSON directly)
import projectsData from '@/data/projects.json';
const data = projectsData;
```

---

## 📝 FORMS

### **Form Submission (API → EmailJS)**

```typescript
// ❌ Next.js (with API route)
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  const data = await res.json();
};

// ✅ React (with EmailJS)
import { sendContactEmail } from '@/services/emailjs';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const result = await sendContactEmail(formData);
  if (result.success) {
    // Success
  }
};
```

---

## 🌍 ENVIRONMENT VARIABLES

### **Access Environment Variables**

```typescript
// ❌ Next.js
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

// ✅ React (Vite)
const apiKey = import.meta.env.VITE_API_KEY;
```

### **.env File**

```bash
# ❌ Next.js
NEXT_PUBLIC_API_KEY=abc123

# ✅ React (Vite)
VITE_API_KEY=abc123
```

---

## 🎨 STYLING

### **Global Styles**

```typescript
// ❌ Next.js
// app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

// ✅ React (same, but in src/index.css)
// src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### **CSS Modules**

```typescript
// ❌ Next.js
import styles from './Component.module.css';
<div className={styles.container}>Content</div>

// ✅ React (same)
import styles from './Component.module.css';
<div className={styles.container}>Content</div>
```

---

## 🗂️ FILE STRUCTURE

### **Route Files**

```
❌ Next.js App Router:
app/
├── page.tsx                    → / route
├── about/
│   └── page.tsx                → /about route
└── works/
    ├── page.tsx                → /works route
    └── [slug]/
        └── page.tsx            → /works/:slug route

✅ React Router:
src/
├── pages/
│   ├── Home.tsx                → / route
│   ├── About.tsx               → /about route
│   ├── Works.tsx               → /works route
│   └── ProjectDetail.tsx       → /works/:slug route
└── App.tsx (route config)
```

### **API Routes**

```
❌ Next.js:
app/api/
├── contact/
│   └── route.ts                → /api/contact endpoint
└── projects/
    └── route.ts                → /api/projects endpoint

✅ React:
❌ NO API ROUTES (use EmailJS for forms, static JSON for data)
```

---

## 🔧 CONFIGURATION FILES

### **next.config.js → vite.config.ts**

```typescript
// ❌ Next.js (next.config.js)
module.exports = {
  images: {
    domains: ['example.com'],
  },
};

// ✅ React (vite.config.ts)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### **tsconfig.json Paths**

```json
// ❌ Next.js
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}

// ✅ React (Vite)
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 🚀 SCRIPTS

### **package.json Scripts**

```json
// ❌ Next.js
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}

// ✅ React (Vite)
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## ✅ QUICK CHECKLIST

When converting a component:

- [ ] Replace `import Link from 'next/link'` → `import { Link } from 'react-router-dom'`
- [ ] Replace `import Image from 'next/image'` → Use `<img>` tag
- [ ] Replace `href=` → `to=` in Link components
- [ ] Replace `usePathname()` → `useLocation().pathname`
- [ ] Replace `useRouter()` → `useNavigate()`
- [ ] Replace `dynamic()` → `lazy()` + `<Suspense>`
- [ ] Remove `'use client'` directive
- [ ] Replace API calls with static data or EmailJS
- [ ] Update image paths if needed
- [ ] Test component in browser

---

## 🎉 DONE!

Use this cheat sheet as a quick reference while migrating your components.

For detailed step-by-step instructions, see `MIGRATION_STEP_BY_STEP.md`.

