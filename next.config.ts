import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://squareone.py50.tech/portal/lunch',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
