<template>
  <div class="page">
    <Header :user="loginJudge"></Header>
    <Sidebar></Sidebar>
    <div class="main personal-home-page">
      <section class="user-data">
        <div class="container-large">
          <div class="user-data-images">
            <div class="user-data-image">
              <div class="user-data-color-block-container">
                <div class="color-block"></div>
              </div>
              <div
                v-if="userCardlist[0]"
                class="masthead-banner-image"
                :style="
                  userCardlist[0]
                    ? `background-image: url(${lostelkUrl}/files/${userCardlist[0].file.id}/serve?size=medium)`
                    : ''
                "
              >
                <img class="yin-zhang" src="../assets/images/yinZhang.png" alt="" />
              </div>
            </div>
          </div>
          <div class="user-data-content" v-if="userData">
            <div class="user-data-content-avatar">
              <img v-if="userData.avatar" :src="`${lostelkUrl}/users/${userData.id}/avatar`" :alt="userData.name" />

              <svg v-else class="icon" aria-hidden="true" style="width: 100%;height: 100%">
                <use xlink:href="#icon-weidenglu"></use>
              </svg>
            </div>
            <div class="user-data-content-name">
              <h1>{{ userData.name }}</h1>
            </div>
            <div class="user-data-content-intro">
              <h2>Hello, my name is {{ userData.name }}. Nice to meet you!</h2>
            </div>
          </div>
        </div>
      </section>
      <div class="personal-home-navigation">
        <div class="profile-subnav">
          <ul class="scrolling-subnav-list">
            <li class="active">
              <svg class="icon scrolling-subnav-icon" aria-hidden="true">
                <use xlink:href="#icon-zhaopian"></use>
              </svg>
              <a href="#">
                <span>Photos</span> <span>{{ userCardTotalCount }}</span>
              </a>
            </li>
            <li>
              <a href="#">
                <svg class="icon scrolling-subnav-icon" aria-hidden="true">
                  <use xlink:href="#icon-xihuan4"></use>
                </svg>

                <span>Likes</span>
                <span>120</span>
              </a>
            </li>
            <li>
              <a href="#">
                <svg class="icon scrolling-subnav-icon" aria-hidden="true">
                  <use xlink:href="#icon-zhanghaoguanli1"></use>
                </svg>
                <span>Account</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="user-content">
        <PersonalCardMain
          :detailsUrlparameter="`@${userIdProp}`"
          :cardColumnSize="cardColumnSize"
          :list="userCardlist"
        ></PersonalCardMain>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { lostelkUrl } from '../global';
import Header from '../components/header/HeaderBox.vue';
import Sidebar from '../components/sidebar/SidebarBox.vue';
import PersonalCardMain from '../components/cardMain/PersonalCardMain.vue';
import axios from 'axios';

export default defineComponent({
  name: 'PersonalHomePage',
  components: {
    Header,
    Sidebar,
    PersonalCardMain,
  },
  props: {
    cardColumn: Number,
    CardUserId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    onMounted(() => {
      // 恢复到顶部
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
    const store = useStore();
    // 获取页面展示列的数量
    const cardColumnSize = computed(() => props.cardColumn);

    const userIdProp = computed(() => Number(props.CardUserId));

    const userData = ref();
    /**
     * 获取指定用户的信息
     */
    try {
      axios.get(`${lostelkUrl}/users/${userIdProp.value}`).then(data => {
        userData.value = data.data;
      });
    } catch (error) {
      console.log(error);
    }

    /**
     * 获取指定用户发表的内容列表
     */
    store.dispatch('getUserCardList', userIdProp.value).then(data => {
      if (store.state.userCardList.length === 0) {
        //没有搜索到内容 则 修改搜索结果为true, 切换到未没有内容组件
        store.commit('setSearchFailure', false);
      } else {
        // 搜索到内容将未没有内容提示隐藏,  并且将主页搜索框隐藏
        store.commit('setSearchFailure', false);
        // 如果总页数等于1
        if (Math.ceil(data.headers['x-total-count'] / 20) === 1) {
          // 将 没有更多 提示 设置为true
          store.commit('noMore', true);
        }
      }
    });
    const userCardlist = computed(() => store.state.userCardList);
    const userCardTotalCount = computed(() => store.state.userCardTotalCount);

    /**
     * 判断是否登录,用于header组件
     */
    const loginJudge = computed(() => {
      return store.state.user;
    });

    return {
      loginJudge,
      userCardlist,
      userCardTotalCount,
      cardColumnSize,
      userIdProp,
      lostelkUrl,
      userData,
    };
  },
});
</script>

<style>
@import '../style/less/globalStyle/layout.css';
@import '../style/less/viewsStyle/personal-home-page.css';
</style>
