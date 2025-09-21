# AGENTS.md — LP Scaffold (Next.js Static Export)

Este documento define **papéis (agents)**, **padrões**, **fluxo de trabalho** e **regras técnicas** para construir, replicar e exportar **Landing Pages estáticas** usando **Next.js (App Router)**. A ideia é que qualquer pessoa do time consiga criar novas LPs sem quebrar o export estático.

---

## Visão Geral

- **Objetivo**: produzir LPs **100% estáticas** (HTML/CSS/JS) para deploy em CDN (S3+CF, Netlify, Vercel static, etc.).
- **Stack**: Next.js 14+, TypeScript, App Router, conteúdo em **JSON/MDX** por LP, **Tailwind** habilitado.
- **Princípio**: **Nenhum server runtime**. Tudo precisa ser gerado em build (`next build && next export`).

---

## Papéis (Agents)

### 1) **Content Agent**

Responsável pelo *conteúdo* de cada LP (texto, imagens, CTAs).

- Entregáveis: arquivos `content/lps/<slug>.json` (ou `.mdx` se necessário).
- Guidelines:
  - Títulos < 60 caracteres, descrições < 160.
  - Sempre definir `title`, `description`, `sections[]`.
  - Fornecer assets otimizados (webp, svg) em `public/`.

### 2) **Layout Agent**

Responsável por seções e UI reusável.

- Entregáveis: componentes em `components/sections/*` e `components/ui/*`.
- Regras:
  - Não usar `next/image` sem `unoptimized` ligado (ou preferir `<img>`).
  - Evitar dependências que exigem runtime de servidor.

### 3) **SEO Agent**

Define metadados por LP e padrões OG/Twitter.

- Entregáveis: `app/(lp)/[slug]/head.tsx`, `lib/meta.ts`.
- Regras:
  - `title` e `description` vindos do conteúdo.
  - `og:image` por LP quando possível (1200×630).

### 4) **DX/Scaffold Agent**

Mantém scripts, CLI e geração de novas LPs.

- Entregáveis: `scripts/new-lp.ts`, `package.json` scripts.
- Regras:
  - Garantir que `generateStaticParams()` inclui todos os slugs.
  - CI de build + export deve falhar se houver seção inválida.

### 5) **QA/Export Agent**

Valida build, export, acessibilidade e performance.

- Checklist:
  - `yarn build && yarn export` sem warnings críticos.
  - Lighthouse ≥ 90 em Performance/SEO/Best Practices/A11y.
  - HTML válido (Nu HTML checker) e sem links quebrados.

---

## Regras Técnicas (não negociáveis para HTML puro)

1. `` deve ter `output: 'export'` e `images.unoptimized = true`.
2. **Nada de APIs internas** em `app/api/*`.
3. **Nada de **``**/**`` ou leituras de request.
4. `` apenas em build com cache estático. Se remoto, usar `cache: 'force-cache'` e evitar dados voláteis.
5. **Rotas**: toda LP deve ser listada por `generateStaticParams()`.
6. **Fonts**: preferir `@font-face` local ou `next/font/local`.
7. **Tracking**: GTM / Meta Pixel via snippets estáticos no layout, sem depender de consentimento dinâmico.

---

## Estrutura de Pastas (padrão)

```
lp-scaffold/
├─ app/
│  ├─ (lp)/[slug]/page.tsx
│  ├─ (lp)/[slug]/head.tsx
│  ├─ layout.tsx
│  └─ globals.css
├─ components/
│  ├─ sections/
│  └─ ui/
├─ content/
│  └─ lps/
│     └─ landing-exemplo.json
├─ lib/
│  ├─ lps.ts
│  └─ meta.ts
├─ public/
│  └─ og-default.png
├─ scripts/
│  └─ new-lp.ts
├─ next.config.ts
├─ package.json
├─ tailwind.config.ts
├─ postcss.config.js
└─ tsconfig.json
```

---

## Bootstrapping (como iniciar o projeto)

### 1) Criar app Next.js com TypeScript

```bash
yarn create next-app lp-scaffold \
  --typescript --app --src-dir false --eslint --tailwind \
  --import-alias @/*
```

### 2) Ajustar `next.config.ts` (export estático)

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true }
}
export default nextConfig
```

### 3) Adicionar diretórios e arquivos base

Crie as pastas `content/lps`, `components/sections`, `lib`, `scripts` e `public`.

(... arquivos base iguais ao exemplo anterior ...)

### 4) CLI para criar novas LPs

``

```ts
#!/usr/bin/env ts-node
import fs from 'node:fs'
import path from 'node:path'

const slug = process.argv[2]
if (!slug) {
  console.error('Uso: yarn new:lp meu-slug')
  process.exit(1)
}

const tpl = {
  slug,
  title: `Título da ${slug}`,
  description: `Descrição da ${slug}`,
  sections: [
    { type: 'hero', props: { title: `Bem-vindo à ${slug}`, subtitle: 'Subtítulo', ctaLabel: 'Saiba mais', ctaHref: '#cta' } },
    { type: 'features', props: { items: [
      { title: 'Feature A', desc: 'Detalhe' },
      { title: 'Feature B', desc: 'Detalhe' }
    ]}},
    { type: 'cta', props: { id: 'cta', title: 'Vamos lá?', button: { label: 'Começar', href: '/' } } }
  ]
}

const file = path.join(process.cwd(), 'content', 'lps', `${slug}.json`)
if (fs.existsSync(file)) {
  console.error('Já existe uma LP com esse slug.')
  process.exit(1)
}
fs.writeFileSync(file, JSON.stringify(tpl, null, 2))
console.log(`LP criada em ${file}`)
```

``** — scripts**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "export": "next export",
    "build:html": "next build && next export",
    "new:lp": "ts-node scripts/new-lp.ts"
  },
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "typescript": "^5.6.2",
    "@types/node": "^20.11.30",
    "ts-node": "^10.9.2"
  }
}
```

---

## Fluxo de Trabalho

1. **Criar LP**: `yarn new:lp minha-lp` → edite `content/lps/minha-lp.json`.
2. **Rodar local**: `yarn dev` → `http://localhost:3000/minha-lp/`.
3. **Build**: `yarn build:html` → artefatos em `out/`.
4. **QA**: rodar Lighthouse, validar links e metas.
5. **Deploy**: subir `out/` para a CDN.

---

## Extensões opcionais

- **MDX** por LP (quando precisar de rich content): criar `content/lps/<slug>.mdx` e um loader em `lib/lps-mdx.ts`.
- **Temas** por LP: `theme` no JSON + CSS vars no `layout.tsx`.
- **i18n** manual (slugs por idioma): `pt/<slug>`, `en/<slug>` gerados em `generateStaticParams()`.

---

## Checklists

### PR Checklist

-

### Release Checklist

-

---

## Perguntas Frequentes (FAQ)

- **Posso usar **``**?** Sim, com `images.unoptimized = true`. Ou use `<img>`.
- **Posso usar formulários?** Use serviços externos (Formspree, etc.). Nada de `/api/*`.
- **Dá para usar cookies?** Não. Se precisar, vira outra stack (não export estático).
- **Astro seria melhor?** Para HTML ainda mais enxuto, sim. Mantemos Next pela familiaridade e velocidade do time.

