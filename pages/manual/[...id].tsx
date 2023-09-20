import { Affix, Layout, Table, Tree, TreeDataNode, Typography } from 'antd'
import { useRouter } from 'next/router'
import type { MDXProps } from 'mdx/types'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CodeBlock, github } from 'react-code-blocks'

type TocItem = {
  key: string
  title: string
  children?: TocItem[]
}

const fontSize = '16px'
const tocOfManual: TocItem[] = [
  {
    title: '介绍',
    key: 'introduction',
  },
  {
    title: '快速入门',
    key: 'quick-start',
    children: [{
      title: '配置环境',
      key: 'configuration',
    }, {
      title: '创建项目',
      key: 'create-project',
    }, {
      title: '运行',
      key: 'run-project',
    }, {
      title: '打包',
      key: 'build-project',
    }, {
      title: '发布',
      key: 'publish-project',
    }]
  },
  {
    title: '基础概念',
    key: 'basic-concepts',
    children: [{
      title: '空间小程序',
      key: 'space-widget',
    }, {
      title: '可嵌入空间',
      key: 'subspace',
    }, {
      title: 'XSML',
      key: 'intro-xsml',
    }, {
      title: 'SCSS',
      key: 'intro-scss',
    }, {
      title: 'TypeScript',
      key: 'typescript',
    }]
  },
  {
    title: '基础功能',
    key: 'features',
    children: [
      {
        title: '网格与模型',
        key: 'meshes-and-models',
      },
      {
        title: '材质',
        key: 'materials',
      },
      {
        title: '动画',
        key: 'animations',
      },
      {
        title: '音频',
        key: 'audio',
      },
      {
        title: '输入事件',
        key: 'input-events',
      },
    ],
  },
  {
    title: '开发者工具',
    key: 'developer-tools',
    children: [
      {
        title: '工具介绍',
        key: 'introduction',
      },
      {
        title: '子空间预览',
        key: 'subspace-preview',
      },
      {
        title: '子空间调试',
        key: 'subspace-debugging',
      },
      {
        title: '打包',
        key: 'packaging',
      }
    ],
  },
  {
    title: '运行时',
    key: 'runtime',
    children: [{
      title: 'Babylon.js APIs',
      key: 'babylonjs-apis',
    }, {
      title: 'Web APIs',
      key: 'web-apis',
    }, {
      title: 'JSAR APIs',
      key: 'jsar-internal-apis',
    }, {
      title: '资源缓存',
      key: 'resource-cache',
    }, {
      title: '模块系统',
      key: 'module-system',
    }],
  },
  {
    title: '发布与分发',
    key: 'delivery',
    children: [{
      title: 'Rokid AR 商店',
      key: 'rokid-arstore',
    }, {
      title: 'JSAR Canary',
      key: 'jsar-canary',
    }],
  },
  {
    title: '示例',
    key: 'examples',
    children: [{
      title: 'Hello Rokid',
      key: 'hello-rokid',
    }, {
      title: '星系',
      key: 'ar-drawing-board',
    }, {
      title: '小狗',
      key: 'ar-recognize-words',
    }, {
      title: '魔方',
      key: 'ar-puzzle',
    }, {
      title: '棒球',
      key: 'ar-flip-card',
    }, {
      title: '狮子',
      key: 'ar-ordering',
    }]
  }
]

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
    return (props: any) => <Typography.Title level={level} style={segmentStyle}>{props.children}</Typography.Title>
  }

  let docPath: string | undefined = undefined
  let markdownChildren = null
  if (router.isReady) {
    docPath = router.query.id instanceof Array ? router.query.id.join('/') : router.query.id
    const MarkdownContent: React.ComponentType<MDXProps> = require(`../../docs/manual/${docPath}.mdx`).default
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
        return (
          <Link href={props.href || ''}>
            {props.children}
          </Link>
        )
      },
      img: (props) => {
        return <img {...props} style={{ maxWidth: '60%' }} />
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
          <Tree
            autoExpandParent={true}
            showLine={false}
            blockNode={true}
            checkStrictly={false}
            treeData={treeData}
            expandedKeys={expandedKeys}
            selectedKeys={docPath ? [docPath] : []}
            onSelect={(selectedKeys) => {
              if (selectedKeys.length > 0) {
                const key = selectedKeys[0] as string
                router.push(`/manual/${key}`)
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
