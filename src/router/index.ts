import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

export default () =>
  createRouter({
    history: import.meta.env.SSR ? createMemoryHistory('/ssr') : createWebHistory('/ssr'),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/hello',
        name: 'HelloWorld',
        component: () => import('@/views/HelloWorld.vue')
      }
    ]
  })
