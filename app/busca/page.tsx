import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchView } from "@/components/SearchView";
import { BAIRROS, getImoveis, resumo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Imóveis à venda em Florianópolis",
  description: "Apartamentos e casas de alto padrão em Jurerê Internacional, Cacupé, Novo Campeche e outros bairros de Florianópolis.",
  alternates: { canonical: "/busca" },
};

export default function BuscaPage() {
  const imoveis = getImoveis().filter((i) => i.finalidade === "venda").map(resumo);
  return (
    <Suspense>
      <SearchView imoveis={imoveis} bairros={BAIRROS} />
    </Suspense>
  );
}
