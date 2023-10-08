import { Affix, Divider, Layout, Select, Space, Tree, TreeDataNode, Typography } from 'antd'
import { useRouter } from 'next/router'
import type { MDXProps } from 'mdx/types'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CodeBlock, github } from 'react-code-blocks'

import latestTocOfManual from '../../../docs/manual/toc.json'
import { DownOutlined, LinkOutlined, RightOutlined } from '@ant-design/icons'

type TocItem = {
  key: string
  title: string
  children?: TocItem[]
}

const fontSize = '16px'
const tocOfManual: TocItem[] = latestTocOfManual

function toMenuTreeData(toc: TocItem[], parentKey: string | null, selectedKey?: string): any {
  return toc.map((item: TocItem) => {
    let key = item.key
    if (parentKey != null) {
      key = `${parentKey}/${item.key}`
    }
    return {
      key,
      title: item.title,
      children: item.children ? toMenuTreeData(item.children, key) : null,
    }
  })
}

export default function Page() {
  const router = useRouter()
  const treeData = toMenuTreeData(tocOfManual, null)
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const segmentStyle = {
    margin: '1rem 0',
  }
  const createHeaderRenderer = (level?: 1 | 2 | 3 | 4 | 5) => {
    return (props: any) =>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0.5rem',
        }}
      >
        <Typography.Title
          level={level}
          style={{
            ...segmentStyle,
            position: 'relative',
          }}
        >
          <a id={props.children} style={{ position: 'absolute', top: '-90px' }}></a>
          {props.children}
        </Typography.Title>
        <Link href={`#${props.children}`} style={{ display: 'flex' }}>
          <LinkOutlined style={{ fontSize: 18, color: 'unset' }} />
        </Link>
      </div>
  }

  let docPath: string | undefined = undefined
  let markdownChildren = null
  if (router.isReady) {
    docPath = router.query.id instanceof Array ? router.query.id.join('/') : router.query.id
    const MarkdownContent: React.ComponentType<MDXProps> = require(`../../../docs/manual/${docPath}.mdx`).default
    markdownChildren = <MarkdownContent components={{
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
          href = `/manual/${router.query.ver}/${href}`
          return <Link href={href}>{props.children}</Link>
        }
      },
      img: (props) => {
        return (
          <Typography.Paragraph>
            <img {...props} style={{ maxWidth: 'min(60%, 780px)' }} />
          </Typography.Paragraph>
        )
      },
      pre: (props) => {
        const lang = (props.children as any)?.props.className?.replace('language-', '')
        const code = (props.children as any)?.props.children
        return (
          <Typography.Paragraph>
            <CodeBlock
              language={lang}
              theme={github}
              text={code.replace(/\n$/, '')}
              showLineNumbers={true}
              codeContainerStyle={{
                padding: '0.5rem',
                fontSize: '1.15em',
                width: '100%',
              }}
            />
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
              width: max-content;
              max-width: 100%;
              overflow: auto;
            }
            tr {
              background-color: var(--color-canvas-default);
              border-top: 1px solid var(--color-border-muted);
            }
            tr:nth-child(2n) {
              background-color: var(--color-canvas-subtle);
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
    }} />
  }

  useEffect(() => {
    if (router.isReady) {
      setExpandedKeys([docPath as string])
    }
  }, [router.isReady])

  return (
    <Layout
      style={{
        width: '80vw',
        margin: '60px auto',
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '0.75rem',
      }}
    >
      <Layout.Sider
        width={260}
        style={{
          marginRight: '6rem',
          backgroundColor: 'transparent',
        }}
      >
        <Affix offsetTop={120}>
          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                fontSize: '16px',
              }}
            >
              版本：
              <Select value="latest" style={{ flex: 1 }}>
                <Select.Option value="latest">v0.1.0 (最新)</Select.Option>
              </Select>
            </div>
            <Divider />
            <Tree
              autoExpandParent={true}
              showLine={true}
              showIcon={false}
              blockNode={true}
              checkStrictly={false}
              treeData={treeData}
              expandedKeys={expandedKeys}
              expandAction="click"
              switcherIcon={
                <DownOutlined />
              }
              selectedKeys={docPath ? [docPath] : []}
              onSelect={(selectedKeys) => {
                if (selectedKeys.length > 0) {
                  const key = selectedKeys[0] as string
                  router.push(`/manual/${router.query.ver}/${key}`)
                  setExpandedKeys([key])
                }
              }}
              onExpand={(expandedKeys) => {
                setExpandedKeys(expandedKeys as string[])
              }}
              titleRender={(nodeData: TreeDataNode) => {
                let title: React.ReactNode
                if (typeof nodeData.title === 'function') {
                  title = nodeData.title(nodeData)
                } else {
                  title = nodeData.title
                }
                return (
                  <span
                    style={{
                      fontSize: '16px',
                      padding: '0 0.5rem',
                      lineHeight: '2',
                    }}
                  >
                    {title}
                  </span>
                )
              }}
              style={{
                fontSize: '18px',
              }}
            />
          </div>
        </Affix>
      </Layout.Sider>
      <Layout.Content
        style={{
          minHeight: '100vh',
        }}
      >
        <Typography.Paragraph>
          {markdownChildren}
        </Typography.Paragraph>
      </Layout.Content>
    </Layout>
  )
}
