<template>
  <Tooltip type="error" :message="error.message" v-if="tooltipShow"></Tooltip>
  <Loading v-if="isLoading">等待....</Loading>
  <router-view></router-view>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';
import './style/globalStyle/font/iconfont';
import Loading from './components/Loading.vue';
import Tooltip from './components/Tooltip.vue';

export default defineComponent({
  name: 'App',
  components: {
    Loading,
    Tooltip,
  },
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.state.loading);
    const error = computed(() => store.state.error);
    const tooltipShow = ref(false);

    watch(
      () => error.value.status,
      () => {
        const { status, message } = error.value;
        if (status && message) {
          tooltipShow.value = true;
        } else {
          tooltipShow.value = false;
        }
      },
    );

    return {
      isLoading,
      error,
      tooltipShow,
    };
  },
});
</script>

<style>
@import './style/globalStyle/normalize.css';
@import './style/globalStyle/body.css';
</style>
