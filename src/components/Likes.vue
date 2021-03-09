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
import { defineComponent, ref } from 'vue';
import { axios } from '../service/service';
import store from '../store';
export default defineComponent({
  props: {
    isLike: Number,
    likeCount: Number,
    cardId: Number,
  },
  setup(props) {
    const likedCount = ref(props.likeCount);
    const isLiked = ref(props.isLike);

    const giveLike = () => {
      if (!isLiked.value) {
        axios.post(`/posts/${props.cardId}/like`).then(() => {
          store.state.cardList.forEach(item => {
            if (item.id === props.cardId) {
              item.liked = 1;
              item.totalLikes++;
            }
          });
          isLiked.value = 1;
          likedCount.value++;
        });
      } else {
        axios.delete(`/posts/${props.cardId}/like`).then(() => {
          store.state.cardList.forEach(item => {
            if (item.id === props.cardId) {
              item.liked = 0;
              item.totalLikes--;
            }
          });
          isLiked.value = 0;
          likedCount.value--;
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
.like {
  cursor: pointer;
}
</style>
