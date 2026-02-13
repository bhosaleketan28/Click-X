/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  basePath: "/Click-X",
  assetPrefix: "/Click-X/",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/Click-X"
  }
};

export default nextConfig;
