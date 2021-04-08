<template>
  <ul class="nest-comment" v-if="singleComment">
    <li class="nestComment-rootComment">
      <div class="comment-item">
        <div class="commentItem-meta">
          <div class="commentItem-avatar">
            <img
              v-if="singleComment.user.avatar"
              class="commentItem-avatar-img"
              :src="`${lostelkUrl}/users/${singleComment.user.id}/avatar?size=small`"
              :alt="singleComment.user.name"
            />
            <svg v-else class="icon commentItem-avatar-img" aria-hidden="true">
              <use xlink:href="#icon-icon-test"></use>
            </svg>
          </div>
          <span class="user-name">
            {{ singleComment.user.name }}
          </span>
        </div>
        <div class="commentItem-metaSibling">
          <div class="comment-text">
            {{ singleComment.content }}
          </div>
          <div class="comment-reply">
            <button
              :class="['commentReply-buttom', 'commentReply-buttom-show', { none: !singleComment.totalReplies }]"
              @click="unfoldReplyList"
            >
              <svg class="icon commentReply-buttom-icon" aria-hidden="true">
                <use xlink:href="#icon-icon_huifu-mian"></use>
              </svg>
              {{ unfoldReplyShow ? '收起回复' : '查看回复' }}
            </button>
            <button
              :class="['commentReply-buttom', { 'commentReply-buttom-show': !singleComment.totalReplies }]"
              @click="showReplyInput"
            >
              <svg class="icon commentReply-buttom-icon" aria-hidden="true">
                <use xlink:href="#icon-huifu2"></use>
              </svg>
              回复
            </button>
            <button v-if="singleComment.user.id === singleuserId" class="commentReply-buttom">
              <svg class="icon commentReply-buttom-icon" aria-hidden="true">
                <use xlink:href="#icon-bianji"></use>
              </svg>
              编辑
            </button>
            <button v-if="singleComment.user.id === singleuserId" class="commentReply-buttom">
              <svg class="icon commentReply-buttom-icon" aria-hidden="true">
                <use xlink:href="#icon-icon"></use>
              </svg>
              删除
            </button>
          </div>
          <ValidateForm :class="['comment-publish-reply-form', { 'comment-publish-reply-form-show': replyShow }]">
            <ValidateInput
              class="comment-publish-reply-input"
              type="text"
              :placeholder="`回复 ${singleComment.user.name}`"
              v-model="replyCommentVal"
            >
            </ValidateInput>
            <template v-slot:submit>
              <div :class="['comment-reply-groug', { hidden: !replyCommentButton }]" @click="replyCommentClick">
                <a href="#" class="form-btn">
                  回复
                </a>
              </div>
            </template>
          </ValidateForm>
        </div>
      </div>
    </li>
    <div v-if="singleComment.totalReplies !== 0 && unfoldReplyShow">
      <li class="nestComment-child" v-for="replyComment in singleComment.replyComment" :key="replyComment.commentId">
        <div class="comment-item">
          <div class="commentItem-meta">
            <div class="commentItem-avatar">
              <img
                v-if="replyComment.user.avatar"
                class="commentItem-avatar-img"
                :src="`${lostelkUrl}/users/${replyComment.user.id}/avatar?size=small`"
                :alt="`${singleComment ? singleComment.user.name : ''}`"
              />
              <svg v-else class="icon commentItem-avatar-img" aria-hidden="true">
                <use xlink:href="#icon-icon-test"></use>
              </svg>
            </div>
            <span>
              <span class="user-name" v-if="PostUserId === replyComment.user.id">
                {{ replyComment.user.name }}(作者)
              </span>
              <span class="user-name" v-else>
                {{ replyComment.user.name }}
              </span>
            </span>
            <span class="commentText-reply">
              回复
            </span>
            <span class="user-link">
              {{ singleComment ? singleComment.user.name : '' }}
            </span>
          </div>
          <div class="commentItem-metaSibling">
            <div class="comment-text">{{ replyComment.content }}</div>
          </div>
        </div>
      </li>
    </div>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { lostelkUrl } from '../global';
import ValidateInput from '../components/ValidateInput.vue';
import ValidateForm from '../components/ValidateForm.vue';
import createTooltip from '../components/createTooltip';
import store from '../store';

export default defineComponent({
  name: 'Single-comment',
  components: {
    ValidateInput,
    ValidateForm,
  },
  props: {
    comment: Object,
    postId: Number,
    userId: Number,
    postUserIdProp: Number,
  },
  setup(props, context) {
    // 接收单个评论数据
    const singleComment = computed(() => props.comment);
    // 接收当前文章的ID
    const postIdData = computed(() => props.postId);
    // 接收单个评论的用户ID
    const singleuserId = computed(() => props.userId);
    // 接收文章的的作者ID
    const PostUserId = computed(() => props.postUserIdProp);
    // 回复input内容
    const replyCommentVal = ref();

    /**
     * 查看回复列表点击隐藏
     */
    const unfoldReplyShow = ref(false);
    const unfoldReplyList = () => {
      unfoldReplyShow.value = !unfoldReplyShow.value;
    };

    /**
     * 回复按钮点击显示隐藏
     */
    const replyCommentButton = ref(false);
    watch(replyCommentVal, () => {
      if (replyCommentVal.value) {
        replyCommentButton.value = true;
      } else {
        replyCommentButton.value = false;
      }
    });

    /**
     * 回复input框显示控制
     */
    const replyShow = ref(true);
    const showReplyInput = () => {
      replyShow.value = !replyShow.value;
    };

    /**
     * 回复评论
     */
    const replyCommentClick = async () => {
      const publishReplyCommentData = {
        commentId: props.comment ? props.comment.id : '',
        publishReplyCommentData: {
          content: replyCommentVal.value,
          postId: postIdData.value,
        },
      };
      await store.dispatch('publishReplyComment', publishReplyCommentData);
      replyShow.value = true;
      context.emit('reloadComments');
      createTooltip('评论回复成功', 'success', 3000);
    };

    return {
      lostelkUrl,
      singleComment,
      singleuserId,
      PostUserId,
      replyCommentButton,
      replyCommentVal,
      showReplyInput,
      replyShow,
      replyCommentClick,
      unfoldReplyShow,
      unfoldReplyList,
    };
  },
});
</script>

<style scoped>
@import '../style/less/componentsStyle/comment.css';
</style>
