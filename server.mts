import * as fs from 'node:fs/promises'
import { type Request, type Response } from 'express'
import express from 'express'
import type { ViteDevServer } from 'vite'

const isProduction = process.env.NODE_ENV === 'production'
const port = Number(process.env.PORT) || 5179
const base = process.env.BASE || '/'

const app = express()

  ; (async () => {
    let vite: ViteDevServer | undefined
    let templateHtml = ''
    let render: (url: string) => Promise<{ html: string; head?: string }>

    if (!isProduction) {
      const { createServer } = await import('vite')
      vite = await createServer({
        server: { middlewareMode: true },
        appType: 'custom',
        base,
      })
      app.use(vite.middlewares)
    } else {
      const compression = (await import('compression')) as any
      const sirv = (await import('sirv')) as any

      templateHtml = await fs.readFile('./dist/client/index.html', 'utf-8')

      app.use(compression())
      app.use(base, sirv('dist/client', { extensions: [] }))
    }

    app.use('*', async (req: Request, res: Response) => {
      try {
        const url = req.originalUrl.replace(base, '')

        let template: string

        if (!isProduction && vite) {
          template = await fs.readFile('./index.html', 'utf-8')
          template = await vite.transformIndexHtml(url, template)
          const entry = await vite.ssrLoadModule('/src/entry-server.ts')
          render = entry.render
        } else {
          // @ts-ignore
          const entry = await import('./dist/server/entry-server.js')
          render = entry.render as unknown as (url: string) => Promise<{ html: string; head?: string }>
          template = templateHtml
        }

        const { html, head } = await render(url)

        const finalHtml = template
          .replace('<!--app-head-->', head ?? '')
          .replace('<!--app-html-->', html)

        res.status(200).set({ 'Content-Type': 'text/html' }).send(finalHtml)
      } catch (err: any) {
        if (!isProduction && vite) vite.ssrFixStacktrace(err)
        console.error(err.stack)
        res.status(500).end(err.stack)
      }
    })

    app.use('*', async (req, res) => {
      const html = await fs.readFile('./dist/client/index.html', 'utf-8');
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    });


    app.listen(port, () => {
      console.log(`➜  Server running at http://localhost:${port}`)
    })
  })()
