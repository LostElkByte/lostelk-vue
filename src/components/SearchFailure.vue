<template>
  <div class="search-failure">
    <div class="search-failure-icon">
      <svg class="icon icon-size-fill" aria-hidden="true">
        <use xlink:href="#icon-ku"></use>
      </svg>
    </div>
    <p>没有找到想要的图片？点击切换至“全部图片”</p>
    <button @click="goBack">全部图片</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import router from '../router';
import store from '../store';
export default defineComponent({
  setup() {
    /**
     * 重新加载全部照片
     */
    const goBack = () => {
      router.push('/');
      store.commit('setSearchFailure', false);
    };

    return {
      goBack,
    };
  },
});
</script>

<style>
@import '../style/less/componentsStyle/search-failure.css';
</style>
