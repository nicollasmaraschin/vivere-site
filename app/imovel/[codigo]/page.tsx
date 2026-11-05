import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { PropertyCard } from "@/components/PropertyCard";
import { IconArea, IconArrow, IconBath, IconBed, IconCalendar, IconCar, IconWhats, VLines } from "@/components/icons";
import { bairroHref, foto, getImovel, getImoveis, resumo, textoBairro } from "@/lib/data";
import { brl, m2, plural } from "@/lib/format";
import { siteUrl } from "@/lib/site";
import { waImovel, waVisita } from "@/lib/whatsapp";

type Props = { params: Promise<{ codigo: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getImoveis().map((i) => ({ codigo: i.codigo.toLowerCase() }));
}

// Prévia do link no WhatsApp: melhor foto, título, bairro e preço.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getImovel((await params).codigo);
  if (!p) return {};
  const title = `${p.tipo} em ${p.bairro} · ${brl(p.preco)}`;
  const description = `${p.titulo}. ${plural(p.suites, "suíte", "suítes")}, ${m2(p.area)}, ${plural(p.vagas, "vaga", "vagas")}. Código ${p.codigo}.`;
  const url = `/imovel/${p.codigo.toLowerCase()}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [{ url: `/og/${p.codigo.toLowerCase()}.jpg`, width: 1200, height: 630, alt: p.foto_alt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`/og/${p.codigo.toLowerCase()}.jpg`] },
  };
}

export default async function ImovelPage({ params }: Props) {
  const p = getImovel((await params).codigo);
  if (!p) notFound();

  const vals: { k: string; v: string }[] = [];
  if (p.condominio_valor) vals.push({ k: "Condomínio", v: brl(p.condominio_valor) });
  if (p.iptu) vals.push({ k: "IPTU", v: brl(p.iptu) });
  vals.push({ k: `Área ${p.area_tipo}`, v: m2(p.area) });
  if (p.terreno) vals.push({ k: "Terreno", v: m2(p.terreno) });
  if (p.valor_m2) vals.push({ k: "Valor por m²", v: brl(p.valor_m2) });

  const outros = getImoveis().filter((x) => x.codigo !== p.codigo).map(resumo);
  const base = siteUrl();

  // schema.org: só o bairro, nunca o endereço exato
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: p.titulo,
    description: p.descricao[0],
    url: `${base}/imovel/${p.codigo.toLowerCase()}`,
    image: p.fotos.slice(0, 5).map((f) => `${base}${foto(f.grande)}`),
    offers: { "@type": "Offer", price: p.preco, priceCurrency: "BRL", availability: "https://schema.org/InStock" },
    about: {
      "@type": p.tipo === "Casa" ? "SingleFamilyResidence" : "Apartment",
      numberOfRooms: p.dormitorios,
      numberOfBedrooms: p.dormitorios,
      numberOfBathroomsTotal: p.banheiros,
      floorSize: { "@type": "QuantitativeValue", value: p.area, unitCode: "MTK" },
      address: { "@type": "PostalAddress", addressLocality: p.cidade, addressRegion: "SC", addressCountry: "BR", name: p.bairro },
    },
    provider: { "@type": "RealEstateAgent", name: "Vivere Imóveis Selecionados" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: "Comprar", item: `${base}/busca?tab=comprar` },
      { "@type": "ListItem", position: 3, name: p.bairro, item: `${base}${bairroHref(p.bairro)}` },
      { "@type": "ListItem", position: 4, name: p.codigo },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, crumbsLd]) }} />
      <section className="pd-top">
        <div className="wrap">
          <nav className="crumbs" aria-label="Você está em">
            <ol>
              <li><Link href="/">Início</Link></li>
              <li><Link href="/busca?tab=comprar">Comprar</Link></li>
              <li><Link href={bairroHref(p.bairro)}>{p.bairro}</Link></li>
              <li aria-current="page">{p.codigo}</li>
            </ol>
          </nav>

          <Gallery fotos={p.fotos} alt={p.foto_alt} />

          <div className="pd-head">
            <div>
              {p.vivere_prive && <span className="badge-prive-inline">Vivere Privé</span>}
              <p className="eyebrow">{p.tipo} · {p.bairro}</p>
              <h1 className="h1">{p.titulo}</h1>
              <p className="pd-code">Código {p.codigo}</p>
            </div>
            <div className="pd-price">{brl(p.preco)}</div>
            <ul className="specs" aria-label="Características">
              <li className="spec"><IconBed />{p.dormitorios} dorm.</li>
              <li className="spec"><IconBath />{plural(p.suites, "suíte", "suítes")}</li>
              <li className="spec"><IconCar />{plural(p.vagas, "vaga", "vagas")}</li>
              <li className="spec"><IconArea />{m2(p.area)}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="pd-body">
        <div className="wrap pd-grid">
          <div>
            <div className="pd-block">
              <h2 className="h3">Detalhes</h2>
              <ul className="vals">
                {vals.map((v) => (
                  <li key={v.k}><span>{v.k}</span><b>{v.v}</b></li>
                ))}
              </ul>
            </div>
            <div className="pd-block desc">
              <h2 className="h3">Sobre o imóvel</h2>
              {p.descricao.map((d, i) => <p key={i}>{d}</p>)}
            </div>
            <div className="pd-block">
              <h2 className="h3">Diferenciais</h2>
              <ul className="chips">
                {p.diferenciais.map((c) => <li key={c} className="chip">{c}</li>)}
              </ul>
            </div>
            <div className="pd-block">
              <div className="bairro-card">
                <VLines />
                <p className="eyebrow" style={{ position: "relative", color: "var(--grey)" }}>O bairro</p>
                <h2 className="h3">{p.bairro}</h2>
                <p>{textoBairro(p.bairro)}</p>
                <Link className="link-arrow" href={bairroHref(p.bairro)}>
                  Ver imóveis no bairro <IconArrow />
                </Link>
              </div>
            </div>
          </div>

          <aside className="side" aria-label="Contato sobre este imóvel">
            <div className="side-card">
              <h2 className="h3" style={{ margin: 0 }}>Gostou deste imóvel?</h2>
              <p>Fale com um consultor Vivere sobre o {p.codigo} ou agende uma visita.</p>
              <a className="btn btn-navy" href={waImovel(p)} target="_blank" rel="noopener">
                <IconWhats /> Falar no WhatsApp
              </a>
              <a className="btn btn-line" href={waVisita(p)} target="_blank" rel="noopener">
                <IconCalendar /> Agendar visita
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Outros imóveis selecionados</h2>
            <Link className="link-arrow" href="/busca?tab=comprar">Ver todos <IconArrow /></Link>
          </div>
          <div className="grid cols-3">
            {outros.map((o) => (
              <PropertyCard key={o.codigo} p={o} sizes="(min-width: 1000px) 33vw, (min-width: 700px) 50vw, 100vw" />
            ))}
          </div>
        </div>
      </section>

      <div className="cta-bar">
        <a className="btn btn-navy" href={waImovel(p)} target="_blank" rel="noopener">
          <IconWhats /> WhatsApp
        </a>
        <a className="btn btn-line" href={waVisita(p)} target="_blank" rel="noopener">
          <IconCalendar /> Agendar visita
        </a>
      </div>
    </>
  );
}
