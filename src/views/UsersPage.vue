<template>
  <div class="page">
    <Header :user="loginJudge"></Header>
    <div class="main users-page-main">
      <div class="search-results" v-if="!isNull">
        <h1 class="search-results-heading">
          {{ userName }}
        </h1>
        <p class="search-results-description">Browse {{ totalCount }} users about “{{ userName }}”</p>
      </div>
      <div v-if="!isNull" class="users-page-cards">
        <div class="users-card" v-for="(item, index) in userList" :key="index">
          <div class="users-card-header">
            <div class="card-user">
              <div class="card-user-avatar" @click.stop="goPage(item.id)">
                <img
                  v-if="item.avatar"
                  class="content-header-author-photo-32"
                  :src="`${lostelkUrl}/users/${item.id}/avatar?size=medium`"
                  :alt="item.name"
                />
                <svg v-else class="icon" style="width: 100%;height: 100%;" aria-hidden="true">
                  <use xlink:href="#icon-touxiangnvhai"></use>
                </svg>
              </div>
              <div class="card-user-details" @click.stop="goPage(item.id)">
                <span class="card-user-details-name">{{ item.name }}</span>
                <span class="card-user-details-synopsis">{{ item.synopsis || '' }}</span>
              </div>
            </div>
            <div class="card-actions" @click.stop="goPage(item.id)">
              <span>Follow</span>
            </div>
          </div>
          <div class="users-page-posts" v-if="item.files">
            <div
              class="users-page-posts-item"
              v-for="item in item.files"
              :key="item"
              @click="openCardDetail(item.postId)"
            >
              <img :src="`${lostelkUrl}/files/${item.id}/serve?size=large`" />
            </div>
          </div>
          <div class="users-page-posts-null" v-else>
            <span>No shots just yet!</span>
          </div>
        </div>
      </div>
      <SearchFailure v-else :prompt="`No results found for user ${userName}`"></SearchFailure>
      <div class="loading-more" v-show="isShowLoadingMore">
        <span>Loading more…</span>
      </div>
      <div class="no-more" v-if="noMore">
        <span></span>
        <span>No more users</span>
      </div>
    </div>
    <Sidebar></Sidebar>
    <teleport to="#app">
      <router-view :searchName="userName" searchType="user" :isShowDelete="false"></router-view>
    </teleport>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import { lostelkUrl } from '../global';
import Header from '../components/header/HeaderBox.vue';
import Sidebar from '../components/sidebar/SidebarBox.vue';
import SearchFailure from '../components/globalFun/SearchFailure.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import router from '../router';
export default defineComponent({
  name: 'UserPage',
  components: {
    Header,
    Sidebar,
    SearchFailure,
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    // 进行登陆判断
    const loginJudge = computed(() => {
      return store.state.user;
    });

    // 搜索结果是否为空
    const isNull = ref(false);

    // 是否显示加载状态
    const isShowLoadingMore = ref(false);
    const noMore = ref(false);

    // 搜索内容
    const userName = computed(() => route.params.val);
    // 用户总数
    const totalCount = ref();
    // 用户列表
    const userList = ref();

    /**
     * 加载用户页内容数据函数
     */
    const loading = async () => {
      // 将 没有更多 提示 初始化设置为false
      noMore.value = false;
      await store.dispatch('getSearchValCardBriefList', { val: userName.value, type: 'user' }).then(res => {
        if (res.headers['x-total-count'] == 0) {
          //没有搜索到内容 则 修改搜索结果为true, 切换到未没有内容组件
          isNull.value = true;
          // 将 没有更多 提示 初始化设置为false
          noMore.value = false;
        } else {
          // 搜索到内容将未没有内容提示隐藏,  并且将主页搜索框隐藏
          store.commit('setSearchFailure', false);
          // store.commit('mainSearchIsNone', false);
          isNull.value = false;
          totalCount.value = res.headers['x-total-count'];
          userList.value = res.data;
          // 如果总页数等于1
          if (Math.ceil(res.headers['x-total-count'] / 10) === 1) {
            // 将 没有更多 提示 设置为true
            noMore.value = true;
          }
        }
      });
    };

    /**
     * 用户列表页加载更多
     */
    // 计算用户列表的总页数
    const totalPage = computed(() => Math.ceil(totalCount.value / 10));
    // 默认当前页数
    const currentPage = ref(1);
    // 是否加载默认设置为true
    const isScrollLoading = ref(true);

    /**
     * 滚动加载事件函数
     */
    const windowScroll = async () => {
      const prevScrollTop = ref(0);

      // 判断 如果document 并且 isLoading 为true进入
      if (document && isScrollLoading.value) {
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
        if (touchDown && scrollDown && isScrollLoading.value && totalPage.value > currentPage.value) {
          // 是否加载设置为false,防止重复加载
          isScrollLoading.value = false;
          // 禁止显示全局请求加载样式
          store.commit('setIsShowLoading', false);
          // 设置 是否显示加载更多 为 true
          isShowLoadingMore.value = true;
          // 加载下一页数据
          const searchParams = { val: userName.value, page: currentPage.value + 1 };
          await store.dispatch('getPageSearchValUsersList', searchParams).then(res => {
            userList.value = [...userList.value, ...res.data];
            // 加载完毕 将当前页数+1
            currentPage.value = currentPage.value + 1;
          });
          // 加载完毕后 设置 是否显示加载更多 为 false
          isShowLoadingMore.value = false;
        }

        // 判断本次加载是否到最后一页 , 如果判断成立则将 isLoading.value设置为false,不成立恢复为true
        if (totalPage.value <= currentPage.value) {
          isScrollLoading.value = false;
          noMore.value = true;
        } else {
          isScrollLoading.value = true;
          noMore.value = false;
        }

        // 将当前的scrollTop 赋值给prevScrollTop,用于下次进入滚动加载事件,判断是否是向下滚动
        prevScrollTop.value = scrollTop;
      }
    };

    /**
     * 进入用户页
     */
    const goPage = (userId: number) => {
      router.push(`/@${userId}`);
    };

    /**
     * 打开展示图片
     */
    const openCardDetail = async (postId: number) => {
      // 将body设置为不可滚动
      document.body.style.overflow = 'hidden';

      await store.commit('showCommentsCut', false);
      await router.push(`/search/user/${userName.value}/searchCard/${postId}`);
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
     * 监听 路由上val参数是否发生改变, 如果发生改变 则 重新加载新的标签数据
     */
    watch(
      () => route.params.val,
      () => {
        if (route.params.val) {
          loading();
          // 恢复到顶部
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          // 默认当前页数
          currentPage.value = 1;
          // 是否加载默认设置为true
          isScrollLoading.value = true;
        }
      },
    );

    return {
      lostelkUrl,
      loginJudge,
      userName,
      totalCount,
      userList,
      isShowLoadingMore,
      isNull,
      noMore,
      goPage,
      openCardDetail,
    };
  },
});
</script>

<style scoped>
@import '../style/less/globalStyle/layout.css';
@import '../style/less/viewsStyle/uers-page.css';
</style>
