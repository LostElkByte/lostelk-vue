<template>
  <li class="nestComment-child" v-if="replyComment">
    <div class="comment-item">
      <!-- 回复用户与被回复用户 头像与账号名 -->
      <div
        style="display: flex;justify-content: space-between; align-items: center;"
      >
        <div class="commentItem-meta">
          <!-- 回复用户 -->
          <span @click="toUserPage(replyComment.user.id)">
            <div class="commentItem-avatar">
              <img
                v-if="replyComment.user.avatar"
                class="commentItem-avatar-img"
                :src="
                  `${lostelkUrl}/users/${replyComment.user.id}/avatar?size=small`
                "
                :alt="`${replyComment ? replyComment.user.name : ''}`"
              />
              <svg v-else class="commentItem-avatar-img" aria-hidden="true">
                <use xlink:href="#icon-touxiangnvhai"></use>
              </svg>
            </div>
            <span>
              <span
                class="user-name"
                v-if="PostUserId === replyComment.user.id"
              >
                {{ replyComment.user.name }}(Author)
              </span>
              <span class="user-name" v-else>
                {{ replyComment.user.name }}
              </span>
            </span>
          </span>
          <!-- <span class="commentText-reply">
            reply
          </span> -->
          <!-- 被回复用户 -->
          <!-- <span @click="toUserPage(replyComment.replyUser.id)">
            <div class="commentItem-avatar">
              <img
                v-if="replyComment.replyUser.avatar"
                class="commentItem-avatar-img"
                :src="`${lostelkUrl}/users/${replyComment.replyUser.id}/avatar?size=small`"
                :alt="`${replyComment ? replyComment.replyUser.name : ''}`"
              />
              <svg v-else class="commentItem-avatar-img" aria-hidden="true">
                <use xlink:href="#icon-touxiangnvhai"></use>
              </svg>
            </div>
            <span class="user-link" v-if="PostUserId === replyComment.replyUser.id">
              {{ replyComment ? replyComment.replyUser.name : '' }}(Author)
            </span>
            <span class="user-link" v-else>
              {{ replyComment ? replyComment.replyUser.name : '' }}
            </span>
          </span> -->
        </div>
        <div style="float: right;font-size: 12px;color: #8590a6;">
          {{
            singleComment.create_time
              ? dayjs.unix(singleComment.create_time).format('YYYY-MM-DD')
              : 'recently'
          }}
        </div>
      </div>
      <!-- 回复内容 -->
      <div class="commentItem-metaSibling">
        <div
          style="word-break:break-all"
          class="comment-text"
          v-if="!isdeleteSucceed"
        >
          <span style="">reply</span>
          <span
            v-if="PostUserId === replyComment.replyUser.id"
            style="color:#6390df; cursor: pointer;"
            @click="toUserPage(replyComment.replyUser.id)"
          >
            @{{ replyComment.replyUser.name }} (Author)
          </span>
          <span
            v-else
            style="color:#6390df; cursor: pointer;"
            @click="toUserPage(replyComment.replyUser.id)"
          >
            @{{ replyComment.replyUser.name }}
          </span>
          :{{ replyComment.content }}
        </div>
        <div class="comment-text delete-succeed" v-else>
          The comment was deleted
        </div>
        <div class="comment-toolbar" v-if="!isdeleteSucceed">
          <button
            v-if="isLogin"
            :class="['comment-buttom', 'comment-buttom-show']"
            @click="showReplyInput"
          >
            <svg class="icon comment-buttom-icon" aria-hidden="true">
              <use xlink:href="#icon-huifu2"></use>
            </svg>
            {{ replyShow ? 'reply' : 'cancel' }}
          </button>
          <button
            v-else
            class="comment-buttom comment-buttom-show"
            @click="goLogin"
          >
            <svg class="icon comment-buttom-icon" aria-hidden="true">
              <use xlink:href="#icon-huifu2"></use>
            </svg>
            Reply (click login)
          </button>
          <button
            v-if="replyComment.user.id === singleuserId || singleuserId === 1"
            :class="['comment-buttom']"
            @click="showReviseInput"
          >
            <svg class="icon comment-buttom-icon" aria-hidden="true">
              <use xlink:href="#icon-bianji"></use>
            </svg>
            {{ reviseShow ? 'change' : 'cancel' }}
          </button>
          <button
            v-if="replyComment.user.id === singleuserId || singleuserId === 1"
            class="comment-buttom"
            @click="showDeleteAddirm"
          >
            <svg class="icon comment-buttom-icon" aria-hidden="true">
              <use xlink:href="#icon-icon"></use>
            </svg>
            delete
          </button>
        </div>
        <ValidateForm v-if="!replyShow" :class="['comment-publish-reply-form']">
          <ValidateInput
            :id="`reply-comment-publish-reply-input-id-${replyComment.id}`"
            class="comment-publish-reply-input"
            type="text"
            :placeholder="`reply ${replyComment.user.name}`"
            v-model="replyCommentVal"
            :value="replyCommentVal"
          ></ValidateInput>
          <template v-slot:submit>
            <div
              :class="[
                'comment-reply-publish',
                { hidden: !replyCommentButton }
              ]"
              @click="replyCommentClick"
            >
              <a href="#" class="comment-publish-reply-form-btn">
                reply
              </a>
            </div>
          </template>
        </ValidateForm>
        <span class="form-error" v-if="isReplyCommentMax">
          A maximum of 60 characters can be entered
        </span>
        <ValidateForm
          v-if="!reviseShow"
          :class="['comment-publish-revise-form']"
        >
          <ValidateInput
            :id="`reply-comment-publish-revise-input-id-${replyComment.id}`"
            class="comment-publish-revise-input"
            type="text"
            :placeholder="`change ${replyComment.content}`"
            v-model="reviseReplyCommentVal"
          ></ValidateInput>
          <template v-slot:submit>
            <div
              :class="[
                'comment-revise-publish',
                { hidden: !reviseCommentButton }
              ]"
              @click="reviseCommentClick"
            >
              <a href="#" class="comment-publish-reply-form-btn">
                change
              </a>
            </div>
          </template>
        </ValidateForm>
        <span class="form-error" v-if="isReviseReplyCommentMax">
          A maximum of 60 characters can be entered
        </span>
      </div>
    </div>
  </li>
  <ConfirmationBox
    v-if="isDelete"
    @cancelDelete="cancelDelete"
    @confirmDelete="confirmDelete"
  >
    Are you sure you want to delete this comment?
  </ConfirmationBox>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { lostelkUrl } from '../../global';
import ValidateInput from '../form/ValidateInput.vue';
import ValidateForm from '../form/ValidateForm.vue';
import ConfirmationBox from '../globalFun/ConfirmationBox.vue';
import store from '../../store';
import createTooltip from '../globalFun/createTooltip';
import router from '../../router';
import { socket } from '../../service/service';

export default defineComponent({
  name: 'ReplyComment',
  components: {
    ValidateInput,
    ValidateForm,
    ConfirmationBox
  },
  emits: ['reloadReplyComments', 'replyCommentPositioning'],
  props: {
    replyCommentData: {
      type: Object,
      required: true
    },
    PostUserIdData: {
      type: Number,
      required: true
    },
    singleuserIdData: {
      type: Number,
      required: true
    },
    singleCommentData: {
      type: Object,
      required: true
    },
    postId: {
      type: Number,
      required: true
    }
  },
  setup(props, context) {
    const replyComment = computed(() => props.replyCommentData);
    const PostUserId = computed(() => props.PostUserIdData);
    const singleuserId = computed(() => props.singleuserIdData);
    const singleComment = computed(() => props.singleCommentData);
    // 接收当前文章的ID
    const postIdData = computed(() => props.postId);
    // 判断是否登录
    const isLogin = computed(() => store.state.user.isLogin);
    // 回复评论input的内容
    const replyCommentVal = ref();
    // 修改评论input的内容
    const reviseReplyCommentVal = ref(
      replyComment.value ? replyComment.value.content : ''
    );

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
    watch(reviseReplyCommentVal, () => {
      if (reviseReplyCommentVal.value) {
        reviseCommentButton.value = true;
      } else {
        reviseCommentButton.value = false;
      }
    });

    /**
     * 监听输入最大字符长度
     * 新增
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
          const inputFocus = document.getElementById(
            `reply-comment-publish-reply-input-id-${replyComment.value.id}`
          ) as HTMLElement;
          inputFocus.focus();
        }, 0);
      }
    };

    const showReviseInput = () => {
      replyShow.value = true;
      reviseShow.value = !reviseShow.value;
      if (!reviseShow.value) {
        setTimeout(() => {
          const inputFocus = document.getElementById(
            `reply-comment-publish-revise-input-id-${replyComment.value.id}`
          ) as HTMLElement;
          inputFocus.focus();
        }, 0);
      }
    };

    watch(replyShow, () => {
      replyCommentVal.value = '';
    });

    watch(reviseShow, () => {
      reviseReplyCommentVal.value = replyComment.value.content;
    });

    /**
     * 回复评论
     */
    const replyCommentClick = async () => {
      const publishReplyCommentData = {
        commentId: replyComment.value ? replyComment.value.id : '',
        publishReplyCommentData: {
          content: replyCommentVal.value,
          postId: postIdData.value,
          isReplyParentComment: 0
        }
      };
      await store
        .dispatch('publishReplyComment', publishReplyCommentData)
        .then(async () => {
          replyShow.value = true;
          // context.emit('reloadReplyComments');
          replyCommentVal.value = '';
          context.emit('replyCommentPositioning');
          createTooltip('Comment reply successful', 'success', 3000);
        });
    };

    /**
     * 修改评论
     */
    const reviseCommentClick = async () => {
      const reviseCommentData = {
        commentId: replyComment.value ? replyComment.value.id : '',
        reviseCommentData: {
          content: reviseReplyCommentVal.value
        }
      };
      await store.dispatch('reviseReplyComment', reviseCommentData).then(() => {
        replyShow.value = true;
        reviseShow.value = true;
        replyComment.value.content = reviseReplyCommentVal.value;
        createTooltip('Comments modified successfully', 'success', 3000);
      });
    };

    /**
     * 删除回复评论
     */
    const isDelete = ref(false);
    const showDeleteAddirm = () => {
      isDelete.value = true;
      reviseShow.value = true;
    };
    const cancelDelete = () => {
      isDelete.value = false;
    };
    const isdeleteSucceed = ref(false);
    const confirmDelete = async () => {
      isDelete.value = false;

      try {
        await store.dispatch(
          'deleteReplyComment',
          replyComment.value ? replyComment.value.id : ''
        );
        isdeleteSucceed.value = true;
        createTooltip('Comment deleted successfully', 'success', 3000);
      } catch (error) {
        // createTooltip(message, 'success', 3000);
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
     * 进入用户页
     */
    const toUserPage = (userId: number) => {
      router.push(`/@${userId}`);
    };

    /**
     * 监听实时服务端修改回复评论事件
     */
    const onUpdateReplyComment = (data: {
      replyCommentId: number;
      content: string;
      socketId: string;
    }) => {
      const { replyCommentId, content, socketId } = data;

      if (replyCommentId != replyComment.value.id) return;

      if (socket.id === socketId) return;

      replyComment.value.content = content;
    };

    socket.on('updateReplyComment', onUpdateReplyComment);

    /**
     * 监听实时服务端删除评论事件
     */
    const onCommentReplyDeleted = async (data: {
      replyCommentId: number;
      socketId: string;
    }) => {
      const { replyCommentId, socketId } = data;
      if (replyCommentId != replyComment.value.id) return;

      if (socket.id === socketId) return;
      isdeleteSucceed.value = true;
    };

    socket.on('commentReplyDelete', onCommentReplyDeleted);

    return {
      lostelkUrl,
      replyComment,
      PostUserId,
      showReplyInput,
      showReviseInput,
      singleuserId,
      reviseShow,
      showDeleteAddirm,
      replyCommentVal,
      reviseReplyCommentVal,
      reviseCommentButton,
      reviseCommentClick,
      isDelete,
      cancelDelete,
      confirmDelete,
      isdeleteSucceed,
      isReviseReplyCommentMax,
      singleComment,
      goLogin,
      isLogin,
      replyCommentButton,
      replyShow,
      replyCommentClick,
      isReplyCommentMax,
      toUserPage
    };
  }
});
</script>

<style scoped>
@import '../../style/less/componentsStyle/comment.css';
</style>
