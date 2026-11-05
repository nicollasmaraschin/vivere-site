import Link from "next/link";
import vivere from "@/data/vivere.json";
import { waAnunciar, waGeral } from "@/lib/whatsapp";
import { BrandMask } from "./brand";
import { VLines } from "./icons";

export function Footer() {
  return (
    <footer className="ftr" id="contato">
      <VLines width={0.7} three />
      <div className="wrap">
        <div className="ftr-top">
          <div>
            <BrandMask src="/brand/vivere-wordmark-tagline.svg" className="wm-tag" label="Vivere Imóveis Selecionados" />
            <p style={{ marginTop: 22, maxWidth: 320, color: "var(--grey)" }}>
              Imóveis selecionados em Florianópolis. Há 3 anos, a confiança nos move.
            </p>
          </div>
          <div className="ftr-cols">
            <div>
              <h2>Unidades</h2>
              <ul className="units-list">
                {vivere.unidades.map((u) => (
                  <li key={u.nome}>
                    {u.nome}
                    <br />
                    {u.endereco.replace(", Lagoa da Conceição", "")}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Imóveis</h2>
              <ul>
                <li><Link href="/busca?tab=comprar">Comprar</Link></li>
                <li><Link href="/busca?tab=alugar">Alugar</Link></li>
                <li><Link href="/busca?tab=lancamentos">Lançamentos</Link></li>
                <li><a href={waAnunciar} target="_blank" rel="noopener">Anunciar meu imóvel</a></li>
              </ul>
            </div>
            <div>
              <h2>Contato</h2>
              <ul>
                <li><a href={waGeral} target="_blank" rel="noopener">WhatsApp</a></li>
                <li>
                  <a href={`https://www.instagram.com/${vivere.instagram.replace("@", "")}/`} target="_blank" rel="noopener">
                    Instagram {vivere.instagram}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="ftr-bottom">
          <span>© {new Date().getFullYear()} Vivere Imóveis Selecionados · {vivere.creci}</span>
        </div>
      </div>
    </footer>
  );
}
