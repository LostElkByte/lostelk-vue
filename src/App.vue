<template>
  <Loading v-if="isLoading">等待....</Loading>
  <router-view :cardColumn="cardColumn" :registeredImg="registeredImg"></router-view>
</template>

<script lang="ts">
import { computed, defineComponent, watch, ref, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import './assets/font/iconfont';
import Loading from './components/globalFun/Loading.vue';
import createTooltip from './components/globalFun/createTooltip';
export default defineComponent({
  name: 'App',
  components: {
    Loading,
  },
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.state.loading);
    const error = computed(() => store.state.error);

    // 获取精选图
    store.dispatch('getVeryGoodsTransverseList', '精选横图');
    store.dispatch('getVeryGoodsLongitudinalList', '精选纵图');

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
          createTooltip(message, 'error', 3000);
        }
      },
    );

    /**
     * 实时动态获取浏览器窗口大小,定义主内容区列数
     */
    const cardColumn = ref();
    const registeredImg = ref();
    function resize() {
      if ((document.documentElement.clientWidth || document.body.clientWidth) > 1024) {
        cardColumn.value = 3;
        registeredImg.value = 'column';
      } else if ((document.documentElement.clientWidth || document.body.clientWidth) > 767) {
        cardColumn.value = 2;
        registeredImg.value = 'row';
      } else if ((document.documentElement.clientWidth || document.body.clientWidth) <= 767) {
        cardColumn.value = 1;
        registeredImg.value = 'row';
      }
    }
    // window.onresize = resize;
    window.addEventListener('resize', resize, false);
    /**
     * 初始化时获取浏览器窗口大小
     */
    onMounted(() => {
      if ((document.documentElement.clientWidth || document.body.clientWidth) > 1024) {
        cardColumn.value = 3;
        registeredImg.value = 'column';
      } else if ((document.documentElement.clientWidth || document.body.clientWidth) > 767) {
        cardColumn.value = 2;
        registeredImg.value = 'row';
      } else if ((document.documentElement.clientWidth || document.body.clientWidth) <= 767) {
        cardColumn.value = 1;
        registeredImg.value = 'row';
      }
    });

    onUnmounted(() => {
      window.removeEventListener('resize', resize, false);
    });

    return {
      isLoading,
      error,
      cardColumn,
      registeredImg,
    };
  },
});
</script>

<style>
@import './style/less/globalStyle/normalize.css';
@import './style/less/globalStyle/body.css';
</style>
