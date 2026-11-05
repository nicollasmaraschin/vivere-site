import imoveisJson from "@/data/imoveis.json";
import vivereJson from "@/data/vivere.json";
import type { Imovel, ImovelResumo } from "./types";

// Fonte provisória: data/imoveis.json. Quando o CRM do Cleiton estiver pronto,
// só estas funções mudam (passam a buscar da API); as páginas continuam iguais.
const IMOVEIS = imoveisJson as Imovel[];

export const vivere = vivereJson;

export const foto = (path: string) => `/${path.replace(/^\/+/, "")}`;

export function getImoveis(): Imovel[] {
  return IMOVEIS;
}

export function getImovel(codigo: string): Imovel | undefined {
  return IMOVEIS.find((i) => i.codigo.toLowerCase() === codigo.toLowerCase());
}

export function resumo(i: Imovel): ImovelResumo {
  return {
    codigo: i.codigo,
    tipo: i.tipo,
    bairro: i.bairro,
    condominio: i.condominio,
    titulo: i.titulo,
    preco: i.preco,
    area: i.area,
    suites: i.suites,
    vagas: i.vagas,
    vivere_prive: i.vivere_prive,
    foto_alt: i.foto_alt,
    capa: foto(i.fotos[0].grande),
  };
}

export const BAIRROS = vivere.bairros_guia.map((b) => b.nome);

export function textoBairro(nome: string) {
  return vivere.bairros_guia.find((b) => b.nome === nome)?.texto ?? "";
}

export const imovelHref = (codigo: string) => `/imovel/${codigo.toLowerCase()}`;
export const bairroHref = (bairro: string) => `/busca?bairro=${encodeURIComponent(bairro)}`;
