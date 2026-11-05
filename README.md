# Site da Vivere Imóveis Selecionados

Site público da Vivere (viverenapraia.com.br), em Next.js. As decisões de design estão em `DESIGN.md` e as regras do projeto em `CLAUDE.md`.

## Páginas prontas

| Endereço | O que é |
|---|---|
| `/` | Home: topo com busca e sugestões, unidades, imóveis selecionados, Vivere Privé, lançamentos, bairros, vídeos, avaliações, proprietários |
| `/imovel/ap183` (e `ca195`, `ap365`, `ca217`) | Página do imóvel: galeria 1 + 4, preço uma única vez, barra fixa no celular, prévia caprichada no WhatsApp |
| `/busca` | Busca com abas, filtros e texto (aceita `?bairro=`, `?tipo=`, `?suites=`, `?q=`, `?tab=`) |

## De onde vêm as coisas

- **Imóveis:** `data/imoveis.json` (até a integração com o CRM). Só `lib/data.ts` lê esse arquivo; quando o CRM ficar pronto, muda só ele.
- **Contato, unidades, bairros, avaliações:** `data/vivere.json`. O número do WhatsApp está lá (provisório).
- **Cores, tamanhos e animações:** `tokens/tokens.css`, ligados ao Tailwind em `app/globals.css`.
- **Fotos:** `public/photos/<código>/`. A Vercel converte para AVIF/WebP no tamanho certo para cada tela.
- **Prévia do WhatsApp:** `public/og/<código>.jpg` (1200×630). Ao adicionar imóvel novo, rode `npm run og`.
- **Links antigos:** `/imovel/<id>/<slug>` do ImobiBrasil redirecionam (301) para a página nova (`next.config.ts`).

## Ver o site sem instalar nada (GitHub Codespaces)

1. Abra o repositório no GitHub e escolha o ramo que quer ver.
2. Clique no botão verde **Code** → aba **Codespaces** → **Create codespace on …**.
3. Espere 1 a 2 minutos. O site abre sozinho numa aba nova do navegador
   (se o navegador bloquear, clique em **Open in Browser** no aviso que aparece no canto).
4. Quando terminar, feche a aba. O Codespace desliga sozinho depois de 30 minutos parado.

## Rodar no computador

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Publicar

A Vercel publica sozinha a cada envio ao GitHub: cada ramo ganha um link de prévia, e o ramo principal vira o site.
O site fica fora do Google até o domínio definitivo estar ligado. Para liberar, crie na Vercel a variável `SITE_INDEX=1`
e `NEXT_PUBLIC_SITE_URL=https://viverenapraia.com.br`.
