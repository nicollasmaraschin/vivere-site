// Gera as imagens de prévia (Open Graph) em JPG 1200x630 a partir da capa de cada imóvel.
// O WhatsApp exibe JPG de forma confiável (WebP nem sempre). Rode: npm run og
import { readFile, mkdir } from "node:fs/promises";
import sharp from "sharp";

const imoveis = JSON.parse(await readFile(new URL("../data/imoveis.json", import.meta.url)));
await mkdir(new URL("../public/og/", import.meta.url), { recursive: true });

for (const i of imoveis) {
  const src = new URL(`../public/${i.fotos[0].grande}`, import.meta.url).pathname;
  const out = new URL(`../public/og/${i.codigo.toLowerCase()}.jpg`, import.meta.url).pathname;
  const info = await sharp(src)
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(out);
  console.log(i.codigo, `${Math.round(info.size / 1024)} KB`);
}
// Imagem geral do site (home): capa do CA195
await sharp(new URL("../public/photos/ca195/01-1600.webp", import.meta.url).pathname)
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(new URL("../public/og/vivere.jpg", import.meta.url).pathname);
console.log("vivere.jpg");
