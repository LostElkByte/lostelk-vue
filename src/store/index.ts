import { axios } from '../service/service'
import { createStore } from 'vuex'
// import { testData } from '../testData'
export default createStore({
  state: {
    errorMessage: '',
    columns: [],
    user: { isLogin: true, name: '迷路', userId: 1 }
  },
  mutations: {

    login(state) {
      state.user = { ...state.user, isLogin: true }
    },
    // UploadPicture(state, newPicture) {
    //   state.columns.push(newPicture)
    // },
    acquireColumns(state, rawdata) {
      state.columns = rawdata
    }
  },
  getters: {

  },
  actions: {
    async acquireColumns(context, state) {
      try {
        const columnsData = await axios.get('/posts')
        context.commit('acquireColumns', columnsData.data)
        console.log(columnsData)

      } catch (error) {
        state.errorMessage = error.message
      }
    }
  },
  modules: {
  }
})
