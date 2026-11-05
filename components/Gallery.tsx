"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Foto } from "@/lib/types";
import { IconChevronL, IconChevronR, IconClose } from "./icons";

const src = (p: string) => `/${p.replace(/^\/+/, "")}`;

export function Gallery({ fotos, alt }: { fotos: Foto[]; alt: string }) {
  const [lb, setLb] = useState<number | null>(null);
  const total = fotos.length;
  const thumbs = [1, 2, 3, 4].filter((i) => fotos[i]);

  return (
    <>
      <div className="gal">
        <button className="gal-main" onClick={() => setLb(0)} aria-label="Ampliar foto principal">
          <Image
            src={src(fotos[0].grande)}
            alt={alt}
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 1320px) 820px, (min-width: 1000px) 60vw, 100vw"
          />
          <span className="gal-all">Ver todas as fotos ({total})</span>
        </button>
        {thumbs.map((i) => {
          const more = i === 4 && total > 5;
          return (
            <button
              key={i}
              className="gal-th"
              onClick={() => setLb(i)}
              aria-label={more ? `Ver todas as ${total} fotos` : `Ampliar foto ${i + 1}`}
            >
              <Image src={src(fotos[i].grande)} alt="" fill sizes="(min-width: 1000px) 20vw, 25vw" />
              {more && <span className="gal-more">+{total - 5}</span>}
            </button>
          );
        })}
      </div>
      {lb !== null && <Lightbox fotos={fotos} alt={alt} start={lb} onClose={() => setLb(null)} />}
    </>
  );
}

function Lightbox({ fotos, alt, start, onClose }: { fotos: Foto[]; alt: string; start: number; onClose: () => void }) {
  const [i, setI] = useState(start);
  const total = fotos.length;
  const go = useCallback((d: number) => setI((v) => (v + d + total) % total), [total]);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const touch = useRef<number | null>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [go, onClose]);

  const next = fotos[(i + 1) % total];

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label="Galeria de fotos">
      <div className="lb-top">
        <span aria-live="polite">
          {i + 1} / {total}
        </span>
        <button ref={closeBtn} className="icon-btn" onClick={onClose} aria-label="Fechar galeria">
          <IconClose />
        </button>
      </div>
      <div
        className="lb-stage"
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touch.current === null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touch.current = null;
        }}
      >
        <Image key={i} src={src(fotos[i].grande)} alt={`${alt} (foto ${i + 1} de ${total})`} fill sizes="100vw" />
        {/* pré-carrega a próxima foto */}
        <Image src={src(next.grande)} alt="" fill sizes="100vw" style={{ visibility: "hidden" }} aria-hidden />
      </div>
      <div className="lb-nav">
        <button className="icon-btn" onClick={() => go(-1)} aria-label="Foto anterior">
          <IconChevronL />
        </button>
        <button className="icon-btn" onClick={() => go(1)} aria-label="Próxima foto">
          <IconChevronR />
        </button>
      </div>
    </div>
  );
}
