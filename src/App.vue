<template>
  <Loading v-if="isLoading">等待....</Loading>
  <router-view :cardColumn="cardColumn"></router-view>
</template>

<script lang="ts">
import { computed, defineComponent, watch, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import './style/globalStyle/font/iconfont';
import Loading from './components/Loading.vue';
import createTooltip from './components/createTooltip';

export default defineComponent({
  name: 'App',
  components: {
    Loading,
  },
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.state.loading);
    const error = computed(() => store.state.error);

    /**
     * 监听error的状态,状态发生改变就执行以下逻辑
     * 如果status状态是true,并且message存在,则调用createTooltip挂载组件
     * (在service.ts 拦截器中每次请求发起时,status都会默认恢复为false;
     *               拦截器每次响应捕获到异常后,status会被设置为false.
     * )
     */
    watch(
      () => error.value.status,
      () => {
        const { status, message } = error.value;
        if (status && message) {
          createTooltip(message, 'error', null);
        }
      },
    );

    /**
     * 实时动态获取浏览器窗口大小,定义主内容区列数
     */
    const cardColumn = ref(3);
    function resize() {
      if (document.documentElement.clientWidth > 1024) {
        cardColumn.value = 3;
      } else if (document.documentElement.clientWidth > 767) {
        cardColumn.value = 2;
      } else if (document.documentElement.clientWidth <= 767) {
        cardColumn.value = 1;
      }
    }
    window.onresize = resize;

    /**
     * 初始化时获取浏览器窗口大小
     */
    onMounted(() => {
      if (document.documentElement.clientWidth > 1024) {
        cardColumn.value = 3;
      } else if (document.documentElement.clientWidth > 767) {
        cardColumn.value = 2;
      } else if (document.documentElement.clientWidth <= 767) {
        cardColumn.value = 1;
      }
    });

    return {
      isLoading,
      error,
      cardColumn,
    };
  },
});
</script>

<style>
@import './style/globalStyle/normalize.css';
@import './style/globalStyle/body.css';
</style>
