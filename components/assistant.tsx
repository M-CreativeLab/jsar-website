import { Button, Input, InputRef, Space, Tooltip } from 'antd'
import { useEffect, useRef, useState } from 'react'
import * as mathjs from 'mathjs'
import { ClearOutlined, CommentOutlined, LoadingOutlined, SendOutlined, ShrinkOutlined } from '@ant-design/icons';

import { serialize as serializeMarkdown } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

import { createCustomMdxComponents } from './mdx-components'

// TODO: Move to env
const markdownComponents = createCustomMdxComponents({
  baseFontSize: '14px',
})

interface EmbeddingFile {
  file: string;
  sections: Array<{
    level: number;
    text: string;
    title: string;
    embedding: {
      index: number;
      embedding: Array<number>;
    };
  }>;
}

interface Section {
  embedding: number[];
  title: string;
  text: string;
}

interface MessageData<T extends 'user' | 'assistant' | 'system'> {
  role: T;
  content: string;
  // conditional properties
  query?: T extends 'user' ? string : never;
}

interface LiveMessage {
  /* If the entity is thinking? */
  thinking: boolean;
  /* The activities for reasoning */
  reasoningActivities: string;
  /* The final response */
  finalResponse: string;
}

function isUserMessage(data: MessageData<'user' | 'assistant' | 'system'>): data is MessageData<'user'> {
  return data.role === 'user'
}

function isAssistantMessage(data: MessageData<'user' | 'assistant' | 'system'>): data is MessageData<'assistant'> {
  return data.role === 'assistant'
}

class IndexStore {
  private sections: Section[] = [];

  constructor(dataSource: EmbeddingFile[]) {
    for (const file of dataSource) {
      for (const section of file.sections) {
        if (section.embedding.embedding) {
          this.sections.push({
            embedding: section.embedding.embedding,
            title: section.title,
            text: section.text,
          })
        }
      }
    }
  }

  async retrieveRelevantSections(query: string, topK: number = 3): Promise<Section[]> {
    const input = await this.getEmbedding(query)
    const similarities = this.sections.map(section => ({
      section,
      similarity: this.cosineSimilarity(input, section.embedding)
    }))
    const topIndices = similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK)
      .map(({ section }) => section)
    return topIndices
  }

  private async getEmbedding(text: string): Promise<number[]> {
    const response = await fetch(`/api/v1/embeddings?input=${text}`)
    return (await response.json()).data[0].embedding
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = mathjs.dot(a, b)
    const magnitudeA = mathjs.norm(a) as number
    const magnitudeB = mathjs.norm(b) as number
    return dotProduct / (magnitudeA * magnitudeB)
  }
}

async function createIndexStore(): Promise<IndexStore> {
  const response = await fetch('./embeddings.json')
  return new IndexStore(await response.json())
}

function Content({ text, useMarkdown, style }: { text: string, useMarkdown?: boolean, style?: React.CSSProperties, }) {
  const [markdownNode, setMarkdownNode] = useState<React.ReactNode | null>(null)
  if (useMarkdown) {
    useEffect(() => {
      serializeMarkdown(text).then(source => {
        setMarkdownNode(<MDXRemote {...source} components={markdownComponents} />)
      })
    }, [])
  }

  return <div style={{
    padding: '0.5rem',
    borderRadius: '0.5rem',
    lineHeight: '1.5',
    boxSizing: 'border-box',
    width: '100%',
    ...style,
  }}>
    {useMarkdown ? markdownNode : text}
  </div>
}

function Message({ data }: { data: MessageData<'user' | 'assistant'> }) {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    margin: '0.5rem 0',
  }
  const contentStyle: React.CSSProperties = {}

  if (isUserMessage(data)) {
    const style: React.CSSProperties = {
      ...containerStyle,
      justifyContent: 'flex-end',
    }
    contentStyle.backgroundColor = '#e6f4ff'
    return <Space style={style}>
      <Content style={contentStyle} text={data.query} />
    </Space>
  } else if (isAssistantMessage(data)) {
    return <Space style={{ ...containerStyle }} styles={{ item: { width: '100%' } }}>
      <Content style={contentStyle} text={data.content} useMarkdown />
    </Space>
  } else {
    return null
  }
}

function LiveMessage({ data }: { data: LiveMessage }) {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    margin: '0.5rem 0',
  }
  const contentStyle: React.CSSProperties = {
    backgroundColor: '#f0f0f0',
  }

  return <Space style={containerStyle}>
    <Content
      useMarkdown={false}
      style={contentStyle}
      text={data.thinking ? 'Thinking...' : data.finalResponse} />
  </Space>
}

const SytemMessage: MessageData<'system'> = {
  role: 'system',
  content: 'You are a helpful assistant from the JSAR open-source project, ' +
    'which is a new Web browser engine for spatial computing.\n ' +
    'As an assistant, you can help users to ' +
    [
      'learn something from the JSAR website and documentation(including translation)',
      'write Web apps to be used in JSAR',
      'answer questions related to the JSAR project'
    ].join(', ') +
    ', and you must write the response in the following guidance: ' +
    [
      'respond to the user\'s question in the language of the question',
      'use a white space between english and chinese characters',
    ].join(', ') +
    '\n\n',
}

const getBrowsingContent = () => {
  const content = document.querySelector('main#content') as HTMLElement  // TODO: use article instead
  if (content) {
    return content.innerText
  } else {
    return document.body.innerText
  }
}

export default function Assistant() {
  const textRef = useRef<InputRef>(null)
  const messagesRef = useRef<HTMLUListElement>(null)

  const [pending, setPending] = useState<boolean>(false)
  const [collapsed, setCollapsed] = useState<boolean>(true)
  const [query, setQuery] = useState<string>('')
  const [indexStore, setIndexStore] = useState<IndexStore | null>(null)
  const [liveMessage, setLiveMessage] = useState<LiveMessage | null>(null)
  const [messages, setMessages] = useState<MessageData<'user' | 'assistant' | 'system'>[]>([SytemMessage])

  useEffect(() => {
    createIndexStore().then(setIndexStore)
  }, [])

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages, liveMessage])

  const initLiveMessage = () => {
    setPending(true)
    setLiveMessage({
      thinking: false,
      reasoningActivities: '',
      finalResponse: ''
    })
  }

  const updateLiveMessage = (thinking: boolean, text: string) => {
    setLiveMessage((liveMessage) => {
      const nextLiveMessage = { ...liveMessage, thinking }
      if (nextLiveMessage.thinking) {
        nextLiveMessage.reasoningActivities += text
      } else {
        nextLiveMessage.finalResponse += text
      }
      return nextLiveMessage
    })
  }

  const insertUserMessage = async (query: string) => {
    const nextMessages = [...messages, {
      role: 'user' as const,
      content: '',
      query,
    }]
    setMessages(nextMessages)

    // Clear the text input
    if (textRef.current) {
      textRef.current.blur()
      setQuery('')
    }

    const contextSections = await indexStore.retrieveRelevantSections(query, 5);
    const content = [
      'Please use the context below and chat history to answer the question.',
      'You must answer the question in the language of the question, and if you don\'t know the answer, please say "I don\'t know".\n\n',
      `Question: ${query}\n`,
      `Context:\n`,
      '...\n',
      ...contextSections.map(section => [
        `Title: ${section.title}`,
        `Text: ${section.text}`,
      ].join('\n')),
      '...\n',
      `Current reading content: ${getBrowsingContent()}\n`,
      'If the provided context or chat history is not enough to let you answer the question,',
      'please answer there is no content available in the document, and you don\'t know the answer.',
    ].join(' ')

    const userMessages = nextMessages.filter(message => message.role === 'user')
    userMessages[userMessages.length - 1].content = content
    setMessages(nextMessages)
    return nextMessages
  }

  const moveLiveToAssistantMessage = () => {
    setLiveMessage((liveMessage) => {
      setMessages((messages) => {
        return [...messages, {
          role: 'assistant' as const,
          content: liveMessage.finalResponse
        }]
      })
      return null
    })
  }

  const clearMessages = () => {
    setMessages([SytemMessage])
  }

  const send = async () => {
    const text = textRef.current?.input.value
    if (!text) {
      return
    }

    // Init the live message in each request
    initLiveMessage()

    const messages = await insertUserMessage(text)
    const response = await fetch('/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
        messages,
      })
    })

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    let restChunk = ''
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }

      // Parse the SSE message
      const text = decoder.decode(value)
      const current = restChunk + text
      const parts = current.split('\n\n')
        .map(part => part.trim())
        .filter(part => part.length > 0 && part.startsWith('data: '))
        .map(part => part.slice(6))

      let shouldBreak = false
      if (parts.length > 0) {
        for (const data of parts) {
          if (data === '[DONE]') {
            shouldBreak = true
            break;
          } else {
            try {
              const message = JSON.parse(data)
              const chunk = message.choices[0].delta.content
              if (chunk) {  // If the content chunk is not empty then update the live message as final response
                updateLiveMessage(false, chunk)
              } else {
                updateLiveMessage(true, '')
              }
            } catch (err) {
              console.error('Skipped, Failed to parse message: ', data)
            }
          }
        }
      }

      if (shouldBreak) {
        moveLiveToAssistantMessage()
        break
      }
    }

    setPending(false)
    if (textRef.current) {
      textRef.current.focus()
    }
  }

  const duration = 0.3
  const openerContainerStyle: React.CSSProperties = {
    position: 'absolute',
    right: '1rem',
    bottom: '0.5rem',
    borderRadius: '50%',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    transform: collapsed ? 'translateX(0)' : 'translateX(20vw)',
    transition: `transform ${duration}s ease-in-out`,
  }
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '55vw',
    maxHeight: '60vh',
    position: 'relative',
    transform: collapsed ? 'translateY(70vh)' : 'translateY(0)',
    transition: `transform ${duration}s ease-in-out`,
  }
  const listStyle: React.CSSProperties = {
    flexDirection: 'column',
    listStyleType: 'none',
    padding: '0 1rem 0 0',
    margin: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
    boxSizing: 'border-box',
  }
  const inputBoxStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    marginTop: '1rem',
    height: 'content-fit',
  }
  const inputStyle: React.CSSProperties = {
    flex: 1,
    border: 0,
  }

  return (
    <>
      <div style={openerContainerStyle} id="assistant-opener">
        <Tooltip title="Open the assistant">
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<CommentOutlined />}
            onClick={() => {
              setCollapsed(false)
              if (textRef.current) {
                textRef.current.focus()
              }
            }}
          />
        </Tooltip>
      </div>
      <div style={containerStyle} id="assistant">
        <ul style={listStyle} ref={messagesRef}>
          {messages
            .filter(message => message.role != 'system')
            .map((message, index) => (
              <li key={index}>
                <Message data={message as MessageData<'user' | 'assistant'>} />
              </li>
            ))}
          {liveMessage != null && <li key="live">
            <LiveMessage data={liveMessage} />
          </li>}
        </ul>
        <div style={inputBoxStyle}>
          <Input style={inputStyle}
            placeholder='Ask me anything'
            ref={textRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (pending) {
                return
              }
              if (e.nativeEvent.isComposing) {
                return
              }
              if (e.key === 'Enter') {
                send()
              } else if (e.key === 'Escape') {
                setCollapsed(true)
                textRef.current?.blur()
              }
            }}
          />
          <Button
            type="primary"
            shape="circle"
            icon={pending ? <LoadingOutlined /> : <SendOutlined />}
            disabled={pending}
            onClick={send}
          />
          <Tooltip title="Clear the history">
            <Button type="text" shape="circle" icon={<ClearOutlined />} onClick={clearMessages} />
          </Tooltip>
          <Tooltip title="Collapse the assistant">
            <Button type="text" shape="circle" icon={<ShrinkOutlined />} onClick={() => {
              setCollapsed(true)
              if (textRef.current) {
                textRef.current.blur()
              }
            }} />
          </Tooltip>
        </div>
      </div>
    </>
  )
}
