<template>
  <div class="home-page">
    <Header :user="loginJudge"></Header>
    <HomeMainReconsitution :cardColumnSize="cardColumnSize" :list="list"></HomeMainReconsitution>
    <Sidebar></Sidebar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { useStore } from 'vuex';
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import HomeMainReconsitution from '../components/Home-main-reconsitution.vue';
export default defineComponent({
  name: 'Home',
  components: {
    Header,
    Sidebar,
    HomeMainReconsitution,
  },
  props: {
    cardColumn: Number,
  },
  setup(props) {
    const store = useStore();

    onMounted(() => {
      store.dispatch('getCardList');
    });
    const list = computed(() => {
      return store.state.cardList;
    });
    const loginJudge = computed(() => {
      return store.state.user;
    });

    // 获取页面展示列的数量
    const cardColumnSize = computed(() => props.cardColumn);

    /**
     * 加载更多
     */

    // 获取home页的卡片总数
    const homePageCardTotalCount = computed(() => store.state.homePageCardTotalCount);
    // 计算home页的总页数
    const homeTotalPage = computed(() => Math.ceil(homePageCardTotalCount.value / 20));
    // 默认当前页数
    const currentPage = ref(1);
    // 是否加载默认设置为true
    const isLoading = ref(true);

    // 滚动加载事件函数
    const windowScroll = async () => {
      const prevScrollTop = ref(0);

      // 判断 如果document 并且 isLoading 为true进入
      if (document && isLoading.value) {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        // 可滚动的极限高度 = 窗口可见高度 + 滚动的高度 + 200
        const height = clientHeight + scrollTop + 200;
        // touchDown = (页面可滚动内容的高度 - 可滚动的极限高度) < 0
        const touchDown = scrollHeight - height < 0;

        // 进入滚动加载事件,判断是否是向下滚动
        const scrollDown = scrollTop > prevScrollTop.value;

        // 条件全部成立,进入加载
        if (touchDown && scrollDown && isLoading.value) {
          // 是否加载设置为false,防止重复加载
          isLoading.value = false;

          await store.dispatch('getPageCardList', currentPage.value + 1).then(() => {
            // 加载完毕 将当前页数+1
            currentPage.value = currentPage.value + 1;
          });
        }

        // 判断本次加载是否到最后一页 , 如果判断成立则将 isLoading.value设置为false,不成立恢复为true
        if (homeTotalPage.value <= currentPage.value) {
          isLoading.value = false;
        } else {
          isLoading.value = true;
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

    return {
      list,
      loginJudge,
      cardColumnSize,
    };
  },
});
</script>

<style scoped>
@import '../style/less/viewsStyle/home-reconsitution.css';
</style>
