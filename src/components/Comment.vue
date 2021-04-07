<template>
  <div class="comment">
    <div class="comment-header">
      <div class="comment-sum">20条评论</div>
    </div>
    <div class="comment-list">
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
                <button class="commentReply-buttom">回复</button>
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
                <span class="user-name"> {{ replyComment.user.name }}</span>
                <span class="commentText-reply">
                  回复
                </span>
                <span class="user-link">
                  {{ comment.user.name }}
                </span>
              </div>
              <div class="commentItem-metaSibling">
                <div class="comment-text">
                  {{ replyComment.content }}
                </div>
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
import { computed, defineComponent, onMounted, ref } from 'vue';
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
  },
  setup(props) {
    // 获取当前用户ID
    const userId = computed(() => store.state.user.id);
    // // 当前帖子的ID
    const postId = computed(() => props.postId);

    // 当前帖子的评论列表
    const comments = ref();

    const getComment = async () => {
      await store.dispatch('getComments', postId.value).then(data => {
        comments.value = data;
      });

      comments.value.map(async (comment: { totalReplies: number; id: number; replyComment: any }) => {
        if (comment.totalReplies !== 0) {
          await store.dispatch('getReplyComments', comment.id).then(data => {
            comment.replyComment = data;
          });
        }
      });
    };

    onMounted(() => {
      getComment();
    });

    return {
      lostelkUrl,
      comments,
    };
  },
});
</script>

<style scoped>
@import '../style/less/componentsStyle/comment.css';
</style>
