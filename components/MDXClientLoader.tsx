'use client'

import React, { useEffect, useState } from 'react'

type Props = { slug: string }

export default function MDXClientLoader({ slug }: Props): JSX.Element {
  const [Component, setComponent] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    let mounted = true
    import(`../content/lps/${slug}.mdx`)
      .then((mod) => {
        if (!mounted) return
        setComponent(() => mod.default || mod)
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Failed to load MDX for', slug, err)
        setComponent(() => () => <div>Failed to load page.</div>)
      })

    return () => {
      mounted = false
    }
  }, [slug])

  if (!Component) return <div>Loading page...</div>
  return <Component />
}
