<template>
  <div class="home-page_main">
    <MainSearch v-if="!searchfailure"></MainSearch>
    <div class="main_center">
      <div class="home-page_main_cards" v-if="!searchfailure">
        <div class="cardColumn">
          <div class="home-page_main_cards_item" v-for="card in cardList" :key="card.id">
            <div class="max767-top">
              <div class="max767-top-content">
                <div class="card-abstract-avatar">
                  <img v-if="card.user.avatar" class="card-avatar-32" :src="card.user.url" :alt="card.user.name" />
                  <div v-else class="card-avatar-32">
                    <svg class="card-avatar-32" aria-hidden="true">
                      <use xlink:href="#icon-weidenglu"></use>
                    </svg>
                  </div>
                </div>
                <div class="card-abstract-author">
                  <span>{{ card.title }}</span>
                  <span>{{ card.user.name }}</span>
                </div>
              </div>
            </div>
            <img
              :src="card.file.id ? `${lostelkUrl}/files/${card.file.id}/serve?size=medium` : card.file.fakeUrl"
              :alt="card.title"
              @click="cardDetails(card.id)"
            />
            <div class="max767-bottom">
              <div class="max767-bottom-left">
                <button class="card-button-max767">
                  <Likes :isLike="card.liked" :likeCount="card.totalLikes" :cardId="card.id"></Likes>
                </button>
                <button class="card-button-max767">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinglun"></use>
                  </svg>
                  <span>32</span>
                </button>
              </div>
              <div class="max767-bottom-right">
                <DownloadFile :fileId="card.file.id">
                  <button class="card-button-max767 card-button-max767-download">
                    Download
                  </button>
                </DownloadFile>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SearchFailure v-else></SearchFailure>
    </div>
  </div>
  <teleport to="#app">
    <router-view></router-view>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { lostelkUrl } from '../global';
import store, { CardList } from '../store';
import Likes from '../components/Likes.vue';
import MainSearch from './Main-search-box.vue';
import SearchFailure from '../components/Search-failure.vue';
import DownloadFile from '../components/DownloadFile.vue';
import router from '../router';

export default defineComponent({
  name: 'HomeMainMax990',
  components: {
    Likes,
    MainSearch,
    SearchFailure,
    DownloadFile,
  },
  props: {
    list: {
      type: Array as PropType<CardList[]>,
      required: true,
    },
  },
  setup(props) {
    const cardList = computed(() => {
      return props.list.map(card => {
        // 如果图片不存在 则添加默认图片
        if (!card.file) {
          card.file = {
            width: 300,
            height: 200,
            fakeUrl: require('@/assets/images/content2.jpeg'),
          };
        }
        // 如果头像存在设置url
        if (card.user.avatar) {
          card.user.url = `${lostelkUrl}/users/${card.user.id}/avatar?size=small`;
        }
        return card;
      });
    });

    /**
     * 获得搜索状态
     */
    const searchfailure = computed(() => store.state.searchFailure);

    /**
     * 点击卡片跳转详情页
     */
    const cardDetails = (posta: number) => {
      router.push(`/card/${posta}`);
      console.log(posta);
    };

    return {
      lostelkUrl,
      cardList,
      Likes,
      searchfailure,
      cardDetails,
    };
  },
});
</script>

<style>
@import '../style/less/componentsStyle/home-page-main-reconsitution.css';
</style>
