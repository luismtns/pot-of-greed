import { MDX_PAGES } from '../../../../content/lps/index'

export default function Head({ params }: { params: { slug: string } }) {
  const { slug } = params
  const entry = (MDX_PAGES as any)[slug]
  if (!entry) return null
  const meta = entry.meta ?? {}
  return (
    <>
      <title>{meta.title ?? ''}</title>
      {meta.description ? <meta name='description' content={meta.description} /> : null}
    </>
  )
}
