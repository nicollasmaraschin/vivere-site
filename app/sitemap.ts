import type { MetadataRoute } from "next";
import { getImoveis } from "@/lib/data";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/busca`, priority: 0.8 },
    ...getImoveis().map((i) => ({ url: `${base}/imovel/${i.codigo.toLowerCase()}`, priority: 0.9 })),
  ];
}
