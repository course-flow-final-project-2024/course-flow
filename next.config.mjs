/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/protected/:path*',
        destination: '/protected/:path*',
      },
    ];
  },
};

export default nextConfig;
