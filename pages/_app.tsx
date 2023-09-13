import { ConfigProvider, theme } from 'antd'
import Layout from '../components/layout'
import 'antd/dist/reset.css'
import '../globals.css'

export default function App({ Component, pageProps }: any) {
  return (
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
  )
}
