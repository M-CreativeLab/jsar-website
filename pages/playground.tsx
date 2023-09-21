import { Divider, Tabs, Typography } from 'antd'
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
let sceneScript: HTMLScriptElement | null = null

export default function Playground() {
  const [selectedExample, setSelectedExample] = useState(examples[0])
  const [entrySource, setEntrySource] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current && !isTransmuteInitialized) {
      const buildUrl = '/playground'
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

      const script = sceneScript = document.createElement('script')
      script.src = '/js/playground-scene.js'
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
              'Uri': selectedExample.url,
              'DestroyPresent': true,
            }]
          })
        })
      })
    }
  }, [canvasRef.current])

  useEffect(() => {
    return () => {
      if (unityInstance) {
        unityInstance.Module.pauseMainLoop()
        unityInstance.Quit()
      }
    }
  }, [])

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

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 64px - 120px)',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
          height: '80%',
          backgroundColor: '#fff',
          boxSizing: 'border-box',
          borderRadius: '1rem',
          padding: '2.5rem',
        }}
      >
        <Typography.Title style={{ alignSelf: 'flex-start' }}>在线演示</Typography.Title>
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
              <canvas id="unity-canvas" width={960} height={700} ref={canvasRef}></canvas>
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
                flex: 1,
              }}
              defaultActiveKey="code"
            >
              <Tabs.TabPane tab="基础信息" key="meta">
                <p>{selectedExample.url}</p>
              </Tabs.TabPane>
              <Tabs.TabPane tab="代码" key="code">
                <CodeBlock
                  language="xml"
                  theme={github}
                  text={entrySource.replace(/\n$/, '')}
                  customStyle={{
                    flex: 1,
                    height: '640px',
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