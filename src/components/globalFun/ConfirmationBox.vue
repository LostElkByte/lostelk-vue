<template>
  <div class="affirm">
    <div class="affirm-tooltip">
      <h3 class="affirm-title"><slot>Are you sure you want to delete it?</slot></h3>
      <div class="affirm-content">
        <div class="affirm-button">
          <button type="button" class="Button" @click="cancel">cancel</button>
          <button type="button" class="Button Button-black" @click="confirm">confirm</button>
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
<style scoped>
@import '../../style/less/componentsStyle/Affirm.css';
</style>
