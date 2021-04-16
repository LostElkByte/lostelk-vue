<template>
  <div class="header-search-box">
    <label class="header-search-button" for="header-search">
      <span class="search-button-20">
        <svg class="icon icon-size-fill" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </span>
    </label>
    <input type="text" v-model.trim="tagVal" @keyup.enter="search" id="header-search" placeholder="search photos" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import router from '../router';
export default defineComponent({
  setup() {
    const tagVal = ref();
    const search = () => {
      if (tagVal.value) {
        router.push(`/tag/${tagVal.value}`);
      }
    };
    return {
      search,
      tagVal,
    };
  },
});
</script>

<style>
@import '../style/less/componentsStyle/header-search.css';
</style>
