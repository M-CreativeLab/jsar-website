import nextMdx from '@next/mdx'
import remarkGfm from 'remark-gfm'

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      [
        remarkGfm,
        {
          tableCellPadding: true,
          singleTilde: true,
        }
      ]
    ],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'prod' ? 'export' : 'standalone',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  i18n: {
    locales: [
      'en-US',
      'zh-CN',
      'zh-TW',
      'ja-JP',
    ],
    defaultLocale: 'zh-CN'
  }
}

export default withMDX(nextConfig)
