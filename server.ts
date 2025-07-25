import fs from 'node:fs/promises'
import express, { type Request, type Response } from 'express'
import type { ViteDevServer } from 'vite'

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = Number(process.env.PORT) || 5179
const base = process.env.BASE || '/'

// Cached production HTML template
const templateHtml: string = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''

// Create Express app
const app = express()

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
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

// Type for server-side rendered result
interface RenderResult {
  html: string
  head?: string
}

// Serve HTML for all routes
app.use('*all', async (req: Request, res: Response) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template: string
    let render: (url: string) => Promise<RenderResult>

    if (!isProduction) {
      // Always read fresh template in dev
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite!.transformIndexHtml(url, template)
      render = (await vite!.ssrLoadModule('/src/entry-server.ts')).render as (url: string) => Promise<RenderResult>
    } else {
      template = templateHtml
      // @ts-ignore
      render = (await import('./dist/server/entry-server.js')).render as (url: string) => Promise<RenderResult>
    }

    const rendered = await render(url)

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html)

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e: any) {
    if (!isProduction && vite) vite.ssrFixStacktrace(e)
    console.error(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
