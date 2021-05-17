import { install } from '@icon-park/vue-next/lib/all'
import { App } from '@vue/runtime-core'

export default function (app: App) {
  app.use(install, 'i')
}
