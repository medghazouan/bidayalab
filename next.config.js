// next.config.js

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  
  images: {
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
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    optimizeCss: true,
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  compress: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  webpack: (config, { isServer, dev }) => {
    // ⚡ CRITICAL: LangChain compatibility fixes
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      encoding: false,
      'utf-8-validate': false,
      'bufferutil': false,
      'hnswlib-node': false,
    };

    // Add externals for serverless environment
    if (isServer) {
      config.externals.push({
        'hnswlib-node': 'commonjs hnswlib-node',
        'sharp': 'commonjs sharp',
      });
    }

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
            
            // LangChain chunk
            langchain: {
              name: 'langchain',
              test: /[\\/]node_modules[\\/](@langchain|langchain)[\\/]/,
              priority: 35,
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
        moduleIds: 'deterministic',
      };
    }

    return config;
  },

  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  generateEtags: true,

  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
};

module.exports = nextConfig;
