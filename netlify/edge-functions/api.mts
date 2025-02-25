import * as fs from 'fs/promises'
import type { Context } from '@netlify/functions'
import * as v1 from './v1/index.mts'

export default async (req: Request, context: Context) => {
  const { version } = context.params
  let subPath = context.params[0]
  if (!subPath.startsWith('/')) {
    subPath = '/' + subPath // must start with '/'
  }

  try {
    const embeddings = JSON.parse(await fs.readFile('./embeddings.json', 'utf8'))
    console.info('[embeddings] loaded:', embeddings.length)
  } catch (err) {
    console.error('[embeddings] error:', err)
  }

  if (version === 'v1') {
    return v1.default(subPath, req, context)
  } else {
    return new Response('Version not found', { status: 404 })
  }
}

export const config = {
  path: '/api/:version/*'
};
