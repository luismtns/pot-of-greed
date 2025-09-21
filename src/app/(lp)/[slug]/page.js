import fs from 'fs'
import matter from 'gray-matter'
import { marked } from 'marked'
import path from 'path'
import Hero from '../../../../components/sections/hero'

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content', 'lps')
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  return files.map((f) => ({ slug: f.replace(/\.mdx$/, '') }))
}

export default function Page({ params }) {
  const { slug } = params
  const file = path.join(process.cwd(), 'content', 'lps', `${slug}.mdx`)
  if (!fs.existsSync(file)) return <div>Not found</div>
  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)
  const html = marked.parse(content)

  return (
    <html>
      <body>
        <Hero props={data.hero} />
        <main dangerouslySetInnerHTML={{ __html: html }} />
      </body>
    </html>
  )
}
