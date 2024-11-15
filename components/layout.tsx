import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { CommentOutlined, GithubOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Button, Dropdown, Layout, Space } from 'antd'
import Image from 'next/image'
import { NextRouter, useRouter } from 'next/router'
import Footer from './footer'

function getLocaleHref(router: NextRouter, href: string): string {
  if (router.locale === router.defaultLocale) {
    return href
  } else {
    return `/${router.locale}${href}`
  }
}

export default function RootLayout({
  footer,
  children,
}: {
  footer: boolean,
  children: React.ReactNode
}) {
  const t = useTranslations('PageLayout')
  const router = useRouter()
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
          zIndex: 100,
          width: '100%',
          height: '64px',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          animation: 'fade-in 0.5s',
          filter: isTop ? 'none' : 'drop-shadow(0px 1px 4px #f3f3f3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a href={getLocaleHref(router, '/')}>
            <div className="logo" style={{ marginRight: '2.25rem' }}>
              <Image
                src="logo-jsar.svg"
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
                    <a href="https://marketplace.visualstudio.com/items?itemName=RokidMCreativeLab.vscode-jsar-devtools" target="_blank">
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
                    <a href={getLocaleHref(router, '/manual/latest/introduction')}>
                      <Space style={{ fontSize: '16px' }}>
                        <svg className="icon" aria-hidden="true">
                          <use xlinkHref="#icon-zhinan"></use>
                        </svg>
                        {t('menuSubItems.document.manual')}
                      </Space>
                    </a>
                  )
                }, {
                  key: 'examples',
                  label: (
                    <a href={getLocaleHref(router, '/playground')} target="_blank">
                      <Space style={{ fontSize: '16px' }}>
                        <svg className="icon" aria-hidden="true">
                          <use xlinkHref="#icon-examples"></use>
                        </svg>
                        {t('menuSubItems.document.playground')}
                      </Space>
                    </a>
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
                  key: 'discord',
                  label: (
                    <a href="https://discord.gg/3HRn5VEWcv" target="_blank">
                      <Space style={{ fontSize: '16px' }}>
                        <svg className="icon" aria-hidden="true">
                          <use xlinkHref="#icon-discord"></use>
                        </svg>
                        {t('menuSubItems.community.discord')}
                      </Space>
                    </a>
                  )
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
      </Layout.Header>
      <Layout.Content>
        {children}
      </Layout.Content>
      {footer && <Footer />}
    </Layout>
  )
}
