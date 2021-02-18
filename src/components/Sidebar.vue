<template>
  <div class="sidebar">
    <div class="sidebar_toolbar">
      <div class="sidebar_toolbar_item sidebar_toolbar_item_circle-32">
        <router-link to="/">
          <img src="../assets/icons/logo.jpg" alt="迷鹿" />
        </router-link>
      </div>
      <div class="sidebar_toolbar_item sidebar_toolbar_item_circle-32">
        <a v-if="loginJudge.isLogin" href="#">
          <img src="../assets/images/avatar.gif" alt="用户头像" />
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

export default defineComponent({
  setup() {
    const store = useStore();
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
@import '../style/componentsStyle/sidebar.css';
</style>
