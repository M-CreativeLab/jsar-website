import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { CommentOutlined, GithubOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Button, Divider, Dropdown, Layout, Space, Typography } from 'antd'
import Image from 'next/image'
import { NextRouter, useRouter } from 'next/router'
import LocaleCode from 'locale-code'

function getLanguageName(code: string): string {
  if (code === 'zh-CN') {
    return '简体中文'
  } else if (code === 'zh-TW') {
    return '繁体中文'
  } else {
    return LocaleCode.getLanguageNativeName(code)
  }
}

function getLocaleHref(router: NextRouter, href: string): string {
  if (router.locale === router.defaultLocale) {
    return href
  } else {
    return `/${router.locale}${href}`
  }
}

export default function RootLayout({
  children,
}: {
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
          <a href={getLocaleHref(router, '/')}>
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
                  key: 'apis',
                  label: (
                    <a href={getLocaleHref(router, '/manual/latest/api-reference')}>
                      <Space style={{ fontSize: '16px' }}>
                        <UnorderedListOutlined />
                        {t('menuSubItems.document.apiReference')}
                      </Space>
                    </a>
                  )
                }, {
                  key: 'publish',
                  label: (
                    <a href={getLocaleHref(router, '/manual/latest/delivery')}>
                      <Space style={{ fontSize: '16px' }}>
                        <svg className="icon" aria-hidden="true">
                          <use xlinkHref="#icon-package"></use>
                        </svg>
                        {t('menuSubItems.document.publish')}
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
      <Layout.Footer
        style={{
          textAlign: 'center',
          background: '#fff',
          marginTop: '50px',
          paddingTop: '50px',
        }}
      >
        <section
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            boxSizing: 'border-box',
            paddingLeft: '20%',
            gap: '2rem',
            fontSize: '16px',
          }}
        >
          <div style={{ textAlign: 'left', width: '20vw' }}>
            <Typography.Title level={4}>{t('footer.languages')}</Typography.Title>
            <Space size={18}>
              {router.locales?.map((locale) => (
                <a href={`/${locale}`} key={locale}>
                  {getLanguageName(locale)}
                </a>
              ))}
            </Space>
          </div>
          <div style={{ textAlign: 'left' }}>
            <Typography.Title level={4}>{t('footer.community')}</Typography.Title>
            <Space
              style={{
                color: '#fff',
                fontSize: 20,
              }}
            >
              <a href="https://github.com/M-CreativeLab" target="_blank" style={{ color: '#333' }}>
                <GithubOutlined />
              </a>
              <a href="https://forum.rokid.com/index" target="_blank" style={{ color: '#333' }}>
                <CommentOutlined />
              </a>
            </Space>
          </div>
        </section>
        <Divider />
        <section
          style={{
            textAlign: 'left',
            boxSizing: 'border-box',
            paddingLeft: '20%',
            fontSize: 16,
          }}
        >
          <p>Copyright © 2023 <a href="https://github.com/M-CreativeLab">Rokid MCreativeLab</a></p>
        </section>
      </Layout.Footer>
    </Layout>
  )
}
