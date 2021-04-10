import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import CardDetails from '../views/Card-details.vue'
import store from '../store'
import axios from 'axios'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'card/:id',
        name: 'CardDetails',
        component: CardDetails,
        props: true
      }
    ]
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
  /**
   * 1. 如果 user.isLogin为false 进入 1.1逻辑  如果 user.isLogin为true 进入 1.2逻辑
   * 1.1 user.isLogin为false 则判断token 是否存在 ,
   *     如果token存在则 添加token至Authorization中,
   *     并且获取用户信息,获取成功后进行已登陆状态路由权限管理
   *     如果获取用户信息失败, 则执行退出登陆操作, 并且跳转登录页
   *      
   *     如果token不存在, 进行未登录状态路由管理
   * 2.2 user.isLogin为true 进行已登陆状态路由权限管理
   */
  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
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
