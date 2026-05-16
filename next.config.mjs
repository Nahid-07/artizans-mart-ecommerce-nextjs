/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This allows all secure external domains. You can restrict it to specific domains like 'i.ibb.co' later for better security.
      },
    ],
  },
};

export default nextConfig;