import type { Context } from '@netlify/functions'

export default async (req: Request, context: Context): Promise<Response> => {
  const url = new URL(req.url)
  const input = url.searchParams.get('input')
  if (!input) {
    return new Response('Input is required', { status: 400 })
  }

  console.info(`[embeddings] input: ${input}`)
  const res = await fetch('https://api.siliconflow.cn/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env['INFERENCE_API_KEY']}`
    },
    body: JSON.stringify({
      model: 'BAAI/bge-large-zh-v1.5',
      input,
      encoding_format: 'float',
    })
  })
  console.info('[embeddings] response:', res.status, res.statusText)
  return new Response(res.body)
}
