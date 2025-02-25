import type { Context } from '@netlify/functions'

export default async (req: Request, _context: Context): Promise<Response> => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const data = await req.json()
  if (!data.messages || Array.isArray(data.messages) && data.messages.length === 0) {
    return new Response('Bad request', { status: 400 })
  }
  const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Netlify.env.get('INFERENCE_API_KEY')}`
    },
    body: JSON.stringify({
      model: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
      messages: data.messages,
      stream: true,
      max_tokens: 8192,
      temperature: 0.1,
      top_p: 0.5,
      top_k: 50,
    })
  })
  return new Response(response.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    }
  })
}
