<template>
  <form>
    <slot name="default"> </slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <div class="form-groug">
          <a href="#" class="form-btn">
            提交
          </a>
        </div>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue';
import mitt from 'mitt';
export const emitter = mitt();

export default defineComponent({
  emits: ['form-submit'],
  setup(props, context) {
    let funcArr = [];
    const submitForm = () => {
      const result = funcArr.map(func => func()).every(result => result);
      context.emit('form-submit', result);
    };
    const callback = func => {
      funcArr.push(func);
    };
    emitter.on('form-item-created', callback);
    onUnmounted(() => {
      emitter.off('form-item-created', callback);
      funcArr = [];
    });
    return {
      submitForm,
    };
  },
});
</script>

<style>
@import '../style/componentsStyle/validateForm.css';
</style>
