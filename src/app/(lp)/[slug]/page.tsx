import MDXClientLoader from '../../../../components/MDXClientLoader'
import { MDX_PAGES } from '../../../../content/lps/index'

export async function generateStaticParams() {
  return Object.keys(MDX_PAGES).map((slug) => ({ slug }))
}

export default function Page(props: any): JSX.Element {
  const { params } = props as { params: { slug: string } }
  const { slug } = params
  const entry = (MDX_PAGES as any)[slug]
  if (!entry) return <div>Not found</div>

  // render metadata server-side, and load MDX content on the client only
  return (
    <main>
      <h1>{entry.meta?.title ?? slug}</h1>
      <p>{entry.meta?.description}</p>
      <MDXClientLoader slug={slug} />
    </main>
  )
}
