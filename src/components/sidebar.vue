<template>
  <div class="sidebar">
    <div class="sidebar_toolbar">
      <div class="sidebar_toolbar_item sidebar_toolbar_item_circle-32">
        <a href="#"><img src="../assets/icons/logo.jpg" alt="迷鹿"/></a>
      </div>
      <div class="sidebar_toolbar_item sidebar_toolbar_item_circle-32">
        <a href="#"><img src="../assets/images/avatar.gif" alt="用户头像"/></a>
      </div>
      <div class="sidebar_toolbar_item sidebar_toolbar_item_square-32">
        <a href="#">
          <svg class="icon icon-size-fill" aria-hidden="true">
            <use xlink:href="#icon-tubiaolunkuo-"></use>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style>
@import '../style/componentsStyle/sidebar.css';
</style>
