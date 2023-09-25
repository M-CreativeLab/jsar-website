import Image from 'next/image'
import { Button, Divider, Space, Tabs, Tooltip, Typography } from 'antd'
import { ArrowRightOutlined, CheckCircleOutlined, CodeSandboxOutlined, Html5Outlined } from '@ant-design/icons'
import { CodeBlock, monokaiSublime } from 'react-code-blocks'
import Link from 'next/link'

const xsmlCodeText = `
<xsml version="1.0">
  <head>
    <title>YodaOS JSAR Gallery</title>
    <link id="model" rel="mesh" type="octstream/glb" href="./model/rokid_robot.small.glb" />
    <style type="text/scss">
      @keyframes rotate-self {
        0% {
          rotation: 0 0 0;
        }
        50% {
          rotation: 0 180 0;
        }
        100% {
          rotation: 0 360 0;
        }
      }
      @material yellow {
        diffuse-color: #fdd276;
        backface-culling: false;
        side-orientation: frontside;
      }
      @material red {
        diffuse-color: #ad3525;
        backface-culling: false;
        side-orientation: frontside;
      }

      #model {
        animation: rotate-self 12s linear;
      }
      #face {
        material: "yellow";
        position: 39 0 150;
      }
      #body {
        material: "red";
        position: 39 -10 160;
        rotation: 0 0 0.3;
      }
    </style>
    <script src="./main.ts"></script>
  </head>
  <space>
    <mesh id="model" ref="model" selector="__root__" />
    <bound id="main">
      <cylinder id="body" height="140" diameter-top="30" diameter-bottom="80" tessellation="4" />
      <cube id="face" width="80" height="80" depth="80" />
    </bound>
  </space>
</xsml>
`.replace(/^\n/, '')

const scriptCodeText = `
const scene = spaceDocument.scene as BABYLON.Scene;
let model = spaceDocument.getNodeById('model') as BABYLON.TransformNode;
model.getChildMeshes().forEach(mesh => {
  if (mesh.material.getClassName() === 'PBRMaterial') {
    const mat = mesh.material as BABYLON.PBRMaterial;
    mat.metallic = 0.2; // 增加金属感
  }
});
`.replace(/^\n/, '')

export default function Home() {
  const listItemStyle = {
    margin: '1rem 0',
  }
  const textStyle = {
    fontSize: '16px',
  }
  const listItemIconStyle = {
    ...textStyle,
    color: '#389e0d'
  }

  const Title = ({ children, level }: any) => {
    return <Typography.Title level={level || 1} style={{ color: '#434343' }}>{children}</Typography.Title>
  }

  return (
    <main
      style={{
        width: '80vw',
        margin: '0 auto',
      }}
    >
      <Space size={50} style={{ padding: '100px 0', width: '100%', justifyContent: 'space-around' }}>
        <Space direction="vertical">
          <Title level={1}>空间小程序：可嵌入空间的 Web 运行时</Title>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            <li style={listItemStyle}>
              <Space>
                <CheckCircleOutlined style={listItemIconStyle} />
                <Typography.Text style={textStyle}>支持 <code>Web-standard APIs</code>、<code>TypeScript</code> 和 <code>Babylon.js</code></Typography.Text>
              </Space>
            </li>
            <li style={listItemStyle}>
              <Space>
                <CheckCircleOutlined style={listItemIconStyle} />
                <Typography.Text style={textStyle}>空间运行安全，空间小程序运行在空间隔离框架中，互不干扰</Typography.Text>
              </Space>
            </li>
            <li style={listItemStyle}>
              <Space>
                <CheckCircleOutlined style={listItemIconStyle} />
                <Typography.Text style={textStyle}>通过应用层与渲染层代码逻辑分离，实现接近原生的渲染性能</Typography.Text>
              </Space>
            </li>
          </ul>
          <Space style={{ marginTop: '20px' }}>
            <a href="/installer/vscode-jsar-devtools-latest.vsix">
              <Button shape="round" size="large" type="primary" icon={
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-vscode"></use>
                </svg>
              }>下载 VSCode 插件</Button>
            </a>
            <Link href="manual/latest/introduction">
              <Button shape="round" size="large">
                开发者文档
                <ArrowRightOutlined />
              </Button>
            </Link>
          </Space>
        </Space>
        <Image
          src="logo-jsar.png"
          alt="YodaOS JSAR: The embeddable AR runtime for JavaScript Developers"
          height={260}
          width={260}
        />
      </Space>
      <Divider />

      <Space size={50}>
        <div
          style={{
            width: '50vw',
            margin: '20px 0',
            overflow: 'hidden',
          }}
        >
          <Tabs
            defaultActiveKey="xsml"
            animated={false}
            size="large"
            type="line"
            items={[
              {
                key: 'xsml',
                label: (
                  <Typography.Text strong={true} style={{ fontSize: 16 }}>
                    <Html5Outlined />
                    index.xsml
                  </Typography.Text>
                ),
                children: (
                  <CodeBlock
                    language="html"
                    text={xsmlCodeText}
                    showLineNumbers={true}
                    theme={monokaiSublime}
                    codeContainerStyle={{
                      height: '400px',
                      padding: '0.5rem',
                      fontSize: '1.15em',
                    }}
                  />
                )
              },
              {
                key: 'script',
                label: (
                  <Typography.Text strong={true} style={{ fontSize: 16 }}>
                    <CodeSandboxOutlined />
                    index.ts
                  </Typography.Text>
                ),
                children: (
                  <CodeBlock
                    language="typescript"
                    text={scriptCodeText}
                    showLineNumbers={true}
                    theme={monokaiSublime}
                    codeContainerStyle={{
                      height: '400px',
                      padding: '0.5rem',
                      fontSize: '1.15em',
                    }}
                  />
                )
              },
            ]}
          />
        </div>
        <Space wrap direction="vertical" style={{ flex: 1 }}>
          <Title level={2}>如 Web 一般<br />但用于空间小程序开发</Title>
          <Typography.Paragraph style={textStyle}>
            空间小程序还原最开始的 Web 开发体验，并所见即所得。
          </Typography.Paragraph>
          <Typography.Paragraph style={textStyle}>
            我们引入了 <Tooltip title="Extensible Spatial Marked Language，即可扩展空间标记语言"><u>XSML</u></Tooltip>，它是一种类似于 HTML 的语言，用于描述组件的空间结构。
          </Typography.Paragraph>
          <Typography.Paragraph style={textStyle}>
            我们引入了 <Tooltip title="Spatial Cascading Style Sheets，即空间层叠样式表"><u>SCSS</u></Tooltip>，它是一种类似于 CSS 的语言，用于描述组件的空间样式。
          </Typography.Paragraph>
          <Typography.Paragraph style={textStyle}>
            同样地，JSAR 使用 TypeScript / JavaScript 作为空间小程序的脚本语言。
          </Typography.Paragraph>
          <Button size="large" shape="round" type="default">了解更多<ArrowRightOutlined /></Button>
        </Space>
      </Space>
      <Divider />

      <Space size={50} style={{ padding: '50px 0' }}>
        <Space wrap direction="vertical" style={{ width: '30vw' }}>
          <Title level={2}>TypeScript 内置</Title>
          <Typography.Paragraph style={textStyle}>
            JSAR 运行时在执行小程序时，可直接解析 TypeScript 代码，因此开发者无需任何编译和配置即可运行 TypeScript 代码。
          </Typography.Paragraph>
          <Link href="manual/latest/basic-concepts/typescript">
            <Button size="large" shape="round">
              在 JSAR 中使用 TypeScript
              <ArrowRightOutlined />
            </Button>
          </Link>
        </Space>
        <Space size="large" align="start">
          <Image
            src="logo-typescript.png"
            alt="TypeScript"
            height={160}
            width={160}
          />
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              fontSize: 16,
            }}
          >
            <li style={listItemStyle}>
              <Space>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-flash"></use>
                </svg>
                无需任何配置即可使用 TypeScript
              </Space>
            </li>
            <li style={listItemStyle}>
              <Space>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-vscode"></use>
                </svg>
                在 Visual Studio Code 中享受 TypeScript 的智能提示
              </Space>
            </li>
            <li style={listItemStyle}>
              <Space>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-package"></use>
                </svg>
                通过 TypeScript 源码进行应用发布，无需额外构建
              </Space>
            </li>
          </ul>
        </Space>
      </Space>
      <Divider />

      <Space size={10} style={{ padding: '30px 0', width: '100%', justifyContent: 'space-around' }}>
        <Image
          src="logo-babylonjs.svg"
          alt="Babylon.js"
          height={240}
          width={240}
        />
        <Space direction="vertical" style={{ flex: 1 }}>
          <Title level={2}>使用 <a target="_blank" href="https://www.babylonjs.com/">Babylon.js</a></Title>
          <Space wrap direction="vertical" style={{ width: '30vw' }}>
            <Typography.Paragraph style={textStyle}>
              Babylon.js 是一个支持多后端（WebGL、WebGPU、服务端以及 Native）的开源 3D 渲染引擎，它提供了一系列的游戏场景 API，可用于开发 3D 游戏和应用。
            </Typography.Paragraph>
            <Typography.Paragraph style={textStyle}>
              JSAR 实现了 Babylon.js <code>Engine</code> 部分的接口，因此开发者可直接使用 Babylon.js 的 API 进行开发（不过还存在不完全支持的情况）。
            </Typography.Paragraph>
            <Link href="manual/latest/runtime/babylonjs-apis">
              <Button size="large" shape="round">
                在 JSAR 中使用 Babylon.js
                <ArrowRightOutlined />
              </Button>
            </Link>
          </Space>
        </Space>
      </Space>
      <Divider />

      <Space size={10} style={{ padding: '30px 0', width: '100%', justifyContent: 'space-around' }}>
        <Image
          src="logo-unity.svg"
          alt="Babylon.js"
          height={240}
          width={240}
        />
        <Space direction="vertical" style={{ flex: 1 }}>
          <Title level={2}>与 <a href="https://unity.com/">Unity</a> 一同构建</Title>
          <Space wrap direction="vertical" style={{ width: '30vw' }}>
            <Typography.Paragraph style={textStyle}>
              使用 JSAR 开发的空间组件可以在任何一个 Unity 场景中运行，我们提供了 JSAR UPM 插件，按需实现底层数据接口，即可在你的 Unity 应用中使用 JSAR 空间小程序。
            </Typography.Paragraph>
            <Space>
              <Button size="large" shape="round" type="primary">申请 JSAR UPM 试用</Button>
              <Button size="large" shape="round">
                Unity 集成指南
                <ArrowRightOutlined />
              </Button>
            </Space>
          </Space>
        </Space>
      </Space>
    </main>
  )
}