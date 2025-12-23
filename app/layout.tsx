import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import BidayalabAssistant from '@/components/chat/BidayalabAssistant';
import GlobalSchema from '@/components/seo/GlobalSchema';

// Optimized font loading with display swap to prevent render blocking
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Use fallback font until custom font loads
  preload: true, // Preload font for better performance
  variable: '--font-inter', // CSS variable for styling
});

export const metadata = {
  title: 'BIDAYA | Turn Your Online Presence Into Profit',
  description: "Don't just build a website. Build a revenue engine. Bidayalab combines world-class development, design, and AI to scale your business.",
  icons: {
    icon: '/assets/icons/logo.svg',
    shortcut: '/assets/icons/logo.svg',
    apple: '/assets/icons/logo.svg',
  },
  openGraph: {
    title: 'BIDAYA | Turn Your Online Presence Into Profit',
    description: "Don't just build a website. Build a revenue engine. Bidayalab combines world-class development, design, and AI to scale your business.",
    url: 'https://bidayalab.com',
    siteName: 'Bidayalab',
    locale: 'en_US',
    type: 'website',
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
          <GlobalSchema />
          {children}
          <BidayalabAssistant />
        </Providers>
      </body>
    </html>
  );
}
