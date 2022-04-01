<template>
  <div class="search-failure">
    <div class="search-failure-icon">
      <svg class="icon icon-size-fill" aria-hidden="true">
        <use xlink:href="#icon-meiyouquanxian_lan"></use>
      </svg>
    </div>
    <slot>
      <p>You do not have this permission</p>
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<style scoped>
@import '../../style/less/componentsStyle/no-jurisdiction.css';
</style>
