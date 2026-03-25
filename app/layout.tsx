import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import dynamic from 'next/dynamic';
const BidayalabAssistant = dynamic(() => import('@/components/chat/BidayalabAssistant'));
import GlobalSchema from '@/components/seo/GlobalSchema';
import SmoothScroll from '@/components/ui/SmoothScroll';
import SplashScreen from '@/components/ui/SplashScreen';
import { Metadata } from 'next';
import localFont from 'next/font/local';

// Optimized font loading with display swap to prevent render blocking
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Real Melon Pop Font (Local)
const melon = localFont({
  src: './fonts/MelonPop.otf',
  variable: '--font-melon',
  display: 'swap',
});

// nNiely Font (Local)
const nNiely = localFont({
  src: './fonts/nNiely.ttf',
  variable: '--font-nniely',
  display: 'swap',
});

// Louis George Cafe Font (Local) - Secondary font for body/descriptions
const louis = localFont({
  src: [
    {
      path: './fonts/Louis George Cafe Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Louis George Cafe.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Louis George Cafe Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-louis',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bidayalab.com'),
  title: {
    default: 'AI Automation & Web Development Agency Morocco | BidayaLab',
    template: '%s | BidayaLab',
  },
  description: "Transform your SME with AI automation, custom web development & premium content. Stop losing clients to digital competitors. Marrakech-based agency.",
  keywords: ["AI Automation Morocco", "Web Development Agency Marrakech", "Digital Transformation", "Next.js Web Developer", "SEO Services Morocco"],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'AI Automation & Web Development Agency Morocco | BidayaLab',
    description: "Transform your SME with AI automation, custom web development & premium content. Stop losing clients to digital competitors. Marrakech-based agency.",
    url: 'https://www.bidayalab.com',
    siteName: 'Bidayalab',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BidayaLab | AI Automation & Web Engineering',
    description: "Transform your SME with AI automation, custom web development & premium content in Morocco.",
    creator: '@bidayalab',
  },
  alternates: {
    canonical: 'https://www.bidayalab.com/',
  }
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <GlobalSchema />
      </head>
      <body className={`${inter.className} ${melon.variable} ${nNiely.variable} ${louis.variable}`} suppressHydrationWarning>
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        <SplashScreen>
          <SmoothScroll>
            <Providers>
              {children}
              <BidayalabAssistant />
            </Providers>
          </SmoothScroll>
        </SplashScreen>
        {/* Noise texture overlay for creative film grain effect */}
        <div className="noise-overlay" />
      </body>
    </html>
  );
}
