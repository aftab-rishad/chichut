/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  reactStrictMode: false,
  productionBrowserSourceMaps: false,
  experimental: { serverSourceMaps: false },
};

export default nextConfig;
