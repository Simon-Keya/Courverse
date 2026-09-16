import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Lint is run in CI; don't block production deploys on ESLint config quirks
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Keep type checking ON so real type errors still fail the build
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "**.cloudinary.com" },
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "http", hostname: "localhost" },
    ],
  },
};

export default nextConfig;
