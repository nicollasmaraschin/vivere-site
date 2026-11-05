"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import vivere from "@/data/vivere.json";
import { bairroHref, imovelHref, getImoveis } from "@/lib/data";
import { waAnunciar, waGeral } from "@/lib/whatsapp";
import { BrandMask, Wordmark } from "./brand";
import { IconChevronR, IconClose, IconSearch, IconWhats } from "./icons";

const PRIVE = getImoveis().find((i) => i.vivere_prive);

export function MenuPanel({ x, y, onClosed, onNavigate }: { x: number; y: number; onClosed: () => void; onNavigate: () => void }) {
  const [closing, setClosing] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const root = useRef<HTMLDivElement>(null);

  const close = () => {
    if (closing) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return onClosed();
    setClosing(true);
    setTimeout(onClosed, 480);
  };

  useEffect(() => {
    closeBtn.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      // Mantém o foco do teclado dentro do menu
      if (e.key === "Tab" && root.current) {
        const f = root.current.querySelectorAll<HTMLElement>("a[href],button");
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Clique em link interno: fecha na hora e segue para a página
  const nav = (e: React.MouseEvent) => {
    const a = (e.target as HTMLElement).closest("a");
    if (a && !a.target) onNavigate();
  };

  return (
    <div ref={root} className={closing ? "menu is-closing" : "menu"} role="dialog" aria-modal="true" aria-label="Menu" onClick={nav}>
      <div className="menu-panel" style={{ "--mx": `${x}px`, "--my": `${y}px` } as CSSProperties}>
        <div className="menu-art" aria-hidden="true">
          <div className="menu-art-photo">
            <Image src="/photos/ap183/01-1600.webp" alt="" fill quality={85} sizes="(min-width: 1000px) 75vw, 1px" />
          </div>
          <BrandMask src="/brand/vivere-symbol-v.svg" className="vmark" />
        </div>
        <div className="menu-side">
          <div className="menu-top">
            <Wordmark className="wm menu-wm" />
            <div className="menu-top-actions">
              <a className="btn btn-line" href={waGeral} target="_blank" rel="noopener" aria-label="WhatsApp">
                <IconWhats />
                <span>WhatsApp</span>
              </a>
              <Link className="btn btn-navy" href="/busca" aria-label="Buscar imóvel">
                <span>Buscar imóvel</span>
                <IconSearch strokeWidth={1.8} />
              </Link>
              <button ref={closeBtn} className="menu-close" onClick={close} aria-label="Fechar menu">
                <IconClose />
              </button>
            </div>
          </div>
          <div className="menu-body">
            <nav className="menu-main" aria-label="Menu principal">
              <Link href="/busca?tab=comprar">Comprar</Link>
              <Link href="/busca?tab=alugar">Alugar</Link>
              <Link href="/busca?tab=lancamentos">Lançamentos</Link>
              <Link href="/#bairros">Bairros</Link>
              <Link href="/#avaliacoes">Avaliações</Link>
              <Link href="#contato">Contato</Link>
            </nav>
            <div className="menu-cols">
              <div className="menu-col">
                <h2>Imóveis</h2>
                <Link href="/busca?tipo=Apartamento">Apartamentos</Link>
                <Link href="/busca?tipo=Casa">Casas</Link>
                {PRIVE && <Link href={imovelHref(PRIVE.codigo)}>Vivere Privé</Link>}
                <a href={waAnunciar} target="_blank" rel="noopener">Anunciar meu imóvel</a>
              </div>
              <div className="menu-col">
                <h2>Bairros</h2>
                {vivere.bairros_guia.map((b) => (
                  <Link key={b.nome} href={bairroHref(b.nome)}>{b.nome}</Link>
                ))}
              </div>
              <div className="menu-col menu-units">
                <h2>Unidades</h2>
                {vivere.unidades.map((u) => (
                  <p key={u.nome}>
                    <b>{u.nome}</b>
                    {u.endereco.replace(", Lagoa da Conceição", "")}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="menu-foot">
            <a className="btn btn-navy" href={waGeral} target="_blank" rel="noopener">
              Falar com um corretor
              <IconWhats />
            </a>
            <a className="btn btn-line" href={waAnunciar} target="_blank" rel="noopener">
              Anunciar meu imóvel
              <IconChevronR />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
