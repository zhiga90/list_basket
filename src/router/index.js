import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/catalog',
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: () => import('../views/CatalogView.vue'),
    meta: {
      title: 'Catalog',
    },
  },
  {
    path: '/basket',
    name: 'basket',
    component: () => import('../views/BasketView.vue'),
    meta: {
      title: 'Basket',
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const { title } = to.meta
  document.title = title || ''
  next()
})

export default router
