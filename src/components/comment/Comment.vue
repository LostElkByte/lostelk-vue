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
            <svg v-else class="commentItem-avatar-img" aria-hidden="true">
              <use xlink:href="#icon-touxiangnvhai"></use>
            </svg>
          </div>
          <span class="user-name" v-if="singleComment.user.id === PostUserId">
            {{ singleComment.user.name }}(作者)
          </span>
          <span class="user-name" v-else>
            {{ singleComment.user.name }}
          </span>
        </div>
        <div class="commentItem-metaSibling">
          <div class="comment-text" v-if="!isdeleteSucceed">
            {{ singleComment.content }}
          </div>
          <div class="comment-text delete-succeed" v-else>
            该评论已删除
          </div>
          <div class="comment-toolbar" v-if="!isdeleteSucceed">
            <button
              :class="['comment-buttom', 'comment-buttom-show', { none: !singleComment.totalReplies }]"
              @click="unfoldReplyList"
            >
              <svg class="icon comment-buttom-icon" aria-hidden="true">
                <use xlink:href="#icon-icon_huifu-mian"></use>
              </svg>
              {{ unfoldReplyShow ? '收起回复' : '查看回复' }}
            </button>
            <button
              v-if="isLogin"
              :class="['comment-buttom', { 'comment-buttom-show': !singleComment.totalReplies }]"
              @click="showReplyInput"
            >
              <svg class="icon comment-buttom-icon" aria-hidden="true">
                <use xlink:href="#icon-huifu2"></use>
              </svg>
              {{ replyShow ? '回复' : '取消回复' }}
            </button>
            <button v-else class="comment-buttom comment-buttom-show" @click="goLogin">
              <svg class="icon comment-buttom-icon" aria-hidden="true">
                <use xlink:href="#icon-huifu2"></use>
              </svg>
              回复(点击登录)
            </button>
            <button
              v-if="singleComment.user.id === singleuserId || singleuserId === 1"
              class="comment-buttom"
              @click="showReviseInput"
            >
              <svg class="icon comment-buttom-icon" aria-hidden="true">
                <use xlink:href="#icon-bianji"></use>
              </svg>
              {{ reviseShow ? '修改' : '取消修改' }}
            </button>
            <button
              v-if="singleComment.user.id === singleuserId || singleuserId === 1"
              class="comment-buttom"
              @click="showDeleteAddirm"
            >
              <svg class="icon comment-buttom-icon" aria-hidden="true">
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
              :value="replyCommentVal"
            >
            </ValidateInput>
            <template v-slot:submit>
              <div :class="['comment-reply-publish', { hidden: !replyCommentButton }]" @click="replyCommentClick">
                <a href="#" class="form-btn">
                  回复
                </a>
              </div>
            </template>
          </ValidateForm>
          <span class="form-error" v-if="isReplyCommentMax">
            最大可输入长度为60个字符
          </span>
          <ValidateForm :class="['comment-publish-revise-form', { 'comment-publish-revise-form-show': reviseShow }]">
            <ValidateInput
              class="comment-publish-revise-input"
              type="text"
              :placeholder="`修改 ${singleComment.content}`"
              v-model="reviseCommentVal"
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
          <span class="form-error" v-if="isReviseCommentMax">
            最大可输入长度为60个字符
          </span>
        </div>
      </div>
    </li>
    <div v-if="singleComment.totalReplies !== 0 && unfoldReplyShow">
      <div>
        <ReplyComment
          v-for="replyComment in replyComment"
          :key="replyComment.commentId"
          :replyCommentData="replyComment"
          :PostUserIdData="PostUserId"
          :singleuserIdData="singleuserId"
          :singleCommentData="singleComment"
          :postId="postIdData"
          @reloadReplyComments="getReplyComments"
        ></ReplyComment>
      </div>
    </div>
  </ul>
  <ConfirmationBox v-if="isDelete" @cancelDelete="cancelDelete" @confirmDelete="confirmDelete">
    你确定要删除这条评论吗?
  </ConfirmationBox>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { lostelkUrl } from '../../global';
import ValidateInput from '../form/ValidateInput.vue';
import ValidateForm from '../form/ValidateForm.vue';
import createTooltip from '../globalFun/createTooltip';
import ConfirmationBox from '../globalFun/ConfirmationBox.vue';
import ReplyComment from './ReplyComment.vue';
import store from '../../store';
import router from '../../router';

export default defineComponent({
  name: 'Comment',
  components: {
    ReplyComment,
    ValidateInput,
    ValidateForm,
    ConfirmationBox,
  },
  emits: ['reloadComments'],
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
    // 接收当前用户ID
    const singleuserId = computed(() => props.userId);
    // 接收文章的的作者ID
    const PostUserId = computed(() => props.postUserIdProp);
    // 回复评论input的内容
    const replyCommentVal = ref();
    // 修改评论input的内容
    const reviseCommentVal = ref(singleComment.value ? singleComment.value.content : '');
    // 判断是否登录
    const isLogin = computed(() => store.state.user.isLogin);

    /**
     * 获取子评论数据
     */
    const replyComment = ref();
    const getReplyComments = async () => {
      if (!singleComment.value) return;
      await store.dispatch('getReplyComments', singleComment.value.id).then(data => {
        replyComment.value = data;
      });
    };

    /**
     * 查看回复列表点击隐藏 获取子评论数据
     */

    const unfoldReplyShow = ref(false);
    const unfoldReplyList = async () => {
      await getReplyComments();
      unfoldReplyShow.value = !unfoldReplyShow.value;
    };

    /**
     * 回复评论发表按钮点击事件允许或拒绝
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
     * 修改评论发表按钮点击事件允许或拒绝
     */
    const reviseCommentButton = ref(false);
    watch(reviseCommentVal, () => {
      if (reviseCommentVal.value) {
        reviseCommentButton.value = true;
      } else {
        reviseCommentButton.value = false;
      }
    });

    /**
     * 回复评论input框显示控制
     * 修改评论input框显示控制
     */
    const replyShow = ref(true);
    const reviseShow = ref(true);

    const showReplyInput = () => {
      reviseShow.value = true;
      replyShow.value = !replyShow.value;
      if (!replyShow.value) {
        setTimeout(() => {
          const inputFocus = document.getElementsByClassName('comment-publish-reply-input')[0] as HTMLElement;
          inputFocus.focus();
        }, 100);
      }
    };
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
     * 回复评论
     */
    const replyCommentClick = async () => {
      const publishReplyCommentData = {
        commentId: props.comment ? props.comment.id : '',
        publishReplyCommentData: {
          content: replyCommentVal.value,
          postId: postIdData.value,
          isReplyParentComment: 1,
        },
      };
      await store.dispatch('publishReplyComment', publishReplyCommentData).then(async () => {
        replyShow.value = true;
        await getReplyComments();
        replyCommentVal.value = '';
        createTooltip('评论回复成功', 'success', 3000);
      });
    };

    /**
     * 修改评论
     */
    const reviseCommentClick = async () => {
      const reviseCommentData = {
        commentId: props.comment ? props.comment.id : '',
        reviseCommentData: {
          content: reviseCommentVal.value,
        },
      };
      await store.dispatch('reviseComment', reviseCommentData).then(() => {
        replyShow.value = true;
        context.emit('reloadComments');
        createTooltip('评论修改成功', 'success', 3000);
      });
    };

    /**
     * 删除评论
     */
    const isDelete = ref(false);
    const showDeleteAddirm = () => {
      isDelete.value = true;
      replyShow.value = true;
      reviseShow.value = true;
    };
    const cancelDelete = () => {
      isDelete.value = false;
    };

    const isdeleteSucceed = ref(false);
    const confirmDelete = async () => {
      isDelete.value = false;
      try {
        await store.dispatch('deleteComment', props.comment ? props.comment.id : '');
        isdeleteSucceed.value = true;
        createTooltip('评论删除成功', 'success', 3000);
      } catch (error) {
        createTooltip(error as string, 'success', 3000);
      }
    };

    /**
     * 跳转登陆页
     */
    const goLogin = async () => {
      await router.push('/');
      await router.push('/login');
    };

    /**
     * 监听输入最大字符长度
     * 回复
     * 修改
     */
    const isReplyCommentMax = ref(false);
    watch(replyCommentVal, () => {
      const commentMaximumReg = /^.{0,60}$/;
      if (commentMaximumReg.test(replyCommentVal.value)) {
        isReplyCommentMax.value = false;
      } else {
        replyCommentButton.value = false;
        isReplyCommentMax.value = true;
      }
    });

    const isReviseCommentMax = ref(false);
    watch(reviseCommentVal, () => {
      const commentMaximumReg = /^.{0,60}$/;
      if (commentMaximumReg.test(reviseCommentVal.value)) {
        isReviseCommentMax.value = false;
      } else {
        reviseCommentButton.value = false;
        isReviseCommentMax.value = true;
      }
    });

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
      reviseCommentVal,
      reviseCommentClick,
      reviseCommentButton,
      showReviseInput,
      reviseShow,
      isDelete,
      showDeleteAddirm,
      cancelDelete,
      confirmDelete,
      isdeleteSucceed,
      isLogin,
      goLogin,
      isReplyCommentMax,
      isReviseCommentMax,
      postIdData,
      replyComment,
      getReplyComments,
    };
  },
});
</script>

<style scoped>
@import '../../style/less/componentsStyle/comment.css';
</style>
