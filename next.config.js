/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Configure for GitHub Pages deployment
  basePath:
    process.env.NODE_ENV === "production" ? "/workout-timer-nextjs" : "",
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/workout-timer-nextjs/" : "",
  // Ensure images are handled correctly
  images: {
    unoptimized: true,
  },
  // Output as static site
  output: "export",
};

module.exports = nextConfig;
