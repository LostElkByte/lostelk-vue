<template>
  <div class="header_toolbar_item header_toolbar_item_size-24">
    <div class="dropdown" @click.prevent="switchOpen">
      <slot>下拉按钮</slot>
      <div class="dropdown-content" style="display: block" v-if="isOpen">
        <a href="#">个人主页</a>
        <a href="#">发表作品</a>
        <a href="#">退出登录</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'dropDownList',
  props: {},
  setup() {
    const isOpen = ref(false);
    const switchOpen = () => {
      isOpen.value = !isOpen.value;
    };
    return {
      isOpen,
      switchOpen,
    };
  },
});
</script>

<style>
@import './style/drop-down-list.css';
</style>
