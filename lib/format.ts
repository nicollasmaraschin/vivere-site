const num = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });

/** R$ 7.900.000 (sem centavos, como no protótipo) */
export const brl = (n: number) => `R$ ${num.format(n)}`;
export const m2 = (n: number) => `${num.format(n)} m²`;
export const plural = (n: number, um: string, varios: string) => `${n} ${n === 1 ? um : varios}`;

/** Minúsculas e sem acento: "Jurerê" → "jurere" */
export const norm = (s: string | null | undefined) =>
  String(s ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** "3 suítes · 194 m² · 2 vagas" (linha de características do card) */
export const metaCard = (p: { suites: number; area: number; vagas: number }) =>
  `${plural(p.suites, "suíte", "suítes")} · ${m2(p.area)} · ${plural(p.vagas, "vaga", "vagas")}`;
