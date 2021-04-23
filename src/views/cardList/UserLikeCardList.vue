<template>
  <PersonalCardMain
    :list="list"
    :cardColumnSize="column"
    :detailsUrlparameter="`@${UserIdProp}/likes`"
  ></PersonalCardMain>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import PersonalCardMain from '../../components/cardMain/PersonalCardMain.vue';

export default defineComponent({
  name: 'UserLikeListCard',
  inheritAttrs: false,
  components: {
    PersonalCardMain,
  },
  props: {
    cardColumn: Number,
    likeList: {
      type: Array,
      required: true,
    },
    UserId: {
      type: String,
      required: true,
    },
    userPhotosList: {
      type: Array,
      required: false,
    },
  },
  setup(props) {
    const column = computed(() => props.cardColumn);
    const list = computed(() => props.likeList);
    // 获取当前个人页的用户ID
    const UserIdProp = computed(() => Number(props.UserId));
    return {
      list,
      column,
      UserIdProp,
    };
  },
});
</script>

<style></style>
