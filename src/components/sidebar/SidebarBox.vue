<template>
  <div class="sidebar">
    <div class="sidebar_toolbar">
      <div class="sidebar_toolbar_item sidebar_toolbar_item_circle-32" @click="goBack">
        <img src="../../assets/icons/logoTouMing.png" alt="迷鹿" />
      </div>
      <div class="sidebar_toolbar_item sidebar_toolbar_item_circle-32">
        <router-link :to="`/@${loginJudge.id}`" v-if="loginJudge.isLogin && loginJudge.avatar">
          <img :src="`${lostelkUrl}/users/${loginJudge.id}/avatar?size=small`" :alt="loginJudge.name" />
        </router-link>
        <router-link v-else-if="loginJudge.isLogin" :to="`/@${loginJudge.id}`">
          <svg class="icon icon-size-fill" aria-hidden="true">
            <use xlink:href="#icon-touxiangnvhai"></use>
          </svg>
        </router-link>
        <router-link to="/Login" v-else>
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
    <div class="beian"><a style="" href="http://beian.miit.gov.cn/" target="_blank">黑ICP备2020005791号</a></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { lostelkUrl } from '../../global';
import router from '../../router';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    const loginJudge = computed(() => {
      return store.state.user;
    });

    /**
     * 重新加载全部照片并回到首页
     */
    const goBack = () => {
      if (route.path != '/') {
        router.push('/');
        store.commit('mainSearchIsNone', true);
        store.commit('setSearchFailure', false);
      }
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
@import '../../style/less/componentsStyle/sidebar.css';
</style>
