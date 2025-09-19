// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "export", // Disabled for development
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: {
//     unoptimized: true,
//     domains: ["vanamwellness.com"],
//     formats: ["image/webp", "image/avif"],
//   },
//   compress: true,
//   poweredByHeader: false,
//   generateEtags: true,
//   async headers() {
//     return [
//       {
//         source: "/(.*)",
//         headers: [
//           {
//             key: "X-Frame-Options",
//             value: "DENY",
//           },
//           {
//             key: "X-Content-Type-Options",
//             value: "nosniff",
//           },
//           {
//             key: "X-XSS-Protection",
//             value: "1; mode=block",
//           },
//           {
//             key: "Referrer-Policy",
//             value: "strict-origin-when-cross-origin",
//           },
//           {
//             key: "Permissions-Policy",
//             value: "camera=(), microphone=(), geolocation=()",
//           },
//           {
//             key: "Strict-Transport-Security",
//             value: "max-age=31536000; includeSubDomains; preload",
//           },
//           {
//             key: "Content-Security-Policy",
//             value:
//               "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://static.hotjar.com https://browser.sentry-cdn.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://www.facebook.com https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://sentry.io;",
//           },
//         ],
//       },
//       {
//         source: "/api/(.*)",
//         headers: [
//           {
//             key: "Cache-Control",
//             value: "no-store, no-cache, must-revalidate",
//           },
//         ],
//       },
//       {
//         source: "/_next/static/(.*)",
//         headers: [
//           {
//             key: "Cache-Control",
//             value: "public, max-age=31536000, immutable",
//           },
//         ],
//       },
//       {
//         source: "/images/(.*)",
//         headers: [
//           {
//             key: "Cache-Control",
//             value: "public, max-age=86400",
//           },
//         ],
//       },
//     ];
//   },
//   // Redirects are not supported with output: 'export'
//   // async redirects() {
//   //   return [
//   //     {
//   //       source: '/home',
//   //       destination: '/',
//   //       permanent: true,
//   //     },
//   //   ];
//   // },
//   experimental: {
//     optimizeCss: true,
//     scrollRestoration: true,
//   },
//   compiler: {
//     removeConsole: process.env.NODE_ENV === "production",
//   },
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static export for development with API calls
  // output: "export",

  // Image settings
  images: {
    unoptimized: true,
    domains: ["vanamwellness.com"], // optional, safe to leave
    formats: ["image/webp", "image/avif"],
  },

  // Optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,

  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
