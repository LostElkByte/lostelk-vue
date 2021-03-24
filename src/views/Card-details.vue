<template>
  <div class="shade">
    <div class="arrange">
      <div class="close" @click="close">
        <button class="close-button">
          <div></div>
        </button>
      </div>
      <div class="left-arrow">
        <div class="arrow-box">
          <a>＜</a>
        </div>
      </div>
      <div class="right-arrow">
        <div class="arrow-box">
          <a>＜</a>
        </div>
      </div>
      <div class="content">
        <div class="content-details">
          <div class="content-header"></div>
        </div>
        <div class="content-cards"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from 'vue';
import router from '../router';
export default defineComponent({
  setup() {
    const close = () => {
      const appElement = document.getElementById('app') as HTMLElement;
      appElement.classList.remove('notScroll');
      router.back();
    };
    onMounted(() => {
      const appElement = document.getElementById('app') as HTMLElement;
      appElement.classList.add('notScroll');
    });
    onBeforeUnmount(() => {
      const appElement = document.getElementById('app') as HTMLElement;
      appElement.classList.remove('notScroll');
    });

    return {
      close,
    };
  },
});
</script>

<style>
.notScroll {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  height: 100vh;
}
@import '../style/less/viewsStyle/card-details.css';
</style>
