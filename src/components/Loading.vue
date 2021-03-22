<template>
  <teleport to="#loading">
    <div class="cell">
      <div class="card">
        <span class="three-quarters-loader">Loading&#8230;</span>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue';

export default defineComponent({
  setup() {
    const node = document.createElement('div');
    node.id = 'loading';
    document.body.appendChild(node);

    onUnmounted(() => {
      document.body.removeChild(node);
    });
  },
});
</script>

<style>
@import '../style/less/componentsStyle/loading.css';
</style>
