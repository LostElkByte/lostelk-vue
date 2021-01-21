<template>
  <div class="header_toolbar_item header_toolbar_item_size-24">
    <div class="dropdown" @click="switchOpen" ref="dropdownRef">
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
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';

export default defineComponent({
  name: 'DropDownList',
  props: {},
  setup() {
    const isOpen = ref(false);
    const dropdownRef = ref<null | HTMLElement>(null);
    const switchOpen = () => {
      isOpen.value = !isOpen.value;
    };
    const globalClose = (e: MouseEvent) => {
      if (dropdownRef.value) {
        if (
          !dropdownRef.value.contains(e.target as HTMLElement) &&
          isOpen.value
        ) {
          isOpen.value = false;
        }
      }
    };
    onMounted(() => {
      document.addEventListener('click', globalClose);
    });
    onUnmounted(() => {
      document.removeEventListener('click', globalClose);
    });
    return {
      isOpen,
      switchOpen,
      dropdownRef,
    };
  },
});
</script>

<style>
@import './style/drop-down-list.css';
</style>
