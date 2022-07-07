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
    <!-- 搜索内容 - 骨架屏 -->
    <div class="search-pop-up" v-show="searchPopUpIsShow && skeletonIsShow">
      <div class="search-pop-up-skeleton">
        <div class="search-pop-up-skeleton-header">
          <!-- <div class="search-pop-up-skeleton-header-item1"></div> -->
          <div class="search-pop-up-skeleton-header-item2"></div>
          <div class="search-pop-up-skeleton-header-item3">
            <div class="left"></div>
            <div class="right"></div>
          </div>
        </div>
        <div
          class="search-pop-up-skeleton-item"
          v-for="index in 4"
          :key="index"
        >
          <div class="left"></div>
          <div class="right">
            <div class="top"></div>
            <div class="bottom"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 搜索内容 -->
    <div class="search-pop-up" v-show="searchPopUpIsShow && !skeletonIsShow">
      <div class="search-pop-up-item" v-show="tagCardTotal > 0">
        <p class="search-pop-up-item-type">Tag ( {{ tagCardTotal }} )</p>
        <div
          class="search-pop-up-item-details"
          v-for="(item, index) in tagCardList"
          :key="index"
          @click.stop="aSinglePicture('tag', item.id)"
        >
          <div class="search-pop-up-item-details-img">
            <img
              :src="`${lostelkUrl}/files/${item.file.id}/serve?size=large`"
              :alt="item.title"
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
        <p class="search-pop-up-item-all" @click.stop="allRelevant('tag')">
          View photos in all related tags
        </p>
      </div>
      <div class="search-pop-up-item" v-show="colorCardTotal > 0">
        <p class="search-pop-up-item-type">Color ( {{ colorCardTotal }} )</p>
        <div
          class="search-pop-up-item-details"
          v-for="(item, index) in colorCardList"
          :key="index"
          @click.stop="aSinglePicture('color', item.id)"
        >
          <div class="search-pop-up-item-details-img">
            <img
              :src="`${lostelkUrl}/files/${item.file.id}/serve?size=large`"
              :alt="item.title"
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
        <p class="search-pop-up-item-all" @click.stop="allRelevant('color')">
          View photos in all relevant colors
        </p>
      </div>
      <div class="search-pop-up-item" v-show="userCardTotal > 0">
        <p class="search-pop-up-item-type">User ( {{ userCardTotal }} )</p>
        <div
          class="search-pop-up-item-details"
          v-for="(item, index) in userCardList"
          :key="index"
          @click="aSinglePicture('user', item.id)"
        >
          <div class="search-pop-up-item-details-img">
            <img
              v-if="item.avatar"
              class="content-header-author-photo-32"
              :src="`${lostelkUrl}/users/${item.id}/avatar?size=small`"
              :alt="item.name"
            />
            <svg
              v-else
              style="width: 100%;height: 100%;"
              class="icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-touxiangnvhai"></use>
            </svg>
          </div>
          <div class="search-pop-up-item-details-describe">
            <div class="title">
              {{ item.name }}
            </div>
            <!-- <div class="user-name"></div> -->
          </div>
        </div>
        <p class="search-pop-up-item-all" @click.stop="allRelevant('user')">
          View all relevant users
        </p>
      </div>
      <div
        class="search-no-data"
        v-show="
          noDataIsShow &&
            tagCardTotal <= 0 &&
            colorCardTotal <= 0 &&
            userCardTotal <= 0
        "
      >
        No results were found for
        <span style="font-weight: 700;">“{{ searchVal }}”</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import store from '../../store';
import _ from 'lodash';
import { lostelkUrl } from '@/global';
import router from '../../router';

export default defineComponent({
  setup() {
    const searchVal = ref();
    const tagCardList = ref();
    const tagCardTotal = ref(0);
    const colorCardList = ref();
    const colorCardTotal = ref(0);
    const userCardList = ref();
    const userCardTotal = ref(0);

    // 骨架屏显示控制变量
    const skeletonIsShow = ref(false);
    // 没有找到相关内容显示控制变量
    const noDataIsShow = ref(false);
    // 搜索弹窗显示控制变量
    const searchPopUpIsShow = ref(false);

    /**
     * 重置搜索状态
     */
    const reset = () => {
      searchPopUpIsShow.value = false;
      skeletonIsShow.value = false;
      noDataIsShow.value = false;
      tagCardList.value = null;
      tagCardTotal.value = 0;
      colorCardList.value = null;
      colorCardTotal.value = 0;
      userCardList.value = null;
      userCardTotal.value = 0;
    };

    /**
     * 实时搜索
     */
    const searchBrief = async () => {
      if (searchVal.value) {
        skeletonIsShow.value = true;
        searchPopUpIsShow.value = true;
        noDataIsShow.value = false;
        store.commit('setIsShowLoading', false);
        const tagRes = await store.dispatch('getSearchValCardBriefList', {
          val: searchVal.value,
          type: 'tag'
        });
        store.commit('setIsShowLoading', false);
        const colorRes = await store.dispatch('getSearchValCardBriefList', {
          val: searchVal.value,
          type: 'color'
        });
        store.commit('setIsShowLoading', false);
        const userRes = await store.dispatch('getSearchValCardBriefList', {
          val: searchVal.value,
          type: 'user'
        });
        tagCardList.value = tagRes.data.slice(0, 4);
        tagCardTotal.value = tagRes.headers['x-total-count'];
        colorCardList.value = colorRes.data.slice(0, 4);
        colorCardTotal.value = colorRes.headers['x-total-count'];
        userCardList.value = userRes.data.slice(0, 4);
        userCardTotal.value = userRes.headers['x-total-count'];
        noDataIsShow.value = true;
        setTimeout(() => {
          skeletonIsShow.value = false;
        }, 300);
      } else {
        // 重置
        reset();
      }
    };

    /**
     * 实时搜索节流方法
     */
    const searchBriefFun = _.debounce(searchBrief, 500);

    /**
     * 查看所有相关
     */
    const allRelevant = (type: string) => {
      router.push(`/search/${type}/${searchVal.value}`);
      // 重置
      searchVal.value = null;
      reset();
    };

    /**
     * 查看单个内容
     */
    const aSinglePicture = (type: string, id: string) => {
      switch (type) {
        case 'tag':
          router.push(`/search/${type}/${searchVal.value}/searchCard/${id}`);
          break;
        case 'color':
          router.push(`/search/${type}/${searchVal.value}/searchCard/${id}`);
          break;
        case 'user':
          router.push(`/@${id}`);
          break;
        default:
          break;
      }
      // 重置
      searchVal.value = null;
      reset();
    };

    const search = () => {
      if (searchVal.value) {
        // console.log(1);
      }
    };
    return {
      search,
      searchVal,
      searchBrief,
      searchBriefFun,
      tagCardList,
      tagCardTotal,
      colorCardList,
      colorCardTotal,
      userCardList,
      userCardTotal,
      lostelkUrl,
      skeletonIsShow,
      noDataIsShow,
      searchPopUpIsShow,
      allRelevant,
      aSinglePicture
    };
  }
});
</script>

<style scoped>
@import '../../style/less/componentsStyle/header-search.css';
</style>
