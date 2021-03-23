<template>
  <div v-if="!isLiked" class="like" @click="giveLike">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-xihuan"></use>
    </svg>
    <span>{{ likedCount }}</span>
  </div>
  <div v-else class="like" @click="giveLike">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-xihuan1"></use>
    </svg>
    <span>{{ likedCount }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { axios } from '../service/service';
import store from '../store';
export default defineComponent({
  props: {
    isLike: Number,
    likeCount: {
      type: Number,
      required: true,
    },
    cardId: Number,
  },
  setup(props) {
    const likedCount = computed(() => props.likeCount);
    const isLiked = computed(() => props.isLike);

    const giveLike = () => {
      store.commit('setIsShowLoading', false);
      if (!isLiked.value) {
        axios.post(`/posts/${props.cardId}/like`).then(() => {
          store.commit('clickLike', props.cardId);
        });
      } else {
        axios.delete(`/posts/${props.cardId}/like`).then(() => {
          store.commit('cancelLike', props.cardId);
        });
      }
    };
    return {
      giveLike,
      likedCount,
      isLiked,
    };
  },
});
</script>

<style>
@import '../style/less/componentsStyle/likes.css';
</style>
