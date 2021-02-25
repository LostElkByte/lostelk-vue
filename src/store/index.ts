import { axios } from '../service/service'
import { createStore } from 'vuex'
// import { testData } from '../testData'
export default createStore({
  state: {
    errorMessage: '',
    cardList: [],
    user: { isLogin: false, name: '迷路', userId: 1 }
  },
  mutations: {
    /**
     * 登陆
     */
    login(state) {
      state.user = { ...state.user, isLogin: true }
    },
    /**
     * 获得卡片列表
     */
    acquireCardList(state, rawdata) {
      state.cardList = rawdata
    },
    // UploadPicture(state, newPicture) {
    //   state.columns.push(newPicture)
    // },
  },
  getters: {

  },
  actions: {
    /**
    * 获得卡片列表
    */
    async acquireCardList(context, state) {
      try {
        const CardListData = await axios.get('/posts')
        context.commit('acquireCardList', CardListData.data)
      } catch (error) {
        state.errorMessage = error.message
      }
    },
  },
  modules: {
  }
})
