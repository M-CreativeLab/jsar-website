import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
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
      </body>
    </Html>
  )
}