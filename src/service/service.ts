import axios from 'axios'
import store from '../store'
import { io } from 'socket.io-client'


// 默认url头
axios.defaults.baseURL = 'http://192.168.43.202:3000';

// 拦截器 
axios.interceptors.request.use(config => {
  if (store.state.isShowLoading) {
    store.commit('setLoading', true)
  } else {
    store.commit('setIsShowLoading', true);
  }
  store.commit('setError', { status: false, message: '' })
  return config;
});

axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config;
}, error => {
  // 响应错误全局设置
  const { message } = error.response.data
  store.commit('setError', { status: true, message: message })
  store.commit('setLoading', false)
  return Promise.reject(message)
}
);

/**
 * Socket
 */
const socket = io('http://192.168.43.202:3000')
export { axios, socket }
