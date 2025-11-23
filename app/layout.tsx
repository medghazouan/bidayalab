// app/layout.tsx

import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import dynamic from 'next/dynamic';
import Chatbot from '@/components/Chatbot';

// Dynamically import components to reduce initial bundle size
const Navbar = dynamic(() => import('@/components/sections/Navbar'), {
  ssr: true,
});

const Footer = dynamic(() => import('@/components/sections/Footer'), {
  ssr: true,
});

// Optimized font loading with display swap to prevent render blocking
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Use fallback font until custom font loads
  preload: true, // Preload font for better performance
  variable: '--font-inter', // CSS variable for styling
});

export const metadata = {
  title: 'BIDAYA - Web Development & Digital Marketing',
  description: 'Professional web development and digital marketing services',
  icons: {
    icon: '/assets/icons/logo.svg',
    shortcut: '/assets/icons/logo.svg',
    apple: '/assets/icons/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
          <Chatbot />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
