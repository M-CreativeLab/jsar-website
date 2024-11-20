import fs from 'fs'
import path from 'path'
import { glob } from 'glob'

const targetDir = path.join(process.cwd(), '.knowledge')
const files = glob.sync('docs/**/*.mdx')
files.map(async file => {
  const contents = fs.readFileSync(file, 'utf8')
  const targetPath = path.join(targetDir, file.replace(/\//g, '_')).replace(/\.mdx$/, '.md')
  fs.mkdirSync(path.dirname(targetPath), { recursive: true })
  fs.writeFileSync(targetPath, contents)
})
