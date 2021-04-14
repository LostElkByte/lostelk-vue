<template>
  <div class="home-page">
    <Header :user="loginJudge"></Header>
    <HomeMainReconsitution :cardColumnSize="cardColumnSize" :list="list"></HomeMainReconsitution>
    <Sidebar></Sidebar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted } from 'vue';
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

    const windowScroll = () => {
      // let isLoading = false;
      console.log('windowScroll函数');
      // const bottomOfWindow = (document.documentElement.offsetHeight -
      //   document.documentElement.scrollTop -
      //   window.innerHeight <=
      //   200) as boolean;
      // console.log(bottomOfWindow);
      // if (bottomOfWindow && isLoading == false) {
      //   isLoading = true;
      //   await store.dispatch('getPageCardList', 2);
      //   isLoading = false;
      // }
    };

    onMounted(() => {
      window.addEventListener('scroll', windowScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', windowScroll);
    });

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
