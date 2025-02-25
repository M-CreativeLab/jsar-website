import type { Context } from '@netlify/functions'
import embeddings from './embeddings.mts'
import chatCompletions from './chat/completions.mts'

export default async function handle(path: string, req: Request, context: Context): Promise<Response> {
  if (path === '/embeddings') {
    return embeddings(req, context)
  } else if (path === '/chat/completions') {
    return chatCompletions(req, context)
  } else {
    return new Response('Not found', { status: 404 })
  }
}
