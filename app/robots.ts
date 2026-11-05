import type { MetadataRoute } from "next";
import { indexavel, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return indexavel
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl()}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
