import { createStore } from 'vuex'
import { testData } from '../testData'
export default createStore({
  state: {
    columns: testData,
    user: { isLogin: true, name: '迷路', userId: 1 }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true }
    },
    UploadPicture(state, newPicture) {
      state.columns.push(newPicture)
    }
  },
  getters: {

  },
  actions: {
  },
  modules: {
  }
})
