import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { CommentOutlined, GithubOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Button, Divider, Dropdown, Layout, Space } from 'antd'
import Image from 'next/image'
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const t = useTranslations('PageLayout')
  const [isTop, setIsTop] = useState(true)
  function handleScroll() {
    setIsTop(window.scrollY === 0)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
          animation: 'fade-in 0.5s',
          filter: isTop ? 'none' : 'drop-shadow(30px 10px 4px #eeeeee)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a href="/">
            <div className="logo" style={{ marginRight: '2.25rem' }}>
              <Image
                src="logo-jsar.png"
                alt="YodaOS JSAR: The embeddable AR runtime for JavaScript Developers"
                width={50}
                height={50}
              />
            </div>
          </a>
          <Space>
            <Dropdown
              arrow={true}
              placement="bottomLeft"
              menu={{
                items: [{
                  key: 'vscode-extension',
                  label: (
                    <a href="/installer/vscode-jsar-devtools-latest.vsix">
                      <Space style={{ fontSize: '16px' }}>
                        <svg className="icon" aria-hidden="true">
                          <use xlinkHref="#icon-vscode"></use>
                        </svg>
                        {t('menuSubItems.download.vscodeExtension')}
                      </Space>
                    </a>
                  ),
                }, {
                  key: 'jsar-canary',
                  label: (
                    <a href="https://ar.rokidcdn.com/web-assets/pages/jsar-canary/jsar-canary-latest.apk">
                      <Space style={{ fontSize: '16px' }}>
                        <Image
                          src="https://ar.rokidcdn.com/web-assets/pages/jsar-canary/logo.png"
                          alt="YodaOS JSAR: The embeddable AR runtime for JavaScript Developers"
                          width={12}
                          height={12}
                        />
                        {t('menuSubItems.download.JSARCanary')}
                      </Space>
                    </a>
                  ),
                }],
              }}
            >
              <Button shape="round" type="text" size="large">{t('menuNames.download')}</Button>
            </Dropdown>
            <Dropdown
              arrow={true}
              placement="bottomLeft"
              menu={{
                items: [{
                  key: 'manual',
                  label: (
                    <Link href="/manual/latest/introduction">
                      <Space style={{ fontSize: '16px' }}>
                        <svg className="icon" aria-hidden="true">
                          <use xlinkHref="#icon-zhinan"></use>
                        </svg>
                        {t('menuSubItems.document.manual')}
                      </Space>
                    </Link>
                  )
                }, {
                  key: 'apis',
                  label: (
                    <Link href="/manual/latest/api-reference">
                      <Space style={{ fontSize: '16px' }}>
                        <UnorderedListOutlined />
                        {t('menuSubItems.document.apiReference')}
                      </Space>
                    </Link>
                  )
                }, {
                  key: 'publish',
                  label: (
                    <Link href="/manual/latest/delivery">
                      <Space style={{ fontSize: '16px' }}>
                        <svg className="icon" aria-hidden="true">
                          <use xlinkHref="#icon-package"></use>
                        </svg>
                        {t('menuSubItems.document.publish')}
                      </Space>
                    </Link>
                  )
                }, {
                  key: 'examples',
                  label: (
                    <Link href="/playground">
                      <Space style={{ fontSize: '16px' }}>
                        <svg className="icon" aria-hidden="true">
                          <use xlinkHref="#icon-examples"></use>
                        </svg>
                        {t('menuSubItems.document.playground')}
                      </Space>
                    </Link>
                  )
                }],
              }}
            >
              <Button shape="round" type="text" size="large">{t('menuNames.document')}</Button>
            </Dropdown>
            <Dropdown
              arrow={true}
              placement="bottomLeft"
              menu={{
                items: [{
                  key: 'rokid-forum',
                  label: (
                    <a href="https://forum.rokid.com/index" target="_blank">
                      <Space style={{ fontSize: '16px' }}>
                        <CommentOutlined />
                        {t('menuSubItems.community.forum')}
                      </Space>
                    </a>
                  ),
                }, {
                  key: 'github',
                  label: (
                    <a href="https://github.com/M-CreativeLab/jsar-website/discussions" target="_blank">
                      <Space style={{ fontSize: '16px' }}>
                        <GithubOutlined />
                        {t('menuSubItems.community.githubDiscussion')}
                      </Space>
                    </a>
                  ),
                }]
              }}
            >
              <Button shape="round" type="text" size="large">{t('menuNames.community')}</Button>
            </Dropdown>
          </Space>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          By&nbsp;&nbsp;<Image
            src="logo-rokid-ar-platform.png"
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
