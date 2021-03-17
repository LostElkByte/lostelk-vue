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
import store from '../store';
export default defineComponent({
  setup() {
    /**
     * 重新加载全部照片
     */
    const goBack = () => {
      store.dispatch('getCardList').then(() => {
        store.commit('setSearchFailure', false);
      });
    };

    return {
      goBack,
    };
  },
});
</script>

<style>
.search-failure {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.search-failure-icon {
  display: flex;
  justify-content: center;
  margin-top: 80px;
}

.search-failure p {
  display: flex;
  justify-content: center;
  font-size: 14px;
}
.search-failure button {
  display: block;
  width: 144px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  position: relative;
  margin: 20px auto;
  background: rgb(10, 10, 10);
  border-radius: 23px;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
  border: 0;
  outline: none;
}

@media (max-width: 550px) {
  .search-failure p {
    font-size: 12px;
    color: #333;
  }
}
</style>
