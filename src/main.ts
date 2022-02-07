import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import dayjs from 'dayjs'


const app = createApp(App)
app.use(store).use(router).mount('#app')

app.config.globalProperties.dayjs = dayjs


router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})
