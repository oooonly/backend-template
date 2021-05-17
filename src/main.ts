import { createSSRApp } from 'vue'
import App from './App.vue'
import createRouter from './router'
import createI18n from './i18n'
import plugins from './plugins'

import ElementPlus from 'element-plus'
import './styles/variable.scss'
import 'element-plus/lib/theme-chalk/index.css'

// createApp(App).use(ElementPlus).use(router).use(i18n).use(plugins).mount('#app')

export default () => {
  const app = createSSRApp(App)
  const router = createRouter()
  const i18n = createI18n()
  app.use(router).use(i18n).use(ElementPlus).use(plugins)
  return {
    app,
    router
  }
}
