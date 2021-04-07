<template>
  <div class="comment">
    <div class="comment-header">
      <div class="comment-sum">{{ commentsNumber }}条评论</div>
    </div>
    <div class="comment-list" id="commentAnchor">
      <ul class="nest-comment" v-for="comment in comments" :key="comment.id">
        <li class="nestComment-rootComment">
          <div class="comment-item">
            <div class="commentItem-meta">
              <div class="commentItem-avatar">
                <img
                  v-if="comment.user.avatar"
                  class="commentItem-avatar-img"
                  :src="`${lostelkUrl}/users/${comment.user.id}/avatar?size=small`"
                  :alt="comment.user.name"
                />
                <svg v-else class="icon commentItem-avatar-img" aria-hidden="true">
                  <use xlink:href="#icon-icon-test"></use>
                </svg>
              </div>
              <span class="user-name">
                {{ comment.user.name }}
              </span>
            </div>
            <div class="commentItem-metaSibling">
              <div class="comment-text">
                {{ comment.content }}
              </div>
              <div class="comment-reply">
                <button class="commentReply-buttom commentReply-buttom-show">
                  <svg class="icon commentReply-buttom-icon" aria-hidden="true">
                    <use xlink:href="#icon-huifu2"></use>
                  </svg>
                  回复
                </button>
                <button v-if="comment.user.id === userId" class="commentReply-buttom">
                  <svg class="icon commentReply-buttom-icon" aria-hidden="true">
                    <use xlink:href="#icon-bianji"></use>
                  </svg>
                  编辑
                </button>
                <button v-if="comment.user.id === userId" class="commentReply-buttom">
                  <svg class="icon commentReply-buttom-icon" aria-hidden="true">
                    <use xlink:href="#icon-icon"></use>
                  </svg>
                  删除
                </button>
              </div>
            </div>
          </div>
        </li>
        <div v-if="comment.totalReplies !== 0">
          <li class="nestComment-child" v-for="replyComment in comment.replyComment" :key="replyComment.commentId">
            <div class="comment-item">
              <div class="commentItem-meta">
                <div class="commentItem-avatar">
                  <img
                    v-if="replyComment.user.avatar"
                    class="commentItem-avatar-img"
                    :src="`${lostelkUrl}/users/${replyComment.user.id}/avatar?size=small`"
                    :alt="comment.user.name"
                  />
                  <svg v-else class="icon commentItem-avatar-img" aria-hidden="true">
                    <use xlink:href="#icon-icon-test"></use>
                  </svg>
                </div>
                <span>
                  <span class="user-name" v-if="postUserIdProp === replyComment.user.id">
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
                  {{ comment.user.name }}
                </span>
              </div>
              <div class="commentItem-metaSibling">
                <div class="comment-text">{{ replyComment.content }}</div>
              </div>
            </div>
          </li>
        </div>
      </ul>
    </div>

    <ValidateForm class="comment-footer">
      <ValidateInput class="comment-input" type="text" placeholder="写下你的评论" id="user_username"> </ValidateInput>
      <template v-slot:submit>
        <div class="comment-groug">
          <a href="#" class="form-btn">
            发表
          </a>
        </div>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { lostelkUrl } from '../global';
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue';
import ValidateForm from '../components/ValidateForm.vue';
import store from '../store';

export default defineComponent({
  name: 'Comment',
  components: {
    ValidateInput,
    ValidateForm,
  },
  props: {
    postId: Number,
    postUserId: Number,
    showCommentsCut: Boolean,
  },
  setup(props) {
    // 获取当前用户ID
    const userId = computed(() => store.state.user.id);

    //获取当前内容的作者
    const postUserIdProp = computed(() => props.postUserId);

    // // 当前帖子的ID
    const postId = computed(() => props.postId);

    /**
     * 当前帖子的评论列表
     */
    // 当前帖子的评论列表
    const comments = ref();

    // 当前帖子的评论总数
    const commentsNumber = ref();

    const getComment = async () => {
      await store.dispatch('getComments', postId.value).then(data => {
        commentsNumber.value = data.headers['x-total-count'];
        comments.value = data.data;
      });

      comments.value.map(async (comment: { totalReplies: number; id: number; replyComment: unknown }) => {
        if (comment.totalReplies !== 0) {
          await store.dispatch('getReplyComments', comment.id).then(data => {
            comment.replyComment = data;
          });
        }
      });
    };
    const showCommentsCut = computed(() => props.showCommentsCut);
    watch(showCommentsCut, () => {
      if (showCommentsCut.value) {
        setTimeout(() => {
          const comment = document.getElementById('commentAnchor') as HTMLElement;
          comment.scrollIntoView(false);
        }, 100);
      }
    });

    onMounted(() => {
      getComment();
    });

    return {
      userId,
      postUserIdProp,
      lostelkUrl,
      comments,
      commentsNumber,
    };
  },
});
</script>

<style scoped>
@import '../style/less/componentsStyle/comment.css';
</style>
