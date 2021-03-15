<template>
  <div class="home-page">
    <Header :user="loginJudge"></Header>
    <HomeMain :list="list"></HomeMain>
    <Sidebar></Sidebar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
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

    onMounted(() => {
      store.dispatch('getCardList');
    });
    const list = computed(() => {
      return store.state.cardList;
    });
    const loginJudge = computed(() => {
      return store.state.user;
    });

    const ceshi = ref(1);
    function resize() {
      if (document.documentElement.clientWidth > 990) {
        ceshi.value = 0;
      } else if (document.documentElement.clientWidth > 767) {
        ceshi.value = 1;
      } else if (document.documentElement.clientWidth < 767) {
        ceshi.value = 2;
      }
    }
    window.onresize = resize;

    return {
      list,
      loginJudge,
      ceshi,
    };
  },
});
</script>

<style>
@import '../style/globalStyle/layout.css';
@import '../style/viewsStyle/home.css';
</style>
