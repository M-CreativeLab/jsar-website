import type { GetStaticPaths, GetStaticProps } from 'next'
import { NextRouter, useRouter } from 'next/router'
import Link from 'next/link'
import type { MDXProps, MDXComponents } from 'mdx/types'

import React, { useEffect, useRef, useState } from 'react'
import { CodeBlock, github } from 'react-code-blocks'
import { Divider, Layout, Select, Tree, TreeDataNode, Typography } from 'antd'
import { DownOutlined, LinkOutlined } from '@ant-design/icons'

import { useTranslations } from 'next-intl'
import CodeCopyButton from '../../../components/codecopy-button'
import Footer from '../../../components/footer'
import latestTocOfManual from '../../../docs/manual/toc.json'

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

/**
 * It selects an item from the tree.
 * 
 * @param path The path to select such as "introduction" or "introduction/overview".
 * @param root The root of the tree.
 * @param prefix The prefix used to match the item key.
 * @returns The selected item or null if not found.
 */
function selectItemFromTree(path: string, root: TocItem[], prefix = ''): TocItem | null {
  if (path[0] === '/') {
    path = path.substring(1)
  }

  let hasNext: boolean
  let currentPart: string
  const slashIndex = path.search('/')
  if (slashIndex === -1) {
    hasNext = false
    currentPart = path
  } else {
    hasNext = true
    currentPart = path.substring(0, slashIndex)
  }

  let currentPath: string
  if (prefix) {
    if (prefix.endsWith('/')) {
      currentPath = `${prefix}${currentPart}`
    } else {
      currentPath = `${prefix}/${currentPart}`
    }
  } else {
    currentPath = currentPart
  }

  for (let item of root) {
    if (item.key === currentPath) {
      if (hasNext) {
        return selectItemFromTree(path.substring(slashIndex + 1), item.children || [], currentPath)
      } else {
        return item
      }
    }
  }
}

/**
 * Extract the paths from the menu
 * 
 * @param toc The menu
 * @param parentKey The parent key
 * @returns The paths of the menu
 */
function getPathsFromMenu(toc: TocItem[], parentKey: string | null): string[] {
  return toc.reduce((paths: string[], item: TocItem) => {
    let currentPath: string = parentKey == null ? item.key : `${parentKey}/${item.key}`
    paths.push(currentPath)
    if (item.children) {
      paths = paths.concat(getPathsFromMenu(item.children, currentPath))
    }
    return paths
  }, [])
}

type Props = {
  children: string | React.ReactElement<Props>[]
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
        // return <a href={href}>{props.children}</a>
        return <Link href={`/manual/${router.query.ver}/${href}`}>{props.children}</Link>
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

function getDocumentPath(router: NextRouter): string | undefined {
  return router.query.id instanceof Array ? router.query.id.join('/') : router.query.id
}

export default function Page({ versions, tocItems }: { versions: string[], tocItems: TocItem[] }) {
  const t = useTranslations('ManualPages')
  const router = useRouter()
  const treeData = toMenuTreeData(tocItems || tocOfManual, null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const [docPath, setDocPath] = useState<string | undefined>(undefined)
  const [markdownChildren, setMarkdownChildren] = useState<React.ReactNode>(null)

  if (docPath) {
    const currentItem = selectItemFromTree(docPath, treeData)
    if (currentItem?.title) {
      document.title = t(`toc.${currentItem.title}`)
    }
  }

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
            if (contentRef.current) {
              contentRef.current.scroll({
                top: rect.top,
                behavior: 'smooth',
              })
            }
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
      let MarkdownContent: React.ComponentType<MDXProps>
      let verPrefix = 'docs'
      if (router.query.ver !== 'latest') {
        verPrefix = `docs-versions/${router.query.ver}`
      }

      // load language version
      try {
        MarkdownContent = require(`../../../${verPrefix}/manual-${router.locale}/${newDocPath}.mdx`).default
      } catch (_e) {
        MarkdownContent = require(`../../../${verPrefix}/manual/${newDocPath}.mdx`).default
      }
      setMarkdownChildren(<MarkdownContent components={createCustomMdxComponents(router)} />)
    }
  }, [router.asPath])

  // console.info(docPath, treeData);

  return (
    <Layout
      style={{
        height: 'calc(100vh - 64px - 20px)',
        margin: '10px 0 10px 10px',
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        borderRadius: '0.75rem',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        overflow: 'hidden',
      }}
    >
      <Layout.Sider
        width={300}
        style={{
          height: 'auto',
          margin: '0.5rem 0',
          padding: '0.5rem 1rem',
          backgroundColor: 'transparent',
          borderRight: '1px solid #f0f0f0',
          overflow: 'auto',
        }}
      >
        <div>
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
              <Select
                value={router.query.ver}
                style={{ flex: 1 }}
                onChange={(ver) => {
                  router.push(`/manual/${ver}/introduction`, undefined, { shallow: false })
                }}
              >
                <Select.Option value="latest">{t('latest')}</Select.Option>
                {(versions || []).map((version) => {
                  return (
                    <Select.Option key={version} value={version}>
                      v{version}
                    </Select.Option>
                  )
                })}
              </Select>
            </div>
            <Divider />
          </div>
          <div
            style={{ marginTop: '32px' }}
          >
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
                  console.info(selectedKeys)
                  // Scroll to top on select
                  if (contentRef.current) {
                    contentRef.current.scroll({
                      top: 0,
                      behavior: 'smooth',
                    })
                  }
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

                if (typeof title === 'string') {
                  title = t(`toc.${title}`)
                }

                return (
                  <span
                    style={{
                      fontSize: '14px',
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
        </div>
      </Layout.Sider>
      <Layout.Content
        ref={contentRef}
        style={{
          height: '100%',
          overflow: 'auto',
        }}
      >
        <Typography.Paragraph style={{
          minHeight: '60vh',
          padding: '1rem 2rem 4rem 2rem',
          boxSizing: 'border-box',
        }}>
          {markdownChildren}
        </Typography.Paragraph>

        <Divider />
        <Footer alignLeft compat />
      </Layout.Content>
    </Layout>
  )
}

import fs from 'node:fs/promises'

async function readJson(path: string) {
  return JSON.parse(
    await fs.readFile(path, 'utf8')
  )
}

async function getVersions() {
  return (await fs.readdir(`./docs-versions`)).filter(filename => filename !== '.gitkeep')
}

export const getStaticPaths = (async (context) => {
  let paths = [] as string[]
  const versions = await getVersions()

  for (let versionStr of ['latest'].concat(versions)) {
    const isLatest = versionStr === 'latest'
    const toc = isLatest ? tocOfManual : await readJson(`./docs-versions/${versionStr}/manual/toc.json`)
    const documentPaths = getPathsFromMenu(toc, null)
    paths = paths.concat(documentPaths.map(p => `/manual/${versionStr}/${p}`))
    context.locales?.forEach((locale) => {
      paths = paths.concat(documentPaths.map(p => `/${locale}/manual/${versionStr}/${p}`))
    })
  }

  return {
    paths,
    fallback: true,
  }
}) satisfies GetStaticPaths

export const getStaticProps = (async (context) => {
  // load toc
  const versionStr = context.params?.ver as string
  const isLatest = versionStr === 'latest'
  const tocItems = isLatest ? tocOfManual : await readJson(`./docs-versions/${versionStr}/manual/toc.json`)

  return {
    props: {
      hideFooter: true,
      messages: (await import(`../../../messages/${context.locale}`)).default,
      versions: await getVersions(),
      tocItems,
    }
  }
}) satisfies GetStaticProps
