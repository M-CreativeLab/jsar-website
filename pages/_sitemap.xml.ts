
import fs from 'fs/promises'
import path from 'path'
import tocOfManual from '../docs/manual/toc.json'

const ROOT_URL = 'https://jsar.netlify.app/'

function generateSiteMap(docs) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${ROOT_URL}</loc>
     </url>
     ${docs
      .map(({ id }) => {
        return `
       <url>
           <loc>${`${new URL(id, ROOT_URL).href}`}</loc>
       </url>
     `;
      })
      .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}


async function getVersions() {
  return (await fs.readdir(`./docs-versions`)).filter(filename => filename !== '.gitkeep')
}

async function readJson(path: string) {
  return JSON.parse(
    await fs.readFile(path, 'utf8')
  )
}

type TocItem = {
  key: string
  title: string
  children?: TocItem[]
}

function getPathsFromMenu(toc: TocItem[], parentKey: string | null): string[] {
  return toc.reduce((paths: string[], item: TocItem) => {
    let currentPath: string = parentKey == null ? item.key : `${parentKey}/${item.key}`
    paths.push(currentPath)
    if (item.children) {
      paths = paths.concat(getPathsFromMenu(item.children, currentPath))
    }
    return paths
  }, [])
}

export async function getServerSideProps({ res }) {
  let paths = [] as string[]
  const versions = await getVersions()
  const locals = ['zh', 'en-us']

  for (let versionStr of ['latest'].concat(versions)) {
    const isLatest = versionStr === 'latest'
    const toc = isLatest ? tocOfManual : await readJson(`./docs-versions/${versionStr}/manual/toc.json`)
    const documentPaths = getPathsFromMenu(toc, null)
    paths = paths.concat(documentPaths.map(p => `/manual/${versionStr}/${p}`))
    locals.forEach((locale) => {
      paths = paths.concat(documentPaths.map(p => `/${locale}/manual/${versionStr}/${p}`))
    })
  }

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(paths.map((id) => ({ id })));

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
