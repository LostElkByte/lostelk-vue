<template>
  <div class="shade">
    <!-- {{ cardList }} -->
    <div class="arrange">
      <div class="close" @click="close">
        <div class="close-button">
          <svg class="icon icon-size-fill" aria-hidden="true">
            <use xlink:href="#icon-guanbi"></use>
          </svg>
        </div>
      </div>
      <div class="left-arrow">
        <div class="arrow-box">
          <div class="arrow-box-24">
            <svg class="icon icon-size-fill" aria-hidden="true">
              <use xlink:href="#icon-calendar-arrow-left"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="right-arrow">
        <div class="arrow-box">
          <div class="arrow-box-24">
            <svg class="icon icon-size-fill" aria-hidden="true">
              <use xlink:href="#icon-calendar-arrow-right"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="content-details">
          <div class="content-header">
            <div class="content-header-author">
              <div class="content-header-author-photo"></div>
            </div>
            <div class="content-header-toolbar">
              <div class="content-header-toolbar-like">
                <Likes v-if="postData" :isLike="postData.liked" :cardId="postId"></Likes>
              </div>
              <div class="content-header-toolbar-comment">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-pinglun"></use>
                </svg>
              </div>
              <div class="content-header-toolbar-downloadFile">
                <DownloadFile v-if="postData" :fileId="postData.file.id">
                  <span>
                    Download free
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-xia"></use>
                    </svg>
                  </span>
                </DownloadFile>
              </div>
            </div>
          </div>
        </div>
        <div class="content-cards"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, computed, ref } from 'vue';
import router from '../router';
import Likes from '../components/Likes.vue';
import DownloadFile from '../components/DownloadFile.vue';
import axios from 'axios';
import store from '../store';
export default defineComponent({
  components: {
    Likes,
    DownloadFile,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // 获取帖子ID
    const postId = computed(() => Number(props.id));

    /**
     * 获取单个文章数据
     */
    const postData = ref();
    store.dispatch('getCard', postId.value).then(data => {
      postData.value = data;
    });
    // const postData = computed(() => store.state.card);
    // console.log(postData.value);

    /**
     * 关闭按钮
     */
    const close = () => {
      const appElement = document.getElementById('app') as HTMLElement;
      appElement.classList.remove('notScroll');
      router.push('/');
    };

    /**
     * 创建组件时给app添加响应样式,销毁时删除.
     */
    onMounted(() => {
      const appElement = document.getElementById('app') as HTMLElement;
      appElement.classList.add('notScroll');
    });
    onBeforeUnmount(() => {
      const appElement = document.getElementById('app') as HTMLElement;
      appElement.classList.remove('notScroll');
      router.push('/');
    });

    return {
      close,
      postId,
      postData,
    };
  },
});
</script>

<style scoped src="../style/less/viewsStyle/card-details.css"></style>

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
</style>
