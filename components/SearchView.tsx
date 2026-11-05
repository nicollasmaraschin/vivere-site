"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { ImovelResumo } from "@/lib/types";
import { norm, plural } from "@/lib/format";
import { waAlugar, waGeral } from "@/lib/whatsapp";
import { IconFilters, IconSearch } from "./icons";
import { PropertyCard } from "./PropertyCard";
import { Tabs, TABS, type TabKey } from "./Tabs";

const TITULO: Record<TabKey, string> = {
  comprar: "Imóveis à venda em Florianópolis",
  alugar: "Imóveis para alugar em Florianópolis",
  lancamentos: "Lançamentos em Florianópolis",
};

export function SearchView({ imoveis, bairros }: { imoveis: ImovelResumo[]; bairros: string[] }) {
  const sp = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const tabParam = sp.get("tab");
  const tab: TabKey = TABS.some((t) => t.key === tabParam) ? (tabParam as TabKey) : "comprar";
  const tipo = sp.get("tipo") ?? "todos";
  const bairro = sp.get("bairro") ?? "todos";
  const suites = Number(sp.get("suites") ?? 0) || 0;
  const ordem = sp.get("ordem") ?? "rel";

  // O texto filtra enquanto digita; vai para o endereço sem recarregar
  const [q, setQ] = useState(sp.get("q") ?? "");
  const [filtersOpen, setFiltersOpen] = useState(false);
  useEffect(() => setQ(sp.get("q") ?? ""), [sp]);

  const setParams = (patch: Record<string, string | number | null>) => {
    const next = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v === null || v === "" || v === "todos" || v === 0 || (k === "ordem" && v === "rel") || (k === "tab" && v === "comprar")) next.delete(k);
      else next.set(k, String(v));
    }
    const s = next.toString();
    router.replace(s ? `${path}?${s}` : path, { scroll: false });
  };

  useEffect(() => {
    const t = setTimeout(() => {
      if ((sp.get("q") ?? "") !== q) setParams({ q: q.trim() || null });
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const nq = norm(q).trim();
  const results = useMemo(() => {
    let r = imoveis.filter((p) => {
      if (tipo !== "todos" && p.tipo !== tipo) return false;
      if (bairro !== "todos" && p.bairro !== bairro) return false;
      if (suites && p.suites < suites) return false;
      if (nq && !norm([p.codigo, p.tipo, p.bairro, p.condominio, p.titulo].join(" ")).includes(nq)) return false;
      return true;
    });
    if (ordem === "maior") r = [...r].sort((a, b) => b.preco - a.preco);
    if (ordem === "menor") r = [...r].sort((a, b) => a.preco - b.preco);
    return r;
  }, [imoveis, tipo, bairro, suites, nq, ordem]);

  const hasFilters = tipo !== "todos" || bairro !== "todos" || !!suites || !!nq;

  const groups: { key: string; label: string; value: string | number; opts: [string | number, string][] }[] = [
    { key: "tipo", label: "Tipo", value: tipo, opts: [["todos", "Todos"], ["Apartamento", "Apartamentos"], ["Casa", "Casas"]] },
    { key: "bairro", label: "Bairro", value: bairro, opts: [["todos", "Todos"], ...bairros.map((b) => [b, b] as [string, string])] },
    { key: "suites", label: "Suítes", value: suites, opts: [[0, "Todas"], [2, "2+"], [3, "3+"]] },
    { key: "ordem", label: "Ordenar", value: ordem, opts: [["rel", "Seleção Vivere"], ["maior", "Maior preço"], ["menor", "Menor preço"]] },
  ];

  return (
    <>
      <section className="sr-top">
        <div className="wrap">
          <h1 className="h1">{TITULO[tab]}</h1>
          <div className="sr-tools">
            <Tabs value={tab} onChange={(t) => setParams({ tab: t })} variant="page" />
            {tab === "comprar" && (
              <div className="sr-search">
                <label className="field">
                  <IconSearch />
                  <input
                    type="search"
                    placeholder="Bairro, condomínio ou código"
                    aria-label="Bairro, condomínio ou código"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                  />
                </label>
                <button
                  type="button"
                  className="btn btn-line filters-btn"
                  onClick={() => setFiltersOpen((v) => !v)}
                  aria-expanded={filtersOpen}
                  aria-controls="filtros"
                >
                  <IconFilters /> Filtros
                </button>
              </div>
            )}
          </div>
          {tab === "comprar" && (
            <div id="filtros" className={filtersOpen ? "filters is-open" : "filters"}>
              {groups.map((g) => (
                <fieldset className="fgroup" key={g.key}>
                  <legend>{g.label}</legend>
                  <div className="fopts">
                    {g.opts.map(([v, label]) => {
                      const on = g.value === v;
                      return (
                        <button
                          type="button"
                          key={String(v)}
                          className={on ? "fopt is-on" : "fopt"}
                          aria-pressed={on}
                          onClick={() => setParams({ [g.key]: v })}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="sr-list" key={tab}>
        <div className="wrap">
          {tab === "comprar" && (
            <>
              <div className="sr-count">
                <span aria-live="polite">{plural(results.length, "imóvel", "imóveis")}</span>
                {hasFilters && (
                  <button type="button" className="link-arrow" onClick={() => { setQ(""); setParams({ tipo: null, bairro: null, suites: null, q: null }); }}>
                    Limpar filtros
                  </button>
                )}
              </div>
              {results.length > 0 ? (
                <div className="grid cols-3">
                  {results.map((p) => (
                    <PropertyCard key={p.codigo} p={p} sizes="(min-width: 1000px) 33vw, (min-width: 700px) 50vw, 100vw" />
                  ))}
                </div>
              ) : (
                <div className="empty">
                  <h2 className="h3">Nenhum imóvel com esses filtros</h2>
                  <p>Ajuste a busca, ou conte para a gente o que procura que fazemos a curadoria para você.</p>
                  <a className="btn btn-navy" href={waGeral} target="_blank" rel="noopener">Falar com um corretor</a>
                </div>
              )}
            </>
          )}

          {tab === "alugar" && (
            <div className="empty" style={{ marginTop: 28 }}>
              <h2 className="h3">Locação anual</h2>
              <p>Conte para a gente o que procura e um corretor da Vivere apresenta as opções disponíveis.</p>
              <a className="btn btn-navy" href={waAlugar} target="_blank" rel="noopener">Procuro um imóvel para alugar</a>
            </div>
          )}

          {tab === "lancamentos" && (
            <div className="launch-grid" style={{ marginTop: 28 }}>
              <div className="launch">
                <Image src="/photos/ap183/02-1600.webp" alt="Living de apartamento no Quay Luxury Home Design" fill sizes="(min-width: 700px) 50vw, 100vw" />
                <span className="shade" />
                <span className="launch-body">
                  <span className="eyebrow">Jurerê Internacional</span>
                  <span className="h3">Quay Luxury Home Design</span>
                </span>
              </div>
              <div className="launch">
                <span className="launch-ph">Imagens em breve</span>
                <span className="launch-body">
                  <span className="eyebrow">Santo Antônio de Lisboa</span>
                  <span className="h3">Vista Artefacto</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
