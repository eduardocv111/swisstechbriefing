import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.googlesyndication.com https://*.google.com https://*.gstatic.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://www.googletagservices.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.google.com https://*.gstatic.com; img-src 'self' data: https: https://www.google-analytics.com https://*.googletagmanager.com https://*.googlesyndication.com https://*.google.com https://*.gstatic.com https://*.doubleclick.net https://*.analytics.google.com https://stats.g.doubleclick.net; font-src 'self' data: https://fonts.gstatic.com https://fonts.googleapis.com https://*.gstatic.com; connect-src 'self' https://www.google-analytics.com https://region1.analytics.google.com https://analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://*.google.com https://*.gstatic.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com; frame-src 'self' https://*.doubleclick.net https://*.google.com https://*.googlesyndication.com https://*.fundingchoicesmessages.google.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
