<template>
  <div class="header-search-box">
    <label class="header-search-button" for="header-search">
      <span class="search-button-20">
        <svg class="icon icon-size-fill" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </span>
    </label>
    <input
      type="text"
      v-model.trim="searchVal"
      @keyup.enter="search"
      @input="searchBriefFun"
      id="header-search"
      placeholder="search photos"
    />
    <div class="search-pop-up" v-if="searchPopUpShow">
      <div class="search-pop-up-item">
        <p class="search-pop-up-item-type">标签( {{ tagCardTotal }} )</p>
        <div class="search-pop-up-item-details" v-for="(item, index) in tagCardList" :key="index">
          <div class="search-pop-up-item-details-img">
            <img
              src="https://cdn.musicbed.com/image/upload/c_fill,dpr_auto,f_auto,g_auto,q_auto:best,h_60,w_60/v1/production/albums/2153"
              alt=""
            />
          </div>
          <div class="search-pop-up-item-details-describe">
            <div class="title">
              {{ item.title }}
            </div>
            <div class="user-name">
              {{ item.user.name }}
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
import { defineComponent, ref } from 'vue';
import store from '../../store';
import _ from 'lodash';

export default defineComponent({
  setup() {
    const searchPopUpShow = ref(false);
    const searchVal = ref();
    const tagCardList = ref();
    const tagCardTotal = ref();

    const searchBrief = async () => {
      if (searchVal.value) {
        const res = await store.dispatch('getSearchValCardBriefList', { val: searchVal.value, type: 'tag' });
        searchPopUpShow.value = true;
        tagCardList.value = res.data.slice(0, 4);
        tagCardTotal.value = res.headers['x-total-count'];
      }
    };

    const searchBriefFun = _.debounce(searchBrief, 300);

    const search = () => {
      if (searchVal.value) {
        console.log(1);
      }
    };
    return {
      search,
      searchVal,
      searchPopUpShow,
      searchBrief,
      searchBriefFun,
      tagCardList,
      tagCardTotal,
    };
  },
});
</script>

<style>
@import '../../style/less/componentsStyle/header-search.css';
</style>
