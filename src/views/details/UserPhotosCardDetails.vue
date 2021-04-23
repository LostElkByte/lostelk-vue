<template>
  <div class="shade">
    <!-- 关闭按钮 -->
    <div class="close" @click="close">
      <div class="close-button">
        <svg class="icon icon-size-fill" aria-hidden="true">
          <use xlink:href="#icon-guanbi"></use>
        </svg>
      </div>
    </div>
    <!-- 整体布局 -->
    <div class="arrange" v-if="showCard">
      <!-- 左切换 -->
      <div class="left-arrow">
        <div class="arrow-box" @click="leftCut" ref="leftCutDom">
          <div class="arrow-box-24">
            <svg class="icon icon-size-fill" aria-hidden="true">
              <use xlink:href="#icon-calendar-arrow-left"></use>
            </svg>
          </div>
        </div>
      </div>
      <!-- 右切换 -->
      <div class="right-arrow">
        <div class="arrow-box" @click="rightCut" ref="rightCutDom">
          <div class="arrow-box-24">
            <svg class="icon icon-size-fill" aria-hidden="true">
              <use xlink:href="#icon-calendar-arrow-right"></use>
            </svg>
          </div>
        </div>
      </div>
      <!-- 主内容区 -->
      <div class="card-details-content">
        <!-- 单个内容详情 -->
        <div class="content-details">
          <div class="content-header">
            <div class="content-header-author">
              <div class="content-header-author-photo">
                <img
                  v-if="postData.user.avatar"
                  class="content-header-author-photo-32"
                  :src="`${lostelkUrl}/users/${postData.user.id}/avatar?size=small`"
                  :alt="postData.user.name"
                />
                <svg v-else class="icon content-header-author-photo-32" aria-hidden="true">
                  <use xlink:href="#icon-icon-test"></use>
                </svg>
              </div>
              <div class="content-header-author-data">
                <span>{{ postData.title }}</span>
                <span>{{ postData.user.name }}</span>
              </div>
            </div>
            <div class="content-header-toolbar">
              <div class="content-header-toolbar-like">
                <Likes :isLike="postData.liked" :cardId="postId"></Likes>
              </div>
              <div class="content-header-toolbar-comment" @click="showComments">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-pinglun"></use>
                </svg>
              </div>
              <div class="content-header-toolbar-downloadFile">
                <DownloadFile :fileId="postData.file.id">
                  <span>
                    Download free
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-xiazai2"></use>
                    </svg>
                  </span>
                </DownloadFile>
              </div>
            </div>
          </div>

          <div :class="zoom ? 'content-picture' : 'content-pictureLarge'">
            <img
              :src="`${lostelkUrl}/files/${postData.file.id}/serve?size=large`"
              :alt="postData.title"
              @click="zoomInAndOut"
            />
          </div>

          <div class="content-message">
            <div class="content-message-metainformation" v-if="fileMetadata">
              <!-- 相机型号 -->
              <div class="content-message-metainformation-Make">
                <span v-if="fileMetadata.metadata.Make || fileMetadata.metadata.Model">
                  <svg class="icon metainformation-svg" aria-hidden="true">
                    <use xlink:href="#icon-Camera-2"></use>
                  </svg>
                  <span class="fileMetadata-content">
                    <span v-if="fileMetadata.metadata.Make">{{ fileMetadata.metadata.Make }}</span>
                    <span v-if="fileMetadata.metadata.Model">{{ fileMetadata.metadata.Model }}</span>
                  </span>
                </span>
              </div>
              <!-- 照片参数 -->
              <div class="content-message-metainformation-in-detail">
                <span
                  v-if="
                    fileMetadata.metadata.FocalLength ||
                      fileMetadata.metadata.ApertureValue ||
                      fileMetadata.metadata.ExposureProgram
                  "
                >
                  <svg class="icon metainformation-svg" aria-hidden="true">
                    <use xlink:href="#icon-Lens-1"></use>
                  </svg>
                  <!-- 焦距 -->
                  <span v-if="fileMetadata.metadata.FocalLength" class="fileMetadata-content">
                    <span>焦距 {{ fileMetadata.metadata.FocalLength }}</span>
                  </span>
                  <!-- 光圈 -->
                  <span v-if="fileMetadata.metadata.ApertureValue" class="fileMetadata-content">
                    <span>光圈 ƒ/{{ Math.round(fileMetadata.metadata.ApertureValue * 100) / 100 }}</span>
                  </span>
                  <!-- 曝光 -->
                  <span v-if="fileMetadata.metadata.ExposureProgram" class="fileMetadata-content">
                    <span>曝光 {{ Math.round(fileMetadata.metadata.ExposureProgram * 100) / 100 }}s</span>
                  </span>
                </span>
              </div>
            </div>

            <div
              v-if="userId === postData.user.id || userId === 1"
              class="content-message-jurisdiction-compile"
              @click="editCard"
            >
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bianji2"></use>
              </svg>
              <span>Edit</span>
            </div>

            <DeleteCard
              v-if="userId === postData.user.id || userId === 1"
              :postId="postId"
              :routerUrl="`/@${UserIdProps}`"
              :fromWhichPage="`user`"
              :userId="UserIdProps"
            >
            </DeleteCard>
          </div>

          <div class="content-description" v-if="postData.content !== ''">
            <p>Photo description</p>
            <span>{{ postData.content }}</span>
          </div>

          <div class="content-tags" v-if="postData.tags !== null">
            <!-- <p>Related tags</p> -->
            <span v-for="tag in postData.tags" :key="tag.id" @click="RelatedTagData(tag.name)">
              {{ tag.name }}
            </span>
          </div>
        </div>
        <!-- 评论 -->
        <Comments
          class="comment-cat"
          :showCommentsCut="showCommentsCut"
          :postId="postId"
          :postUserId="postData.user.id"
          v-show="showCommentsCut"
        ></Comments>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onUpdated } from 'vue';
import { lostelkUrl } from '../../global';
import router from '../../router';
import Likes from '../../components/cardFun/Likes.vue';
import DownloadFile from '../../components/cardFun/DownloadFile.vue';
import Comments from '../../components/comment/Comments.vue';
import DeleteCard from '../../components/cardFun/DeleteCard.vue';
import store from '../../store';
export default defineComponent({
  name: 'UserPhotosCardDetails',
  components: {
    Likes,
    DownloadFile,
    Comments,
    DeleteCard,
  },
  props: {
    // 路由传来的当前帖子的ID
    id: {
      type: String,
      required: true,
    },
    UserId: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    // 获得当前访问的主页的用户ID
    const UserIdProps = computed(() => props.UserId);
    // 获取当前用户ID
    const userId = computed(() => store.state.user.id);
    // 获取当前帖子的ID
    const postId = computed(() => Number(props.id));

    // 动态获取图像文件元信息
    const fileMetadata = ref();

    /**
     * 获取单个文章数据
     */
    const showCard = ref(false);
    const postData = ref();
    const cardList = computed(() => store.state.userPhotosCardList);
    const cardIndex = computed(() => cardList.value.findIndex(item => item.id === postId.value));

    // 如果当前帖子存在于cardList数组中,进入if 否则 进入else
    if (cardIndex.value !== -1) {
      // 帖子存在 开放组件dom
      showCard.value = true;
      // 获取帖子内容
      postData.value = cardList.value[cardIndex.value];
      //请求获取图像文件元信息(不要处理为同步代码,异步操作用于触发onUpdated事件)
      store.dispatch('getFileMetadata', postData.value.file.id).then(data => {
        fileMetadata.value = data;
      });
    } else {
      // 获取单个帖子
      store.dispatch('getCard', postId.value).then(data => {
        if (data) {
          // 获取到帖子 开放组件dom
          showCard.value = true;
          // 获取帖子内容
          postData.value = data;
          //请求获取图像文件元信息(不要处理为同步代码,异步操作用于触发onUpdated事件)
          store.dispatch('getFileMetadata', data.file.id).then(data => {
            fileMetadata.value = data;
          });
        }
      });
    }

    /**
     * 图片放大缩小
     */
    const zoom = ref(true);
    const zoomInAndOut = () => {
      zoom.value = !zoom.value;
    };

    /**
     * 评论按钮
     *
     */
    const showCommentsCut = computed(() => store.state.showCommentsCut);
    const showComments = () => {
      if (showCommentsCut.value) {
        store.commit('showCommentsCut', false);
      } else {
        store.commit('showCommentsCut', true);
      }
    };

    /**
     * 编辑
     */
    const editCard = () => {
      // 将body恢复为可以滚动
      document.body.style.overflow = 'auto';

      // 存储当前的url
      store.commit('uploadAfterToUrl', `/@${UserIdProps.value}/${postId.value}`);
      // 定义当前页面别名,并存储
      store.commit('fromWhichPage', 'user');

      router.push(`/EditCard/${postId.value}`);
    };

    /**
     * 切换文章
     */
    const rightCutDom = ref();
    const leftCutDom = ref();

    onUpdated(() => {
      /**
       * 如果当前帖子存在于cardList数组中,将左右切换按钮全部禁用
       * 如果当前帖子于cardList数组的第一个元素,将左切换按钮全部禁用
       * 如果当前帖子于cardList数组的最后一个元素,将右切换按钮全部禁用
       * 条件都不成立,删除左右切换按钮禁用样式
       */
      if (cardIndex.value === -1) {
        leftCutDom.value.classList.add('noClick');
        rightCutDom.value.classList.add('noClick');
      } else if (cardIndex.value === 0) {
        leftCutDom.value.classList.add('noClick');
      } else if (cardList.value.length - 1 <= cardIndex.value) {
        rightCutDom.value.classList.add('noClick');
      } else {
        leftCutDom.value.classList.remove('noClick');
        rightCutDom.value.classList.remove('noClick');
      }
    });

    const rightCut = async () => {
      // 评论收起
      store.commit('showCommentsCut', false);
      // 图像恢复小图
      zoom.value = true;
      // 如果当前详情的下标不是最后一个则进入if 否则 右按钮添加禁止点击样式
      if (cardList.value.length - 1 > cardIndex.value) {
        // 获得下一张详情页的id
        const rightCutId = cardList.value[cardIndex.value + 1].id;
        // 获得下一张详情页的内容
        postData.value = cardList.value[cardIndex.value + 1];
        //获取图像文件元信息
        const Metadata = await store.dispatch('getFileMetadata', postData.value.file.id);
        fileMetadata.value = Metadata;

        // 跳转URL
        await router.push(`${rightCutId}`);
        // 清除禁止点击样式
        leftCutDom.value.classList.remove('noClick');
      } else {
        // 添加右按钮按钮禁止点击样式
        rightCutDom.value.classList.add('noClick');
      }
    };

    const leftCut = async () => {
      // 评论收起
      store.commit('showCommentsCut', false);
      // 图像恢复小图
      zoom.value = true;
      // 如果当前详情的下标不是第一个则进入if 否则 左按钮添加禁止点击样式
      if (cardIndex.value > 0) {
        // 获得上一张详情页的id
        const leftCutId = cardList.value[cardIndex.value - 1].id;
        // 获得上一张详情页的内容
        postData.value = cardList.value[cardIndex.value - 1];
        //获取图像文件元信息
        const Metadata = await store.dispatch('getFileMetadata', postData.value.file.id);
        fileMetadata.value = Metadata;
        // 跳转URL
        await router.push(`${leftCutId}`);
        // 清除禁止点击样式
        rightCutDom.value.classList.remove('noClick');
      } else {
        // 添加左按钮禁止点击样式
        leftCutDom.value.classList.add('noClick');
      }
    };

    /**
     * 关闭按钮
     */
    const close = () => {
      // 将body恢复为可以滚动
      document.body.style.overflow = 'auto';

      router.push(`/@${UserIdProps.value}`);
    };

    /**
     * 获取相关标签数据,并跳转的相对页面
     */
    const RelatedTagData = async (tagName: string) => {
      // 将body恢复为可以滚动
      document.body.style.overflow = 'auto';
      document.body.scrollTop = document.documentElement.scrollTop = 0;

      close();
      router.push(`/tag/${tagName}`);
    };

    return {
      userId,
      UserIdProps,
      showCard,
      lostelkUrl,
      close,
      postId,
      postData,
      rightCut,
      rightCutDom,
      leftCut,
      leftCutDom,
      zoom,
      zoomInAndOut,
      fileMetadata,
      RelatedTagData,
      showComments,
      showCommentsCut,
      editCard,
    };
  },
});
</script>

<style scoped src="../../style/less/viewsStyle/card-details.css"></style>

<style></style>
