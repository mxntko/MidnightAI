/** next.config.js */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  eslint: { ignoreDuringBuilds: true },
  webpack(config) {
    config.devtool = false;
    return config;
  },
};

module.exports = nextConfig;
