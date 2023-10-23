const axios = require('axios')
const fs = require('fs/promises')
const path = require('path')

const requestOptions = {
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
  },
}

async function getAndSaveDocsVersions(owner, repo) {
  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/branches`, requestOptions)
    const branches = response.data

    for (const branch of branches) {
      const branchName = branch.name
      const match = branchName.match(/^v(\d+\.\d+\.\d+)$/)
      if (match) {
        const version = match[1]
        console.log(`Found version: ${version}`)

        const docsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/docs`, {
          ...requestOptions,
          params: {
            ref: branchName,
          },
        })

        if (Array.isArray(docsResponse.data)) {
          const outputDir = path.join(__dirname, 'docs-versions', version)
          try {
            await fs.rmdir(outputDir, { recursive: true })
          } catch (err) {
            // ignore
            console.warn(`Failed to remove version: ${version}`, err)
          }
          await fs.mkdir(outputDir, { recursive: true })

          for (const item of docsResponse.data) {
            if (item.type === 'file') {
              const fileResponse = await axios.get(item.download_url)
              await fs.writeFile(path.join(outputDir, item.name), fileResponse.data)
            } else if (item.type === 'dir') {
              await handleSubdirectory(owner, repo, item.path, branchName, outputDir)
            }
          }
        }
        console.log(`Saved docs for version ${version}`)
      }
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

async function handleSubdirectory(owner, repo, dirPath, branchName, outputDir) {
  const subdirectoryResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${dirPath}`, {
    ...requestOptions,
    params: {
      ref: branchName,
    },
  })

  return Promise.all(
    subdirectoryResponse.data.map(async item => {
      if (item.type === 'file') {
        let correctedDirPath = dirPath
        // Remove the docs/ prefix from the path.
        correctedDirPath = correctedDirPath.replace(/^docs/, '')
        // Remove the zh-CN to zh.
        correctedDirPath = correctedDirPath.replace(/^\/manual-zh-CN/, '/manual-zh')

        const fileResponse = await axios.get(item.download_url)
        const filePathname = path.join(outputDir, correctedDirPath, item.name)
        console.log(`Saving file: ${filePathname}`, typeof fileResponse.data)
        // make sure the dir exists.
        await fs.mkdir(path.dirname(filePathname), { recursive: true })
        try {
          let fileContents = fileResponse.data
          if (typeof fileContents === 'object') {
            fileContents = JSON.stringify(fileContents, null, 2)
          }
          await fs.writeFile(filePathname, fileContents)
        } catch (err) {
          console.error(`Error saving file: ${filePathname}`, err, fileResponse.data, typeof fileResponse.data)
        }
      }
      else if (item.type === 'dir') {
        await handleSubdirectory(owner, repo, `${dirPath}/${item.name}`, branchName, outputDir)
      }
    })
  )
}

getAndSaveDocsVersions('M-CreativeLab', 'jsar-website')
