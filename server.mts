import fs from 'node:fs/promises'
import express, { Request, Response } from 'express'
import type { ViteDevServer } from 'vite'

const isProduction = process.env.NODE_ENV === 'production'
const port = Number(process.env.PORT) || 5173
const base = process.env.BASE || '/'

// Create HTTP server
const app = express()

let templateHtml: string = ''
let vite: ViteDevServer | undefined

if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default

  templateHtml = await fs.readFile('./dist/client/index.html', 'utf-8')

  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

app.use('*', async (req: Request, res: Response) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template: string
    let render: (url: string) => Promise<{ html: string; head?: string }>

    if (!isProduction && vite) {
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      const mod = await vite.ssrLoadModule('/src/entry-server.ts')
      render = mod.render
    } else {
      template = templateHtml
      const mod = await import('./dist/server/entry-server.js')
      render = mod.render as unknown as typeof render
    }

    const { html, head } = await render(url)

    const finalHtml = template
      .replace(`<!--app-head-->`, head ?? '')
      .replace(`<!--app-html-->`, html)

    res.status(200).set({ 'Content-Type': 'text/html' }).send(finalHtml)
  } catch (e: any) {
    if (!isProduction && vite) vite.ssrFixStacktrace(e)
    console.error(e.stack)
    res.status(500).end(e.stack)
  }
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
