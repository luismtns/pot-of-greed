import CTA from 'components/sections/cta'
import Features from 'components/sections/features'
import Hero from 'components/sections/hero'
import { LP_PAGES } from 'content/lps/index'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return await Promise.all(Object.keys(LP_PAGES).map((slug) => ({ slug })))
}

type PageProps = {
  params: { slug: string }
}

export default async function Page({ params }: PageProps): Promise<JSX.Element> {
  const { slug } = await params
  const entry = LP_PAGES[slug]
  if (!entry) return <div>Not found</div>

  return (
    <main>
      <header className='mb-8'>
        <h1 className='sr-only'>{entry.title ?? slug}</h1>
      </header>
      {entry.sections?.map((section: any, idx: number) => {
        const type = section.type
        const props = section.props || {}
        if (type === 'hero') return <Hero key={idx} {...props} />
        if (type === 'features') return <Features key={idx} items={props.items || []} />
        if (type === 'cta') return <CTA key={idx} {...props} />
        return null
      })}
    </main>
  )
}
