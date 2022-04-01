<template>
  <div class="content-message-jurisdiction-delete" @click="deleteCard">
    <svg class="icon delete-icon" aria-hidden="true">
      <use xlink:href="#icon-shanchu2"></use>
    </svg>
  </div>
  <ConfirmationBox v-if="isDelete" @cancelDelete="cancelDelete" @confirmDelete="confirmDelete">
    Are you sure you want to delete this photo?
  </ConfirmationBox>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import ConfirmationBox from '../globalFun/ConfirmationBox.vue';
import createTooltip from '../globalFun/createTooltip';
import router from '../../router';
import store from '../../store';

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
    fromWhichPage: {
      type: String,
      required: true,
    },
    searchName: {
      type: String,
      required: false,
    },
    userId: {
      type: Number,
      required: false,
    },
    searchType: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const postIdProps = computed(() => props.postId);
    const routerUrlProps = computed(() => props.routerUrl);
    const fromWhichPageProps = computed(() => props.fromWhichPage);
    const searchVal = computed(() => props.searchName);
    const searchTypeProps = computed(() => props.searchType);
    const userIdProps = computed(() => props.userId);

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
        if (fromWhichPageProps.value === 'home') {
          store.commit('againRequest', true);
          store.dispatch('getCardList');
        } else if (fromWhichPageProps.value === 'search') {
          store.commit('againRequest', true);
          store.dispatch('getSearchValCardList', { val: searchVal.value, type: searchTypeProps.value }).then(() => {
            if (store.state.searchCardList.length === 0) {
              //修改搜索结果为true
              store.commit('setSearchFailure', true);
              store.commit('noMore', false);
            } else {
              store.commit('setSearchFailure', false);
              store.commit('mainSearchIsNone', false);
            }
          });
        } else if (fromWhichPageProps.value === 'user') {
          store.commit('againRequest', true);
          store.dispatch('getUserLikeCardList', userIdProps.value);
          store.dispatch('getUserPhotosCardList', userIdProps.value);
        } else if (fromWhichPageProps.value === 'userLike') {
          store.commit('againRequest', true);
          store.dispatch('getUserPhotosCardList', userIdProps.value);
          store.dispatch('getUserLikeCardList', userIdProps.value);
        }

        // 将body恢复为可以滚动
        document.body.style.overflow = 'auto';
        createTooltip('Photo deleted successfully', 'success', 3000);
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

<style scoped>
@import '../../style/less/componentsStyle/delete-card.css';
</style>
