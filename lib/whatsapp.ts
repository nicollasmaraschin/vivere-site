import vivere from "@/data/vivere.json";
import { brl } from "./format";

// Número provisório (data/vivere.json) — confirmar com o Nícollas.
const NUMERO = vivere.whatsapp.numero;

export const waLink = (msg: string) => `https://wa.me/${NUMERO}?text=${encodeURIComponent(msg)}`;

type Ref = { codigo: string; tipo: string; bairro: string; preco: number };
const ref = (p: Ref) => `${p.codigo} · ${p.tipo} em ${p.bairro} (${brl(p.preco)})`;

export const waImovel = (p: Ref) => waLink(`Olá! Vi no site o imóvel ${ref(p)} e gostaria de mais informações.`);
export const waVisita = (p: Ref) =>
  waLink(`Olá! Gostaria de agendar uma visita ao imóvel ${ref(p)}. Qual o melhor dia e horário?`);
export const waGeral = waLink("Olá! Vim pelo site da Vivere e gostaria de atendimento.");
export const waAnunciar = waLink("Olá! Tenho um imóvel e gostaria de anunciar com a Vivere.");
export const waAlugar = waLink("Olá! Procuro um imóvel para locação anual.");
