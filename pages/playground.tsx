import type { NextPageContext } from 'next'
import dynamic from 'next/dynamic'

export default dynamic(() => import('../components/playground'), {
  ssr: false,
})

export async function getStaticProps(context: NextPageContext) {
  return {
    props: {
      // You can get the messages from anywhere you like. The recommended
      // pattern is to put them in JSON files separated by locale and read
      // the desired one based on the `locale` received from Next.js.
      messages: (await import(`../messages/${context.locale}.json`)).default
    }
  }
}
