import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
import axios from 'axios'

/**
 * 以下的参数:id 均为文章卡片的ID
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: "LostElk-发现世界上免费的高清图片和创意-Discover the world’s free HD pictures & Creatives.-免费版权商用图片素材" },
    children: [
      {
        path: 'card/:id',
        name: 'HomeCardDetails',
        component: () => import('../views/details/HomeCardDetails.vue'),
        props: true,
        meta: { title: "Is this the photos you like? | LostElk" }
      }
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requestNotLogin: true, title: "Sign Up | LostElk" }

  },
  {
    path: '/Reglister',
    name: 'Reglister',
    component: () => import('../views/Register.vue'),
    meta: { requestNotLogin: true, title: "Sign In | LostElk" }
  },
  {
    path: '/Clause',
    name: 'Clause',
    component: () => import('../views/Clause.vue'),
    meta: { title: "Clause | LostElk" }
  },
  {
    path: '/Privacy',
    name: 'Privacy',
    component: () => import('../views/Privacy.vue'),
    meta: { title: "Privacy | LostElk" }
  },
  {
    path: '/UploadPicture',
    name: 'UploadPicture',
    component: () => import('../views/UploadPicture.vue'),
    meta: { requiredLogin: true, title: "Upload Photos | LostElk" }
  },
  {
    path: '/EditCard/:id',
    name: 'EditCard',
    component: () => import('../views/EditCard.vue'),
    props: true,
    meta: { requiredLogin: true, title: "Edit Photos| LostElk" }
  },
  {
    path: '/tag/:tag',
    name: 'Tag',
    component: () => import('../views/Tag.vue'),
    props: true,
    meta: { title: "LostElk-发现世界上免费的高清图片和创意-Discover the world’s free HD pictures & Creatives.-免费版权商用图片素材" },
    children: [
      {
        path: '/tag/:tag/tagCard/:id',
        name: 'TagCardDetails',
        component: () => import('../views/details/TagCardDetails.vue'),
        props: true,
        meta: { title: "Is this the photos you like? | LostElk" }
      }
    ]
  },
  {
    path: '/@:UserId',
    name: 'UserHomePage',
    component: () => import('../views/UserHomePage.vue'),
    props: true,
    meta: { title: "Visit the home page | LostElk" },
    children: [
      {
        path: '',
        name: 'UserPhotosCardDetails',
        component: () => import('../views/cardList/UserPhotosCardList.vue'),
        props: true,
        meta: { title: "User contributed photos | LostElk" },
        children: [
          {
            path: '/@:UserId/:id',
            name: 'UserPhotosCardDetails',
            component: () => import('../views/details/UserPhotosCardDetails.vue'),
            props: true,
            meta: { title: "Do you like this picture？ | LostElk" },
          },
        ]
      },
      {
        path: '/@:UserId/likes',
        name: 'UserLikeCardList',
        component: () => import('../views/cardList/UserLikeCardList.vue'),
        props: true,
        meta: { title: "Favorite photos | LostElk" },
        children: [
          {
            path: '/@:UserId/likes/:id',
            name: 'UserLikeCardDetails',
            component: () => import('../views/details/UserLikeCardDetails.vue'),
            props: true,
            meta: { title: "Do you like this picture？ | LostElk" },
          }
        ]
      },
      {
        path: '/@:UserId/Account',
        name: 'EditAccount',
        component: () => import('../views/EditAccount.vue'),
        props: true,
        meta: { requiredLogin: true, title: "Management accounts-LostElk" }
      }
    ],
  },
  {
    path: `/RegisterActivation`,
    name: 'RegisterActivation',
    component: () => import('../views/RegisterActivation.vue'),
    meta: { requiredLogin: false, title: "Register Activation | LostElk" }
  },
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
        next('/login')
      })
    } else {
      if (requiredLogin) {
        next('/login')
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
