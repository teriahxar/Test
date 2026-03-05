/** @type {import('next').NextConfig} */
const isPagesBuild = process.env.GITHUB_PAGES === "1";
const basePath = isPagesBuild ? "/Test" : "";

const nextConfig = {
  output: isPagesBuild ? "export" : undefined,
  trailingSlash: isPagesBuild,
  basePath,
  assetPrefix: isPagesBuild ? `${basePath}/` : "",
  images: {
    unoptimized: isPagesBuild,
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
