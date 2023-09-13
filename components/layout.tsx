import { CommentOutlined, GithubOutlined } from '@ant-design/icons'
import { Button, Divider, Dropdown, Layout, Menu, Space } from 'antd'
import Image from 'next/image'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout>
      <Layout.Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="logo" style={{ marginRight: '2.25rem' }}>
            <Image
              src="/logo-jsar.png"
              alt="YodaOS JSAR: The embeddable AR runtime for JavaScript Developers"
              width={50}
              height={50}
            />
          </div>
          <Space>
            <Dropdown
              arrow={true}
              placement="bottomLeft"
              menu={{
                items: [{
                  key: 'vscode-extension',
                  label: 'VSCode 插件',
                }],
              }}
            >
              <Button shape="round" type="text" size="large">下载</Button>
            </Dropdown>
            <Dropdown
              arrow={true}
              placement="bottomLeft"
              menu={{
                items: [{
                  key: 'manual',
                  label: '上手指南',
                }, {
                  key: 'apis',
                  label: '接口文档',
                }, {
                  key: 'publish',
                  label: '发布到 RAP',
                }, {
                  key: 'examples',
                  label: '示例组件',
                }],
              }}
            >
              <Button shape="round" type="text" size="large">文档</Button>
            </Dropdown>
            <Dropdown
              arrow={true}
              placement="bottomLeft"
              menu={{
                items: [{
                  key: 'rokid-forum',
                  label: (
                    <a href="#" target="_blank">
                      <Space>
                        <CommentOutlined />
                        开发者论坛
                      </Space>
                    </a>
                  ),
                }, {
                  key: 'github',
                  label: (
                    <a href="https://github.com/M-CreativeLab/jsar-website" target="_blank">
                      <Space>
                        <GithubOutlined />
                        GitHub
                      </Space>
                    </a>
                  ),
                }]
              }}
            >
              <Button shape="round" type="text" size="large">社区</Button>
            </Dropdown>
          </Space>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          By&nbsp;&nbsp;<Image
            src="/logo-rokid-ar-platform.png"
            alt="Rokid AR Platform"
            width={208}
            height={21}
          />
        </div>
      </Layout.Header>
      <Layout.Content>
        {children}
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        <Divider />
        Rokid ©2023 Created by <a href="https://github.com/M-CreativeLab">Rokid MCreativeLab</a>
      </Layout.Footer>
    </Layout>
  )
}
