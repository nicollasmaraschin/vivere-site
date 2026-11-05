import Image from "next/image";
import Link from "next/link";
import { BrandMask } from "@/components/brand";
import { HeroSearch } from "@/components/HeroSearch";
import { GoogleMark, IconArrow, IconPlay, IconStar, VLines } from "@/components/icons";
import { PropertyCard } from "@/components/PropertyCard";
import { BAIRROS, bairroHref, getImoveis, imovelHref, resumo, vivere } from "@/lib/data";
import { brl, m2, plural } from "@/lib/format";
import { waAnunciar } from "@/lib/whatsapp";

const BAIRRO_FOTO: Record<string, string | undefined> = {
  "Jurerê Internacional": "/photos/ap365/01-1600.webp",
  "Cacupé": "/photos/ca195/04-1600.webp",
  "Novo Campeche": "/photos/ca217/01-1600.webp",
  // Jurerê e Santo Antônio de Lisboa: aguardando fotos (pendência do DESIGN.md)
};
// Ordem do mosaico do protótipo
const MOSAICO = ["Jurerê Internacional", "Cacupé", "Novo Campeche", "Santo Antônio de Lisboa", "Jurerê"];

export default function Home() {
  const imoveis = getImoveis();
  const cards = imoveis.map(resumo);
  const prive = imoveis.find((i) => i.vivere_prive);
  const g = vivere.google;
  const nota = g.nota.toLocaleString("pt-BR", { minimumFractionDigits: 1 });

  return (
    <>
      <section className="hero" aria-label="Destaque">
        <div className="hero-bg">
          <Image
            src="/photos/ca195/01-1600.webp"
            alt="Sala de jantar integrada ao jardim, casa no Cacupé"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
          />
          <div className="hero-shade" />
        </div>
        <div className="hero-in">
          <h1 className="h1">Morar ou investir, seu lugar é aqui.</h1>
          {/* Frase comparativa pendente de confirmação. Alternativa: "Nota 5,0 no Google, com 76 avaliações". */}
          <p className="hero-sub">A imobiliária mais bem avaliada de Florianópolis.</p>
          <HeroSearch imoveis={cards} bairros={BAIRROS} />
        </div>
      </section>

      <section className="sec sheet">
        <div className="wrap intro">
          <h2 className="h2">Curadoria de imóveis de alto padrão em Florianópolis, com atendimento de quem vive a ilha.</h2>
          <div className="units">
            {vivere.unidades.map((u) => (
              <div className="unit" key={u.nome}>
                <h3>{u.nome}</h3>
                <p>{u.endereco.replace(", Lagoa da Conceição", "")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="sel">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="sel">Imóveis selecionados</h2>
              <p className="lead">Uma seleção, não um catálogo.</p>
            </div>
            <Link className="link-arrow" href="/busca?tab=comprar">Ver todos os imóveis <IconArrow /></Link>
          </div>
          <div className="grid">
            {cards.map((p) => <PropertyCard key={p.codigo} p={p} />)}
          </div>
        </div>
      </section>

      {prive && (
        <section className="sec prive" aria-labelledby="prive">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <h2 className="h2" id="prive">Vivere Privé</h2>
                <p className="lead" style={{ color: "var(--grey)" }}>Imóveis com exclusividade Vivere.</p>
              </div>
            </div>
            <div className="prive-in">
              <div className="prive-media">
                <Image src={`/${prive.fotos[1].grande}`} alt="Banheira de imersão voltada para o jardim, suíte master" fill sizes="(min-width: 1000px) 55vw, 100vw" />
              </div>
              <div className="prive-body">
                <VLines three />
                <BrandMask src="/brand/vivere-seal.svg" className="seal" />
                <p className="eyebrow">{prive.tipo} · {prive.bairro}</p>
                <h3 className="h2" style={{ fontSize: 30 }}>Casa contemporânea com vista para o mar</h3>
                <div className="prive-price">{brl(prive.preco)}</div>
                <div className="prive-meta">
                  {prive.dormitorios} dormitórios · {plural(prive.suites, "suíte", "suítes")} · {m2(prive.area)} · {prive.codigo}
                </div>
                <p className="prive-note">
                  Três suítes com closet e sacada voltadas para o mar, e uma suíte master de 53 m² com banheira de imersão.
                </p>
                <div>
                  <Link className="btn btn-light" href={imovelHref(prive.codigo)}>Conhecer o imóvel</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="sec dark" aria-labelledby="lanc">
        <VLines width={0.6} />
        <div className="wrap" style={{ position: "relative" }}>
          <div className="sec-head">
            <div>
              <h2 className="h2" id="lanc">Lançamentos</h2>
              <p className="lead">Os empreendimentos que a Vivere acompanha.</p>
            </div>
            <Link className="link-arrow" href="/busca?tab=lancamentos">Ver lançamentos <IconArrow /></Link>
          </div>
          <div className="launch-grid">
            <Link className="launch" href="/busca?tab=lancamentos">
              <Image src="/photos/ap183/02-1600.webp" alt="Living de apartamento no Quay Luxury Home Design" fill sizes="(min-width: 700px) 50vw, 100vw" />
              <span className="shade" />
              <span className="launch-body">
                <span className="eyebrow">Jurerê Internacional</span>
                <span className="h3">Quay Luxury Home Design</span>
              </span>
            </Link>
            <Link className="launch" href="/busca?tab=lancamentos">
              <span className="launch-ph">Imagens em breve</span>
              <span className="launch-body">
                <span className="eyebrow">Santo Antônio de Lisboa</span>
                <span className="h3">Vista Artefacto</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="sec" id="bairros" aria-labelledby="bairros-t">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="bairros-t">Bairros</h2>
              <p className="lead">Onde ficam os imóveis e como é morar em cada um.</p>
            </div>
          </div>
          <div className="bairros">
            {MOSAICO.map((nome, i) => {
              const img = BAIRRO_FOTO[nome];
              const texto = vivere.bairros_guia.find((b) => b.nome === nome)?.texto;
              return (
                <Link key={nome} className={nome === "Santo Antônio de Lisboa" ? "bairro is-tape" : "bairro"} href={bairroHref(nome)}>
                  {img ? (
                    <>
                      <Image src={img} alt="" fill sizes={i === 0 ? "(min-width: 1000px) 50vw, 100vw" : "(min-width: 1000px) 25vw, 50vw"} />
                      <span className="shade" />
                    </>
                  ) : (
                    <VLines />
                  )}
                  <span className="bairro-body">
                    <h3>{nome}</h3>
                    <p>{texto}</p>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vídeos: formato a definir (pendência). Por ora os cards levam à página do imóvel. */}
      <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="videos-t">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2" id="videos-t">Conheça os imóveis por dentro</h2>
          </div>
          <div className="videos">
            {[
              ["CA195", "/photos/ca195/02-720.webp", "Casa no Cacupé"],
              ["AP183", "/photos/ap183/01-720.webp", "Apartamento no Quay"],
              ["CA217", "/photos/ca217/01-720.webp", "Casa no Novo Campeche"],
              ["AP365", "/photos/ap365/01-720.webp", "Apartamento em Jurerê"],
            ].map(([cod, img, titulo]) => (
              <Link key={cod} className="video" href={imovelHref(cod)}>
                <Image src={img} alt="" fill sizes="(min-width: 1000px) 25vw, (min-width: 700px) 38vw, 72vw" />
                <span className="shade" />
                <span className="video-play"><IconPlay /></span>
                <span className="video-cap"><b>{titulo}</b><span>Tour pelo imóvel</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="avaliacoes" style={{ background: "var(--paper)" }} aria-label="Avaliações">
        <div className="wrap">
          <div className="sec-head">
            <div className="rating">
              <span className="rating-num">{nota}</span>
              <div>
                <div className="stars" role="img" aria-label="5 de 5 estrelas">
                  {[0, 1, 2, 3, 4].map((i) => <IconStar key={i} />)}
                </div>
                <div className="rating-src">{g.total_avaliacoes} avaliações no Google · {g.ficha}</div>
              </div>
            </div>
            <a className="link-arrow" href={`https://www.google.com/maps/place/?q=place_id:${g.place_id}`} target="_blank" rel="noopener">
              Ver no Google <IconArrow />
            </a>
          </div>
          {/* Textos reais da ficha do Google. No site final, virão da API do Perfil da Empresa, com autor e data. */}
          <div className="quotes">
            {vivere.avaliacoes_exemplo.map((t) => (
              <figure className="quote" key={t.slice(0, 24)}>
                <blockquote><p>“{t}”</p></blockquote>
                <figcaption><GoogleMark className="g-mark" /> Avaliação no Google</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="sec owner" aria-labelledby="owner-t">
        <div className="wrap owner-in">
          <div>
            <h2 className="h2" id="owner-t">Seu imóvel merece a mesma curadoria.</h2>
            <p className="lead">Avaliação de mercado e divulgação para compradores qualificados, com atendimento de uma equipe que conhece cada bairro.</p>
          </div>
          <a className="btn btn-navy" href={waAnunciar} target="_blank" rel="noopener">Anunciar meu imóvel</a>
        </div>
      </section>
    </>
  );
}
