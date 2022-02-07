<template>
  <div class="home-page">
    <Header :user="loginJudge"></Header>
    <CardMain :detailsUrlparameter="`card`" :cardColumnSize="cardColumnSize" :list="list"></CardMain>
    <Sidebar></Sidebar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import Header from '../components/header/HeaderBox.vue';
import Sidebar from '../components/sidebar/SidebarBox.vue';
import CardMain from '../components/cardMain/CardMain.vue';
export default defineComponent({
  name: 'Home',
  components: {
    Header,
    Sidebar,
    CardMain,
  },
  props: {
    cardColumn: Number,
  },
  setup(props) {
    const store = useStore();

    /**
     * 数据初始化
     */

    // 获取页面展示列的数量
    const cardColumnSize = computed(() => props.cardColumn);

    // 进行登陆判断
    const loginJudge = computed(() => {
      return store.state.user;
    });

    // 加载首页数据函数
    const loading = async () => {
      // 将 没有更多 提示  初始化设置为false
      store.commit('noMore', false);
      await store.dispatch('getCardList').then(data => {
        // 如果总页数等于1
        if (Math.ceil(data.headers['x-total-count'] / 10) === 1) {
          // 将 没有更多 提示 设置为true
          store.commit('noMore', true);
        }
      });
    };

    // 获取列表数据
    const list = computed(() => {
      return store.state.cardList;
    });

    /**
     * HOME页加载更多
     */

    // 获取home页的卡片总数
    const homePageCardTotalCount = computed(() => store.state.homePageCardTotalCount);
    // 计算home页的总页数
    const homeTotalPage = computed(() => Math.ceil(homePageCardTotalCount.value / 10));
    // 默认当前页数
    const currentPage = ref(1);
    // 是否加载默认设置为true
    const isHomeScrollLoading = ref(true);

    // 滚动加载事件函数
    const windowScroll = async () => {
      const prevScrollTop = ref(0);
      // 判断 如果document 并且 isLoading 为true进入
      if (document && isHomeScrollLoading.value) {
        // 解构 页面可滚动内容的高度 与 窗口可见高度
        const { scrollHeight, clientHeight } = document.documentElement;
        // 获得 滚动的高度 (兼容)
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset || 0;

        // 可滚动的极限高度 = 窗口可见高度 + 滚动的高度 + 200 (距离底部200像素时触发)
        const height = clientHeight + scrollTop + 200;
        // touchDown = (页面可滚动内容的高度 - 可滚动的极限高度) < 0
        const touchDown = scrollHeight - height < 0;

        // 进入滚动加载事件,判断是否是向下滚动
        const scrollDown = scrollTop > prevScrollTop.value;

        // 条件全部成立,进入加载
        if (touchDown && scrollDown && isHomeScrollLoading.value && homeTotalPage.value > currentPage.value) {
          // 是否加载 设置为false,防止重复加载
          isHomeScrollLoading.value = false;
          // 禁止显示全局请求加载样式
          store.commit('setIsShowLoading', false);
          // 设置 是否显示加载更多 为 true
          store.commit('isShowLoadingMore', true);
          // 加载下一页数据
          await store.dispatch('getPageCardList', currentPage.value + 1).then(() => {
            // 加载完毕 将当前页数+1
            currentPage.value = currentPage.value + 1;
          });
          // 加载完毕后 设置 是否显示加载更多 为 false
          store.commit('isShowLoadingMore', false);
        }

        // 判断本次加载是否到最后一页 , 如果判断成立则将 isLoading.value设置为false,不成立恢复为true
        if (homeTotalPage.value <= currentPage.value) {
          isHomeScrollLoading.value = false;
          store.commit('noMore', true);
        } else {
          isHomeScrollLoading.value = true;
          store.commit('noMore', false);
        }

        // 将当前的scrollTop 赋值给prevScrollTop,用于下次进入滚动加载事件,判断是否是向下滚动
        prevScrollTop.value = scrollTop;
      }
    };

    onMounted(async () => {
      // 组件装载时进行加载数据
      await loading();

      // 初始化定位页面为顶部
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      // 组件创建时监听scroll事件
      window.addEventListener('scroll', windowScroll);
    });

    onUnmounted(() => {
      // 组件卸载时卸载scroll事件
      window.removeEventListener('scroll', windowScroll);
    });

    /**
     * 监听againRequest(用于删除功能后触发 重新加载数据)
     */
    watch(
      () => store.state.againRequest,
      () => {
        if (store.state.againRequest === true) {
          // 默认当前页数
          currentPage.value = 1;
          // 是否加载默认设置为true
          isHomeScrollLoading.value = true;
          // 恢复到顶部
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          // 恢复 againRequest 为 false
          store.commit('againRequest', false);
        }
      },
    );

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
