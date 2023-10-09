import type { GetStaticPaths, GetStaticProps } from 'next'
import { NextRouter, useRouter } from 'next/router'
import Link from 'next/link'
import type { MDXProps, MDXComponents } from 'mdx/types'

import { useEffect, useState } from 'react'
import { CodeBlock, github } from 'react-code-blocks'
import { Affix, Divider, Layout, Select, Tree, TreeDataNode, Typography } from 'antd'
import { DownOutlined, LinkOutlined } from '@ant-design/icons'

import latestTocOfManual from '../../../docs/manual/toc.json'
import { useTranslations } from 'next-intl'

type TocItem = {
  key: string
  title: string
  children?: TocItem[]
}

const fontSize = '16px'
const segmentStyle = {
  margin: '1rem 0',
}
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

function getPathsFromMenu(toc: TocItem[], parentKey: string | null): string[] {
  return toc.reduce((paths: string[], item: TocItem) => {
    paths.push(parentKey == null ? item.key : `${parentKey}/${item.key}`)
    if (item.children) {
      paths = paths.concat(getPathsFromMenu(item.children, item.key))
    }
    return paths
  }, [])
}

function createHeaderRenderer(level?: 1 | 2 | 3 | 4 | 5) {
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

function createCustomMdxComponents(router: NextRouter): MDXComponents {
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
        href = `/manual/${router.query.ver}/${href}`
        return <a href={href}>{props.children}</a>
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
  }
}

function getDocumentPath(router: NextRouter): string | undefined {
  return router.query.id instanceof Array ? router.query.id.join('/') : router.query.id
}

export default function Page() {
  const t = useTranslations('ManualPages')
  const router = useRouter()
  const treeData = toMenuTreeData(tocOfManual, null)

  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const [docPath, setDocPath] = useState<string | undefined>(undefined)
  const [markdownChildren, setMarkdownChildren] = useState<React.ReactNode>(null)

  useEffect(() => {
    if (router.isReady) {
      const newDocPath = getDocumentPath(router)
      setDocPath(newDocPath)

      setExpandedKeys([newDocPath as string])
      setTimeout(() => {
        const hashPath = location.hash
        if (hashPath) {
          const id = decodeURIComponent(hashPath.replace('#', '')) as string
          const el = window.document.getElementById(id)
          if (el) {
            const rect = el.getBoundingClientRect()
            window.top?.scroll({
              top: window.scrollY + rect.top,
              behavior: 'smooth',
            })
          }
        }
      }, 100)
    }
  }, [router.isReady])

  useEffect(() => {
    if (router.isReady) {
      const newDocPath = getDocumentPath(router)
      setDocPath(newDocPath)
      // set content
      const MarkdownContent: React.ComponentType<MDXProps> = require(`../../../docs/manual/${newDocPath}.mdx`).default
      setMarkdownChildren(<MarkdownContent components={createCustomMdxComponents(router)} />)
    }

  }, [router.asPath])

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
                gap: '1rem',
              }}
            >
              {t('version')}
              <Select value="latest" style={{ flex: 1 }}>
                <Select.Option value="latest">v0.1.0 ({t('latest')})</Select.Option>
              </Select>
            </div>
            <Divider />
            <Tree
              autoExpandParent={true}
              virtual={false}
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

export const getStaticPaths = (async (context) => {
  const documentPaths = getPathsFromMenu(tocOfManual, null)
  let paths = documentPaths.map(p => `/manual/latest/${p}`)
  context.locales?.forEach((locale) => {
    paths = paths.concat(documentPaths.map(p => `/${locale}/manual/latest/${p}`))
  })
  return {
    paths,
    fallback: true,
  }
}) satisfies GetStaticPaths

export const getStaticProps = (async (context) => {
  return {
    props: {
      messages: (await import(`../../../messages/${context.locale}`)).default
    }
  }
}) satisfies GetStaticProps
