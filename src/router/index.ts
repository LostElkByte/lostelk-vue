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
  const { user, token } = store.state
  const { requiredLogin, requestNotLogin } = to.meta
  if (!user.isLogin) {
    if (token) {
      store.dispatch('getCurrentUser', user.id).then(() => {
        if (requestNotLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        console.log(e)
        store.commit('logout')
        next('login')
      })
    } else {
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    if (requestNotLogin) {
      next('/')
    } else {
      next()
    }
  }

})

export default router
