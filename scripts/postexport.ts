import fs from 'fs'
import path from 'path'

const OUT_DIR = path.join(process.cwd(), 'out')
const CSS_DIR = path.join(OUT_DIR, '_next', 'static', 'css')

const cssFiles = fs.readdirSync(CSS_DIR).filter((f) => f.endsWith('.css'))
if (cssFiles.length === 0) throw new Error('Nenhum CSS encontrado')
const cssFile = cssFiles[0]

fs.readdirSync(OUT_DIR).forEach((slug) => {
  const lpPath = path.join(OUT_DIR, slug)
  if (!fs.statSync(lpPath).isDirectory()) return
  fs.copyFileSync(path.join(CSS_DIR, cssFile), path.join(lpPath, cssFile))
  const htmlFile = path.join(lpPath, 'index.html')
  if (fs.existsSync(htmlFile)) {
    let html = fs.readFileSync(htmlFile, 'utf8')
    // Substitui qualquer referência ao CSS global pelo local
    html = html.replace(
      /<link[^>]+href="\/?_next\/static\/css\/[^"]+\.css"[^>]*>/g,
      `<link rel="stylesheet" href="./${cssFile}">`
    )
    // Corrige caminhos de imagens: de "/slug/images/img.png" para "./images/img.png"
    html = html.replace(new RegExp(`src="/${slug}/images/`, 'g'), 'src="./images/')
    // Corrige caminhos de imagens: de "/slug/img.png" para "./images/img.png"
    html = html.replace(new RegExp(`src="/${slug}/([^/]+\\.(png|jpg|jpeg|webp|svg))"`, 'g'), 'src="./images/$1"')
    fs.writeFileSync(htmlFile, html, 'utf8')
  }
})
console.log('CSS e caminhos de imagens corrigidos para cada LP.')
