<template>
  <div class="home-page">
    <Header :user="loginJudge"></Header>
    <CardMain
      :detailsUrlparameter="`tag/${tagVal}/tagCard`"
      :tagName="tagVal"
      :cardColumnSize="cardColumnSize"
      :list="list"
    ></CardMain>
    <Sidebar></Sidebar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import Header from '../components/header/HeaderBox.vue';
import Sidebar from '../components/sidebar/SidebarBox.vue';
import CardMain from '../components/cardMain/CardMain.vue';
import { useRoute } from 'vue-router';
export default defineComponent({
  name: 'Search',
  components: {
    Header,
    Sidebar,
    CardMain,
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

    /**
     * 数据初始化
     */

    // 进行登陆判断
    const loginJudge = computed(() => {
      return store.state.user;
    });

    // 获取页面展示列的数量
    const cardColumnSize = computed(() => props.cardColumn);

    // 获取当前url 的 tag 值
    const tagVal = computed(() => route.params.tag);

    // 加载标签页内容数据函数
    const loading = async () => {
      // 将 没有更多 提示 初始化设置为false
      store.commit('noMore', false);

      await store.dispatch('getSearchValCardList', tagVal.value).then(data => {
        if (store.state.searchCardList.length === 0) {
          //没有搜索到内容 则 修改搜索结果为true, 切换到未没有内容组件
          store.commit('setSearchFailure', true);
          // 将 没有更多 提示 初始化设置为false
          store.commit('noMore', false);
        } else {
          // 搜索到内容将未没有内容提示隐藏,  并且将主页搜索框隐藏
          store.commit('setSearchFailure', false);
          store.commit('mainSearchIsNone', false);
          // 如果总页数等于1
          if (Math.ceil(data.headers['x-total-count'] / 10) === 1) {
            // 将 没有更多 提示 设置为true
            store.commit('noMore', true);
          }
        }
      });
    };

    // 获取列表数据
    const list = computed(() => {
      return store.state.searchCardList;
    });

    /**
     * Tag页加载更多
     */

    // 获取Tag页的卡片总数
    const searchPageCardTotalCount = computed(() => store.state.searchPageCardTotalCount);
    // 计算Tag页的总页数
    const TagTotalPage = computed(() => Math.ceil(searchPageCardTotalCount.value / 10));
    // 默认当前页数
    const currentPage = ref(1);
    // 是否加载默认设置为true
    const isTagScrollLoading = ref(true);

    // 滚动加载事件函数
    const windowScroll = async () => {
      const prevScrollTop = ref(0);

      // 判断 如果document 并且 isLoading 为true进入
      if (document && isTagScrollLoading.value) {
        // 解构 页面可滚动内容的高度 与 窗口可见高度
        const { scrollHeight, clientHeight } = document.documentElement;
        // 获得 滚动的高度 (兼容)
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset || 0;

        // 可滚动的极限高度 = 窗口可见高度 + 滚动的高度 + 200
        const height = clientHeight + scrollTop + 200;

        // touchDown = (页面可滚动内容的高度 - 可滚动的极限高度) < 0
        const touchDown = scrollHeight - height < 0;

        // 进入滚动加载事件,判断是否是向下滚动
        const scrollDown = scrollTop > prevScrollTop.value;

        // 条件全部成立,进入加载
        if (touchDown && scrollDown && isTagScrollLoading.value && TagTotalPage.value > currentPage.value) {
          // 是否加载设置为false,防止重复加载
          isTagScrollLoading.value = false;
          // 禁止显示全局请求加载样式
          store.commit('setIsShowLoading', false);
          // 设置 是否显示加载更多 为 true
          store.commit('isShowLoadingMore', true);
          // 加载下一页数据
          const tagParams = { tag: route.params.tag, page: currentPage.value + 1 };
          await store.dispatch('getPageSearchValCardList', tagParams).then(() => {
            // 加载完毕 将当前页数+1
            currentPage.value = currentPage.value + 1;
          });
          // 加载完毕后 设置 是否显示加载更多 为 false
          store.commit('isShowLoadingMore', false);
        }

        // 判断本次加载是否到最后一页 , 如果判断成立则将 isLoading.value设置为false,不成立恢复为true
        if (TagTotalPage.value <= currentPage.value) {
          isTagScrollLoading.value = false;
          store.commit('noMore', true);
        } else {
          isTagScrollLoading.value = true;
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
      store.commit('mainSearchIsNone', true);
    });

    /**
     * 监听 路由上的tag参数是否发生改变, 如果发生改变 则 重新加载新的标签数据
     */
    watch(
      () => route.params.tag,
      () => {
        if (route.params.tag) {
          loading();
          // 恢复到顶部
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          // 默认当前页数
          currentPage.value = 1;
          // 是否加载默认设置为true
          isTagScrollLoading.value = true;
        }
      },
    );

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
          isTagScrollLoading.value = true;
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
      tagVal,
    };
  },
});
</script>

<style scoped>
@import '../style/less/viewsStyle/home-reconsitution.css';
</style>
