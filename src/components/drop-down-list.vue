<template>
  <div class="header_toolbar_item header_toolbar_item_size-24">
    <div class="dropdown" @click.prevent="switchOpen">
      <slot name="dropdown">下拉按钮</slot>
      <div class="dropdown-content" style="display: block" v-if="isOpen">
        <slot name="dropdown-content">
          <a href="#">菜单内容 1</a>
          <a href="#">菜单内容 2</a>
          <a href="#">菜单内容 3</a>
        </slot>
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
