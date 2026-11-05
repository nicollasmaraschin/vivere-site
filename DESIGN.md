# Vivere — Especificação do site novo

Documento de passagem do protótipo de design para o desenvolvimento no Claude Code.
Versão de 05/11/2026. O protótipo navegável de referência está em `prototype/prototipo-site.dc.html` e no canvas "Vivere — Protótipo do site" no Claude.

---

## 1. O projeto

- **O que é:** o site público da Vivere Imóveis Selecionados (viverenapraia.com.br), 100% próprio, substituindo o site atual do ImobiBrasil.
- **Quem cuida do quê:** o CRM com login dos corretores e o banco de dados dos imóveis são do Cleiton. Este projeto é só o site que os clientes veem, e ele consome os imóveis do CRM.
- **Posicionamento:** alto padrão em Florianópolis, com curadoria ("imóveis selecionados"). Especialidade em Jurerê Internacional. Matriz em Jurerê, filiais em Porto da Lagoa e Santo Antônio de Lisboa.
- **Como o site é usado de verdade:** a maior parte dos leads vem do Instagram e vai direto para o WhatsApp. O site é aberto principalmente **no celular, a partir de links enviados pelos corretores no WhatsApp**. Por isso:
  1. a **página do imóvel no celular** é a página mais importante do site;
  2. a **prévia do link no WhatsApp** (Open Graph: melhor foto, título, bairro, preço) é a primeira impressão;
  3. o site precisa **abrir rápido no 4G**.

## 2. Referências e o que veio de cada uma

| Fonte | O que levar | O que não levar |
|---|---|---|
| **Serhant (serhant.com)** | Estética geral; topo com foto em tela cheia e texto centralizado; abas em pílula + barra de busca larga; card do imóvel (foto grande sem moldura, preço, linha de características em caixa alta); **página do imóvel com fundo escuro e galeria 1 grande + 4 menores**; menu flutuante em pílula; painel de menu com letra gigante (na Vivere, o V); botões fixos no rodapé do celular; seção seguinte subindo sobre o topo com cantos arredondados; fonte Montserrat | Estrutura americana (Buy/Rent/Sell/Agents), agentes em destaque, excesso de seções institucionais |
| **Buzz (imobiliariabuzz.com.br)** | **Informação**: abas Comprar / Alugar / Lançamentos; busca por código; filtros brasileiros (tipo residencial/comercial, bairros agrupados, quartos, vagas, valor, área); condomínio e IPTU no bloco de valores; imóveis semelhantes; páginas de SEO por bairro; rodapé com todas as unidades | O tom "lifestyle surf", a cor laranja, fotos de surf. **A Vivere é Jurerê alto padrão, não surf.** |
| **Modelo da ThinkFirst (mockup)** | Ordem de seções da home; faixa "a Vivere em números" (adiada); destaque em tela dividida; seção para compradores estrangeiros (adiada); WhatsApp com mensagem pronta citando o imóvel | Placeholders, fotos de banco de imagem, fontes erradas |

## 3. Identidade visual

### Cores
Paleta oficial da marca. Tokens completos em `tokens/tokens.css` e `tokens/tokens.json`.

| Nome | Hex | Uso |
|---|---|---|
| Prussian Blue | `#1C2739` | cor principal: textos, botões, menu, fundos escuros |
| Dusty Tape | `#A4846B` | destaque decorativo (estrelas, foco). Em texto pequeno sobre claro, usar `#7A5E46` |
| Dusty Grey | `#D7CFC4` | fundo da seção de proprietários; texto sobre navy |
| Porcelain | `#F3F4EF` | fundo geral do site |
| Night | `#0E131C` | fundo do topo e da página do imóvel |

Sem laranja, sem cores vibrantes, sem degradês decorativos.

### Tipografia (decisão do cliente)
- **Montserrat** (Google Fonts): títulos (800), preços (700), botões, abas, campos de busca, links, cards, rodapé e endereços. O cliente achou a Novelin fina demais e a Aileron difícil de ler em elementos de interface.
- **Aileron** (`fonts/`, licença CC0): só textos longos (descrição do imóvel, parágrafos). Há abertura para passar tudo para Montserrat.
- **Novelin:** só dentro da logo (SVG). Não usar como fonte no site sem confirmar a licença web.
- Escala: ver `tokens.json`. Títulos em Montserrat 800 com tracking −0,02em, frases em caixa normal (sem itálico, sem uma palavra destacada no meio do título).

### Logo
- No cabeçalho: **só o "VIVERE" por extenso** (`brand/vivere-wordmark.svg`). O cliente não quer o símbolo V ao lado.
- O **V** (`brand/vivere-symbol-v.svg`) aparece no painel do menu, vazado em branco sobre uma foto circular.
- Selo circular (`brand/vivere-seal.svg`) e versão com "Imóveis selecionados" (`vivere-wordmark-tagline*.svg`) para rodapé e linha Privé.
- Todos os SVGs usam `fill="currentColor"`: a cor vem do CSS.

### Tom
Sóbrio, preciso, alto padrão. Frases curtas. Nada de gírias, trocadilhos ou "nossa onda". Fotografia de arquitetura, interiores bem iluminados, fim de tarde, aéreas de Jurerê. Sem surf.

## 4. Princípios de design (da revisão com a skill de front-end)
- Sem rótulos em caixa alta acima de cada título (o rótulo, quando informativo, vira o próprio título).
- Movimento sem ação do usuário: **um único momento orquestrado** (entrada do topo da home). Nada de "toda seção surgindo ao rolar".
- Movimento que responde a ação é bem-vindo: abas, menu, sugestões, botão de busca, galeria, troca de tela.
- Respeitar `prefers-reduced-motion` em tudo.
- Foco de teclado visível (contorno areia 2px), alvos de toque ≥ 44px, contraste AA.

## 5. Componentes

### Cabeçalho
- Pílula flutuante fixa no topo (12px de margem no celular, 16/24px no computador), altura 60/66px, navy 86% com desfoque.
- **Transparente sobre a foto do topo da home**; vira a pílula navy ao rolar mais de 40px. Na página do imóvel, versão clara (porcelana).
- Conteúdo: wordmark | links (computador): Comprar, Alugar, Lançamentos, Bairros, Contato | ícone de busca | **botão "Menu"** (pílula com rótulo no computador, só ícone no celular). O "Fale conosco" foi substituído pelo Menu.

### Painel do menu
- Abre **a partir do botão Menu**: `clip-path: circle()` partindo do centro do botão (0,8s, `cubic-bezier(.7,0,.2,1)`), e fecha recolhendo para o botão (0,5s). O fundo escurece junto.
- Computador: painel com margem de 14px e cantos de 28px. À esquerda, uma foto circular grande com o **V da logo vazado em branco** por cima (versão Vivere do "S" da Serhant). À direita: links grandes (Montserrat 800, 42px), colunas Imóveis / Bairros / Unidades, e botões "Falar com um corretor" e "Anunciar meu imóvel".
- Celular: tela cheia, sem a foto, com links de 32px.
- Sequência: círculo → foto (zoom 1.12→1) → V → links um a um (50ms entre eles) → colunas → botões.

### Topo da home
- Foto em tela cheia (720px celular / 860px computador), véu escuro de 44% e degradê na base.
- Título centralizado: **"Morar ou investir, seu lugar é aqui."**. Subtítulo: **"A imobiliária mais bem avaliada de Florianópolis."** (atenção: é uma afirmação comparativa; a alternativa à prova de contestação é "Nota 5,0 no Google, com 76 avaliações").
- **Abas Comprar / Alugar / Lançamentos** em pílula clara centralizada, com **indicador branco que desliza** entre as opções (0,5s). As três abas têm a mesma largura.
- **Barra de busca** larga e arredondada ("Bairro, condomínio ou código do imóvel") com botão redondo de seta.
- A seção seguinte sobe sobre a foto com cantos arredondados (40/56px).
- Entrada única: foto com zoom lento (2s), depois título, subtítulo, abas e busca em sequência.

### Busca com sugestões (aprovada como "perfeita")
- Sugestões a partir da **primeira letra**, em três grupos: **Bairros** (com quantidade de imóveis ou "Consultar disponibilidade"), **Condomínios** e **Imóveis** (título + código + preço).
- Nome exato sobe para o topo ("Jurerê" antes de "Jurerê Internacional"). Busca ignora acentos.
- Teclado: setas, Enter, Esc. Sem resultado: mensagem e Enter busca em todos.
- Ao escolher um bairro, a busca abre **já filtrada por esse bairro**. Código exato abre o imóvel direto.
- Fluidez: barra sobe 2px e ganha sombra no foco; painel abre com escala/fade (0,45s), itens em cascata, fecha com animação.
- **Botão da seta ao confirmar:** a seta separa haste e ponta. Recua comprimindo (impulso), segura, e dispara para a direita se esticando e sumindo, com a ponta dobrando para trás (0,62s). A troca de página acontece em 0,58s. Depois, a tela de busca entra com fade/subida e os cards em cascata.

### Card do imóvel (estilo Serhant, mantido por escolha do cliente)
- Foto 4:3, cantos 14px, zoom leve no hover.
- Preço (Montserrat 700, 20px), "Tipo · Bairro", linha de características em caixa alta pequena: "3 suítes · 194 m² · 2 vagas · AP183".
- **Sem etiquetas** (Exclusivo, Aceita financiamento etc.). O cliente prefere menos informação. A única etiqueta é **"Vivere Privé"** (canto superior esquerdo, navy, canto inferior direito arredondado).

### Página do imóvel (a mais importante)
- Topo escuro (Night) com o cabeçalho claro.
- Caminho: Início / Comprar / Bairro / Código.
- **Galeria:** celular com 1 foto grande (4:3) + fileira de 4 miniaturas, a última com "+N". Computador com grade 2fr/1fr/1fr: 1 grande + 4 menores e o botão "Ver todas as fotos (N)". Clique abre o lightbox (anterior/próxima, contador).
- Cabeçalho do imóvel: tipo · bairro, título, código, **preço (uma única vez na página)**, linha de características com ícones.
- **Endereço: só o bairro.** O endereço exato e o mapa ficam no CRM, só para corretores.
- Corpo: **Detalhes** (condomínio, IPTU, área, terreno, valor por m²; sem repetir o preço), **Sobre o imóvel** (descritivo), **Diferenciais** (chips), card do bairro com link para os imóveis do bairro.
- Computador: card lateral fixo "Gostou deste imóvel?" com WhatsApp e Agendar visita (sem preço nem valores, para não repetir).
- Celular: **barra fixa no rodapé** com WhatsApp + Agendar visita.
- "Outros imóveis selecionados" no fim.

### Busca (página)
- Título conforme a aba ("Imóveis à venda em Florianópolis").
- Abas com o mesmo indicador deslizante (aqui navy com texto claro).
- Campo de texto que filtra ao digitar. Botão "Filtros" no celular (abre o painel); no computador os filtros ficam visíveis.
- Filtros: Tipo (Todos/Apartamentos/Casas), Bairro (Jurerê Internacional, Jurerê, Novo Campeche, Santo Antônio de Lisboa, Cacupé), Suítes (2+, 3+), Ordenar (Seleção Vivere, maior, menor preço).
- Contagem e "Limpar filtros". Lista vazia com chamada para o WhatsApp.

### Seções da home (ordem atual)
1. Topo com busca
2. A Vivere: frase de posicionamento + as três unidades
3. Imóveis selecionados ("Uma seleção, não um catálogo.")
4. **Vivere Privé**: destaque em tela dividida, com foto grande + painel navy com o selo
5. Lançamentos: carrossel/grade sobre navy
6. Bairros: mosaico com os 5 guias
7. Vídeos: cards verticais (formato a definir)
8. Avaliações: 5,0 · 76 avaliações no Google + depoimentos reais
9. Para proprietários: "Anunciar meu imóvel"
10. Rodapé navy: wordmark com assinatura, unidades, links, contato, CRECI

## 6. Regras de negócio e conteúdo

- **WhatsApp:** todos os cliques vão para um número único (provisório: 55 48 99197-9159, **confirmar**). A mensagem pronta sempre cita código, tipo, bairro e preço. "Agendar visita" também abre o WhatsApp com mensagem pronta. Integração com o CRM depois.
- **Vivere Privé:** a linha premium são os **imóveis com exclusividade Vivere**. Nome provisório (favoritos do cliente: Privé e Collezione; Black como possibilidade). No protótipo, só o CA195 está marcado, apenas como exemplo.
- **Preço:** exibido em praticamente todos os imóveis.
- **Locação:** sem garantias nem detalhes extras nesta fase.
- **Equipe:** sem cards de corretor; eles aparecem nos vídeos.
- **Guias de bairro prioritários:** Jurerê Internacional, Jurerê, Novo Campeche, Santo Antônio de Lisboa e Cacupé.
- **Idiomas:** só português por enquanto (inglês e espanhol depois; Jurerê tem muito comprador estrangeiro).
- **Números da Vivere:** fora por enquanto.
- **Avaliações:** usar a **API do Perfil da Empresa do Google** (a ficha é da Vivere, dá acesso a todas as avaliações). Ficha: Vivere Jurerê Internacional, place_id `ChIJj0flj7xFJ5UR6HMBkbAC2Vs`. Nunca inventar depoimentos.
- **Vídeos:** o cliente quer os vídeos integrados, mas leves. Ele **não gosta** do YouTube com capa e botão de play. Caminho sugerido: streaming próprio (Cloudflare Stream, Mux ou Bunny) com player nas cores da Vivere; vídeo do topo como loop curto sem som (2 a 3 MB), com foto estática carregando antes. Os originais estão no Drive, e há cópias no YouTube e no Instagram.

## 7. Requisitos técnicos

- **Desempenho é requisito de design.** Meta: página do imóvel abrindo rápido em 4G (LCP < 2,5s), imagens AVIF/WebP responsivas com lazy-load, fontes com `font-display: swap` e subset, zero bibliotecas desnecessárias (o site atual carrega o jQuery cerca de 10 vezes; não repetir).
- **SEO:**
  - Páginas por imóvel, bairro e tipo, com schema.org (RealEstateListing / Residence).
  - **Redirecionar 301 todas as URLs antigas** (`/imovel/<id>/<slug>`, `/imovel/?finalidade=...`) para as novas.
  - Open Graph caprichado na página do imóvel, porque é a prévia no WhatsApp.
- **Dados:** os imóveis vêm do CRM do Cleiton. O formato de referência está em `data/imoveis.json`; alinhar os campos com ele. Enquanto o CRM não estiver pronto, usar esse JSON como fonte.
- **Acessibilidade:** botões reais, `aria-label` em botões só de ícone, foco visível, contraste AA, `prefers-reduced-motion`.

## 8. Pendências

- [ ] Confirmar o número do WhatsApp.
- [ ] Definir quais imóveis entram no Vivere Privé e o nome final da linha.
- [ ] Decidir o formato dos vídeos e escolher o vídeo do topo.
- [ ] Imagens do Vista Artefacto e de outros lançamentos.
- [ ] Imóveis de locação para a aba Alugar.
- [ ] Fotos para os guias de Jurerê e Santo Antônio de Lisboa.
- [ ] Desenhar as páginas que faltam: guia de bairro, página de lançamento, sobre e contato (a partir dos componentes acima).
- [ ] Alinhar os campos do CRM com o Cleiton.
- [ ] Domínio e hospedagem (Vercel sugerida).
- [ ] Confirmar se a frase "a imobiliária mais bem avaliada de Florianópolis" fica.

## 9. Arquivos deste pacote

| Pasta | Conteúdo |
|---|---|
| `tokens/` | `tokens.css` (variáveis CSS) e `tokens.json` |
| `brand/` | Logos em SVG (`currentColor`) |
| `fonts/` | Aileron (CC0) e Novelin (referência, não usar sem licença) em WOFF2 com subset latino |
| `photos/<codigo>/` | Fotos já tratadas e otimizadas: `NN-1600.webp` (galeria) e `NN-720.webp` (cards e miniaturas). A ordem é a da galeria: a 01 é a capa |
| `data/imoveis.json` | Os 4 imóveis reais com descritivos, diferenciais e fotos na ordem certa |
| `data/vivere.json` | Unidades, contato, Google, bairros, lançamentos e avaliações de exemplo |
| `prototype/prototipo-site.dc.html` | Código do protótipo, para referência de layout, CSS e animações. Usa o formato do canvas de design do Claude (`<x-dc>`, `{{}}`, `<sc-if>`/`<sc-for>`): é referência, não deve ser copiado como está |

As fotos originais (HEIC/JPG em alta) estão nas pastas do Drive indicadas em `pasta_drive_id`.
