import { Descriptions, Divider, Select, Space, Tabs, Typography } from 'antd'
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react'
import { CodeBlock, github } from 'react-code-blocks'

declare var __transmuteRenderUnityScene: any;

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
let unityInstance: any = null

export default function Playground() {
  const t = useTranslations('PlaygroundPage')
  const router = useRouter()
  const selectedExampleRef = useRef(examples[0])
  const [selectedExample, setSelectedExample] = useState(selectedExampleRef.current)
  const [entrySource, setEntrySource] = useState('')
  const [runtimeVersion, setRuntimeVersion] = useState(runtimeVersions[0])
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
    if (router.isReady) {
      if (router.query.version) {
        setRuntimeVersion(router.query.version as string)
      }
      if (router.query.id) {
        const selected = examples.find((item) => item.key === router.query.id)
        if (selected) {
          selectedExampleRef.current = selected
          setSelectedExample(selected)
        }
      } else if (router.query.url) {
        const selected = examples.find((item) => item.url === router.query.url)
        if (selected) {
          selectedExampleRef.current = selected
          setSelectedExample(selected)
        } else {
          const newExample = {
            key: 'custom-example',
            label: '自定义',
            url: router.query.url as string,
          }
          examples.push(newExample)
          selectedExampleRef.current = newExample
          setSelectedExample(newExample)
        }
      }
    }

    if (router.isReady && router.query.id) {
      const selected = examples.find((item) => item.key === router.query.id)
      if (selected) {
        selectedExampleRef.current = selected
        setSelectedExample(selected)
      }
    }
  }, [router.query])

  useEffect(() => {
    if (router.isReady && canvasRef.current && !isTransmuteInitialized) {
      const ver = router.query['version'] || runtimeVersions[0]
      const useGzip = ver !== '0.1.0'
      const seed = Date.now()
      const buildUrl = `https://ar.rokidcdn.com/web-assets/pages/jsar/playground/${ver}`
      let mutableWindow = window as any
      mutableWindow['module'] = {}
      mutableWindow['__transmuteLoaderUrl'] = buildUrl + '/TransmuteEditor.loader.js'
      mutableWindow['__transmuteConfig'] = {
        scalingCanvas: false,
        dataUrl: buildUrl + `/TransmuteEditor.data${useGzip ? '.gz' : ''}?timestamp=${seed}`,
        frameworkUrl: buildUrl + `/TransmuteEditor.framework.js${useGzip ? '.gz' : ''}?timestamp=${seed}`,
        codeUrl: buildUrl + `/TransmuteEditor.wasm${useGzip ? '.gz' : ''}?timestamp=${seed}`,
        streamingAssetsUrl: 'StreamingAssets',
        companyName: 'Rokid MCreativeLab',
        productName: 'JSAR Framework',
        productVersion: ver,
        showBanner: (msg: string, type?: string) => {
          console.info(msg, type)
        },
      }

      const script = document.createElement('script')
      script.type = 'module'
      script.src = `${buildUrl}/scene.js`
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
  }, [router.isReady, canvasRef.current])

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
        <Typography.Title level={2} style={{ alignSelf: 'flex-start' }}>
          <Space size="large">
            {t('title')}
            <Select value={runtimeVersion} size="large" onChange={value => {
              if (value) {
                const currentUrl = new URL(window.location.href)
                currentUrl.searchParams.set('version', value)
                window.open(currentUrl.href, '_current')
              }
            }}>
              {runtimeVersions.map((version) => (
                <Select.Option value={version} key={version}>{version}</Select.Option>
              ))}
            </Select>
          </Space>
        </Typography.Title>
        <Typography.Paragraph>
          {t('description.0')}<br />{t('description.1')}
        </Typography.Paragraph>
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
            items={examples
              .filter(example => !example.version || example.version === runtimeVersion)
              .map((item) => ({
                key: item.key,
                label: item.label,
              }))
            }
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
              <Tabs.TabPane tab={t('metadata.base')} key="meta">
                <Descriptions
                  layout="horizontal"
                  size="small"
                  bordered={true}
                  column={1}
                  labelStyle={{ width: '100px', textAlign: 'right' }}
                >
                  <Descriptions.Item label={t('metadata.attributes.name')}>{selectedExample.label}</Descriptions.Item>
                  <Descriptions.Item label={t('metadata.attributes.repository')}>
                    <a target="_blank"
                      href={`https://github.com/M-CreativeLab/${selectedExample.key}`}>
                      M-CreativeLab/{selectedExample.key}</a>
                  </Descriptions.Item>
                  <Descriptions.Item label={t('metadata.attributes.entryUrl')}>{selectedExample.url}</Descriptions.Item>
                </Descriptions>
              </Tabs.TabPane>
              <Tabs.TabPane tab={t('metadata.xsmlCode')} key="code">
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
