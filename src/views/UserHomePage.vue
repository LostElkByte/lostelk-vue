<template>
  <div class="page">
    <Header :user="loginJudge"></Header>
    <Sidebar></Sidebar>

    <div class="main personal-home-page">
      <section class="user-data">
        <div class="container-large">
          <div class="user-data-images">
            <div class="user-data-image">
              <div
                id="color-block-container"
                class="user-data-color-block-container"
              ></div>
              <div
                v-if="userPhotosCardlist[0]"
                class="masthead-banner-image"
                :style="
                  userPhotosCardlist[0]
                    ? `background-image: url(${lostelkUrl}/files/${userPhotosCardlist[0].file.id}/serve?size=large)`
                    : ''
                "
              >
                <img
                  class="yin-zhang"
                  src="../assets/images/yinZhang.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <canvas style="display: none" id="canvas"></canvas>
          <div class="user-data-content" v-if="userData">
            <div class="user-data-content-avatar">
              <img
                v-if="userData.avatar"
                :src="`${lostelkUrl}/users/${userData.id}/avatar`"
                :alt="userData.name"
              />

              <svg
                v-else
                class="icon"
                aria-hidden="true"
                style="width: 100%;height: 100%"
              >
                <use xlink:href="#icon-touxiangnvhai"></use>
              </svg>
            </div>
            <div class="user-data-content-name">
              <h1>{{ userData.name }}</h1>
            </div>
            <div class="user-data-content-intro">
              <h2 v-if="userData.synopsis">'{{ userData.synopsis }}'</h2>
              <h2 v-else>
                'Hello, my name is {{ userData.name }}. Nice to meet you!'
              </h2>
            </div>
          </div>
        </div>
      </section>
      <div class="personal-home-navigation">
        <div class="profile-subnav">
          <ul class="scrolling-subnav-list">
            <router-link :to="`/@${UserIdProp}`">
              <li>
                <svg class="icon scrolling-subnav-icon" aria-hidden="true">
                  <use xlink:href="#icon-zhaopian"></use>
                </svg>
                <span>Photos</span>
                <span>{{ userPhotosCardTotalCount }}</span>
              </li>
            </router-link>

            <router-link :to="`/@${UserIdProp}/likes`">
              <li>
                <svg class="icon scrolling-subnav-icon" aria-hidden="true">
                  <use xlink:href="#icon-xihuan4"></use>
                </svg>
                <span>Likes</span>
                <span>{{ userLikeCardTotalCount }}</span>
              </li>
            </router-link>
            <router-link :to="`/@${UserIdProp}/Account`">
              <li v-if="userId === UserIdProp || userId === 1">
                <svg class="icon scrolling-subnav-icon" aria-hidden="true">
                  <use xlink:href="#icon-zhanghaoguanli1"></use>
                </svg>
                <span>Account</span>
              </li>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="user-content">
        <router-view :cardColumn="cardColumnSize"></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  watch,
  onUnmounted
} from 'vue';
import { useStore } from 'vuex';
import { lostelkUrl } from '../global';
import Header from '../components/header/HeaderBox.vue';
import Sidebar from '../components/sidebar/SidebarBox.vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'UserHomePage',
  components: {
    Header,
    Sidebar
  },
  props: {
    cardColumn: Number,
    UserId: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const route = useRoute();
    const store = useStore();
    // 获取页面展示列的数量
    const cardColumnSize = computed(() => props.cardColumn);
    // 获取当前登陆的用户ID
    const userId = computed(() => store.state.user.id);
    // 获取当前个人页的用户ID
    const UserIdProp = computed(() => Number(props.UserId));

    /**
     * 判断是否登录,用于header组件
     */
    const loginJudge = computed(() => {
      return store.state.user;
    });

    /**
     * 获取指定用户的信息
     */
    const userData = ref();
    try {
      axios.get(`${lostelkUrl}/users/${UserIdProp.value}`).then(data => {
        userData.value = data.data;
      });
    } catch (error) {
      console.log(error);
    }

    /**
     * 获取指定用户发表的内容列表
     */
    const userPhotosCardlist = computed(() => store.state.userPhotosCardList);
    const userPhotosCardTotalCount = computed(
      () => store.state.userPhotosCardTotalCount
    );
    const fileMetadata = ref();
    store.dispatch('getUserPhotosCardList', UserIdProp.value).then(res => {
      // 请求获取图像文件元信息
      if (!res.data[0]) return;
      store.dispatch('getFileMetadata', res.data[0].file.id).then(data => {
        if (data.mainColor) {
          const colorBlock = document.getElementById(
            'color-block-container'
          ) as HTMLElement;
          colorBlock.style.backgroundColor = data.mainColor;
        }
      });
    });

    /**
     * 在内容列表发生改变时,请求获取图像文件元信息
     */
    watch(
      () => userPhotosCardlist.value,
      () => {
        // 请求获取图像文件元信息
        if (!userPhotosCardlist.value[0]) return;
        store
          .dispatch('getFileMetadata', userPhotosCardlist.value[0].file.id)
          .then(data => {
            if (data.mainColor) {
              const colorBlock = document.getElementById(
                'color-block-container'
              ) as HTMLElement;
              colorBlock.style.backgroundColor = data.mainColor;
            }
          });
      }
    );

    /**
     * 获取指定用户喜欢的内容列表
     */
    const userLikeCardlist = computed(() => store.state.userLikeCardList);
    const userLikeCardTotalCount = computed(
      () => store.state.userLikeCardTotalCount
    );
    store.dispatch('getUserLikeCardList', UserIdProp.value);

    /**
     * 监听 路由上的UserId参数是否发生改变, 如果发生改变 则 重新加载新的数据
     */
    watch(
      () => route.params.UserId,
      () => {
        if (route.params.UserId) {
          try {
            store.dispatch(
              'getUserPhotosCardList',
              Number(route.params.UserId)
            );
            store.dispatch('getUserLikeCardList', Number(route.params.UserId));
            axios
              .get(`${lostelkUrl}/users/${Number(route.params.UserId)}`)
              .then(data => {
                userData.value = data.data;
              });
          } catch (error) {
            console.log(error);
          }
          // 恢复到顶部
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }
      }
    );

    onMounted(() => {
      // 恢复到顶部
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    onUnmounted(() => {
      store.commit('getUserPhotosCardList', []);
      store.commit('getUserLikeCardList', []);
      store.commit('getHomePageCardTotalCount', 0);
      store.commit('getUserLikeCardTotalCount', 0);
    });

    return {
      loginJudge,
      userPhotosCardlist,
      userPhotosCardTotalCount,
      cardColumnSize,
      UserIdProp,
      lostelkUrl,
      userData,
      userId,
      userLikeCardTotalCount,
      userLikeCardlist,
      fileMetadata
    };
  }
});
</script>

<style scoped>
@import '../style/less/globalStyle/layout.css';
@import '../style/less/viewsStyle/personal-home-page.css';
</style>
