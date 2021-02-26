<template>
  <router-view></router-view>
</template>

<script lang="ts">
import axios from 'axios';
import { computed, defineComponent, onMounted } from 'vue';
import store from './store';
import './style/globalStyle/font/iconfont';

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const curretUser = computed(() => store.state.user);
    const token = computed(() => store.state.token);
    onMounted(() => {
      if (!curretUser.value.isLogin && token.value) {
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`;
        store.dispatch('getCurrentUser', curretUser.value.id);
      }
    });
    return {};
  },
});
</script>

<style>
@import './style/globalStyle/normalize.css';
@import './style/globalStyle/body.css';
</style>
