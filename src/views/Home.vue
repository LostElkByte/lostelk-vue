<template>
  <div class="home-page">
    <Header :user="loginJudge"></Header>
    <HomeMain :list="list"></HomeMain>
    <Sidebar></Sidebar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import HomeMain from '../components/Home-main.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Header,
    Sidebar,
    HomeMain,
  },
  setup() {
    const store = useStore();
    const list = computed(() => {
      return store.state.columns;
    });
    const loginJudge = computed(() => {
      return store.state.user;
    });
    return {
      list,
      loginJudge,
    };
  },
});
</script>

<style>
@import '../style/globalStyle/layout.css';
@import '../style/viewsStyle/home.css';
</style>
