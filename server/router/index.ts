import fs from 'fs'
import path from 'path'
import Router from '@koa/router'
import { ViteDevServer } from 'vite'

const isProd = process.env.NODE_ENV === 'production'

export default (vite: ViteDevServer) => {
  const router = new Router()
  router.get('/', async ctx => {
    ctx.body = 111
  })

  router.get(/^\/ssr/, async (ctx, next) => {
    const url = ctx.url.slice(4)

    try {
      const manifest = isProd
        ? // @ts-ignore
          require(path.resolve(process.cwd(), 'dist/app/client/ssr-manifest.json'))
        : {}

      let template, render
      if (!isProd) {
        template = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)

        render = (await vite.ssrLoadModule('@/server-side')).render
      } else {
        template = fs.readFileSync(path.resolve(process.cwd(), 'dist/app/client/index.html'), 'utf-8')
        render = require(path.resolve(process.cwd(), 'dist/app/server/server-side.js')).render
      }
      const [appHtml, preloadLinks] = await render(url, manifest)
      const html = template.replace(`<!--preload-links-->`, preloadLinks).replace(`<!--ssr-outlet-->`, appHtml)

      ctx.set({ 'Content-Type': 'text/html' })
      ctx.status = 200
      ctx.body = html
    } catch (e) {
      vite.ssrFixStacktrace(e)
      console.error(e)
      ctx.status = 500
      ctx.body = e.message
    }
  })
  return router
}
