import { axios } from '../service/service'
import { createStore } from 'vuex'

export default createStore({
  state: {
    errorMessage: '',
    cardList: [],
    user: { isLogin: false, id: localStorage.getItem('id') || '' },
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    /**
     * 登陆
     */
    login(state, rawData) {
      state.token = rawData.token
      localStorage.setItem('token', rawData.token)
      localStorage.setItem('id', rawData.id)
      axios.defaults.headers.common.Authorization = `Bearer ${rawData.token}`
    },
    /**
     * 退出登陆
     */
    logout(state) {
      state.token = ''
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      delete axios.defaults.headers.common.Authorization
      state.user = {
        isLogin: false,
        id: ''
      }
    },
    /**
     * 获取当前用户信息
     */
    getCurrentUser(state, rawData) {
      state.user = {
        isLogin: true,
        ...rawData.data
      }
    },
    /**
     * 获得卡片列表
     */
    getCardList(state, rawdata) {
      state.cardList = rawdata
    },
  },
  getters: {

  },
  actions: {
    /**
    * 获得卡片列表
    */
    async getCardList(context, state) {
      try {
        const CardListData = await axios.get('/posts')
        context.commit('getCardList', CardListData.data)
      } catch (error) {
        state.errorMessage = error.message
      }
    },
    /**
     * 登陆
     */
    async login(context, userLoginData) {
      try {
        const loginData = await axios.post('/login', userLoginData)
        context.commit('login', loginData.data)
        return loginData
      } catch (error) {
        console.log(error.response.data.message)
      }
    },

    /**
    * 获取当前用户信息
    */
    async getCurrentUser(context, currentUserId) {
      try {
        const currentUserData = await axios.get(`/users/${currentUserId}`)
        context.commit('getCurrentUser', currentUserData)
        return currentUserData
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    /**
     * 登陆 + 获取当前用户信息的组合
     */
    loginAndGetCurrentUser(context, userLoginData) {
      return context.dispatch('login', userLoginData).then(data => {
        if (data) {
          return context.dispatch('getCurrentUser', data.data.id)
        }
      })
    }
  },
  modules: {
  }
})
