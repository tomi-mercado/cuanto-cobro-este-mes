/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "aerolab.co",
      },
    ],
  },
};

export default nextConfig;
