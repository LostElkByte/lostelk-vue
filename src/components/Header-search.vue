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
import store from '../store';
export default defineComponent({
  setup() {
    const tagVal = ref();
    const search = () => {
      if (tagVal.value) {
        store.dispatch('getTagCardList', tagVal.value).then(() => {
          if (store.state.cardList.length === 0) {
            store.commit('setSearchFailure', true);
          } else {
            store.commit('setSearchFailure', false);
            store.commit('mainSearchIsNone', false);
          }
        });
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
