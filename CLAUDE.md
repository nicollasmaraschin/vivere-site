# Instruções do projeto: site da Vivere Imóveis Selecionados

Leia `DESIGN.md` antes de qualquer tarefa. Ele registra as decisões de design já aprovadas pelo cliente e prevalece sobre preferências genéricas.

## Contexto
- Site público da Vivere (imobiliária de alto padrão em Florianópolis), substituindo o site atual no ImobiBrasil (viverenapraia.com.br).
- Os imóveis vêm do CRM próprio, feito pelo Cleiton. Até a integração ficar pronta, a fonte é `data/imoveis.json`.
- Quem pede as mudanças é o Nícollas (gestão da imobiliária), que não é programador. Explique as decisões em português claro e sem jargão.

## Stack sugerida
- Next.js (App Router) + TypeScript + Tailwind, com os tokens de `tokens/tokens.css` / `tokens/tokens.json` mapeados no tema.
- `next/image` para fotos (AVIF/WebP, `sizes` corretos, lazy-load) e `next/font` para Montserrat e Aileron (arquivos em `fonts/`).
- Hospedagem na Vercel. Componentes de animação leves (CSS ou Motion), sem bibliotecas pesadas.
- Se a 21st.dev (Magic MCP) estiver conectada, use os componentes do catálogo como ponto de partida, sempre adaptados aos tokens e ao tom da Vivere.

## Prioridades, nesta ordem
1. **Página do imóvel no celular**, aberta a partir de links do WhatsApp: rápida, com galeria 1 + 4, preço uma única vez, barra fixa com WhatsApp e Agendar visita, e Open Graph com a melhor foto.
2. Home e busca, conforme o protótipo (`prototype/`).
3. SEO: páginas por imóvel, bairro e tipo, schema.org e redirecionamentos 301 das URLs antigas.
4. Novas páginas (guia de bairro, lançamento, sobre, contato), sempre a partir dos componentes existentes.

## Regras que não podem ser quebradas
- Endereço exato nunca aparece no site, só o bairro.
- Nunca inventar avaliações, números ou depoimentos. Avaliações vêm da API do Perfil da Empresa do Google.
- Montserrat em títulos e interface; Aileron só em textos longos; Novelin só dentro da logo.
- Só o "VIVERE" por extenso no cabeçalho, sem o símbolo V ao lado.
- Sem etiquetas nos cards, exceto "Vivere Privé".
- Tom sóbrio de alto padrão (Jurerê), nada de estética surf.
- Toda animação respeita `prefers-reduced-motion`.
- Não reproduzir código, marcas ou elementos proprietários da Serhant ou da Buzz. Elas são referência de padrão, não fonte de cópia.

## Verificação
Antes de dizer que algo está pronto, rode o build, abra a página em 375px e em 1440px, e confira desempenho (Lighthouse mobile) e acessibilidade.
