import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/api/**',
      },
    ],
  },
  // Performance: enable static page generation where possible
  reactStrictMode: true,
  // Compress responses for faster delivery
  compress: true,
  // Allow dev access from local network
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://192.168.7.248:3001',
    'http://192.168.7.248:3000',
  ],
};

export default withAnalyzer(nextConfig);
