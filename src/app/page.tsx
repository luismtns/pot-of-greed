'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './page.module.css'

export default function Home(): JSX.Element {
  const [slugs, setSlugs] = useState<string[] | null>(null)

  useEffect(() => {
    let mounted = true
    import('../../content/lps/index')
      .then((mod) => {
        if (!mounted) return
        const keys = Object.keys(mod.MDX_PAGES || {})
        setSlugs(keys)
      })
      .catch((err) => {
        // keep UI simple; in dev, log error to help debugging
        // eslint-disable-next-line no-console
        console.error('Failed to load MDX index dynamically:', err)
        setSlugs([])
      })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image className={styles.logo} src='/pot-of-greed.png' alt='Pot of Greed' width={80} height={80} priority />
        <h1>Development Home</h1>
        <p>Available landing pages (development only):</p>

        <ul>
          {slugs === null && <li>Loading...</li>}
          {slugs && slugs.length === 0 && <li>No pages found</li>}
          {slugs &&
            slugs.map((slug) => (
              <li key={slug}>
                <a href={`/${slug}/`}>{slug}</a>
              </li>
            ))}
        </ul>
      </main>
      <footer className={styles.footer}>
        <small>Development homepage — not included in production output</small>
      </footer>
    </div>
  )
}
