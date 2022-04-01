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
    // 下拉菜单默认设置为关闭
    const isOpen = ref(false);
    // Vue3获得DOM节点: 1.命名要与template模板内ref的命名完全一致 2.返回
    const dropdownRef = ref<null | HTMLElement>(null);
    // 点击下拉菜单以及下拉按钮区域触发打开或关闭
    const switchOpen = () => {
      isOpen.value = !isOpen.value;
    };
    /**
     * 全局页面点击关闭下拉菜单
     */
    const globalClose = (e: MouseEvent) => {
      // 判断下拉菜单dropdownRef节点是否存在
      if (dropdownRef.value) {
        if (
          // Node.contains()返回的是一个布尔值，来表示传入的节点是否为该节点的后代节点。
          // 如果点击的区域不是dropdownRef以及它的子节点 并且 下拉菜单为开启状态
          !dropdownRef.value.contains(e.target as HTMLElement) &&
          isOpen.value
        ) {
          // 满足判断条件 即将下拉菜单设置为关闭状态
          isOpen.value = false;
        }
      }
    };
    /**
     * 组件挂载时添加globalClose点击事件
     */
    onMounted(() => {
      document.addEventListener('click', globalClose);
    });
    /**
     * 组件卸载时添加globalClose点击事件
     */
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

<style scoped>
/* @import '../style/componentsStyle/drop-down-list.css'; */
@import '../../style/less/componentsStyle/drop-down-list.css';
</style>
