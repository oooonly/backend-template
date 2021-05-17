import { Context, Next } from 'koa'
import { ViteDevServer } from 'vite'

export default (vite: ViteDevServer) => (ctx: Context, next: Next) => {
  return new Promise<void>((resolve, reject) => {
    vite.middlewares(ctx.req, ctx.res, (err: Error) => (err ? reject(err) : resolve(next())))
  })
}
