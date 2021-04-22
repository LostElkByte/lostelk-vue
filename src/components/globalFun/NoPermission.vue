<template>
  <div class="search-failure">
    <div class="search-failure-icon">
      <svg class="icon icon-size-fill" aria-hidden="true">
        <use xlink:href="#icon-meiyouquanxian_lan"></use>
      </svg>
    </div>
    <slot>
      <p>没有权限</p>
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<style>
@import '../../style/less/componentsStyle/no-jurisdiction.css';
</style>
