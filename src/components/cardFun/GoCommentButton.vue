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
import router from '../../router';
import store from '../../store';

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
    urlParameter: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const url = computed(() => props.urlParameter);
    const commentSum = computed(() => props.totalComments);
    const id = computed(() => props.postId);

    const goComment = async () => {
      await router.push(`/${url.value}/${id.value}`);
      // 将body设置为不可滚动
      document.body.style.overflow = 'hidden';
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
@import '../../style/less/componentsStyle/card-main.css';
</style>
