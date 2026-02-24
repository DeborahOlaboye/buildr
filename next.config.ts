import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  // Expose server-side env vars to the Next.js runtime explicitly.
  // NEXT_PUBLIC_* vars are automatically available; list others here if needed
  // by middleware or edge functions.
  serverRuntimeConfig: {
    hiroApiKey: process.env.HIRO_API_KEY,
    databaseUrl: process.env.DATABASE_URL,
    nextAuthSecret: process.env.NEXTAUTH_SECRET,
    githubApiToken: process.env.GITHUB_API_TOKEN,
  },

  // Public env vars accessible on both client and server.
  publicRuntimeConfig: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
    enableLiveData: process.env.NEXT_PUBLIC_ENABLE_LIVE_DATA === "true",
    enablePayments: process.env.NEXT_PUBLIC_ENABLE_PAYMENTS === "true",
  },
};

export default nextConfig;
