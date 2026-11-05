import Image from "next/image";
import Link from "next/link";
import type { ImovelResumo } from "@/lib/types";
import { brl, metaCard } from "@/lib/format";
import { imovelHref } from "@/lib/data";

export function PropertyCard({ p, sizes }: { p: ImovelResumo; sizes?: string }) {
  return (
    <Link className="card" href={imovelHref(p.codigo)}>
      <div className="card-media">
        <Image
          src={p.capa}
          alt={p.foto_alt}
          fill
          sizes={sizes ?? "(min-width: 1000px) 25vw, (min-width: 700px) 50vw, 100vw"}
        />
        {p.vivere_prive && <span className="badge-prive">Vivere Privé</span>}
      </div>
      <div className="card-body">
        <div className="card-price">{brl(p.preco)}</div>
        <div className="card-title">
          {p.tipo} · {p.bairro}
        </div>
        <div className="card-meta">
          {metaCard(p)} · <span className="card-code">{p.codigo}</span>
        </div>
      </div>
    </Link>
  );
}
