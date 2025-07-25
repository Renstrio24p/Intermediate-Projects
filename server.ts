import type { Request, Response } from 'express'
import express from 'express'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import fs from 'node:fs/promises'

const isProd = process.env.NODE_ENV === 'production'
const base = process.env.BASE || '/'
const app = express()

export default async function handler(req: Request, res: Response) {
  let vite: ViteDevServer | undefined
  let templateHtml = ''

  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base,
    })
    app.use(vite.middlewares)
    templateHtml = await fs.readFile('./index.html', 'utf-8')
  } else {
    templateHtml = await fs.readFile('./dist/client/index.html', 'utf-8')
    app.use(base, express.static('./dist/client'))
  }

  const url = req.originalUrl.replace(base, '')
  const template = isProd ? templateHtml : await vite!.transformIndexHtml(url, templateHtml)
  const render = isProd
    // @ts-ignore
    ? (await import('./dist/server/entry-server.js')).render
    : (await vite!.ssrLoadModule('/src/entry-server.ts')).render

  const { html, head } = await render(url)

  const finalHtml = template
    .replace('<!--app-head-->', head ?? '')
    .replace('<!--app-html-->', html)

  res.status(200).setHeader('Content-Type', 'text/html').end(finalHtml)
}
