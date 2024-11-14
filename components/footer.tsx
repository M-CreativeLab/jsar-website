import { useTranslations } from 'next-intl'
import { CommentOutlined, GithubOutlined, WechatOutlined } from '@ant-design/icons'
import { Divider, Layout, Popover, Space, Tooltip, Typography } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import LocaleCode from 'locale-code'

function getLanguageName(code: string): string {
  if (code.startsWith('zh')) {
    return '简体中文'
  } else {
    return LocaleCode.getLanguageNativeName(code)
  }
}

type FooterProps = {
  alignLeft?: boolean,
  compat?: boolean,
}

export default function Footer(props: FooterProps) {
  const t = useTranslations('PageLayout')
  const router = useRouter()
  const topUnit = props?.compat ? 25 : 50;

  return (
    <Layout.Footer
      style={{
        textAlign: 'center',
        background: '#fff',
        marginTop: `${topUnit}px`,
        paddingTop: `${topUnit}px`,
      }}
    >
      <section
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          boxSizing: 'border-box',
          paddingLeft: props?.alignLeft ? '0' : '20%',
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
              gap: '1rem',
            }}
          >
            <Tooltip title={t('footer.icons.forum')}>
              <a href="https://forum.rokid.com/index" target="_blank" style={{ color: '#333' }}>
                <CommentOutlined />
              </a>
            </Tooltip>
            <Tooltip title={t('footer.icons.discord')}>
              <a href="https://discord.gg/3HRn5VEWcv" target="_blank" style={{ color: '#333' }}>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-discord"></use>
                </svg>
              </a>
            </Tooltip>
            <Tooltip title={t('footer.icons.github')}>
              <a href="https://github.com/M-CreativeLab" target="_blank" style={{ color: '#333' }}>
                <GithubOutlined />
              </a>
            </Tooltip>
            <Popover
              content={
                <Space direction="vertical" align="center">
                  <Image
                    alt="Rokid Support Wechat"
                    src="/rokid-support-wechat-qrcode.png" width={120} height={120}
                  />
                  <p>{t('footer.icons.wechatHelp')}</p>
                </Space>
              }
              trigger="hover"
              placement="right"
            >
              <WechatOutlined style={{ color: '#333' }} />
            </Popover>
          </Space>
        </div>
      </section>
      <Divider />
      <section
        style={{
          textAlign: 'left',
          boxSizing: 'border-box',
          paddingLeft: props?.alignLeft ? '0' : '20%',
          fontSize: 16,
        }}
      >
        <p>Copyright © 2024 <a href="https://github.com/M-CreativeLab">Rokid MCreativeLab</a></p>
      </section>
    </Layout.Footer>
  )
}
