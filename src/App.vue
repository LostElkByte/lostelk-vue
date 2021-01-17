<template>
  <div class="home-page">
    <home-page-main :list="list"></home-page-main>
    <sidebar></sidebar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import './globalStyle/font/iconfont';
import HomePageMain, { CartList } from './components/Home-page_main.vue';
import sidebar from './components/sidebar.vue';
const testData: CartList[] = [
  {
    id: 19,
    title: '白云泉',
    content: '天平山上白云泉，云自无心水自闲',
    user: {
      id: 5,
      name: '白居易',
      avatar: 1,
    },
    totalComments: 1,
    file: {
      id: 19,
      width: 6000,
      height: 3703,
    },
    tags: [
      {
        id: 6,
        name: '泉',
      },
      {
        id: 13,
        name: '云',
      },
    ],
    totalLikes: 2,
  },
  {
    id: 18,
    title: '江南春',
    content: '青门柳枝软无力，东风吹作黄金色',
    user: {
      id: 5,
      name: '白居易',
      avatar: 1,
    },
    totalComments: 1,
    file: {
      id: 18,
      width: 6000,
      height: 4000,
    },
    tags: [
      {
        id: 8,
        name: '叶',
      },
    ],
    totalLikes: 2,
  },
  {
    id: 17,
    title: '三绝句',
    content: '楸树馨香倚钓矶，斩新花蕊未应飞',
    user: {
      id: 4,
      name: '杜甫',
      avatar: 1,
    },
    totalComments: 1,
    file: {
      id: 17,
      width: 4000,
      height: 6000,
    },
    tags: [
      {
        id: 1,
        name: '花',
      },
    ],
    totalLikes: 3,
  },
];
export default defineComponent({
  name: 'App',
  components: {
    HomePageMain,
    sidebar,
  },
  setup() {
    return {
      list: testData,
    };
  },
});
</script>

<style>
@import './globalStyle/normalize.css';
@import './globalStyle/body.css';
@import './globalStyle/home-page.css';
</style>
