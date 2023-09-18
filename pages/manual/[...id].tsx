import { Affix, Layout, Tree, TreeDataNode, Typography } from 'antd'
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
      title: '空间组件',
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
    }]
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
      key: 'jsar-api',
    }, {
      title: '模块系统',
      key: 'module-system',
    }, {
      title: '调试',
      key: 'debugging',
    }]
  },
  {
    title: '示例',
    key: 'examples',
    children: [{
      title: 'Hello World',
      key: 'hello-world',
    }, {
      title: 'AR 画板',
      key: 'ar-drawing-board',
    }, {
      title: 'AR 识字',
      key: 'ar-recognize-words',
    }, {
      title: 'AR 拼图',
      key: 'ar-puzzle',
    }, {
      title: 'AR 翻牌',
      key: 'ar-flip-card',
    }, {
      title: 'AR 点餐',
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

  let docPath: string | undefined = undefined
  let markdownChildren = null
  if (router.isReady) {
    docPath = router.query.id instanceof Array ? router.query.id.join('/') : router.query.id
    const MarkdownContent: React.ComponentType<MDXProps> = require(`../../docs/manual/${docPath}.mdx`).default
    markdownChildren = <MarkdownContent components={{
      h1: (props) => {
        return <Typography.Title level={1}>{props.children}</Typography.Title>
      },
      h2: (props) => {
        return <Typography.Title level={2}>{props.children}</Typography.Title>
      },
      ul: (props) => {
        return <Typography.Paragraph style={{ fontSize }}>
          <ul>{props.children}</ul>
        </Typography.Paragraph>
      },
      ol: (props) => {
        return <Typography.Paragraph style={{ fontSize }}>
          <ul>{props.children}</ul>
        </Typography.Paragraph>
      },
      li: (props) => {
        return <li
          style={{ lineHeight: 2 }}
        >
          {props.children}
        </li>
      },
      p: (props) => {
        return <Typography.Paragraph style={{ fontSize }}>{props.children}</Typography.Paragraph>
      },
      a: (props) => {
        return (
          <Link href={props.href || ''}>
            {props.children}
          </Link>
        )
      },
      img: (props) => {
        return <img {...props} style={{ maxWidth: '80%' }} />
      },
      code: (props) => {
        return <Typography.Text code>{props.children}</Typography.Text>
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
          marginRight: '2rem',
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
          minHeight: '80vh',
        }}
      >
        <Typography.Paragraph>
          {markdownChildren}
        </Typography.Paragraph>
      </Layout.Content>
    </Layout>
  )
}
