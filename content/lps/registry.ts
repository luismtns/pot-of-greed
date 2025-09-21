// Registry of JSON pages by slug.
import apostudo from './apostudo.json'
import example from './example.json'

export const LP_PAGES_REGISTRY: { [slug: string]: any } = {
  example,
  apostudo,
}

export type LPRegistry = typeof LP_PAGES_REGISTRY

export default LP_PAGES_REGISTRY
