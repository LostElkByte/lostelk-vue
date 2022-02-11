<template>
  <div v-if="!isLiked" class="like" @click.stop="giveLike">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-xihuan"></use>
    </svg>
    <span v-if="likedCount">{{ likedCount }}</span>
  </div>
  <div v-else class="like" @click.stop="giveLike">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-xihuan1"></use>
    </svg>
    <span v-if="likedCount">{{ likedCount }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { axios } from '../../service/service';
import store from '../../store';
export default defineComponent({
  emits: ['singleCardReviseLike'],
  props: {
    isLike: Number,
    likeCount: {
      type: Number,
      required: false,
    },
    cardId: Number,
    singleCard: {
      type: Boolean,
      required: false,
    },
  },
  setup(props, context) {
    const likedCount = computed(() => props.likeCount);
    const isLiked = computed(() => props.isLike);
    const singleCard = computed(() => props.singleCard);
    const loading = ref(false);
    const giveLike = () => {
      if (loading.value) {
        return;
      }
      loading.value = true;
      store.commit('setIsShowLoading', false);
      if (!isLiked.value) {
        axios.post(`/posts/${props.cardId}/like`).then(() => {
          store.commit('clickLike', props.cardId);
          if (singleCard.value) {
            context.emit('singleCardReviseLike', 1);
          }
          loading.value = false;
        });
      } else {
        axios.delete(`/posts/${props.cardId}/like`).then(() => {
          store.commit('cancelLike', props.cardId);
          if (singleCard.value) {
            context.emit('singleCardReviseLike', 0);
          }
          loading.value = false;
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
@import '../../style/less/componentsStyle/likes.css';
</style>
