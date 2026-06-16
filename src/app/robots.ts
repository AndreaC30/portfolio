import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const BASE_URL = "https://resume.andreacruz.es"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
