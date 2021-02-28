<template>
  <h1 v-if="isLoading">等待....</h1>
  <router-view></router-view>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import './style/globalStyle/font/iconfont';

export default defineComponent({
  name: 'App',
  components: {},
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
