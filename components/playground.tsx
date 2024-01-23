import { Divider, Space, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'
import { Loader as JSARLoader } from './jsar/impl-babylonjs'

const runtimeVersions = [
  'latest',
  '0.1.0',
  '0.2.0',
  '0.2.1',
]
const examples = [
  {
    key: 'jsar-gallery-rokid-jungle',
    label: 'Rokid Jungle',
    url: 'https://cdn.jsdelivr.net/gh/M-CreativeLab/jsar-gallery-rokid-jungle@main/main.xsml',
  },
  {
    key: 'jsar-gallery-solar-system',
    label: '太阳系',
    url: 'https://cdn.jsdelivr.net/gh/M-CreativeLab/jsar-gallery-solar-system@main/main.xsml',
  },
  {
    key: 'jsar-gallery-flatten-lion',
    label: '狮子',
    url: 'https://cdn.jsdelivr.net/gh/M-CreativeLab/jsar-gallery-flatten-lion@main/lib/lion.xsml',
  },
  {
    key: 'jsar-gallery-poker',
    label: '扑克牌（双面渲染）',
    url: 'https://cdn.jsdelivr.net/gh/M-CreativeLab/jsar-gallery-poker@main/main.xsml',
  },
  {
    key: 'jsar-gallery-mesh-collision',
    label: '碰撞检测',
    url: 'https://cdn.jsdelivr.net/gh/M-CreativeLab/jsar-gallery-mesh-collision@main/main.xsml',
  },
  {
    key: 'jsar-gallery-animation-easing',
    label: '动画缓动',
    url: 'https://cdn.jsdelivr.net/gh/M-CreativeLab/jsar-gallery-animation-easing@main/main.xsml',
  },
  {
    key: 'jsar-gallery-nes',
    label: '超级玛丽',
    url: 'https://raw.githubusercontent.com/M-CreativeLab/jsar-gallery-nes/main/main.xsml',
    version: 'latest',
  },
]
let isTransmuteInitialized = false
let jsarLoader: JSARLoader | null = null

export default function Playground() {
  const t = useTranslations('PlaygroundPage')
  const router = useRouter()
  const editorRef = useRef(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  function loadExample() {
    if (router.isReady === true &&
      canvasRef.current != null &&
      editorRef.current != null &&
      isTransmuteInitialized === false
    ) {
      isTransmuteInitialized = true
      jsarLoader = new JSARLoader(canvasRef.current)
      jsarLoader.bootstrap().then(() => {
        editorRef.current.setValue(jsarLoader.source)
      })
    }
  }

  useEffect(() => loadExample(), [
    router.isReady,
    canvasRef,
    editorRef,
  ])

  const canvasHeight = screen.height * 0.55
  const canvasWidth = window.innerWidth * 0.40
  console.log(canvasWidth, canvasHeight)

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: '64px',
        alignItems: 'center',
        width: '100%',
        overflowX: 'hidden',
        minHeight: '500px',
      }}
    >
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
          height: '100%',
          backgroundColor: '#fff',
          boxSizing: 'border-box',
          borderRadius: '1rem',
          padding: '2rem',
        }}
      >
        <Space align="start">
          <div style={{ marginRight: 50, width: '40vw' }}>
            <Typography.Title level={2} style={{ alignSelf: 'flex-start' }}>
              <Space size="large">
                {t('title')}
              </Space>
            </Typography.Title>
            <Typography.Paragraph>
              {t('description.0')}
            </Typography.Paragraph>
          </div>
          <div>
            <Typography.Title level={5}>{t('otherEx')}</Typography.Title>
            <Space size={30}>
              {examples.map((example) => (
                <a href={new URL(`?url=${example.url}`, location.href).href}>
                  {example.label}
                </a>
              ))}
            </Space>
          </div>
        </Space>
        <Divider />
        <section
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: '1rem',
            }}
          >
            <canvas
              ref={canvasRef}
              height={canvasHeight}
              width={`${canvasWidth}px`}
            />
            <Editor
              width="100%"
              height={canvasHeight}
              defaultLanguage="html"
              onMount={(editor, _monaco) => {
                editor.updateOptions({
                  tabSize: 2,
                  lineNumbers: 'on',
                })
                editorRef.current = editor
                loadExample()
              }}
            />
          </div>
        </section>
      </section>
    </main>
  )
}
