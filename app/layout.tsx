import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import BidayalabAssistant from '@/components/chat/BidayalabAssistant';
import GlobalSchema from '@/components/seo/GlobalSchema';
import SmoothScroll from '@/components/ui/SmoothScroll';
import SplashScreen from '@/components/ui/SplashScreen';

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

export const metadata = {
  metadataBase: new URL('https://www.bidayalab.com'),
  title: 'AI Automation & Web Development Agency Morocco | BidayaLab',
  description: "Transform your Moroccan SME with AI automation, custom web development & premium content. Stop losing clients to digital competitors. Marrakech-based agency.",
  icons: {
    icon: '/assets/icons/logo.svg',
    shortcut: '/assets/icons/logo.svg',
    apple: '/assets/icons/logo.svg',
  },
  openGraph: {
    title: 'AI Automation & Web Development Agency Morocco | BidayaLab',
    description: "Transform your Moroccan SME with AI automation, custom web development & premium content. Stop losing clients to digital competitors. Marrakech-based agency.",
    url: 'https://www.bidayalab.com',
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
      <body className={`${inter.className} ${melon.variable} ${nNiely.variable} ${louis.variable}`} suppressHydrationWarning>
        <SplashScreen>
          <SmoothScroll>
            <Providers>
              <GlobalSchema />
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
