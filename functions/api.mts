import type { Context } from '@netlify/functions'
import * as v1 from './v1/index.mjs'

export default async (req: Request, context: Context) => {
  const { version } = context.params
  let subPath = context.params[0]
  if (!subPath.startsWith('/')) {
    subPath = '/' + subPath // must start with '/'
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
