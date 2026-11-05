"use client";

export const TABS = [
  { key: "comprar", label: "Comprar" },
  { key: "alugar", label: "Alugar" },
  { key: "lancamentos", label: "Lançamentos" },
] as const;
export type TabKey = (typeof TABS)[number]["key"];

/** Abas em pílula com indicador deslizante (0,5s). "hero" = clara sobre a foto; "page" = navy na busca. */
export function Tabs({ value, onChange, variant }: { value: TabKey; onChange: (t: TabKey) => void; variant: "hero" | "page" }) {
  const pos = Math.max(0, TABS.findIndex((t) => t.key === value));
  const hero = variant === "hero";
  return (
    <div className={hero ? "hero-tabs" : "tabs"} role="tablist" aria-label="Tipo de busca">
      <span className={`${hero ? "hero-ind" : "tab-ind"} pos-${pos}`} aria-hidden="true" />
      {TABS.map((t) => {
        const on = t.key === value;
        return (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={on}
            className={`${hero ? "hero-tab" : "tab"}${on ? " is-on" : ""}`}
            onClick={() => onChange(t.key)}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
