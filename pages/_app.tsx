import { ConfigProvider, theme } from 'antd'
import { NextIntlClientProvider } from 'next-intl'
import Layout from '../components/layout'
import 'antd/dist/reset.css'
import '../globals.css'

export function reportWebVitals({ id, name, label, value }: any) {
  let gtag = (window as any)['gtag'] as Function
  if (typeof gtag === 'function') {
    gtag('event', name, {
      event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
      value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
      event_label: id, // id unique to current page load
      non_interaction: true, // avoids affecting bounce rate.
    })
  }
}

export default function App({ Component, pageProps }: any) {
  return (
    <NextIntlClientProvider
      formats={{
        dateTime: {
          short: {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          },
        },
      }}
      messages={pageProps.messages}
      now={pageProps.now}
      timeZone="Asia/Shanghai"
      defaultTranslationValues={{
        code: (children) => <code>{children}</code>
      }}
    >
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            fontSize: 14,
          },
          components: {
            Menu: {
              itemBg: '#fff',
            },
            Layout: {
              colorBgBase: '#fff',
              colorBgHeader: '#fff',
            }
          }
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConfigProvider>
    </NextIntlClientProvider>
  )
}
