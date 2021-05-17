import fs from 'fs'
import path from 'path'
import Router from '@koa/router'
import { ViteDevServer } from 'vite'

export default (vite: ViteDevServer) => {
  const router = new Router()
  router.get('/', async ctx => {
    ctx.body = 111
  })

  router.get('/ssr', async (ctx, next) => {
    const url = ctx.url.slice(4)

    try {
      let template = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)

      const { render } = await vite.ssrLoadModule('@/server-side')
      const [appHtml] = await render(url, {})
      console.log(appHtml)
      const html = template.replace(`<!--ssr-outlet-->`, appHtml)

      ctx.status = 200
      ctx.set({ 'Content-Type': 'text/html' })
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
