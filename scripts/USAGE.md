# Uso dos scripts do projeto

Este arquivo descreve como usar os scripts presentes na pasta `scripts/` do projeto.

Scripts principais

- `new-lp.ts`

  - Objetivo: criar um novo _landing page_ (LP) em `content/lps/` com um template inicial.
  - Execução (recomendado via `yarn`):
    - `yarn new:lp meu-slug`
  - Execução direta no PowerShell (quando `ts-node` está instalado globalmente ou em devDependencies):
    - `npx ts-node scripts/new-lp.ts meu-slug`
  - O script cria um arquivo `content/lps/<slug>.json`. Se o arquivo já existir, ele falha com mensagem.

- `build-mdx-index.ts` / `build-mdx-index.cjs`
  - Objetivo: gerar um índice/manifest dos conteúdos MDX (por exemplo `content/lps/index.ts`).
  - Execução em dev (TypeScript):
    - `npx ts-node scripts/build-mdx-index.ts`
  - Execução via Node (versão compilada / cjs):
    - `node scripts/build-mdx-index.cjs`

Boas práticas

-- Sempre verifique o slug antes de criar: use `yarn new:lp meu-slug` e abra `content/lps/meu-slug.json` para editar.

- Se estiver com erro de execução relacionado ao `ts-node`, instale localmente: `yarn add -D ts-node typescript @types/node`.
- Os exemplos de comandos abaixo são para PowerShell no Windows; em Bash a sintaxe é a mesma (semilar).

Exemplos (PowerShell)

```powershell
# Criar nova landing page
yarn new:lp minha-nova-lp

# Gerar/atualizar índice MDX (TypeScript)
npx ts-node scripts/build-mdx-index.ts

# Gerar índice usando versão CJS (quando o TS já foi compilado ou se preferir usar node direto)
node scripts/build-mdx-index.cjs
```

Notas

- `new-lp.ts` assume formato padrão de frontmatter e um template interno. Edite o arquivo gerado em `content/lps/` antes de commitar.
- `build-mdx-index` procura por arquivos no diretório `content/lps/` e atualiza um arquivo export (`content/lps/index.ts`) que o app consome.
- Se você adicionar novos campos ao frontmatter, atualize também o código de parsing (ex.: `scripts/build-mdx-index.ts` e `src/app/(lp)/[slug]/page.tsx`).
