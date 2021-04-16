<template>
  <div class="content-message-jurisdiction-delete" @click="deleteCard">
    <svg class="icon delete-icon" aria-hidden="true">
      <use xlink:href="#icon-shanchu2"></use>
    </svg>
  </div>
  <ConfirmationBox v-if="isDelete" @cancelDelete="cancelDelete" @confirmDelete="confirmDelete">
    你确定要删除此图像吗?
  </ConfirmationBox>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import ConfirmationBox from './Confirmation-box.vue';
import createTooltip from '../components/createTooltip';
import router from '../router';
import store from '../store';

export default defineComponent({
  components: {
    ConfirmationBox,
  },
  props: {
    postId: {
      type: Number,
      required: true,
    },
    routerUrl: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const postIdProps = computed(() => props.postId);
    const routerUrlProps = computed(() => props.routerUrl);

    const isDelete = ref(false);

    const deleteCard = async () => {
      isDelete.value = true;
    };

    const cancelDelete = () => {
      isDelete.value = false;
    };

    const confirmDelete = async () => {
      isDelete.value = false;
      await store.dispatch('deleteCard', postIdProps.value).then(() => {
        const newCardList = store.state.cardList.filter(item => item.id !== postIdProps.value);
        store.commit('getCardList', newCardList);
        // 将body恢复为可以滚动
        document.body.style.overflow = 'auto';
        createTooltip('图像删除成功', 'success', 3000);
        router.push(routerUrlProps.value);
      });
    };
    return {
      deleteCard,
      cancelDelete,
      confirmDelete,
      isDelete,
    };
  },
});
</script>

<style scoped src="../style/less/componentsStyle/delete-card.css"></style>
