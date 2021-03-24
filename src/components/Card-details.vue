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
      router.push('/');
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
.shade {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999999;
  overflow: auto;
}

.close {
  position: fixed;
  top: 0;
  left: 0;
  margin-top: 8px;
  margin-left: 8px;
  background-color: #000;
  z-index: 2;
}
.close-button {
  width: 30px;
  height: 30px;
  background-color: #000;
  border: none;
  padding: 0;
  /* background-color: initial; */
  /* text-align: inherit; */
  /* transition: all 0.1s ease-in-out; */
  /* opacity: 0.8; */
}
.left-arrow {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  margin-top: 8px;
  margin-left: 8px;
  background-color: #fff;
  display: flex;
  align-items: center;
}

.right-arrow {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  margin-top: 8px;
  margin-right: 8px;
  background-color: #fff;
  display: flex;
  align-items: center;
}

.arrow-box {
  display: flex;
  align-items: center;
  background-color: pink;
  padding-top: 80px;
  padding-bottom: 80px;
  padding-right: 19px;
  padding-left: 19px;
}

.content {
  margin: 100px;
  background-color: #fff;
}

.content-details {
  height: 800px;
  background-color: yellow;
}

.content-header {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: red;
  height: 100px;
}

.content-cards {
  height: 1000px;
  background-color: blue;
}
.notScroll {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  height: 100vh;
}
</style>
