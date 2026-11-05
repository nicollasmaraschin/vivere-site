# Pacote de passagem: site da Vivere

Este pacote leva tudo o que foi decidido no protótipo para o Claude Code.

## Como usar

1. **Crie as contas** (gratuitas para começar): GitHub (github.com) e Vercel (vercel.com, entrando com o GitHub).
2. **Crie um repositório** no GitHub chamado, por exemplo, `vivere-site`.
3. **Abra o Claude Code** conectado a esse repositório (pelo app do Claude ou pelo terminal).
4. **Envie esta pasta inteira** para o repositório (arrastando os arquivos no GitHub ou pedindo ao Claude Code).
5. **Mande esta primeira mensagem** ao Claude Code:

> Leia o CLAUDE.md e o DESIGN.md. Monte o projeto Next.js do site da Vivere a partir deles, usando os tokens, as fontes, as logos, as fotos e os dados deste pacote. Comece pela página do imóvel no celular e pela home, seguindo o protótipo em `prototype/`. Ao terminar cada etapa, publique uma prévia na Vercel e me mande o link.

## O que tem aqui

- `DESIGN.md`: especificação completa (decisões, componentes, animações, regras, pendências)
- `CLAUDE.md`: instruções permanentes para o Claude Code
- `tokens/`: cores, fontes, tamanhos e animações em CSS e JSON
- `brand/`: logos da Vivere em SVG
- `fonts/`: Aileron (e Novelin, só como referência)
- `photos/`: fotos dos 4 imóveis já otimizadas para a web
- `data/`: dados dos imóveis e da Vivere em JSON
- `prototype/`: código do protótipo aprovado, como referência
