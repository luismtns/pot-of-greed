// Registry of MDX components by slug.
// Keep this file simple — add new imports when you add new MDX pages.
import Example from './example.mdx'

export const MDX_COMPONENTS: { [slug: string]: any } = {
  example: Example,
}

export type MDXComponentsMap = typeof MDX_COMPONENTS

export default MDX_COMPONENTS
