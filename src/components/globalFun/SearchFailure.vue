<template>
  <div class="search-failure">
    <div class="search-failure-icon">
      <img src="../../assets/images/noData.png" alt="" />
    </div>
    <h3>{{ promptProps }}</h3>
    <p>It seems we can’t find any results based on your search.</p>
    <button @click="goBack">
      Load more Shots
    </button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import router from '../../router';
import store from '../../store';
export default defineComponent({
  props: {
    prompt: {
      type: String,
      default: 'No results found',
    },
  },
  setup(props) {
    const promptProps = computed(() => props.prompt);
    /**
     * 重新加载全部照片
     */
    const goBack = () => {
      router.push('/');
      store.commit('setSearchFailure', false);
      store.commit('mainSearchIsNone', true);
    };

    return {
      goBack,
      promptProps,
    };
  },
});
</script>

<style scoped>
@import '../../style/less/componentsStyle/search-failure.css';
</style>
