<template>
  <div v-if="!isLike" class="like">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-xihuan"></use>
    </svg>
    <span>{{ like }}</span>
  </div>
  <div v-else class="like">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-xihuan1"></use>
    </svg>
    <span class="">{{ like }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style>
.like {
  cursor: pointer;
}
</style>
