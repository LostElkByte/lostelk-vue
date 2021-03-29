<template>
  <div class="shade">
    <!-- {{ cardList }} -->
    <div class="arrange" v-if="showCard">
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
      <div class="card-details-content">
        <div class="content-details">
          <div class="content-header">
            <div class="content-header-author">
              <div class="content-header-author-photo">
                <img
                  v-if="postData.user.avatar"
                  class=""
                  :src="`${lostelkUrl}/users/${postData.user.id}/avatar?size=small`"
                  :alt="postData.user.name"
                />
                <div v-else class="">
                  <svg class="" aria-hidden="true">
                    <use xlink:href="#icon-weidenglu"></use>
                  </svg>
                </div>
              </div>
              <div class="content-header-author-data">
                <span>{{ postData.user.name }}</span>
                <span v-if="postData.user.id <= 100">内测用户</span>
              </div>
            </div>
            <div class="content-header-toolbar">
              <div class="content-header-toolbar-like">
                <Likes :isLike="postData.liked" :cardId="postId"></Likes>
              </div>
              <div class="content-header-toolbar-comment">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-pinglun"></use>
                </svg>
              </div>
              <div class="content-header-toolbar-downloadFile">
                <DownloadFile :fileId="postData.file.id">
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
import { lostelkUrl } from '../global';
import router from '../router';
import Likes from '../components/Likes.vue';
import DownloadFile from '../components/DownloadFile.vue';
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
    const showCard = ref(false);
    const postData = ref();
    const cardList = computed(() => store.state.cardList);

    onMounted(() => {
      const cardIndex = cardList.value.findIndex(item => item.id === postId.value);
      if (cardIndex !== -1) {
        showCard.value = true;
        postData.value = cardList.value[cardIndex];
      } else {
        store.dispatch('getCard', postId.value).then(data => {
          if (data) {
            showCard.value = true;
            postData.value = data;
          }
        });
      }
    });

    /**
     * 关闭按钮
     */
    const close = () => {
      const appElement = document.getElementById('app') as HTMLElement;
      appElement.classList.remove('notScroll');
      router.push('/');
    };

    /**
     * 创建组件时给Id为app的节点添加响应样式,
     */
    onMounted(() => {
      const appElement = document.getElementById('app') as HTMLElement;
      appElement.classList.add('notScroll');
    });

    /**
     * 销毁时删除Id为app的dom节点
     * 跳转到home页
     * 调整home页纵坐标位置
     */
    onBeforeUnmount(() => {
      const appElement = document.getElementById('app') as HTMLElement;
      appElement.classList.remove('notScroll');

      router.push('/');
      // 跳转完成后将坐标调整到上次浏览的位置
      const scrollTop = computed(() => store.state.HomeScrollTop);
      if (scrollTop.value) {
        window.scrollTo(0, scrollTop.value);
      }
    });

    return {
      showCard,
      lostelkUrl,
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
