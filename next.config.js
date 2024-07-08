/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/workout-timer-nextjs",
  output: "export",
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
  // attempting to fix the @ error
};

module.exports = nextConfig;
