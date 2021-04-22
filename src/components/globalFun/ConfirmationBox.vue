<template>
  <div class="affirm">
    <div class="affirm-tooltip">
      <h3 class="affirm-title"><slot>你确定要删除吗？</slot></h3>
      <div class="affirm-content">
        <div class="affirm-button">
          <button type="button" class="Button" @click="cancel">取消</button>
          <button type="button" class="Button Button-black" @click="confirm">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup(props, context) {
    const cancel = () => {
      context.emit('cancelDelete');
    };
    const confirm = () => {
      context.emit('confirmDelete');
    };
    return {
      cancel,
      confirm,
    };
  },
});
</script>
<style>
@import '../../style/less/componentsStyle/Affirm.css';
</style>
