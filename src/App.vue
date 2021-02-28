<template>
  <Loading v-if="isLoading">等待....</Loading>
  <router-view></router-view>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import './style/globalStyle/font/iconfont';
import Loading from './components/Loading.vue';

export default defineComponent({
  name: 'App',
  components: {
    Loading,
  },
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.state.loading);
    return {
      isLoading,
    };
  },
});
</script>

<style>
@import './style/globalStyle/normalize.css';
@import './style/globalStyle/body.css';
</style>
