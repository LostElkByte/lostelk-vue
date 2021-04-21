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
              <div class="masthead-banner-image">
                <img class="yin-zhang" src="../assets/images/yinZhang.png" alt="" />
              </div>
            </div>
          </div>
          <div class="user-data-content">
            <div class="user-data-content-avatar">
              <img src="../assets/images/avatar.gif" alt="" />
            </div>
            <div class="user-data-content-name">
              <h1>Lostelk</h1>
            </div>
            <div class="user-data-content-intro">
              <h2>Hello, my name is 麋鹿. Nice to meet you!</h2>
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
              <a href="#"><span>Photos</span> <span>16</span></a>
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import Header from '../components/HeaderBox.vue';
import Sidebar from '../components/SidebarBox.vue';

export default defineComponent({
  name: 'PersonalHomePage',
  components: {
    Header,
    Sidebar,
  },

  setup() {
    const store = useStore();
    /**
     * 判断是否登录,用于header组件
     */
    const loginJudge = computed(() => {
      return store.state.user;
    });

    return {
      loginJudge,
    };
  },
});
</script>

<style>
@import '../style/less/globalStyle/layout.css';
@import '../style/less/viewsStyle/personal-home-page.css';
</style>
