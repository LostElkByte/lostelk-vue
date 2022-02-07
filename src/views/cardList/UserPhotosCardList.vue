<template>
  <PersonalCardMain :list="list" :cardColumnSize="column" :detailsUrlparameter="`@${UserIdProp}`"></PersonalCardMain>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import PersonalCardMain from '../../components/cardMain/PersonalCardMain.vue';
import store from '../../store';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  name: 'UserPhotosListCard',
  inheritAttrs: false,
  components: {
    PersonalCardMain,
  },
  props: {
    cardColumn: Number,
    UserId: {
      type: String,
      required: true,
    },
    likeList: {
      type: Array,
      required: false,
    },
  },
  setup(props) {
    const route = useRoute();
    const column = computed(() => props.cardColumn);

    // 获取当前个人页的用户ID
    const UserIdProp = computed(() => Number(props.UserId));

    // 获取第一页数据
    const list = computed(() => store.state.userPhotosCardList);

    const userPhotosCardTotalCount = ref();
    // 获取列表总数量
    axios.get(`/posts?user=${UserIdProp.value}&action=published`).then(data => {
      userPhotosCardTotalCount.value = data.headers['x-total-count'];
    });

    // 获取列表总数量
    // const userPhotosCardTotalCount = computed(() => store.state.userPhotosCardTotalCount);

    /**
     * 样式控制
     */
    // 将 没有更多 提示  初始化设置为false
    store.commit('noMore', false);

    if (list.value.length === 0) {
      //没有搜索到内容 则 修改搜索结果为true, 切换到未没有内容组件
      store.commit('setSearchFailure', false);
    } else {
      // 搜索到内容将未没有内容提示隐藏,  并且将主页搜索框隐藏
      store.commit('setSearchFailure', false);
      // 如果总页数等于1
      if (Math.ceil(userPhotosCardTotalCount.value / 10) === 1) {
        // 将 没有更多 提示 设置为true
        store.commit('noMore', true);
      }
    }

    /**
     *userPhotos页加载更多
     */

    // 计算UserPhotos页的总页数
    const userPhotosTotalPage = computed(() => Math.ceil(userPhotosCardTotalCount.value / 10));
    // 获取当前加载的UserPhotos卡片的数量
    const userPhotosTotalNumber = computed(() =>
      store.state.userPhotosCardList.length === 0 ? 1 : Math.ceil(store.state.userPhotosCardList.length / 10),
    );
    // 默认当前页数
    const currentPage = ref(userPhotosTotalNumber.value);
    // 是否加载默认设置为true
    const isUserPhotosScrollLoading = ref(true);

    // 滚动加载事件函数
    const windowScroll = async () => {
      const prevScrollTop = ref(0);

      // 判断 如果document 并且 isLoading 为true进入
      if (document && isUserPhotosScrollLoading.value) {
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
        if (
          touchDown &&
          scrollDown &&
          isUserPhotosScrollLoading.value &&
          userPhotosTotalPage.value > currentPage.value
        ) {
          // 是否加载设置为false,防止重复加载
          isUserPhotosScrollLoading.value = false;
          // 禁止显示全局请求加载样式
          store.commit('setIsShowLoading', false);
          // 设置 是否显示加载更多 为 true
          store.commit('isShowLoadingMore', true);
          // 加载下一页数据
          const userPhotosParams = { userId: UserIdProp.value, page: currentPage.value + 1 };
          await store.dispatch('getPageUserPhotosCardList', userPhotosParams).then(() => {
            // 加载完毕 将当前页数+1
            currentPage.value = currentPage.value + 1;
          });
          // 加载完毕后 设置 是否显示加载更多 为 false
          store.commit('isShowLoadingMore', false);
        }

        // 判断本次加载是否到最后一页 , 如果判断成立则将 isLoading.value设置为false,不成立恢复为true
        if (userPhotosTotalPage.value <= currentPage.value) {
          isUserPhotosScrollLoading.value = false;
          store.commit('noMore', true);
        } else {
          isUserPhotosScrollLoading.value = true;
          store.commit('noMore', false);
        }

        // 将当前的scrollTop 赋值给prevScrollTop,用于下次进入滚动加载事件,判断是否是向下滚动
        prevScrollTop.value = scrollTop;
      }
    };

    onMounted(async () => {
      // 组件创建时监听scroll事件
      window.addEventListener('scroll', windowScroll);
    });

    onUnmounted(() => {
      // 组件卸载时卸载scroll事件
      window.removeEventListener('scroll', windowScroll);
    });

    /**
     * 监听 路由上的UserId参数是否发生改变, 如果发生改变 则 重新加载新的标签数据
     */
    watch(
      () => route.params.UserId,
      () => {
        if (route.params.UserId) {
          // 默认当前页数
          currentPage.value = 1;
          // 是否加载默认设置为true
          isUserPhotosScrollLoading.value = true;
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
          isUserPhotosScrollLoading.value = true;
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
      column,
      UserIdProp,
    };
  },
});
</script>

<style></style>
