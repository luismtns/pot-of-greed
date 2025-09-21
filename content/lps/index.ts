// Lightweight JSON registry for landing pages
export type LPPage = { slug: string; title?: string; description?: string; sections?: any[] }

import apostudo from './apostudo.json'
import example from './example.json'

export const LP_PAGES: Record<string, LPPage> = {
  apostudo: apostudo as LPPage,
  example: example as LPPage,
}

export type LPPageSlug = keyof typeof LP_PAGES
