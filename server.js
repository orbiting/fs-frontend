const express = require('express')
const next = require('next')
const { join } = require('path')
const { parse: parseMd } = require('@orbiting/remark-preset')
const { parse: parseUrl } = require('url')

const fs = require('fs')
const path = require('path')
const mime = require('mime-types')

const homedir = require('os').homedir()
const port = +process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'

if (dev || process.env.DOTENV) {
  require('dotenv').config()
}

const app = next({ dev })
const handle = app.getRequestHandler()

const BASE_PATH = (process.env.BASE_PATH || '~/Articles').replace(/^~/, homedir)

app.prepare().then(() => {
  const server = express()

  server.get('/mdast/:repo', (req, res) => {
    const md = fs.readFileSync(path.join(
      BASE_PATH, req.params.repo, 'article.md'
    ), 'utf8')
    res.json(parseMd(md))
  })

  server.get('/images/:image', (req, res) => {
    if (!req.headers.referer) {
      res.status(404).send('no referer')
      return
    }
    const { query: { repo }} = parseUrl(req.headers.referer, true)
    if (!repo) {
      res.status(404).send('no repo in referer')
      return
    }
    const { image } = req.params

    const filePath = path.join(
      BASE_PATH, repo, 'images', image
    )

    if (fs.existsSync(filePath)) {
      res.setHeader('content-type', mime.lookup(image))
      fs.createReadStream(filePath).pipe(res)
    } else {
      res.status(404).send(`${image} not found in ${repo}`)
    }
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Listening on ${port}`)
  })
})
