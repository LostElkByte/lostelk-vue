<template>
  <div class="home-page_main">
    <MainSearch v-if="!searchfailure"></MainSearch>
    <div class="main_center">
      <div class="home-page_main_cards" v-if="!searchfailure">
        <div class="cardColumn">
          <div class="home-page_main_cards_item" v-for="card in cardColumnOne" :key="card.id">
            <img
              :src="card.file.id ? `${lostelkUrl}/files/${card.file.id}/serve?size=medium` : card.file.fakeUrl"
              :alt="card.title"
            />
            <div class="card-baffle-plate">
              <div class="card-baffle-plate-top">
                <div class="pinglun-xihuan">
                  <button class="card-button">
                    <Likes :isLike="card.liked" :likeCount="card.totalLikes" :cardId="card.id"></Likes>
                  </button>
                  <button class="card-button">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-pinglun"></use>
                    </svg>
                    <span>320</span>
                  </button>
                </div>
              </div>
              <div class="card-baffle-plate-bottom">
                <div class="zuozhe">
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
                <div class="xiazai">
                  <DownloadFile :fileId="card.file.id">
                    <button class="card-button card-button-xiazai">
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
          <div class="home-page_main_cards_item" v-for="card in cardColumnTwo" :key="card.id">
            <img
              :src="card.file.id ? `${lostelkUrl}/files/${card.file.id}/serve?size=medium` : card.file.fakeUrl"
              :alt="card.title"
            />
            <div class="card-baffle-plate">
              <div class="card-baffle-plate-top">
                <div class="pinglun-xihuan">
                  <button class="card-button">
                    <Likes :isLike="card.liked" :likeCount="card.totalLikes" :cardId="card.id"></Likes>
                  </button>
                  <button class="card-button">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-pinglun"></use>
                    </svg>
                    <span>32</span>
                  </button>
                </div>
              </div>
              <div class="card-baffle-plate-bottom">
                <div class="zuozhe">
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
                <div class="xiazai">
                  <DownloadFile :fileId="card.file.id">
                    <button class="card-button card-button-xiazai">
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
          <div class="home-page_main_cards_item" v-for="card in cardColumnThree" :key="card.id">
            <img
              :src="card.file.id ? `${lostelkUrl}/files/${card.file.id}/serve?size=medium` : card.file.fakeUrl"
              :alt="card.title"
            />
            <div class="card-baffle-plate">
              <div class="card-baffle-plate-top">
                <div class="pinglun-xihuan">
                  <button class="card-button">
                    <Likes :isLike="card.liked" :likeCount="card.totalLikes" :cardId="card.id"></Likes>
                  </button>
                  <button class="card-button">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-pinglun"></use>
                    </svg>
                    <span>32</span>
                  </button>
                </div>
              </div>
              <div class="card-baffle-plate-bottom">
                <div class="zuozhe">
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
                <div class="xiazai">
                  <DownloadFile :fileId="card.file.id">
                    <button class="card-button card-button-xiazai">
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
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { lostelkUrl } from '../global';
import store, { CardList } from '../store';
import Likes from '../components/Likes.vue';
import MainSearch from '../components/Main-search-bar.vue';
import SearchFailure from '../components/Search-failure.vue';
import DownloadFile from '../components/DownloadFile.vue';

export default defineComponent({
  name: 'HomeMainMin990',
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
     * 三列卡片分配
     */
    const cardColumnOne = computed(() => {
      return cardList.value.filter((item, index) => {
        if ((index + 1) % 3 === 1) {
          return item;
        }
      });
    });

    const cardColumnTwo = computed(() => {
      return cardList.value.filter((item, index) => {
        if ((index + 1) % 3 === 2) {
          return item;
        }
      });
    });

    const cardColumnThree = computed(() => {
      return cardList.value.filter((item, index) => {
        if ((index + 1) % 3 === 0) {
          return item;
        }
      });
    });

    /**
     * 获得搜索状态
     */
    const searchfailure = computed(() => store.state.searchFailure);

    return {
      lostelkUrl,
      cardList,
      Likes,
      cardColumnOne,
      cardColumnTwo,
      cardColumnThree,
      searchfailure,
    };
  },
});
</script>

<style>
@import '../style/componentsStyle/home-page-main-reconsitution.css';
</style>
