<template>
  <div class="home-page">
    <Header :user="loginJudge"></Header>
    <HomeMainReconsitution :cardColumnSize="cardColumnSize" :list="list"></HomeMainReconsitution>
    <Sidebar></Sidebar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import HomeMainReconsitution from '../components/Home-main-reconsitution.vue';
export default defineComponent({
  name: 'Home',
  components: {
    Header,
    Sidebar,
    HomeMainReconsitution,
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

<style scoped>
@import '../style/less/viewsStyle/home-reconsitution.css';
</style>
