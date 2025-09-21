#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const slug = process.argv[2]
if (!slug) {
  console.error('Usage: node scripts/new-lp.js <slug>')
  process.exit(1)
}

const frontmatter = `---\ntitle: "Title for ${slug}"\ndescription: "A short description for ${slug}"\nhero:\n  title: "Welcome to ${slug}"\n  subtitle: "A static MDX landing"\n  cta:\n    label: "Learn more"\n    href: "#"\n---\n\n`

const body = `# ${slug}\n\nWrite Markdown / MDX content here.\n\n`

const dir = path.join(process.cwd(), 'content', 'lps')
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
const file = path.join(dir, `${slug}.mdx`)
if (fs.existsSync(file)) {
  console.error('LP already exists:', file)
  process.exit(1)
}
fs.writeFileSync(file, frontmatter + body)
console.log('Created', file)
