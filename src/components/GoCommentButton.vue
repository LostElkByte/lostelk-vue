<template>
  <div @click.stop="goComment">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-pinglun"></use>
    </svg>
    <span>{{ commentSum }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import router from '../router';
import store from '../store';

export default defineComponent({
  props: {
    totalComments: {
      type: Number,
      required: true,
    },
    postId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const commentSum = computed(() => props.totalComments);
    const id = computed(() => props.postId);

    const goComment = async () => {
      // 获取当前坐标储存在store中
      const HomeScrollTop = document.documentElement.scrollTop;
      await store.commit('HomeScrollTop', HomeScrollTop);
      await router.push(`/card/${id.value}`);
      await store.commit('showCommentsCut', true);
    };
    return {
      commentSum,
      goComment,
    };
  },
});
</script>

<style>
@import '../style/less/componentsStyle/home-page-main-reconsitution.css';
</style>
