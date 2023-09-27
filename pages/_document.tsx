import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs'
import Document, { Html, Head, Main, NextScript, type DocumentContext } from 'next/document'

function SiteDocument() {
  let externalScript = null
  if (process.env['GTAG']) {
    externalScript = (
      <>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env['GTAG']}`}></script>
        <script>{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', '${process.env['GTAG']}');
        `}</script>
      </>
    )
  }

  return (
    <Html lang="en">
      <Head>
        <title>YodaOS JSAR: The embeddable AR runtime for JavaScript Developers</title>
        <base href="/" />
        <link rel="icon" href="logo-jsar.png" />
        <script src="/js/iconfonts.js"></script>
        <style type="text/css">{`
          .icon {
            width: 1em;
            height: 1em;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
          }
        `}
        </style>
      </Head>
      <body>
        <Main />
        <NextScript />
        {externalScript}
      </body>
    </Html>
  )
}

SiteDocument.getInitialProps = async (ctx: DocumentContext) => {
  const cache = createCache();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => (
        <StyleProvider cache={cache}>
          <App {...props} />
        </StyleProvider>
      ),
    });

  const initialProps = await Document.getInitialProps(ctx) as any;
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  };
}

export default SiteDocument
