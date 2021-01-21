<template>
  <div class="home-page">
    <!-- <Header :user="testUserMode"></Header>
    <Home-page-main :list="list"></Home-page-main>
    <Sidebar></Sidebar> -->
    <Login></Login>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import './globalStyle/font/iconfont';
// import { testUserMode, testData } from './testData';
// import HomePageMain from './components/Home-page_main.vue';
// import Sidebar from './components/Sidebar.vue';
// import Header from './components/Header.vue';
import Login from './components/Login.vue';

export default defineComponent({
  name: 'App',
  components: {
    // HomePageMain,
    // Sidebar,
    // Header,
    Login,
  },
  setup() {
    return {
      // list: testData,
      // testUserMode,
    };
  },
});
</script>

<style>
@import './globalStyle/normalize.css';
@import './globalStyle/body.css';
</style>
