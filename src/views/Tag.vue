<template>
  <div class="home-page">
    <Header :user="loginJudge"></Header>
    <HomeMainReconsitution
      :detailsUrlparameter="`tag/${tagVal}/tagCard`"
      :tagName="tagVal"
      :cardColumnSize="cardColumnSize"
      :list="list"
    ></HomeMainReconsitution>
    <Sidebar></Sidebar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import HomeMainReconsitution from '../components/Home-main-reconsitution.vue';
import { useRoute } from 'vue-router';
export default defineComponent({
  name: 'Tag',
  components: {
    Header,
    Sidebar,
    HomeMainReconsitution,
  },
  props: {
    cardColumn: Number,
    tag: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const store = useStore();

    const tagVal = computed(() => route.params.tag);

    const loading = () => {
      store.dispatch('getTagCardList', tagVal.value).then(() => {
        if (store.state.tagCardList.length === 0) {
          //修改搜索结果为true
          store.commit('setSearchFailure', true);
        } else {
          store.commit('setSearchFailure', false);
          store.commit('mainSearchIsNone', false);
        }
      });
    };

    onMounted(() => {
      loading();
    });

    const list = computed(() => {
      return store.state.tagCardList;
    });
    const loginJudge = computed(() => {
      return store.state.user;
    });

    // 获取页面展示列的数量
    const cardColumnSize = computed(() => props.cardColumn);

    /**
     * Tag页加载更多
     */

    // 获取Tag页的卡片总数
    const tagPageCardTotalCount = computed(() => store.state.tagPageCardTotalCount);
    // 计算Tag页的总页数
    const TagTotalPage = computed(() => Math.ceil(tagPageCardTotalCount.value / 10));
    // 默认当前页数
    const currentPage = ref(1);
    // 是否加载默认设置为true
    const isTagScrollLoading = ref(true);

    // 滚动加载事件函数
    const windowScroll = async () => {
      const prevScrollTop = ref(0);

      // 判断 如果document 并且 isLoading 为true进入
      if (document && isTagScrollLoading.value) {
        const { scrollHeight, clientHeight } = document.documentElement;

        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset || 0;

        // 可滚动的极限高度 = 窗口可见高度 + 滚动的高度 + 200
        const height = clientHeight + scrollTop + 200;
        // touchDown = (页面可滚动内容的高度 - 可滚动的极限高度) < 0
        const touchDown = scrollHeight - height < 0;

        // 进入滚动加载事件,判断是否是向下滚动
        const scrollDown = scrollTop > prevScrollTop.value;

        // 条件全部成立,进入加载
        if (touchDown && scrollDown && isTagScrollLoading.value) {
          // 是否加载设置为false,防止重复加载
          isTagScrollLoading.value = false;

          const tagParams = { tag: route.params.tag, page: currentPage.value + 1 };
          await store.dispatch('getPageTagCardList', tagParams).then(() => {
            // 加载完毕 将当前页数+1
            currentPage.value = currentPage.value + 1;
          });
        }

        // 判断本次加载是否到最后一页 , 如果判断成立则将 isLoading.value设置为false,不成立恢复为true
        if (TagTotalPage.value <= currentPage.value) {
          isTagScrollLoading.value = false;
        } else {
          isTagScrollLoading.value = true;
        }

        // 将当前的scrollTop 赋值给prevScrollTop,用于下次进入滚动加载事件,判断是否是向下滚动
        prevScrollTop.value = scrollTop;
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', windowScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', windowScroll);
    });

    watch(
      () => route.params.tag,
      () => {
        if (route.params.tag) {
          loading();
          // 默认当前页数
          currentPage.value = 1;
          // 是否加载默认设置为true
          isTagScrollLoading.value = true;
        }
      },
    );
    return {
      list,
      loginJudge,
      cardColumnSize,
      tagVal,
    };
  },
});
</script>

<style scoped>
@import '../style/less/viewsStyle/home-reconsitution.css';
</style>
