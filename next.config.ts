import type { NextConfig } from "next";
import imoveis from "./data/imoveis.json";

// IDs numéricos do site antigo (ImobiBrasil) → código do imóvel.
// Tirados de "url_site_atual" em data/imoveis.json.
const antigos = imoveis
  .map((i) => ({ codigo: i.codigo, id: i.url_site_atual.match(/\/imovel\/(\d+)\//)?.[1] }))
  .filter((x): x is { codigo: string; id: string } => Boolean(x.id));

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 720, 960, 1280, 1600],
    imageSizes: [96, 160, 240, 360],
    qualities: [75, 85],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      // Imóveis conhecidos do site antigo → página nova do imóvel (301)
      ...antigos.map((a) => ({
        source: `/imovel/${a.id}/:slug*`,
        destination: `/imovel/${a.codigo.toLowerCase()}`,
        statusCode: 301,
      })),
      // Qualquer outro imóvel antigo → busca
      { source: "/imovel/:id(\\d+)/:slug*", destination: "/busca", statusCode: 301 },
      // Busca antiga (/imovel/?finalidade=aluguel ...) → busca nova
      {
        source: "/imovel",
        has: [{ type: "query", key: "finalidade", value: "(?<f>aluguel|locacao|alugar)" }],
        destination: "/busca?tab=alugar",
        statusCode: 301,
      },
      { source: "/imovel", destination: "/busca", statusCode: 301 },
    ];
  },
};

export default nextConfig;
