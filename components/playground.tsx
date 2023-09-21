import { Descriptions, Divider, Tabs, Typography } from 'antd'
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react'
import { CodeBlock, github } from 'react-code-blocks'

declare var __transmuteRenderUnityScene: any;

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
  }
]
let isTransmuteInitialized = false
let unityInstance: any = null

export default function Playground() {
  const router = useRouter()
  const selectedExampleRef = useRef(examples[0])
  const [selectedExample, setSelectedExample] = useState(selectedExampleRef.current)
  const [entrySource, setEntrySource] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    return () => {
      if (unityInstance) {
        unityInstance.Module.pauseMainLoop()
        unityInstance.Quit()
      }
    }
  }, [])

  useEffect(() => {
    if (router.isReady && router.query.id) {
      const selected = examples.find((item) => item.key === router.query.id)
      if (selected) {
        selectedExampleRef.current = selected
        setSelectedExample(selected)
      }
    }
  }, [router.query])

  useEffect(() => {
    if (canvasRef.current && !isTransmuteInitialized) {
      const buildUrl = 'https://ar.rokidcdn.com/web-assets/pages/jsar/playground'
      let mutableWindow = window as any
      mutableWindow['module'] = {}
      mutableWindow['__transmuteLoaderUrl'] = buildUrl + '/TransmuteEditor.loader.js'
      mutableWindow['__transmuteConfig'] = {
        scalingCanvas: false,
        dataUrl: buildUrl + '/TransmuteEditor.data',
        frameworkUrl: buildUrl + '/TransmuteEditor.framework.js',
        codeUrl: buildUrl + '/TransmuteEditor.wasm',
        streamingAssetsUrl: 'StreamingAssets',
        companyName: 'MCreativeLab Org',
        productName: 'TransmuteUnityFramework',
        productVersion: '0.1',
        showBanner: (msg: string, type?: string) => {
          console.info(msg, type)
        },
      }

      const script = document.createElement('script')
      script.src = 'https://ar.rokidcdn.com/web-assets/pages/jsar/js/playground-scene.js'
      script.onload = () => {
        try {
          __transmuteRenderUnityScene()
        } catch (err) {
          console.error(`failed to load unity instance: ${err}`)
        }
      }
      document.body.appendChild(script)
      isTransmuteInitialized = true

      window.addEventListener('transmuteUnityInstanceReady', (event: any) => {
        unityInstance = event.detail
        requestAnimationFrame(() => {
          window.postMessage({
            command: 'TransmuteWebGLInterface.OnExecuteScriptAsURI',
            args: [{
              'Uri': selectedExampleRef.current.url,
              'DestroyPresent': true,
            }]
          })
        })
      })
    }
  }, [canvasRef.current])

  useEffect(() => {
    if (selectedExample?.url) {
      fetch(selectedExample.url)
        .then((res) => res.text())
        .then(setEntrySource)

      requestAnimationFrame(() => {
        window.postMessage({
          command: 'TransmuteWebGLInterface.OnExecuteScriptAsURI',
          args: [{
            'Uri': selectedExample.url,
            'DestroyPresent': true,
          }]
        })
      })
    }
  }, [selectedExample])

  const canvasHeight = screen.height * 0.55
  const canvasWidth = screen.width * 0.4

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: '64px',
        alignItems: 'center',
        // minHeight: 'calc(100vh - 64px)',
        width: '100%',
        overflowX: 'hidden',
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
        <Typography.Title level={2} style={{ alignSelf: 'flex-start' }}>在线演示</Typography.Title>
        <Divider />
        <section
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <Tabs
            tabPosition="left"
            type="card"
            size="large"
            activeKey={selectedExample.key}
            items={examples.map((item) => ({
              key: item.key,
              label: item.label,
            }))}
            onChange={(key) => {
              const selected = examples.find((item) => item.key === key)
              if (selected) {
                selectedExampleRef.current = selected
                setSelectedExample(selected)
              }
            }}
          />
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
            <div id="unity-container" className="unity-desktop">
              <canvas
                id="unity-canvas"
                width={canvasWidth}
                height={canvasHeight}
                style={{
                  width: '100%',
                  height: `${canvasHeight}px`,
                  borderRadius: '0.5rem',
                }}
                ref={canvasRef}></canvas>
              <div id="unity-loading-bar">
                <div id="unity-logo"></div>
                <div id="unity-progress-bar-empty">
                  <div id="unity-progress-bar-full"></div>
                </div>
              </div>
              <div id="unity-warning"></div>
            </div>
            <Tabs
              tabPosition="top"
              type="card"
              size="large"
              style={{
                width: '30vw',
              }}
              defaultActiveKey="meta"
            >
              <Tabs.TabPane tab="基础信息" key="meta">
                <Descriptions
                  layout="horizontal"
                  size="small"
                  bordered={true}
                  column={1}
                  labelStyle={{ width: '100px', textAlign: 'right' }}
                >
                  <Descriptions.Item label="名称">{selectedExample.label}</Descriptions.Item>
                  <Descriptions.Item label="代码仓库">
                    <a target="_blank"
                      href={`https://github.com/M-CreativeLab/${selectedExample.key}`}>
                      M-CreativeLab/{selectedExample.key}</a>
                  </Descriptions.Item>
                  <Descriptions.Item label="入口文件">{selectedExample.url}</Descriptions.Item>
                </Descriptions>
              </Tabs.TabPane>
              <Tabs.TabPane tab="XSML代码" key="code">
                <CodeBlock
                  language="xml"
                  theme={github}
                  text={entrySource.replace(/\n$/, '')}
                  customStyle={{
                    flex: 1,
                    maxHeight: `calc(${canvasHeight}px - 50px)`,
                  }}
                  codeContainerStyle={{
                    width: '30vw',
                  }}
                  codeBlockStyle={{
                    fontSize: '1rem',
                  }}
                />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </section>
      </section>
    </main>
  )
}
