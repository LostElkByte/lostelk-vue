<template>
  <div class="header">
    <div class="header-left">
      <div class="header-title" @click="goBack">
        <span>MINUSONE</span>
        <span>
          since 2017.10
        </span>
      </div>
      <HeaderSearch></HeaderSearch>
    </div>
    <div class="header_toolbar">
      <div v-if="!user.isLogin">
        <div class="header_loginRegister_item">
          <router-link to="/Login">Sign in</router-link>
        </div>
        <div class="header_loginRegister_item sign-up">
          <router-link to="/Reglister">Sign up</router-link>
        </div>
        <div class="w1024">
          <DropDownList>
            <template v-slot:dropdown>
              <span href="#" class="dropbtn">
                <svg class="icon icon-size-fill" aria-hidden="true">
                  <use xlink:href="#icon-celanliebiaogengduo"></use>
                </svg>
              </span>
            </template>
            <template v-slot:dropdown-content>
              <router-link to="/Login" class="dropdown-sign-in">登陆</router-link>
              <router-link to="/Reglister" class="dropdown-sign-up">加入MINUSONE TEAM</router-link>
            </template>
          </DropDownList>
        </div>
      </div>

      <div v-else>
        <DropDownList>
          <template v-slot:dropdown>
            <span href="#" class="dropbtn">
              <svg class="icon icon-size-fill" aria-hidden="true">
                <use xlink:href="#icon-celanliebiaogengduo"></use>
              </svg>
            </span>
          </template>
          <template v-slot:dropdown-content>
            <router-link :to="`/@${userId}`">个人主页</router-link>
            <router-link to="/UploadPicture">发表作品</router-link>
            <a href="#" @click="logout">退出登录</a>
          </template>
        </DropDownList>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';
import router from '../../router';
import { useRoute } from 'vue-router';
import DropDownList from '../globalFun/DropDownList.vue';
import HeaderSearch from '../search/HeaderSearch.vue';
export interface UserMode {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export default defineComponent({
  name: 'HeaderBox',
  components: {
    DropDownList,
    HeaderSearch,
  },
  props: {
    user: {
      type: Object as PropType<UserMode>,
      required: true,
    },
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const logout = () => {
      store.commit('logout');
    };
    const userId = computed(() => {
      return store.state.user.id;
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
      logout,
      goBack,
      userId,
    };
  },
});
</script>

<style>
@import '../../style/less/componentsStyle/header.css';
</style>
