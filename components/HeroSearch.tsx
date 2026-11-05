"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import type { ImovelResumo } from "@/lib/types";
import { brl, norm, plural } from "@/lib/format";
import { IconBuilding, IconHome, IconPin, IconSearch } from "./icons";
import { Tabs, type TabKey } from "./Tabs";

type Sug = { label: string; sub: string; kind: "bairro" | "condo" | "imovel"; href: string };

export function HeroSearch({ imoveis, bairros }: { imoveis: ImovelResumo[]; bairros: string[] }) {
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>("comprar");
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [hi, setHi] = useState(-1);
  const [going, setGoing] = useState(false);
  const blurT = useRef<ReturnType<typeof setTimeout>>(undefined);

  const qn = norm(q).trim();

  // Condomínios a partir dos próprios imóveis
  const condos = useMemo(() => {
    const m = new Map<string, { nome: string; bairro: string; n: number }>();
    for (const p of imoveis) {
      if (!p.condominio) continue;
      // "Quay" e "Quay Luxury Home Design" são o mesmo condomínio: agrupa pela primeira palavra
      const key = norm(p.condominio).split(/\s+/)[0];
      const cur = m.get(key);
      if (cur) { cur.n++; if (p.condominio.length > cur.nome.length) cur.nome = p.condominio; }
      else m.set(key, { nome: p.condominio, bairro: p.bairro, n: 1 });
    }
    return [...m.entries()].map(([key, v]) => ({ key, ...v }));
  }, [imoveis]);

  const groups = useMemo(() => {
    if (!qn) return [] as { title: string; items: Sug[] }[];
    const hit = (name: string) => {
      const n = norm(name);
      return n.includes(qn) || n.split(/\s+/).some((w) => w.startsWith(qn));
    };
    const t = tab === "alugar" ? "alugar" : "comprar";
    const gB: Sug[] = bairros
      .filter(hit)
      .sort((a, b) => Number(norm(b) === qn) - Number(norm(a) === qn)) // nome exato primeiro
      .map((b) => {
        const c = imoveis.filter((p) => p.bairro === b).length;
        return { label: b, sub: c ? plural(c, "imóvel", "imóveis") : "Consultar disponibilidade", kind: "bairro", href: `/busca?tab=${t}&bairro=${encodeURIComponent(b)}` };
      });
    const gC: Sug[] = condos.filter((c) => hit(c.nome)).map((c) => ({
      label: c.nome, sub: `${c.bairro} · ${plural(c.n, "imóvel", "imóveis")}`, kind: "condo", href: `/busca?tab=${t}&q=${encodeURIComponent(c.key)}`,
    }));
    const gI: Sug[] = imoveis
      .filter((p) => norm(p.codigo).includes(qn) || hit(p.titulo))
      .slice(0, 4)
      .map((p) => ({ label: p.titulo, sub: `${p.codigo} · ${brl(p.preco)}`, kind: "imovel", href: `/imovel/${p.codigo.toLowerCase()}` }));
    return [
      { title: "Bairros", items: gB },
      { title: "Condomínios", items: gC },
      { title: "Imóveis", items: gI },
    ].filter((g) => g.items.length);
  }, [qn, tab, bairros, condos, imoveis]);

  const flat = groups.flatMap((g) => g.items);
  const open = focus && !!qn;

  // Botão da seta: anima e troca de página em 0,58s (direto se o movimento estiver reduzido)
  const launch = (href: string) => {
    if (going) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return router.push(href);
    router.prefetch(href);
    setGoing(true);
    setLeaving(true);
    setTimeout(() => router.push(href), 580);
  };

  const submit = () => {
    if (flat.length) return launch(flat[hi >= 0 ? hi : 0].href);
    const exact = imoveis.find((p) => norm(p.codigo) === qn);
    if (exact) return launch(`/imovel/${exact.codigo.toLowerCase()}`);
    const params = new URLSearchParams({ tab });
    if (q.trim()) params.set("q", q.trim());
    launch(`/busca?${params}`);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const n = flat.length;
    if (e.key === "ArrowDown" && n) { e.preventDefault(); setFocus(true); setHi((hi + 1) % n); }
    else if (e.key === "ArrowUp" && n) { e.preventDefault(); setHi(hi <= 0 ? n - 1 : hi - 1); }
    else if (e.key === "Escape") { setFocus(false); setHi(-1); }
    else if (e.key === "Enter") { e.preventDefault(); submit(); }
  };

  let idx = -1;
  const Ico = { bairro: IconPin, condo: IconBuilding, imovel: IconHome };

  return (
    <>
      <Tabs value={tab} onChange={setTab} variant="hero" />
      <div className="hero-find" role="search">
        <label className="hero-search">
          <IconSearch className="ico" />
          <input
            type="search"
            placeholder="Bairro, condomínio ou código do imóvel"
            aria-label="Bairro, condomínio ou código do imóvel"
            autoComplete="off"
            role="combobox"
            aria-autocomplete="list"
            aria-controls="hero-sug"
            aria-expanded={open && flat.length > 0}
            aria-activedescendant={hi >= 0 ? `sug-${hi}` : undefined}
            value={q}
            onChange={(e) => { clearTimeout(blurT.current); setQ(e.target.value); setHi(-1); setFocus(true); setLeaving(false); }}
            onKeyDown={onKey}
            onFocus={() => { clearTimeout(blurT.current); setFocus(true); setLeaving(false); }}
            onBlur={() => {
              clearTimeout(blurT.current);
              setLeaving(true);
              blurT.current = setTimeout(() => { setFocus(false); setHi(-1); setLeaving(false); }, 220);
            }}
          />
          <button type="button" className={going ? "hero-go is-going" : "hero-go"} onClick={submit} aria-label="Buscar">
            <svg className="a1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h15" />
              <path className="ah" d="M14 6l6 6-6 6" />
            </svg>
          </button>
        </label>
        {open && flat.length > 0 && (
          <div id="hero-sug" className={leaving ? "sug is-leaving" : "sug"} role="listbox" aria-label="Sugestões">
            {groups.map((g, gi) => (
              <div className="sug-group" key={g.title} role="group" aria-label={g.title}>
                <div className="sug-title" aria-hidden="true">{g.title}</div>
                {g.items.map((s, ii) => {
                  idx++;
                  const my = idx;
                  const I = Ico[s.kind];
                  return (
                    <button
                      type="button"
                      key={s.href}
                      id={`sug-${my}`}
                      className={my === hi ? "sug-item is-on" : "sug-item"}
                      style={{ animationDelay: `${gi * 0.07 + ii * 0.04}s` }}
                      role="option"
                      aria-selected={my === hi}
                      tabIndex={-1}
                      onMouseDown={(e) => { e.preventDefault(); launch(s.href); }}
                      onMouseEnter={() => setHi(my)}
                    >
                      <span className="sug-ico"><I /></span>
                      <span className="sug-txt"><b>{s.label}</b><span>{s.sub}</span></span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}
        {open && flat.length === 0 && (
          <div className={leaving ? "sug is-leaving" : "sug"} role="status">
            <div className="sug-empty">
              Nenhum bairro, condomínio ou código encontrado. Pressione Enter para buscar em todos os imóveis.
            </div>
          </div>
        )}
      </div>
    </>
  );
}


