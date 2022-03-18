<template>
  <div class="header-search-box">
    <label class="header-search-button" for="header-search">
      <span class="search-button-20">
        <svg class="icon icon-size-fill" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </span>
    </label>
    <input type="text" v-model.trim="searchVal" @keyup.enter="search" id="header-search" placeholder="search photos" />
    <div class="search-pop-up" v-if="searchPopUpShow">
      <div class="search-pop-up-item">
        <p class="search-pop-up-item-type">标签( 6 )</p>
        <div class="search-pop-up-item-details">
          <div class="search-pop-up-item-details-img">
            <img
              src="https://cdn.musicbed.com/image/upload/c_fill,dpr_auto,f_auto,g_auto,q_auto:best,h_60,w_60/v1/production/albums/2153"
              alt=""
            />
          </div>
          <div class="search-pop-up-item-details-describe">
            <div class="title">
              春
            </div>
            <div class="user-name">
              lostelk
            </div>
          </div>
        </div>
        <div class="search-pop-up-item-details">
          <div class="search-pop-up-item-details-img">
            <img
              src="https://cdn.musicbed.com/image/upload/c_fill,dpr_auto,f_auto,g_auto,q_auto:best,h_60,w_60/v1/production/albums/2153"
              alt=""
            />
          </div>
          <div class="search-pop-up-item-details-describe">
            <div class="title">
              古道秋风瘦马,夕阳西下 断肠人在天涯
            </div>
            <div class="user-name">
              lostelk
            </div>
          </div>
        </div>
        <div class="search-pop-up-item-details">
          <div class="search-pop-up-item-details-img">
            <img
              src="https://cdn.musicbed.com/image/upload/c_fill,dpr_auto,f_auto,g_auto,q_auto:best,h_60,w_60/v1/production/albums/2153"
              alt=""
            />
          </div>
          <div class="search-pop-up-item-details-describe">
            <div class="title">
              春
            </div>
            <div class="user-name">
              lostelk
            </div>
          </div>
        </div>
        <p class="search-pop-up-item-all">查看所有相关标签的图片</p>
      </div>
      <div class="search-pop-up-item">
        <p class="search-pop-up-item-type">颜色( 2 )</p>
        <div class="search-pop-up-item-details"></div>
        <div class="search-pop-up-item-details"></div>
        <div class="search-pop-up-item-details"></div>
        <p class="search-pop-up-item-all">查看所有相关颜色的图片</p>
      </div>
      <div class="search-pop-up-item">
        <p class="search-pop-up-item-type">用户( 1 )</p>
        <div class="search-pop-up-item-details"></div>
        <div class="search-pop-up-item-details"></div>
        <div class="search-pop-up-item-details"></div>
        <p class="search-pop-up-item-all">查看所有相关的用户</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import router from '../../router';
export default defineComponent({
  setup() {
    const searchPopUpShow = ref(false);
    const searchVal = ref();
    const search = () => {
      if (searchVal.value) {
        console.log(1);
      }
    };
    return {
      search,
      searchVal,
      searchPopUpShow,
    };
  },
});
</script>

<style>
@import '../../style/less/componentsStyle/header-search.css';
</style>
