<template>
  <!-- <teleport to="#tooltipDom"> -->
  <div class="tooltip" :class="classObject" v-if="isVisible">
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

    const classObject = {
      success: props.type === 'success',
      error: props.type === 'error',
    };
    const hide = () => {
      isVisible.value = false;
    };

    return {
      isVisible,
      classObject,
      hide,
    };
  },
});
</script>

<style>
@import '../style/componentsStyle/tooltip.css';
</style>
