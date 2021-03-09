<template>
  <!-- <teleport to="#tooltipDom"> -->
  <div class="tooltip" :class="classObject" v-if="isVisible" ref="tooltip">
    <span>{{ message }}</span>
    <span @click="hide">×</span>
  </div>
  <!-- </teleport> -->
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
export type TooltipType = 'success' | 'error' | 'default';

export default defineComponent({
  props: {
    message: String,
    type: {
      type: String as PropType<TooltipType>,
      default: 'default',
    },
  },
  setup(props) {
    const isVisible = ref(true);
    const tooltip = ref();

    const classObject = {
      success: props.type === 'success',
      error: props.type === 'error',
    };
    const hide = () => {
      isVisible.value = false;
      tooltip.value.parentNode.parentNode.removeChild(tooltip.value.parentNode);
    };

    return {
      isVisible,
      classObject,
      hide,
      tooltip,
    };
  },
});
</script>

<style>
@import '../style/componentsStyle/tooltip.css';
</style>
