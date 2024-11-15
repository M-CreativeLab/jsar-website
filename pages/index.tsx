import Image from 'next/image'
import { Button, Divider, Space, Tabs, Tooltip, Typography } from 'antd'
import { ArrowRightOutlined, CheckCircleOutlined, CodeSandboxOutlined, Html5Outlined } from '@ant-design/icons'
import { CodeBlock, monokaiSublime } from 'react-code-blocks'
import { Parallax, ParallaxProvider } from 'react-scroll-parallax'
import Link from 'next/link'
import { NextPageContext } from 'next'
import { useTranslations } from 'next-intl'

const htmlCodeText = `
<html>
<head>
  <meta charset="utf-8" />
  <title>Sample</title>
  <script type="importmap">
    {
      "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js",
        "three/addons/": "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/"
      }
    }
  </script>
  <script type="module" src="./index.ts"></script>
</head>
<body>
  <div>
    <h1>Example</h1>
    <p>Sample code for JSAR</p>
    <sphere />
  </div>
</body>
</html>
`.replace(/^\n/, '')

const scriptCodeText = `
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1.0, 0.1, 1000);

// Create lights
const light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(0, 1, 1);
scene.add(light);

// Create meshes
const geometry = new THREE.TorusKnotGeometry(0.2, 0.05, 50, 16);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  wireframe: false
});
const obj = new THREE.Mesh(geometry, material);
scene.add(obj);

const gl = navigator.gl;
navigator.xr.requestSession('immersive-ar', {}).then((session) => {
  const baseLayer = new XRWebGLLayer(session, gl);
  session.updateRenderState({ baseLayer });

  const renderer = new THREE.WebGLRenderer({
    canvas: {
      addEventListener() { },
    },
    context: gl,
  });
  renderer.xr.enabled = true;
  renderer.xr.setReferenceSpaceType('local');
  renderer.xr.setSession(session);

  function animate() {
    obj.rotation.x += 0.01;
    obj.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  camera.position.z = 5;
  renderer.setAnimationLoop(animate);
  console.info('Started...');
}, (err) => {
  console.warn('Failed to start XR session:', err);
});
console.info('navigator.xr', navigator.xr);
`.replace(/^\n/, '')

export default function Home() {
  const t = useTranslations('LandingPage')
  const listItemStyle = {
    margin: '1rem 0',
  }
  const textStyle = {
    fontSize: '18px',
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
      <ParallaxProvider>
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
              <Link href="manual/latest/introduction">
                <Button shape="round" size="large">
                  {t('buttons.developerDocumentation')}
                  <ArrowRightOutlined />
                </Button>
              </Link>
            </Space>
          </Space>
          <Image
            src="logo-jsar.svg"
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
                      index.html
                    </Typography.Text>
                  ),
                  children: (
                    <CodeBlock
                      language="html"
                      text={htmlCodeText}
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
          <Parallax translateX={[-10, 5]} translateY={[0, 0]} opacity={[1.8, 0.3]}>
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
          </Parallax>
          <Parallax translateX={[10, -5]} translateY={[0, 0]} opacity={[1, 0.8]}>
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
                  <Space align="start">
                    <svg className="icon" aria-hidden="true">
                      <use xlinkHref="#icon-flash"></use>
                    </svg>
                    {t('typescript.features.0')}
                  </Space>
                </li>
                <li style={listItemStyle}>
                  <Space align="start">
                    <svg className="icon" aria-hidden="true">
                      <use xlinkHref="#icon-vscode"></use>
                    </svg>
                    {t('typescript.features.1')}
                  </Space>
                </li>
                <li style={listItemStyle}>
                  <Space align="start">
                    <svg className="icon" aria-hidden="true">
                      <use xlinkHref="#icon-package"></use>
                    </svg>
                    {t('typescript.features.2')}
                  </Space>
                </li>
              </ul>
            </Space>
          </Parallax>
        </Space>
        <Divider />

        <Space size={10} style={{ padding: '30px 0', width: '100%', justifyContent: 'space-around' }}>
          <Parallax rotateZ={[0, 360]} translateY={[-50, 10]} scale={[0.6, 0.9]} opacity={[0.5, 1]}>
            <Image
              src="logo-threejs.svg"
              alt="Three.js"
              height={240}
              width={240}
            />
          </Parallax>
          <Space direction="vertical" style={{ flex: 1 }}>
            <Title level={2}>
              {t.rich('threejs.title', {
                link: (children) => <a target="_blank" href="https://threejs.org/">{children}</a>,
              })}
            </Title>
            <Space wrap direction="vertical" style={{ width: '30vw' }}>
              <Typography.Paragraph style={textStyle}>
                {t.rich('threejs.description.0')}
              </Typography.Paragraph>
              <Typography.Paragraph style={textStyle}>
                {t.rich('threejs.description.1')}
              </Typography.Paragraph>
              <Link href="manual/latest/runtime/babylonjs-apis">
                <Button size="large" shape="round">
                  {t('buttons.usingThreeJSInJSAR')}
                  <ArrowRightOutlined />
                </Button>
              </Link>
            </Space>
          </Space>
        </Space>
        <Divider />

        <Space size={10} style={{ padding: '30px 0', width: '100%', justifyContent: 'space-around' }}>
          <Parallax rotateZ={[0, -360]} translateY={[-30, 20]} opacity={[0.5, 1.5]}>
            <Image
              src="logo-babylonjs.svg"
              alt="Babylon.js"
              height={240}
              width={240}
            />
          </Parallax>
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
          <Parallax translateY={[40, -40]}>
            <Image
              src="logo-unity.svg"
              alt="Babylon.js"
              height={240}
              width={240}
            />
          </Parallax>
          <Parallax translateY={[-20, 20]} opacity={[0, 2]}>
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
                  <Tooltip title={t('tooltip.comingSoon')} placement="right">
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
          </Parallax>
        </Space>
        <Divider />

        <Space direction="vertical" style={{ padding: '30px 0', width: '100%', alignItems: 'center' }}>
          <Typography.Title level={1}>{t('bottom.title')}</Typography.Title>
          <div>
            <Link href="manual/latest/introduction">
              <Button shape="round" size="large" type="primary">
                {t('buttons.developerDocumentation')}
                <ArrowRightOutlined />
              </Button>
            </Link>
          </div>
        </Space>

      </ParallaxProvider>
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
