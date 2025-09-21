import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

export default function Head({ params }: { params: { slug: string } }) {
  const { slug } = params
  const file = path.join(process.cwd(), 'content', 'lps', `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const { data } = matter(fs.readFileSync(file, 'utf8'))
  return (
    <>
      <title>{data.title}</title>
      <meta name='description' content={data.description} />
    </>
  )
}
