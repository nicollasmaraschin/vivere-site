export type Foto = { grande: string; pequena: string };

export type Imovel = {
  codigo: string;
  tipo: "Apartamento" | "Casa" | string;
  finalidade: "venda" | "locacao" | string;
  bairro: string;
  cidade: string;
  condominio: string | null;
  titulo: string;
  preco: number;
  condominio_valor: number | null;
  iptu: number | null;
  area: number;
  area_tipo: string;
  terreno: number | null;
  valor_m2: number | null;
  dormitorios: number;
  suites: number;
  banheiros: number;
  vagas: number;
  vivere_prive: boolean;
  descricao: string[];
  diferenciais: string[];
  fotos: Foto[];
  foto_alt: string;
  url_site_atual?: string;
  pasta_drive_id?: string;
};

/** Versão leve do imóvel, enviada ao navegador (cards, busca, sugestões). */
export type ImovelResumo = Pick<
  Imovel,
  "codigo" | "tipo" | "bairro" | "condominio" | "titulo" | "preco" | "area" | "suites" | "vagas" | "vivere_prive" | "foto_alt"
> & { capa: string };
