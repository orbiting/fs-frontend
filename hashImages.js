// https://github.com/orbiting/backends/blob/bd65cfab34ef9ae939c26db3f9934df122b704c0/servers/publikator/lib/git.js#L1-L14

const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const getGitHash = buffer => {
  return crypto
    .createHash('sha1')
    .update('blob ')
    .update(buffer.length.toString())
    .update('\0')
    .update(buffer)
    .digest('hex')
}

const args = process.argv.slice(2)
const dir = args[0]
const files = fs.readdirSync(dir)

// node hashImages ~/Articles/article-x/images

files
  .filter(file => file.match(/\.(jpeg|jpg|gif|png)/i))
  .forEach(file => {
    const filePath = path.join(dir, file)

    const buffer = fs.readFileSync(filePath)

    const newFilePath = path.join(dir, `${getGitHash(buffer)}${path.extname(filePath).toLowerCase()}`)

    console.log(filePath, newFilePath)

    fs.renameSync(filePath, newFilePath)
  })
