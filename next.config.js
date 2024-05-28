/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.archanaskitchen.com",
      },
    ],
  },
};

export default nextConfig;
