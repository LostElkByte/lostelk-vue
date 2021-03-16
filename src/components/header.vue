<template>
  <div class="header">
    <div class="header-left">
      <div class="header-title">
        <span>LostElk</span>
        <span>
          Photos for everyone
        </span>
      </div>
      <HeaderSearch></HeaderSearch>
    </div>
    <div class="header_toolbar">
      <div v-if="!user.isLogin">
        <div class="header_loginRegister_item">
          <router-link to="/Login">登陆</router-link>
        </div>
        <div class="header_loginRegister_item">
          <router-link to="/Reglister">注册</router-link>
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
              <router-link to="/Login">登陆</router-link>
              <router-link to="/Reglister">注册</router-link>
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
            <a href="#">个人主页</a>
            <a href="#">发表作品</a>
            <a href="#" @click="logout">退出登录</a>
          </template>
        </DropDownList>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';
import DropDownList from './Drop-down-list.vue';
import HeaderSearch from './Header-search.vue';
export interface UserMode {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export default defineComponent({
  name: 'Header',
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
    const store = useStore();
    const logout = () => {
      store.commit('logout');
    };
    return {
      logout,
    };
  },
});
</script>

<style>
@import '../style/componentsStyle/header.css';
</style>
