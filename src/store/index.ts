import { createStore } from 'vuex'
import { testData } from '../testData'
export default createStore({
  state: {
    columns: testData,
    user: { isLogin: false }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true }
    }
  },
  getters: {

  },
  actions: {
  },
  modules: {
  }
})
