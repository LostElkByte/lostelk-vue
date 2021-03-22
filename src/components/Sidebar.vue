<template>
  <div class="sidebar">
    <div class="sidebar_toolbar">
      <div class="sidebar_toolbar_item sidebar_toolbar_item_circle-32" @click="goBack">
        <img src="../assets/icons/logo.jpg" alt="迷鹿" />
      </div>
      <div class="sidebar_toolbar_item sidebar_toolbar_item_circle-32">
        <a v-if="loginJudge.isLogin && loginJudge.avatar" href="#">
          <img :src="`${lostelkUrl}/users/${loginJudge.id}/avatar?size=small`" alt="用户头像" />
        </a>
        <router-link v-else to="/login">
          <svg class="icon icon-size-fill" aria-hidden="true">
            <use xlink:href="#icon-weidenglutouxiang"></use>
          </svg>
        </router-link>
      </div>
      <div class="sidebar_toolbar_item sidebar_toolbar_item_square-32">
        <router-link to="/UploadPicture">
          <svg class="icon icon-size-fill" aria-hidden="true">
            <use xlink:href="#icon-tubiaolunkuo-"></use>
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { lostelkUrl } from '../global';
import router from '../router';

export default defineComponent({
  setup() {
    const store = useStore();
    const loginJudge = computed(() => {
      return store.state.user;
    });

    /**
     * 重新加载全部照片并回到首页
     */
    const goBack = () => {
      store.dispatch('getCardList').then(() => {
        router.push('/');
        store.commit('setSearchFailure', false);
      });
    };

    return {
      loginJudge,
      lostelkUrl,
      goBack,
    };
  },
});
</script>

<style>
@import '../style/less/componentsStyle/sidebar.css';
</style>
