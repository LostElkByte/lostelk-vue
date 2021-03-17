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
.header-search-box {
  position: relative;
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: flex-start;
  border-radius: 20px;
  background-color: #f5f5f5;
  color: #767676;
  max-width: 600px;
  float: left;
}

.header-search-button {
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  font-size: 16px;
  height: 100%;
  border: none;
  padding: 0;
  background-color: initial;
  text-align: inherit;
}

.search-button-20 {
  width: 20px;
  height: 20px;
}
.search-button-24 {
  width: 24px;
  height: 24px;
}
.header-search-box input {
  display: inline-block;
  display: flex;
  flex-grow: 1;
  height: 100%;
  border: none;
  padding: 0;
  background-color: initial;
  text-align: inherit;
  overflow: hidden;
}

.header-search-box:hover {
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
}
</style>
