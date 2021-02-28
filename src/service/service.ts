import axios from 'axios'
import store from '../store'



// 默认url头
axios.defaults.baseURL = 'https://ovoiii.com';

// 拦截器 
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  return config;
});

axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config;
});

export { axios }