<template>
  <div class="home-page">
    <Header :user="loginJudge"></Header>
    <Home-main-min-990 v-if="cardColumnSize === 3" :list="list"></Home-main-min-990>
    <Home-main-max-990 v-else-if="cardColumnSize === 2" :list="list"></Home-main-max-990>
    <Home-main-max-767 v-else-if="cardColumnSize === 1" :list="list"></Home-main-max-767>
    <Sidebar></Sidebar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import HomeMainMin990 from '../components/Home-main-min990.vue';
import HomeMainMax990 from '../components/Home-main-max990.vue';
import HomeMainMax767 from '../components/Home-main-max767.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Header,
    Sidebar,
    HomeMainMin990,
    HomeMainMax990,
    HomeMainMax767,
  },
  props: {
    cardColumn: Number,
  },
  setup(props) {
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

    const cardColumnSize = computed(() => props.cardColumn);

    return {
      list,
      loginJudge,
      cardColumnSize,
    };
  },
});
</script>

<style>
/* @import '../style/globalStyle/layout.css'; */
@import '../style/less/viewsStyle/home-reconsitution.css';
</style>
