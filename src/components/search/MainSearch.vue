<template>
  <div class="main-search">
    <img :src="`${lostelkUrl}/files/${transverse[random]}/serve?size=large`" :alt="transverse[random]" />
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
import { lostelkUrl, transverse, transverseLength } from '../../global';
import router from '../../router';
export default defineComponent({
  setup() {
    const tagVal = ref();
    const search = () => {
      if (tagVal.value) {
        router.push(`/tag/${tagVal.value}`);
      }
    };

    const random = ref(Math.floor(Math.random() * transverseLength));

    return {
      lostelkUrl,
      search,
      tagVal,
      transverse,
      random,
    };
  },
});
</script>

<style>
@import '../../style/less/componentsStyle/main-search-box.css';
</style>
