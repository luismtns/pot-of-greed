#!/usr/bin/env ts-node
import fs from 'fs'
import path from 'path'

const slug = process.argv[2]
if (!slug) {
  console.error('Usage: yarn new:lp <slug>')
  process.exit(1)
}

const dir = path.join(process.cwd(), 'content', 'lps')
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
const file = path.join(dir, `${slug}.json`)
if (fs.existsSync(file)) {
  console.error('LP already exists:', file)
  process.exit(1)
}

const template = {
  slug,
  title: `Title for ${slug}`,
  description: `A short description for ${slug}`,
  sections: [
    {
      type: 'hero',
      props: { title: `Welcome to ${slug}`, subtitle: 'A static JSON landing', ctaLabel: 'Learn more', ctaHref: '#' },
    },
  ],
}

fs.writeFileSync(file, JSON.stringify(template, null, 2))
console.log('Created', file)
