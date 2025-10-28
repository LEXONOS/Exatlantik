import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.exatlantik.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/interne", "/test"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
