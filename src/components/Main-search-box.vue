<template>
  <div class="main-search">
    <img src="../assets/images/content2.jpeg" alt="" />
    <div class="main-search-superstratum">
      <div class="search-superstratum-center">
        <div class="search-superstratum-content">
          <span>LostElk</span>
          <div>
            <h1>The internet’s source of freely-usable images.</h1>
            <p>Powered by creators everywhere.</p>
          </div>
          <div class="main-search-box">
            <label class="main-search-button" for="main-search">
              <div class="search-button-32">
                <svg class="icon icon-size-fill" aria-hidden="true">
                  <use xlink:href="#icon-sousuo"></use>
                </svg>
              </div>
            </label>
            <input
              type="text"
              id="main-search"
              placeholder="search photos"
              v-model.trim="tagVal"
              @keyup.enter="search"
            />
          </div>
        </div>
      </div>
      <div class="search-buttom">
        <span>This photo is from user <a href="#">麋鹿</a></span>
        <span>LostElk</span>
        <span>Start your website with LostElk today.</span>
      </div>
    </div>
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
@import '../style/less/componentsStyle/main-search-box.css';
/* @import '../style/componentsStyle/main-search-box.css'; */
</style>
