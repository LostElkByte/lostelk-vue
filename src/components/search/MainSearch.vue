<template>
  <div
    v-if="transverse.length != 0"
    class="main-search"
    :style="`background-image: url(${lostelkUrl}/files/${transverse[random].file.id}/serve?size=large);`"
  >
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
        <span
          >This photo is from user
          <router-link :to="`/@${transverse[random].user.id}`">{{ transverse[random].user.name }}</router-link></span
        >
        <span>LostElk</span>
        <span>Discover the world’s free HD pictures & Creatives.</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { lostelkUrl } from '../../global';
import router from '../../router';
import store from '../../store';
export default defineComponent({
  setup() {
    const tagVal = ref();
    const search = () => {
      if (tagVal.value) {
        router.push(`/tag/${tagVal.value}`);
      }
    };

    // 获取精选横图
    const transverse = computed(() => store.state.veryGoodsTransverseList);
    // 生成数组下标随机数
    const random = computed(() => Math.floor(Math.random() * transverse.value.length));

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
