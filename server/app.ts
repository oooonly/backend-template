import Koa from 'koa'
import createRouter from './router'
import { createServer as createViteServer } from 'vite'
import viteMiddleware from './middleware/vite'
import path from 'path'
import chalk from 'chalk'

async function createServer() {
  const vite = await createViteServer({
    root: path.resolve(__dirname, '../'),
    server: {
      middlewareMode: true
    }
  })
  const router = createRouter(vite)
  const server: Koa = new Koa()
  server.use(router.routes()).use(router.allowedMethods()).use(viteMiddleware(vite))

  server.listen(9000, () => console.log('Server is running at ', chalk.green('http://localhost:9000')))
}

createServer()
