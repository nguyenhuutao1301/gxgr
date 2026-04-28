/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "taxi5.vnwordpress.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3002",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "goixegiare.pro.vn",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/**",
      },
    ],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    // Kích thước cụ thể cho hình nhỏ (px)
    imageSizes: [16, 32, 48, 64, 96],
  },
  async redirects() {
    return [
      {
        source: "/:path((?!_next|api).*)\\.html", // tránh ảnh hưởng đến các route đặc biệt
        destination: "/:path",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
