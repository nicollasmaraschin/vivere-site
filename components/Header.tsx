"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./brand";
import { IconMenu, IconSearch } from "./icons";
import { MenuPanel } from "./MenuPanel";

export const NAV = [
  { href: "/busca?tab=comprar", label: "Comprar" },
  { href: "/busca?tab=alugar", label: "Alugar" },
  { href: "/busca?tab=lancamentos", label: "Lançamentos" },
  { href: "/#bairros", label: "Bairros" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu ao trocar de página
  useEffect(() => setMenu(null), [path]);

  const isHome = path === "/";
  const cls = path.startsWith("/imovel")
    ? "hdr hdr--light"
    : isHome && !scrolled && !menu
      ? "hdr hdr--clear"
      : "hdr";

  const open = () => {
    const r = btn.current?.getBoundingClientRect();
    setMenu({ x: r ? Math.round(r.left + r.width / 2) : window.innerWidth - 44, y: r ? Math.round(r.top + r.height / 2) : 40 });
  };

  return (
    <>
      <header className={cls}>
        <div className="hdr-bar">
          <Link className="logo" href="/" aria-label="Vivere, página inicial">
            <Wordmark />
          </Link>
          <nav className="nav" aria-label="Principal">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hdr-actions">
            <Link className="icon-btn" href="/busca" aria-label="Buscar imóveis">
              <IconSearch />
            </Link>
            <button
              ref={btn}
              className="menu-pill"
              onClick={open}
              aria-label="Menu"
              aria-expanded={!!menu}
              aria-haspopup="dialog"
            >
              <span className="menu-pill-label" aria-hidden="true">
                Menu
              </span>
              <IconMenu />
            </button>
          </div>
        </div>
      </header>
      {menu && (
        <MenuPanel
          x={menu.x}
          y={menu.y}
          onClosed={() => {
            setMenu(null);
            btn.current?.focus();
          }}
          onNavigate={() => setMenu(null)}
        />
      )}
    </>
  );
}
