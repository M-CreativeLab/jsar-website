import { Layout, Tree, Typography } from 'antd'
import { useRouter } from 'next/router'
import type { MDXProps } from 'mdx/types'

const fontSize = '16px'

export default function Page() {
  const router = useRouter()

  let markdownChildren = null
  if (router.isReady) {
    const docPath = router.query.id instanceof Array ? router.query.id.join('/') : router.query.id
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
      img: (props) => {
        return <img {...props} style={{ maxWidth: '80%' }} />
      },
      code: (props) => {
        return <Typography.Text code>{props.children}</Typography.Text>
      },
    }} />
  }

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
        <Tree
          defaultExpandAll={false}
          showLine={false}
          blockNode={true}
          checkStrictly={false}
          treeData={[
            {
              title: '介绍',
              key: 'introduction',
            },
            {
              title: '快速入门',
              key: 'quick-start',
              children: [{
                title: '配置环境',
                key: 'quick-start/configuration',
              }, {
                title: '创建项目',
                key: 'quick-start/create-project',
              }, {
                title: '运行',
                key: 'quick-start/run-project',
              }, {
                title: '打包',
                key: 'quick-start/build-project',
              }, {
                title: '发布',
                key: 'quick-start/publish-project',
              }]
            },
            {
              title: '基础概念',
              key: 'basic-concepts',
              children: [{
                title: '空间组件',
                key: 'basic-concepts/space-widget',
              }, {
                title: '可嵌入空间',
                key: 'basic-concepts/subspace',
              }, {
                title: 'XSML',
                key: 'basic-concepts/intro-xsml',
              }, {
                title: 'SCSS',
                key: 'basic-concepts/intro-scss',
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
                key: 'runtime/web-apis',
              }, {
                title: 'JSAR APIs',
                key: 'runtime/jsar-api',
              }, {
                title: '模块系统',
                key: 'runtime/module-system',
              }, {
                title: '调试',
                key: 'runtime/debugging',
              }]
            },
            {
              title: '示例',
              key: 'examples',
              children: [{
                title: 'Hello World',
                key: 'examples/hello-world',
              }, {
                title: 'AR 画板',
                key: 'examples/ar-drawing-board',
              }, {
                title: 'AR 识字',
                key: 'examples/ar-recognize-words',
              }, {
                title: 'AR 拼图',
                key: 'examples/ar-puzzle',
              }, {
                title: 'AR 翻牌',
                key: 'examples/ar-flip-card',
              }, {
                title: 'AR 点餐',
                key: 'examples/ar-ordering',
              }]
            }
          ]}
          onSelect={(selectedKeys) => {
            if (selectedKeys.length > 0) {
              router.push(`/manual/${selectedKeys[0]}`)
            }
          }}
          titleRender={(nodeData) => {
            return (
              <span
                style={{
                  fontSize: '16px',
                  padding: '0 0.5rem',
                  lineHeight: '2',
                }}
              >
                {nodeData.title}
              </span>
            )
          }}
          style={{
            fontSize: '18px',
          }}
        />
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
