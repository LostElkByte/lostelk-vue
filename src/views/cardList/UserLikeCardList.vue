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
import store from '../../store';

export default defineComponent({
  name: 'UserLikeListCard',
  inheritAttrs: false,
  components: {
    PersonalCardMain,
  },
  props: {
    cardColumn: Number,
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

    // 获取当前个人页的用户ID
    const UserIdProp = computed(() => Number(props.UserId));

    // 获取第一页数据
    const list = computed(() => store.state.userLikeCardList);

    // 获取列表总数量
    const userLikeCardTotalCount = computed(() => store.state.userLikeCardTotalCount);

    // 将 没有更多 提示  初始化设置为false
    store.commit('noMore', false);

    if (list.value.length === 0) {
      //没有搜索到内容 则 修改搜索结果为true, 切换到未没有内容组件
      store.commit('setSearchFailure', false);
    } else {
      // 搜索到内容将未没有内容提示隐藏,  并且将主页搜索框隐藏
      store.commit('setSearchFailure', false);
      // 如果总页数等于1
      if (Math.ceil(userLikeCardTotalCount.value / 20) === 1) {
        // 将 没有更多 提示 设置为true
        store.commit('noMore', true);
      }
    }

    return {
      list,
      column,
      UserIdProp,
    };
  },
});
</script>

<style></style>
