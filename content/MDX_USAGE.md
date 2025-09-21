# Como criar conteúdos MDX para `content/lps/`

Este documento explica o formato esperado para arquivos MDX usados como _landing pages_ (LPs) no projeto.

Local esperado

-- Todos os arquivos de LP devem ficar em `content/lps/` e ser arquivos JSON (`.json`).

- O arquivo `content/lps/index.ts` é um índice auto-gerado (pelo script `build-mdx-index`) que exporta metadados dos MDX.

Estrutura mínima (frontmatter)

Cada arquivo MDX deve começar com um bloco YAML (frontmatter) contendo pelo menos os campos:

- `slug`: string — o identificador/rota da LP (ex.: `meu-produto`).
- `title`: string — título da página (meta `title`).
- `description`: string — descrição curta (meta `description`).
- `sections`: array — lista de seções, cada uma com `type` e `props` (utilizado pelo renderer).

Exemplo de arquivo `content/lps/exemplo.json`

```mdx
---
slug: exemplo
title: 'Exemplo de Landing'
description: 'Uma landing de exemplo gerada pelo template.'
sections:
  - type: hero
    props:
      title: 'Bem-vindo à LP de exemplo'
      subtitle: 'Subtítulo amigável'
      ctaLabel: 'Saiba mais'
      ctaHref: '#cta'
  - type: features
    props:
      items:
        - title: 'Velocidade'
          desc: 'Otimizamos para CDN'
        - title: 'Simplicidade'
          desc: 'Conteúdo em MDX'
---

Conteúdo MDX livre abaixo do frontmatter.

# Seção adicional

Algum conteúdo adicional em MDX pode ser escrito aqui. Use componentes MDX exportados em `components/mdx-components.tsx` quando precisar.
```

Boas práticas

- Mantenha `title` < 60 caracteres e `description` < 160 caracteres para SEO.
- Use assets otimizados em `public/` (WebP, SVG) e referências relativas (`/img.png`).
- Se precisar de rich content, inclua componentes MDX e importe-os via `components/mdx-components.tsx`.
- Rode `npx ts-node scripts/build-mdx-index.ts` após criar/editar um MDX para atualizar `content/lps/index.ts`.

Integração com CLI

-- `yarn new:lp meu-slug` cria um JSON de template em `content/lps/meu-slug.json`. Edite o arquivo conforme necessário.
