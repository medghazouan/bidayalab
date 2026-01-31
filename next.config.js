// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },


  // ⚡ PERFORMANCE: Enable Turbopack for 10x faster compilation
  // Use with: npm run dev --turbo
  // Note: Turbopack is stable in Next.js 15+

  images: {
    // Updated to use remotePatterns (domains is deprecated)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
    formats: ['image/avif', 'image/webp'], // Enable modern image formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Add image optimization
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ⚡ CRITICAL: Tree-shaking for lucide-react and framer-motion
  // This reduces bundle size by 60-80% for icon libraries
  // DISABLED: modularizeImports is incompatible with Turbopack
  // Using experimental.optimizePackageImports instead (below)
  // modularizeImports: {
  //   'lucide-react': {
  //     transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
  //     skipDefaultConversion: true,
  //   },
  // },

  // ⚡ PERFORMANCE: Experimental optimizations
  experimental: {
    // Optimize package imports - reduces bundle size
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    // Enable CSS optimization
    optimizeCss: true,
    // Optimize server components
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // Compress responses
  compress: true,

  // ⚡ PERFORMANCE: Compiler optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // ⚡ PERFORMANCE: Optimized webpack configuration
  webpack: (config, { isServer, dev }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    // Optimize bundle splitting for production
    if (!isServer && !dev) {
      const existingSplitChunks = config.optimization.splitChunks || {};
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...existingSplitChunks,
          chunks: 'all',
          cacheGroups: {
            ...existingSplitChunks.cacheGroups,
            // Separate vendor chunks for better caching
            default: false,
            vendors: false,
            // Framework chunk (React, Next.js)
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              priority: 40,
              enforce: true,
              reuseExistingChunk: true,
            },
            // Framer Motion chunk
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 30,
              reuseExistingChunk: true,
            },
            // Lucide icons chunk
            lucideIcons: {
              name: 'lucide-icons',
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              priority: 25,
              reuseExistingChunk: true,
            },
            // React Query chunk
            reactQuery: {
              name: 'react-query',
              test: /[\\/]node_modules[\\/]@tanstack[\\/]react-query[\\/]/,
              priority: 20,
              reuseExistingChunk: true,
            },
            // Common vendor libraries
            lib: {
              name: 'lib',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              minChunks: 2,
              reuseExistingChunk: true,
            },
          },
        },
        // Minimize module IDs for smaller bundle
        moduleIds: 'deterministic',
      };
    }

    return config;
  },

  // ⚡ PERFORMANCE: Production source maps (smaller and faster)
  productionBrowserSourceMaps: false,

  // ⚡ PERFORMANCE: Optimize build output
  poweredByHeader: false,
  generateEtags: true,

  // ⚡ PERFORMANCE: Static page generation optimization
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 60 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5,
  },
};

module.exports = nextConfig;
