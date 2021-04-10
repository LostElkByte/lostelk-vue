<template>
  <div class="home-page_main" v-if="ColumnSize === 3">
    <MainSearch v-if="!searchfailure" v-show="mainSearchIsNone"></MainSearch>
    <div class="main_center">
      <div class="home-page_main_cards" v-if="!searchfailure">
        <div class="cardColumn">
          <div class="home-page_main_cards_item" v-for="card in cardThreeColumnOne" :key="card.id">
            <img
              :src="card.file.id ? `${lostelkUrl}/files/${card.file.id}/serve?size=medium` : card.file.fakeUrl"
              :alt="card.title"
            />
            <div class="card-baffle-plate" @click="cardDetails(card.id)">
              <div class="card-baffle-plate-top">
                <div class="like-comments">
                  <button class="card-button">
                    <Likes :isLike="card.liked" :likeCount="card.totalLikes" :cardId="card.id"></Likes>
                  </button>
                  <button class="card-button">
                    <GoCommentButton :postId="card.id" :totalComments="card.totalComments"></GoCommentButton>
                  </button>
                </div>
              </div>
              <div class="card-baffle-plate-bottom">
                <div class="author">
                  <img v-if="card.user.avatar" class="card-avatar-32" :src="card.user.url" :alt="card.user.name" />
                  <div v-else class="card-avatar-32">
                    <svg class="card-avatar-32" aria-hidden="true">
                      <use xlink:href="#icon-weidenglu"></use>
                    </svg>
                  </div>
                  <div class="card-baffle-plate-author">
                    <span>{{ card.title }}</span>
                    <span>{{ card.user.name }}</span>
                  </div>
                </div>
                <div class="download">
                  <DownloadFile :fileId="card.file.id">
                    <button class="card-button card-button-download">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon-arrow-btm4"></use>
                      </svg>
                    </button>
                  </DownloadFile>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cardColumn">
          <div class="home-page_main_cards_item" v-for="card in cardThreeColumnTwo" :key="card.id">
            <img
              :src="card.file.id ? `${lostelkUrl}/files/${card.file.id}/serve?size=medium` : card.file.fakeUrl"
              :alt="card.title"
            />
            <div class="card-baffle-plate" @click="cardDetails(card.id)">
              <div class="card-baffle-plate-top">
                <div class="like-comments">
                  <button class="card-button">
                    <Likes :isLike="card.liked" :likeCount="card.totalLikes" :cardId="card.id"></Likes>
                  </button>
                  <button class="card-button">
                    <GoCommentButton :postId="card.id" :totalComments="card.totalComments"></GoCommentButton>
                  </button>
                </div>
              </div>
              <div class="card-baffle-plate-bottom">
                <div class="author">
                  <img v-if="card.user.avatar" class="card-avatar-32" :src="card.user.url" :alt="card.user.name" />
                  <div v-else class="card-avatar-32">
                    <svg class="card-avatar-32" aria-hidden="true">
                      <use xlink:href="#icon-weidenglu"></use>
                    </svg>
                  </div>
                  <div class="card-baffle-plate-author">
                    <span>{{ card.title }}</span>
                    <span>{{ card.user.name }}</span>
                  </div>
                </div>
                <div class="download">
                  <DownloadFile :fileId="card.file.id">
                    <button class="card-button card-button-download">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon-arrow-btm4"></use>
                      </svg>
                    </button>
                  </DownloadFile>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cardColumn">
          <div class="home-page_main_cards_item" v-for="card in cardThreeColumnThree" :key="card.id">
            <img
              :src="card.file.id ? `${lostelkUrl}/files/${card.file.id}/serve?size=medium` : card.file.fakeUrl"
              :alt="card.title"
            />
            <div class="card-baffle-plate" @click="cardDetails(card.id)">
              <div class="card-baffle-plate-top">
                <div class="like-comments">
                  <button class="card-button">
                    <Likes :isLike="card.liked" :likeCount="card.totalLikes" :cardId="card.id"></Likes>
                  </button>
                  <button class="card-button">
                    <GoCommentButton :postId="card.id" :totalComments="card.totalComments"></GoCommentButton>
                  </button>
                </div>
              </div>
              <div class="card-baffle-plate-bottom">
                <div class="author">
                  <img v-if="card.user.avatar" class="card-avatar-32" :src="card.user.url" :alt="card.user.name" />
                  <div v-else class="card-avatar-32">
                    <svg class="card-avatar-32" aria-hidden="true">
                      <use xlink:href="#icon-weidenglu"></use>
                    </svg>
                  </div>
                  <div class="card-baffle-plate-author">
                    <span>{{ card.title }}</span>
                    <span>{{ card.user.name }}</span>
                  </div>
                </div>
                <div class="download">
                  <DownloadFile :fileId="card.file.id">
                    <button class="card-button card-button-download">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon-arrow-btm4"></use>
                      </svg>
                    </button>
                  </DownloadFile>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SearchFailure v-else></SearchFailure>
    </div>
  </div>
  <div class="home-page_main" v-else-if="ColumnSize === 2">
    <MainSearch v-if="!searchfailure" v-show="mainSearchIsNone"></MainSearch>
    <div class="main_center">
      <div class="home-page_main_cards" v-if="!searchfailure">
        <div class="cardColumn">
          <div class="home-page_main_cards_item" v-for="card in cardTwoColumnOne" :key="card.id">
            <img
              :src="card.file.id ? `${lostelkUrl}/files/${card.file.id}/serve?size=medium` : card.file.fakeUrl"
              :alt="card.title"
            />
            <div class="card-baffle-plate" @click="cardDetails(card.id)">
              <div class="card-baffle-plate-top">
                <div class="like-comments">
                  <button class="card-button">
                    <Likes :isLike="card.liked" :likeCount="card.totalLikes" :cardId="card.id"></Likes>
                  </button>
                  <button class="card-button">
                    <GoCommentButton :postId="card.id" :totalComments="card.totalComments"></GoCommentButton>
                  </button>
                </div>
              </div>
              <div class="card-baffle-plate-bottom">
                <div class="author">
                  <img v-if="card.user.avatar" class="card-avatar-32" :src="card.user.url" :alt="card.user.name" />
                  <div v-else class="card-avatar-32">
                    <svg class="card-avatar-32" aria-hidden="true">
                      <use xlink:href="#icon-weidenglu"></use>
                    </svg>
                  </div>
                  <div class="card-baffle-plate-author">
                    <span>{{ card.title }}</span>
                    <span>{{ card.user.name }}</span>
                  </div>
                </div>
                <div class="download">
                  <DownloadFile :fileId="card.file.id">
                    <button class="card-button card-button-download">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon-arrow-btm4"></use>
                      </svg>
                    </button>
                  </DownloadFile>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cardColumn">
          <div class="home-page_main_cards_item" v-for="card in cardTwoColumnTwo" :key="card.id">
            <img
              :src="card.file.id ? `${lostelkUrl}/files/${card.file.id}/serve?size=medium` : card.file.fakeUrl"
              :alt="card.title"
            />
            <div class="card-baffle-plate" @click="cardDetails(card.id)">
              <div class="card-baffle-plate-top">
                <div class="like-comments">
                  <button class="card-button">
                    <Likes :isLike="card.liked" :likeCount="card.totalLikes" :cardId="card.id"></Likes>
                  </button>
                  <button class="card-button">
                    <GoCommentButton :postId="card.id" :totalComments="card.totalComments"></GoCommentButton>
                  </button>
                </div>
              </div>
              <div class="card-baffle-plate-bottom">
                <div class="author">
                  <img v-if="card.user.avatar" class="card-avatar-32" :src="card.user.url" :alt="card.user.name" />
                  <div v-else class="card-avatar-32">
                    <svg class="card-avatar-32" aria-hidden="true">
                      <use xlink:href="#icon-weidenglu"></use>
                    </svg>
                  </div>
                  <div class="card-baffle-plate-author">
                    <span>{{ card.title }}</span>
                    <span>{{ card.user.name }}</span>
                  </div>
                </div>
                <div class="download">
                  <DownloadFile :fileId="card.file.id">
                    <button class="card-button card-button-download">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon-arrow-btm4"></use>
                      </svg>
                    </button>
                  </DownloadFile>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SearchFailure v-else></SearchFailure>
    </div>
  </div>
  <div class="home-page_main" v-else-if="ColumnSize === 1">
    <MainSearch v-if="!searchfailure" v-show="mainSearchIsNone"></MainSearch>
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
                  <GoCommentButton :postId="card.id" :totalComments="card.totalComments"></GoCommentButton>
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
import GoCommentButton from '../components/GoCommentButton.vue';
import router from '../router';

export default defineComponent({
  name: 'HomeMain',
  components: {
    Likes,
    MainSearch,
    SearchFailure,
    DownloadFile,
    GoCommentButton,
  },
  props: {
    list: {
      type: Array as PropType<CardList[]>,
      required: true,
    },
    cardColumnSize: {
      type: Number,
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

    const ColumnSize = computed(() => props.cardColumnSize);
    /**
     * 三列卡片分配
     */
    const cardThreeColumnOne = computed(() => {
      return cardList.value.filter((item, index) => {
        if ((index + 1) % 3 === 1) {
          return item;
        }
      });
    });

    const cardThreeColumnTwo = computed(() => {
      return cardList.value.filter((item, index) => {
        if ((index + 1) % 3 === 2) {
          return item;
        }
      });
    });

    const cardThreeColumnThree = computed(() => {
      return cardList.value.filter((item, index) => {
        if ((index + 1) % 3 === 0) {
          return item;
        }
      });
    });

    /**
     * 两列卡片分配
     */
    const cardTwoColumnOne = computed(() => {
      return cardList.value.filter((item, index) => {
        if ((index + 1) % 2 === 1) {
          return item;
        }
      });
    });

    const cardTwoColumnTwo = computed(() => {
      return cardList.value.filter((item, index) => {
        if ((index + 1) % 2 === 0) {
          return item;
        }
      });
    });

    /**
     * 获得搜索状态
     */
    const searchfailure = computed(() => store.state.searchFailure);

    /**
     * 修改
     * 获得
     * 搜索栏显示状态
     */
    const mainSearchIsNone = computed(() => store.state.mainSearchIsNone);

    /**
     * 点击跳转详情页
     */
    const cardDetails = async (postId: number) => {
      // 获取当前坐标储存在store中
      const HomeScrollTop = document.documentElement.scrollTop;
      await store.commit('HomeScrollTop', HomeScrollTop);
      await store.commit('showCommentsCut', false);
      await router.push(`/card/${postId}`);
    };

    return {
      lostelkUrl,
      cardList,
      Likes,
      cardThreeColumnOne,
      cardThreeColumnTwo,
      cardThreeColumnThree,
      cardTwoColumnOne,
      cardTwoColumnTwo,
      searchfailure,
      cardDetails,
      ColumnSize,
      mainSearchIsNone,
    };
  },
});
</script>

<style scoped>
@import '../style/less/componentsStyle/home-page-main-reconsitution.css';
</style>
