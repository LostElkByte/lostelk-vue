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
      <div class="search-pop-up-item" v-show="tagCardTotal > 0">
        <p class="search-pop-up-item-type">标签( {{ tagCardTotal }} )</p>
        <div class="search-pop-up-item-details" v-for="(item, index) in tagCardList" :key="index">
          <div class="search-pop-up-item-details-img">
            <img :src="`${lostelkUrl}/files/${item.file.id}/serve?size=large`" :alt="item.title" />
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
      <div class="search-pop-up-item" v-show="colorCardTotal > 0">
        <p class="search-pop-up-item-type">颜色( {{ colorCardTotal }} )</p>
        <div class="search-pop-up-item-details" v-for="(item, index) in colorCardList" :key="index">
          <div class="search-pop-up-item-details-img">
            <img :src="`${lostelkUrl}/files/${item.file.id}/serve?size=large`" :alt="item.title" />
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
        <p class="search-pop-up-item-all">查看所有相关颜色的图片</p>
      </div>
      <div class="search-pop-up-item" v-show="userCardTotal > 0">
        <p class="search-pop-up-item-type">用户( 1 )</p>
        <div class="search-pop-up-item-details"></div>
        <p class="search-pop-up-item-all">查看所有相关的用户</p>
      </div>
      <div class="search-no-data" v-show="searchVal && tagCardTotal <= 0 && colorCardTotal <= 0 && userCardTotal <= 0">
        没找到有关<span style="font-weight: 700;">“{{ searchVal }}”</span>的结果
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import store from '../../store';
import _ from 'lodash';
import { lostelkUrl } from '@/global';

export default defineComponent({
  setup() {
    const searchPopUpShow = ref(false);
    const searchVal = ref();
    const tagCardList = ref();
    const tagCardTotal = ref(0);
    const colorCardList = ref();
    const colorCardTotal = ref(0);
    const userCardList = ref();
    const userCardTotal = ref(0);

    // 实时搜索
    const searchBrief = async () => {
      if (searchVal.value) {
        searchPopUpShow.value = true;
        store.commit('setIsShowLoading', false);
        const tagRes = await store.dispatch('getSearchValCardBriefList', { val: searchVal.value, type: 'tag' });
        store.commit('setIsShowLoading', false);
        const colorRes = await store.dispatch('getSearchValCardBriefList', { val: searchVal.value, type: 'color' });
        tagCardList.value = tagRes.data.slice(0, 4);
        tagCardTotal.value = tagRes.headers['x-total-count'];
        colorCardList.value = colorRes.data.slice(0, 4);
        colorCardTotal.value = colorRes.headers['x-total-count'];
      } else {
        searchPopUpShow.value = false;
      }
    };

    // 实时搜索节流方法
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
      colorCardList,
      colorCardTotal,
      userCardList,
      userCardTotal,
      lostelkUrl,
    };
  },
});
</script>

<style>
@import '../../style/less/componentsStyle/header-search.css';
</style>
