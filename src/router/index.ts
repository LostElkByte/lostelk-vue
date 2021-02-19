import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requestNotLogin: true }
  },
  {
    path: '/Reglister',
    name: 'Reglister',
    component: () => import('../views/Register.vue'),
    meta: { requestNotLogin: true }
  },
  {
    path: '/UploadPicture',
    name: 'UploadPicture',
    component: () => import('../views/Upload-picture.vue'),
    meta: { requiredLogin: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    // 需要登录才可以访问的页面 并且 没有登陆
    next({ name: 'Login' })
  } else if (to.meta.requestNotLogin && store.state.user.isLogin) {
    // 需要未登录才可以访问的页面 并且 已经登陆
    next('/')
  } else {
    next()
  }
})

export default router
