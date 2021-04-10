<template>
  <li class="nestComment-child" v-if="replyComment">
    <div class="comment-item">
      <div class="commentItem-meta">
        <div class="commentItem-avatar">
          <img
            v-if="replyComment.user.avatar"
            class="commentItem-avatar-img"
            :src="`${lostelkUrl}/users/${replyComment.user.id}/avatar?size=small`"
            :alt="`${replyComment ? replyComment.user.name : ''}`"
          />
          <svg v-else class="icon commentItem-avatar-img" aria-hidden="true">
            <use xlink:href="#icon-icon-test"></use>
          </svg>
        </div>
        <span>
          <span class="user-name" v-if="PostUserId === replyComment.user.id"> {{ replyComment.user.name }}(作者) </span>
          <span class="user-name" v-else>
            {{ replyComment.user.name }}
          </span>
        </span>
        <span class="commentText-reply">
          回复
        </span>
        <span class="user-link">
          {{ replyComment ? replyComment.user.name : '' }}
        </span>
      </div>
      <div class="commentItem-metaSibling">
        <div class="comment-text" v-if="!isdeleteSucceed">
          {{ replyComment.content }}
        </div>
        <div class="comment-text delete-succeed" v-else>
          该评论已删除
        </div>
        <div class="comment-toolbar" v-if="replyComment.user.id === singleuserId && !isdeleteSucceed">
          <button
            v-if="replyComment.user.id === singleuserId"
            :class="['comment-buttom', 'comment-buttom-show']"
            @click="showReviseInput"
          >
            <svg class="icon comment-buttom-icon" aria-hidden="true">
              <use xlink:href="#icon-bianji"></use>
            </svg>
            {{ reviseShow ? '修改' : '取消修改' }}
          </button>
          <button v-if="replyComment.user.id === singleuserId" class="comment-buttom" @click="showDeleteAddirm">
            <svg class="icon comment-buttom-icon" aria-hidden="true">
              <use xlink:href="#icon-icon"></use>
            </svg>
            删除
          </button>
        </div>
        <ValidateForm :class="['comment-publish-revise-form', { 'comment-publish-revise-form-show': reviseShow }]">
          <ValidateInput
            class="comment-publish-revise-input"
            type="text"
            :placeholder="`修改 ${replyComment.content}`"
            v-model="reviseReplyCommentVal"
          >
          </ValidateInput>
          <template v-slot:submit>
            <div :class="['comment-revise-publish', { hidden: !reviseCommentButton }]" @click="reviseCommentClick">
              <a href="#" class="form-btn">
                修改
              </a>
            </div>
          </template>
        </ValidateForm>
        <span class="form-error" v-if="isReviseReplyCommentMax">
          最大可输入长度为60个字符
        </span>
      </div>
    </div>
  </li>
  <Addirm v-if="isDelete" @cancelDelete="cancelDelete" @confirmDelete="confirmDelete"></Addirm>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { lostelkUrl } from '../global';
import ValidateInput from '../components/ValidateInput.vue';
import ValidateForm from '../components/ValidateForm.vue';
import Addirm from '../components/Affirm.vue';
import store from '../store';
import createTooltip from './createTooltip';

export default defineComponent({
  name: 'Single-reply-comment',
  components: {
    ValidateInput,
    ValidateForm,
    Addirm,
  },
  emits: ['reloadComments'],
  props: {
    replyCommentData: {
      type: Object,
      required: true,
    },
    PostUserIdData: {
      type: Number,
      required: true,
    },
    singleuserIdData: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const replyComment = computed(() => props.replyCommentData);
    const PostUserId = computed(() => props.PostUserIdData);
    const singleuserId = computed(() => props.singleuserIdData);

    // 修改评论input的内容
    const reviseReplyCommentVal = ref(replyComment.value ? replyComment.value.content : '');

    /**
     * 修改评论input框显示控制
     */
    const replyShow = ref(true);
    const reviseShow = ref(true);

    const showReviseInput = () => {
      replyShow.value = true;
      reviseShow.value = !reviseShow.value;
      if (!reviseShow.value) {
        setTimeout(() => {
          const inputFocus = document.getElementsByClassName('comment-publish-revise-input')[0] as HTMLElement;
          inputFocus.focus();
        }, 100);
      }
    };

    /**
     * 修改评论发表按钮点击事件允许或拒绝
     */
    const reviseCommentButton = ref(false);
    watch(reviseReplyCommentVal, () => {
      if (reviseReplyCommentVal.value) {
        reviseCommentButton.value = true;
      } else {
        reviseCommentButton.value = false;
      }
    });

    /**
     * 修改评论
     */

    const reviseCommentClick = async () => {
      const reviseCommentData = {
        commentId: replyComment.value ? replyComment.value.id : '',
        reviseCommentData: {
          content: reviseReplyCommentVal.value,
        },
      };
      await store.dispatch('reviseComment', reviseCommentData).then(() => {
        replyShow.value = true;
        replyComment.value.content = reviseReplyCommentVal.value;
        createTooltip('评论修改成功', 'success', 3000);
      });
    };

    /**
     * 删除评论
     */
    const isDelete = ref(false);
    const showDeleteAddirm = () => {
      isDelete.value = true;
    };
    const cancelDelete = () => {
      isDelete.value = false;
    };

    const isdeleteSucceed = ref(false);
    const confirmDelete = async () => {
      isDelete.value = false;
      await store.dispatch('deleteComment', replyComment.value ? replyComment.value.id : '').then(() => {
        isdeleteSucceed.value = true;
        createTooltip('评论删除成功', 'success', 3000);
      });
    };

    /**
     * 监听输入最大字符长度
     * 修改
     */
    const isReviseReplyCommentMax = ref(false);
    watch(reviseReplyCommentVal, () => {
      const commentMaximumReg = /^.{0,60}$/;
      if (commentMaximumReg.test(reviseReplyCommentVal.value)) {
        isReviseReplyCommentMax.value = false;
      } else {
        reviseCommentButton.value = false;
        isReviseReplyCommentMax.value = true;
      }
    });

    return {
      lostelkUrl,
      replyComment,
      PostUserId,
      showReviseInput,
      singleuserId,
      reviseShow,
      showDeleteAddirm,
      reviseReplyCommentVal,
      reviseCommentButton,
      reviseCommentClick,
      isDelete,
      cancelDelete,
      confirmDelete,
      isdeleteSucceed,
      isReviseReplyCommentMax,
    };
  },
});
</script>

<style scoped>
@import '../style/less/componentsStyle/comment.css';
</style>
