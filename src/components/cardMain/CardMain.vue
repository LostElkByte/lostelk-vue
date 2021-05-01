<template>
  <div class="home-page_main" v-if="ColumnSize === 3">
    <MainSearch v-if="!searchfailure" v-show="mainSearchIsNone"></MainSearch>
    <div class="main_center">
      <div class="search-results" v-if="!searchfailure" v-show="!mainSearchIsNone">
        <h1 class="search-results-heading">
          {{ sarchTag.tagName }}
        </h1>
        <p class="search-results-description">
          Browse {{ sarchTag.totalCount }} {{ sarchTag.tagName }} work, designs, illustrations, and graphic elements
        </p>
      </div>

      <div class="home-page_main_cards" v-if="!searchfailure">
        <div class="cardColumn" ref="cardColumn">
          <div class="home-page_main_cards_item" v-for="card in cardThreeColumnOne" :key="card.id">
            <img
              :src="card.file.id ? `${lostelkUrl}/files/${card.file.id}/serve?size=large` : card.file.fakeUrl"
              :alt="card.title"
              :style="`height: ${(cardColumnWidth / card.file.width) * card.file.height}px`"
            />
            <div class="card-baffle-plate" @click="cardDetails(card.id)">
              <div class="card-baffle-plate-top">
                <div class="like-comments">
                  <button class="card-button">
                    <Likes :isLike="card.liked" :likeCount="card.totalLikes" :cardId="card.id"></Likes>
                  </button>
                  <button class="card-button">
                    <GoCommentButton
                      :postId="card.id"
                      :totalComments="card.totalComments"
                      :urlParameter="Urlparameter"
                    ></GoCommentButton>
                  </button>
                </div>
              </div>
              <div class="card-baffle-plate-bottom">
                <div class="author">
                  <img
                    @click.stop="toUserPage(card.user.name, card.user.id)"
                    v-if="card.user.avatar"
                    class="card-avatar-32"
                    :src="`${lostelkUrl}/users/${card.user.id}/avatar?size=small`"
                    :alt="card.user.name"
                  />
                  <div v-else class="card-avatar-32" @click.stop="toUserPage(card.user.name, card.user.id)">
                    <svg class="card-avatar-32" aria-hidden="true">
                      <use xlink:href="#icon-touxiangnvhai"></use>
                    </svg>
                  </div>
                  <div class="card-baffle-plate-author">
                    <span>{{ card.title }}</span>
                    <span @click.stop="toUserPage(card.user.name, card.user.id)">{{ card.user.name }}</span>
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
              :src="card.file.id ? `${lostelkUrl}/files/${card.file.id}/serve?size=large` : card.file.fakeUrl"
              :alt="card.title"
              :style="`height: ${(cardColumnWidth / card.file.width) * card.file.height}px`"
            />
            <div class="card-baffle-plate" @click="cardDetails(card.id)">
              <div class="card-baffle-plate-top">
                <div class="like-comments">
                  <button class="card-button">
                    <Likes :isLike="card.liked" :likeCount="card.totalLikes" :cardId="card.id"></Likes>
                  </button>
                  <button class="card-button">
                    <GoCommentButton
                      :postId="card.id"
                      :totalComments="card.totalComments"
                      :urlParameter="Urlparameter"
                    ></GoCommentButton>
                  </button>
                </div>
              </div>
              <div class="card-baffle-plate-bottom">
                <div class="author">
                  <img
                    @click.stop="toUserPage(card.user.name, card.user.id)"
                    v-if="card.user.avatar"
                    class="card-avatar-32"
                    :src="`${lostelkUrl}/users/${card.user.id}/avatar?size=small`"
                    :alt="card.user.name"
                  />
                  <div v-else class="card-avatar-32" @click.stop="toUserPage(card.user.name, card.user.id)">
                    <svg class="card-avatar-32" aria-hidden="true">
                      <use xlink:href="#icon-touxiangnvhai"></use>
                    </svg>
                  </div>
                  <div class="card-baffle-plate-author">
                    <span>{{ card.title }}</span>
                    <span @click.stop="toUserPage(card.user.name, card.user.id)">{{ card.user.name }}</span>
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
              :src="card.file.id ? `${lostelkUrl}/files/${card.file.id}/serve?size=large` : card.file.fakeUrl"
              :alt="card.title"
              :style="`height: ${(cardColumnWidth / card.file.width) * card.file.height}px`"
            />
            <div class="card-baffle-plate" @click="cardDetails(card.id)">
              <div class="card-baffle-plate-top">
                <div class="like-comments">
                  <button class="card-button">
                    <Likes :isLike="card.liked" :likeCount="card.totalLikes" :cardId="card.id"></Likes>
                  </button>
                  <button class="card-button">
                    <GoCommentButton
                      :postId="card.id"
                      :totalComments="card.totalComments"
                      :urlParameter="Urlparameter"
                    ></GoCommentButton>
                  </button>
                </div>
              </div>
              <div class="card-baffle-plate-bottom">
                <div class="author">
                  <img
                    @click.stop="toUserPage(card.user.name, card.user.id)"
                    v-if="card.user.avatar"
                    class="card-avatar-32"
                    :src="`${lostelkUrl}/users/${card.user.id}/avatar?size=small`"
                    :alt="card.user.name"
                  />
                  <div v-else class="card-avatar-32" @click.stop="toUserPage(card.user.name, card.user.id)">
                    <svg class="card-avatar-32" aria-hidden="true">
                      <use xlink:href="#icon-touxiangnvhai"></use>
                    </svg>
                  </div>
                  <div class="card-baffle-plate-author">
                    <span>{{ card.title }}</span>
                    <span @click.stop="toUserPage(card.user.name, card.user.id)">{{ card.user.name }}</span>
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
      <div class="loading-more" v-if="isShowLoadingMore">
        <span>Loading more…</span>
      </div>
      <div class="no-more" v-if="noMore">
        <span></span>
        <span>没有更多内容了</span>
      </div>
    </div>
  </div>
  <div class="home-page_main" v-else-if="ColumnSize === 2">
    <MainSearch v-if="!searchfailure" v-show="mainSearchIsNone"></MainSearch>
    <div class="main_center">
      <div class="search-results" v-if="!searchfailure" v-show="!mainSearchIsNone">
        <h1 class="search-results-heading">
          {{ sarchTag.tagName }}
        </h1>
        <p class="search-results-description">
          Browse {{ sarchTag.totalCount }} {{ sarchTag.tagName }} work, designs, illustrations, and graphic elements
        </p>
      </div>
      <div class="home-page_main_cards" v-if="!searchfailure">
        <div class="cardColumn" ref="cardColumn">
          <div class="home-page_main_cards_item" v-for="card in cardTwoColumnOne" :key="card.id">
            <img
              :src="card.file.id ? `${lostelkUrl}/files/${card.file.id}/serve?size=large` : card.file.fakeUrl"
              :alt="card.title"
              :style="`height: ${(cardColumnWidth / card.file.width) * card.file.height}px`"
            />
            <div class="card-baffle-plate" @click="cardDetails(card.id)">
              <div class="card-baffle-plate-top">
                <div class="like-comments">
                  <button class="card-button">
                    <Likes :isLike="card.liked" :likeCount="card.totalLikes" :cardId="card.id"></Likes>
                  </button>
                  <button class="card-button">
                    <GoCommentButton
                      :postId="card.id"
                      :totalComments="card.totalComments"
                      :urlParameter="Urlparameter"
                    ></GoCommentButton>
                  </button>
                </div>
              </div>
              <div class="card-baffle-plate-bottom">
                <div class="author">
                  <img
                    @click.stop="toUserPage(card.user.name, card.user.id)"
                    v-if="card.user.avatar"
                    class="card-avatar-32"
                    :src="`${lostelkUrl}/users/${card.user.id}/avatar?size=small`"
                    :alt="card.user.name"
                  />
                  <div v-else class="card-avatar-32" @click.stop="toUserPage(card.user.name, card.user.id)">
                    <svg class="card-avatar-32" aria-hidden="true">
                      <use xlink:href="#icon-touxiangnvhai"></use>
                    </svg>
                  </div>
                  <div class="card-baffle-plate-author">
                    <span>{{ card.title }}</span>
                    <span @click.stop="toUserPage(card.user.name, card.user.id)">{{ card.user.name }}</span>
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
              :src="card.file.id ? `${lostelkUrl}/files/${card.file.id}/serve?size=large` : card.file.fakeUrl"
              :alt="card.title"
              :style="`height: ${(cardColumnWidth / card.file.width) * card.file.height}px`"
            />
            <div class="card-baffle-plate" @click="cardDetails(card.id)">
              <div class="card-baffle-plate-top">
                <div class="like-comments">
                  <button class="card-button">
                    <Likes :isLike="card.liked" :likeCount="card.totalLikes" :cardId="card.id"></Likes>
                  </button>
                  <button class="card-button">
                    <GoCommentButton
                      :postId="card.id"
                      :totalComments="card.totalComments"
                      :urlParameter="Urlparameter"
                    ></GoCommentButton>
                  </button>
                </div>
              </div>
              <div class="card-baffle-plate-bottom">
                <div class="author">
                  <img
                    @click.stop="toUserPage(card.user.name, card.user.id)"
                    v-if="card.user.avatar"
                    class="card-avatar-32"
                    :src="`${lostelkUrl}/users/${card.user.id}/avatar?size=small`"
                    :alt="card.user.name"
                  />
                  <div v-else class="card-avatar-32" @click.stop="toUserPage(card.user.name, card.user.id)">
                    <svg class="card-avatar-32" aria-hidden="true">
                      <use xlink:href="#icon-touxiangnvhai"></use>
                    </svg>
                  </div>
                  <div class="card-baffle-plate-author">
                    <span>{{ card.title }}</span>
                    <span @click.stop="toUserPage(card.user.name, card.user.id)">{{ card.user.name }}</span>
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
      <div class="loading-more" v-if="isShowLoadingMore">
        <span>Loading more…</span>
      </div>
      <div class="no-more" v-if="noMore">
        <span></span>
        <span>没有更多内容了</span>
      </div>
    </div>
  </div>
  <div class="home-page_main" v-else-if="ColumnSize === 1">
    <MainSearch v-if="!searchfailure" v-show="mainSearchIsNone"></MainSearch>
    <div class="main_center">
      <div class="search-results" v-if="!searchfailure" v-show="!mainSearchIsNone">
        <h1 class="search-results-heading">
          {{ sarchTag.tagName }}
        </h1>
        <p class="search-results-description">
          Browse {{ sarchTag.totalCount }} {{ sarchTag.tagName }} work, designs, illustrations, and graphic elements
        </p>
      </div>
      <div class="home-page_main_cards" v-if="!searchfailure">
        <div class="cardColumn" ref="cardColumn">
          <div class="home-page_main_cards_item" v-for="card in cardList" :key="card.id">
            <div class="max767-top">
              <div class="max767-top-content">
                <div class="card-abstract-avatar">
                  <img
                    @click.stop="toUserPage(card.user.name, card.user.id)"
                    v-if="card.user.avatar"
                    class="card-avatar-32"
                    :src="`${lostelkUrl}/users/${card.user.id}/avatar?size=small`"
                    :alt="card.user.name"
                  />
                  <div v-else class="card-avatar-32" @click.stop="toUserPage(card.user.name, card.user.id)">
                    <svg class="card-avatar-32" aria-hidden="true">
                      <use xlink:href="#icon-touxiangnvhai"></use>
                    </svg>
                  </div>
                </div>
                <div class="card-abstract-author">
                  <span>{{ card.title }}</span>
                  <span @click.stop="toUserPage(card.user.name, card.user.id)">{{ card.user.name }}</span>
                </div>
              </div>
            </div>
            <img
              :src="card.file.id ? `${lostelkUrl}/files/${card.file.id}/serve?size=large` : card.file.fakeUrl"
              :alt="card.title"
              @click="cardDetails(card.id)"
              :style="`height: ${(cardColumnWidth / card.file.width) * card.file.height}px`"
            />
            <div class="max767-bottom">
              <div class="max767-bottom-left">
                <button class="card-button-max767">
                  <Likes :isLike="card.liked" :likeCount="card.totalLikes" :cardId="card.id"></Likes>
                </button>
                <button class="card-button-max767">
                  <GoCommentButton
                    :postId="card.id"
                    :totalComments="card.totalComments"
                    :urlParameter="Urlparameter"
                  ></GoCommentButton>
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
      <div class="loading-more" v-if="isShowLoadingMore">
        <span>Loading more…</span>
      </div>
      <div class="no-more" v-if="noMore">
        <span></span>
        <span>没有更多了内容了</span>
      </div>
    </div>
  </div>
  <teleport to="#app">
    <router-view :tagName="tagNameProps"></router-view>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, PropType, ref } from 'vue';
import { lostelkUrl } from '../../global';
import store, { CardList, GloabSearchTagProps } from '../../store';
import Likes from '../cardFun/Likes.vue';
import MainSearch from '../search/MainSearch.vue';
import SearchFailure from '../globalFun/SearchFailure.vue';
import DownloadFile from '../cardFun/DownloadFile.vue';
import GoCommentButton from '../cardFun/GoCommentButton.vue';
import router from '../../router';

export default defineComponent({
  name: 'CardMain',
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
    detailsUrlparameter: {
      type: String,
      required: true,
    },
    tagName: {
      type: String,
      required: false,
    },
  },

  setup(props) {
    const tagNameProps = computed(() => props.tagName);

    const isShowLoadingMore = computed(() => store.state.isShowLoadingMore);

    const noMore = computed(() => store.state.noMore);

    const cardList = computed(() => props.list);

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
     * 获得搜索的标签
     */
    const sarchTag = computed(() => (store.state.searchTag as GloabSearchTagProps) || {});

    /**
     * 修改
     * 获得
     * 搜索栏显示状态
     */
    const mainSearchIsNone = computed(() => store.state.mainSearchIsNone);

    /**
     * 点击跳转详情页
     */
    const Urlparameter = computed(() => props.detailsUrlparameter);
    const cardDetails = async (postId: number) => {
      // 将body设置为不可滚动
      document.body.style.overflow = 'hidden';

      await store.commit('showCommentsCut', false);
      await router.push(`/${Urlparameter.value}/${postId}`);
    };

    /**
     * 进入用户页
     */
    const toUserPage = (userName: string, userId: number) => {
      router.push(`/@${userId}`);
    };

    /**
     * 实时获取cardColumn宽度
     */
    const cardColumnWidth = ref();
    const cardColumn = ref();

    function cardColumnSize() {
      // setTimeout(() => {
      cardColumnWidth.value = cardColumn.value.clientWidth;
      // }, 500);
    }
    onMounted(() => {
      cardColumnWidth.value = cardColumn.value.clientWidth;
      window.addEventListener('resize', cardColumnSize, false);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', cardColumnSize, false);
    });

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
      sarchTag,
      cardDetails,
      ColumnSize,
      mainSearchIsNone,
      Urlparameter,
      tagNameProps,
      isShowLoadingMore,
      noMore,
      toUserPage,
      cardColumn,
      cardColumnWidth,
    };
  },
});
</script>

<style scoped>
@import '../../style/less/componentsStyle/card-main.css';
</style>
