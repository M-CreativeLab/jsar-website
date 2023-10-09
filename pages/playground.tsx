import type { NextPageContext } from 'next'
import dynamic from 'next/dynamic'

export default dynamic(() => import('../components/playground'), {
  ssr: false,
})

export async function getStaticProps(context: NextPageContext) {
  return {
    props: {
      messages: (await import(`../messages/${context.locale}`)).default
    }
  }
}
