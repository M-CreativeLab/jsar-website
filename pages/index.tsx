import Image from 'next/image'
import { Button, Divider, Space, Tabs, Tooltip, Typography } from 'antd'
import { ArrowRightOutlined, CheckCircleOutlined, CodeSandboxOutlined, Html5Outlined } from '@ant-design/icons'
import { CodeBlock, monokaiSublime } from 'react-code-blocks'
import Link from 'next/link'
import { NextPageContext } from 'next'
import { useTranslations } from 'next-intl'

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
  const t = useTranslations('LandingPage')
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
          <Title level={1}>{t('title')}</Title>
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
                <Typography.Text style={textStyle}>{t('features.0')}</Typography.Text>
              </Space>
            </li>
            <li style={listItemStyle}>
              <Space>
                <CheckCircleOutlined style={listItemIconStyle} />
                <Typography.Text style={textStyle}>{t('features.1')}</Typography.Text>
              </Space>
            </li>
            <li style={listItemStyle}>
              <Space>
                <CheckCircleOutlined style={listItemIconStyle} />
                <Typography.Text style={textStyle}>{t('features.2')}</Typography.Text>
              </Space>
            </li>
          </ul>
          <Space style={{ marginTop: '20px' }}>
            <a href="/installer/vscode-jsar-devtools-latest.vsix">
              <Button shape="round" size="large" type="primary" icon={
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-vscode"></use>
                </svg>
              }>{t('buttons.downloadVscodeExtension')}</Button>
            </a>
            <Link href="manual/latest/introduction">
              <Button shape="round" size="large">
                {t('buttons.developerDocumentation')}
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
          <Title level={2}>{t('intro.title.0')}<br />{t('intro.title.1')}</Title>
          {([0, 1, 2, 3]).map(i => (
            <Typography.Paragraph style={textStyle} key={i}>
              {t.rich(`intro.description.${i}`, {
                tooltip: (chunks) => <Tooltip title={t(`tooltip.${chunks}`)}><u>{chunks}</u></Tooltip>,
              })}
            </Typography.Paragraph>
          ))}
          <Link href="manual/latest/basic-concepts/intro-xsml">
            <Button size="large" shape="round" type="default">{t('buttons.learnMore')}<ArrowRightOutlined /></Button>
          </Link>
        </Space>
      </Space>
      <Divider />

      <Space size={50} style={{ padding: '50px 0' }}>
        <Space wrap direction="vertical" style={{ width: '30vw' }}>
          <Title level={2}>{t('typescript.title')}</Title>
          <Typography.Paragraph style={textStyle}>
            {t('typescript.description')}
          </Typography.Paragraph>
          <Link href="manual/latest/basic-concepts/typescript">
            <Button size="large" shape="round">
              {t('buttons.usingTypeScriptInJSAR')}
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
                {t('typescript.features.0')}
              </Space>
            </li>
            <li style={listItemStyle}>
              <Space>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-vscode"></use>
                </svg>
                {t('typescript.features.1')}
              </Space>
            </li>
            <li style={listItemStyle}>
              <Space>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-package"></use>
                </svg>
                {t('typescript.features.2')}
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
          <Title level={2}>
            {t.rich('babylonjs.title', {
              link: (children) => <a target="_blank" href="https://www.babylonjs.com/">{children}</a>,
            })}
          </Title>
          <Space wrap direction="vertical" style={{ width: '30vw' }}>
            <Typography.Paragraph style={textStyle}>
              {t.rich('babylonjs.description.0')}
            </Typography.Paragraph>
            <Typography.Paragraph style={textStyle}>
              {t.rich('babylonjs.description.1')}
            </Typography.Paragraph>
            <Link href="manual/latest/runtime/babylonjs-apis">
              <Button size="large" shape="round">
                {t('buttons.usingBabylonInJSAR')}
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
          <Title level={2}>
            {t.rich('unity.title', {
              link: (children) => <a target="_blank" href="https://unity.com/">{children}</a>,
            })}
          </Title>
          <Space wrap direction="vertical" style={{ width: '30vw' }}>
            <Typography.Paragraph style={textStyle}>
              {t.rich('unity.description.0')}
            </Typography.Paragraph>
            <Space>
              <Tooltip title={t('tooltip.comingSoon')}>
                <Button size="large" shape="round" type="primary" disabled>
                  {t('buttons.applyForEarlyAccess')}
                </Button>
              </Tooltip>
              {/* <Button size="large" shape="round">
                Unity 集成指南
                <ArrowRightOutlined />
              </Button> */}
            </Space>
          </Space>
        </Space>
      </Space>
    </main>
  )
}

export async function getStaticProps(context: NextPageContext) {
  return {
    props: {
      messages: (await import(`../messages/${context.locale}`)).default
    }
  }
}
