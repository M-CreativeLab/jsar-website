import fs from 'fs'
import path from 'path'
import { glob } from 'glob'
import * as axios from 'axios'
import { fromMarkdown } from 'mdast-util-from-markdown'

async function requestEmbedding(input) {
  const response = await axios.default.request({
    url: 'https://api.siliconflow.cn/v1/embeddings',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.INFERENCE_API_KEY}`
    },
    data: {
      model: 'BAAI/bge-large-zh-v1.5',
      input,
      encoding_format: 'float',
    }
  })
  const data = response.data.data[0]
  return {
    index: data.index,
    embedding: data.embedding,
  }
}

const targetDir = path.join(process.cwd(), 'public')
const pendingData = Promise.all(
  glob.sync('docs/**/*.mdx').map(async file => {
    const contents = fs.readFileSync(file, 'utf8')
    const ast = fromMarkdown(contents)
    let sections = ast.children.reduce((list, item) => {
      const createSection = (title, level) => {
        list.push({
          title,
          level,
          text: '',
          links: [],
        })
      }
      const getLastSectionOrCreate = () => {
        if (list.length === 0) {
          createSection('', 0)
        }
        return list[list.length - 1]
      }

      if (item.type === 'heading') {
        const title = item.children.reduce((text, item) => {
          if (item.type === 'text') {
            text += item.value
          }
          return text
        }, '')
        createSection(title, item.depth)
      } else if (item.type === 'paragraph') {
        const last = getLastSectionOrCreate()
        last.text += item.children.reduce((text, item) => {
          if (item.type === 'text') {
            text += item.value
          } else if (item.type === 'link') {
            last.links.push(item.url)
            // text += item.url
          }
          return text
        }, '')
      } else if (item.type === 'definition') {
        const last = getLastSectionOrCreate()
        last.links.push(item.url)
      }
      return list
    }, [])

    sections = await Promise.all(sections.map(async section => {
      let embedding = {}
      if (section.text && section.text.length <= 512) {
        try {
          embedding = await requestEmbedding(section.text)
        } catch (err) {
          console.error('Failed to request embedding', err)
        }
      }
      return {
        ...section,
        embedding,
      }
    }))

    return {
      file,
      sections,
    }
  })
)

pendingData.then(data => {
  const filename = path.join(targetDir, 'embeddings.json')
  fs.writeFileSync(filename, JSON.stringify(data))
  console.info('Wrote embeddings to ', filename)
})
