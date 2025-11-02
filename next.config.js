// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'images.unsplash.com'], // ✅ ADDED UNSPLASH
    formats: ['image/avif', 'image/webp'], // Enable modern image formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Optimized sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Optimized sizes
  },
  // Enable experimental features for better performance (disabled to avoid issues)
  // experimental: {
  //   optimizeCss: true, // Optimize CSS output
  // },
  // Compress responses
  compress: true,
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    // Only optimize bundle splitting in production to avoid chunk loading errors
    if (!isServer && process.env.NODE_ENV === 'production') {
      const existingSplitChunks = config.optimization.splitChunks || {};
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...existingSplitChunks,
          cacheGroups: {
            ...existingSplitChunks.cacheGroups,
            // Separate Framer Motion for better caching (only in production)
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              chunks: 'all',
              priority: 30,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;
