import React from 'react'
import { MDX_PAGES } from '../../../../content/lps/index'

export async function generateStaticParams() {
  return Object.keys(MDX_PAGES).map((slug) => ({ slug }))
}

export default function Page(props: any): JSX.Element {
  const { params } = props as { params: { slug: string } }
  const { slug } = params
  const entry = (MDX_PAGES as any)[slug]
  if (!entry) return <div>Not found</div>

  const Component = entry.Component

  return (
    <html>
      <body>
        <Component />
      </body>
    </html>
  )
}
