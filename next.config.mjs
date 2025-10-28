/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false, // pas de slash final dans les URLs (meilleur SEO)
  output: "standalone", // facilite le déploiement sur Vercel, Docker, etc.

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "static.exatlantik.com" }, // ton futur CDN éventuel
    ],
  },

  // Si tu utilises des fichiers .mdx :
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

  experimental: {
    mdxRs: true, // active le rendu MDX natif (Next.js 14+)
  },
};

export default nextConfig;
