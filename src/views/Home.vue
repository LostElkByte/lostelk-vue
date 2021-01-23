<template>
  <div class="home-page">
    <Header :user="testUserMode">></Header>
    <HomeMain :list="list"></HomeMain>
    <Sidebar></Sidebar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import HomeMain from '../components/Home-main.vue';
import { testUserMode, testData } from '../testData';

export default defineComponent({
  name: 'Home',
  components: {
    Header,
    Sidebar,
    HomeMain,
  },
  setup() {
    return {
      list: testData,
      testUserMode,
    };
  },
});
</script>

<style>
@import '../style/viewsStyle/home.css';
</style>
