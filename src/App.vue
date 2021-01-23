<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import './style/globalStyle/font/iconfont';

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    return {};
  },
});
</script>

<style>
@import './style/globalStyle/normalize.css';
@import './style/globalStyle/body.css';
</style>
