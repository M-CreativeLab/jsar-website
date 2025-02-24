import { LinkOutlined } from '@ant-design/icons'
import { Typography, Divider } from 'antd'
import Link from 'next/link'
import type { MDXComponents } from 'mdx/types'
import { CodeBlock, github } from 'react-code-blocks'

import CodeCopyButton from './codecopy-button'

type Props = {
  children: string | React.ReactElement<Props>[]
}

const segmentStyle = {
  margin: '1rem 0',
}

function getInnerText(textOrProps: string | Props): string {
  if (typeof textOrProps === 'string') {
    return textOrProps.toLowerCase()
  }
  if (typeof textOrProps.children === 'string') {
    return textOrProps.children.toLowerCase()
  }
  if (Array.isArray(textOrProps.children)) {
    return textOrProps.children.map(child => {
      if (typeof child === 'string') {
        return getInnerText(child)
      } else {
        const text = getInnerText(child.props)
        if (child.type === 'em') {
          return `_${text}_`
        } else {
          return text
        }
      }
    }).join('')
  }
  return ''
}

function createHeaderRenderer(level?: 1 | 2 | 3 | 4 | 5) {
  const headerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5rem',
  }
  return (props: any) => {
    const hasDivider = level <= 2
    const sectionId = getInnerText(props).replace(/\s/g, '-')
    return (
      <div>
        <div style={headerStyle}>
          <Typography.Title
            level={level}
            style={{
              ...segmentStyle,
              position: 'relative',
            }}
          >
            <a id={sectionId} style={{ position: 'absolute', top: '-90px' }}></a>
            {props.children}
          </Typography.Title>
          <Link href={`#${sectionId}`} style={{ display: 'flex' }}>
            <LinkOutlined style={{ fontSize: 18, color: 'unset' }} />
          </Link>
        </div>
        {hasDivider && <Divider style={{ marginTop: 0 }} />}
      </div>
    )
  }
}

type CustomMdxComponentsInit = {
  baseFontSize?: string
}

const defaultInit: CustomMdxComponentsInit = {
  baseFontSize: '16px',
}

export function createCustomMdxComponents(init: CustomMdxComponentsInit = defaultInit): MDXComponents {
  const fontSize = init.baseFontSize
  return {
    h1: createHeaderRenderer(1),
    h2: createHeaderRenderer(2),
    h3: createHeaderRenderer(3),
    h4: createHeaderRenderer(4),
    h5: createHeaderRenderer(5),
    ol: (props) => {
      return <ol style={{ fontSize, marginBottom: 0 }}>{props.children}</ol>
    },
    ul: (props) => {
      return <ul style={{ fontSize, marginBottom: 0 }}>{props.children}</ul>
    },
    li: (props) => {
      return <li style={{ lineHeight: 2 }}>{props.children}</li>
    },
    p: (props) => {
      return <Typography.Paragraph style={{ fontSize, margin: '1rem 0' }}>{props.children}</Typography.Paragraph>
    },
    a: (props) => {
      let href = props.href
      if (href?.startsWith('https://') || href?.startsWith('http://')) {
        return <a href={href} target="_blank">{props.children}</a>
      } else {
        return <Link href="#">{props.children}</Link>
      }
    },
    img: (props) => {
      let disableCaption = false
      let containerStyle: React.CSSProperties = {
        width: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifySelf: 'center',
      }
      let imageStyle: React.CSSProperties = {}
      if (props?.title) {
        const toPair = (s: string) => {
          const pair = s.split('=')
          return [pair[0], pair[1]]
        }
        const params = new URLSearchParams(props.title.split(',').map(toPair))
        if (params.has('width')) {
          imageStyle.width = `${params.get('width')}`
        }
        if (params.has('height')) {
          imageStyle.height = `${params.get('height')}`
        }
        if (params.has('align')) {
          containerStyle.justifySelf = params.get('align') as any
        }
        if (params.has('caption') && params.get('caption') === 'disable') {
          disableCaption = true
        }
      }
      if (!imageStyle.width) {
        imageStyle.maxWidth = 'min(40%, 400px)'
      }
      return (
        <Typography.Paragraph style={containerStyle}>
          <img alt={props.alt} src={props.src} srcSet={props.srcSet} style={imageStyle} />
          {(!disableCaption && props.alt) && <Typography.Text type="secondary">{props.alt}</Typography.Text>}
        </Typography.Paragraph>
      )
    },
    pre: (props) => {
      const lang = (props.children as any)?.props.className?.replace('language-', '')
      const code = (props.children as any)?.props.children
      const text = code?.replace(/\n$/, '') || ''

      const paddingInHorizontal = '1.8rem'
      const containerStyle: React.CSSProperties = {
        position: 'relative',
        background: 'rgb(249, 250, 251)',
        borderRadius: '0.5rem',
        border: '1px solid rgb(230, 230, 230)',
        overflow: 'hidden',
      }
      const titleStyle: React.CSSProperties = {
        display: 'block',
        background: 'rgb(246, 248, 250)',
        fontSize: '1.1em',
        fontWeight: 'bold',
        boxSizing: 'border-box',
        borderBottom: '1px solid rgb(230, 230, 230)',
        padding: `0.8rem ${paddingInHorizontal}`,
      }
      const codeContainerStyle: React.CSSProperties = {
        width: '100%',
        backgroundColor: 'rgb(249, 250, 251)',
        boxSizing: 'border-box',
        border: 0,
        padding: `${paddingInHorizontal}`,
        margin: '0',
        fontSize: '1em',
        fontFamily: 'monospace',
        minWidth: 'calc(100% - 1rem)',
        overflowX: 'auto',
      }

      return (
        <Typography.Paragraph style={containerStyle} className={'mdx-code'}>
          {props?.title && <Typography.Text style={titleStyle}>{props.title}</Typography.Text>}
          <CodeBlock
            language={lang}
            theme={github}
            text={text}
            showLineNumbers={false}
            codeContainerStyle={codeContainerStyle}
          />
          <CodeCopyButton codeToCopy={text} buttonStyle={{
            position: 'absolute',
            right: 15,
            top: 10,
          }} />
        </Typography.Paragraph>
      )
    },
    table: (props) => {
      return (
        <Typography.Paragraph>
          <style scoped>{`
            /* Light theme. */
            :root {
              --color-canvas-default: #ffffff;
              --color-canvas-subtle: #f6f8fa;
              --color-border-default: #d0d7de;
              --color-border-muted: hsla(210, 18%, 87%, 1);
            }
            table {
              border-spacing: 0;
              border-collapse: collapse;
              display: block;
              margin-top: 0;
              margin-bottom: 16px;
              max-width: 100%;
              overflow: auto;
            }
            table, thead, tbody {
              width: 100%;
            }
            tr {
              word-break: auto-phrase;
              background-color: var(--color-canvas-default);
              border-top: 1px solid var(--color-border-muted);
            }
            tr:nth-child(2n) {
              background-color: var(--color-canvas-subtle);
            }
            tr > td:first-child, tr > td:nth-child(2) {
              word-break: keep-all;
            }
            td,
            th {
              padding: 6px 13px;
              border: 1px solid var(--color-border-default);
            }
            th {
              font-weight: 600;
            }
            table img {
              background-color: transparent;
            }
            `}</style>
          <table>{props.children}</table>
        </Typography.Paragraph>
      )
    },
  }
}
