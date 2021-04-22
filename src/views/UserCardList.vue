<template>
  <PersonalCardMain
    :list="list"
    :cardColumnSize="column"
    :detailsUrlparameter="`@${cardUserIdProp}`"
  ></PersonalCardMain>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import PersonalCardMain from '../components/cardMain/PersonalCardMain.vue';

export default defineComponent({
  name: 'UserLikeListCard',
  inheritAttrs: false,
  components: {
    PersonalCardMain,
  },
  props: {
    cardColumn: Number,
    userList: {
      type: Array,
      required: true,
    },
    CardUserId: {
      type: String,
      required: true,
    },
    likeList: {
      type: Array,
      required: false,
    },
  },
  setup(props) {
    const column = computed(() => props.cardColumn);
    const list = computed(() => props.userList);
    // 获取当前个人页的用户ID
    const cardUserIdProp = computed(() => Number(props.CardUserId));
    return {
      list,
      column,
      cardUserIdProp,
    };
  },
});
</script>

<style></style>
