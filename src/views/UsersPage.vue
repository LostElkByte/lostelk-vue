<template>
  <div class="page">
    <Header :user="loginJudge"></Header>
    <div class="main users-page-main">
      <div class="search-results">
        <h1 class="search-results-heading">
          {{ userName }}
        </h1>
        <p class="search-results-description">Browse {{ totalCount }} users about {{ userName }}</p>
      </div>
      <div class="users-page-cards">
        <div class="users-card" v-for="(item, index) in userList" :key="index">
          <div class="users-card-header">
            <div class="card-user">
              <div class="card-user-avatar">
                <img
                  v-if="item.avatar"
                  class="content-header-author-photo-32"
                  :src="`${lostelkUrl}/users/${item.id}/avatar?size=medium`"
                  :alt="item.name"
                />
                <svg v-else class="icon" style="width: 100%;height: 100%;" aria-hidden="true">
                  <use xlink:href="#icon-touxiangnvhai"></use>
                </svg>
              </div>
              <div class="card-user-details">
                <span class="card-user-details-name">{{ item.name }}</span>
                <span class="card-user-details-synopsis">{{ item.synopsis || '' }}</span>
              </div>
            </div>
            <div class="card-actions">
              <span>进入</span>
            </div>
          </div>
          <div class="users-page-posts" v-if="item.files">
            <div class="users-page-posts-item" v-for="item in item.files" :key="item">
              <img :src="`${lostelkUrl}/files/${item}/serve?size=large`" />
            </div>
          </div>
          <div class="users-page-posts-null" v-else>
            <span>No shots just yet!</span>
          </div>
        </div>
      </div>
    </div>
    <Sidebar></Sidebar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { lostelkUrl } from '../global';
import Header from '../components/header/HeaderBox.vue';
import Sidebar from '../components/sidebar/SidebarBox.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
export default defineComponent({
  name: 'UserPage',
  components: {
    Header,
    Sidebar,
  },

  setup(props) {
    const store = useStore();
    const route = useRoute();

    const userName = computed(() => route.params.val);

    // 进行登陆判断
    const loginJudge = computed(() => {
      return store.state.user;
    });

    // 用户总数
    const totalCount = ref();
    // 用户列表
    const userList = ref();

    onMounted(async () => {
      const res = await store.dispatch('getSearchValCardBriefList', { val: userName.value, type: 'user' });
      totalCount.value = res.headers['x-total-count'];
      userList.value = res.data;

      console.log(res);
    });

    return {
      lostelkUrl,
      loginJudge,
      userName,
      totalCount,
      userList,
    };
  },
});
</script>

<style>
@import '../style/less/globalStyle/layout.css';
@import '../style/less/viewsStyle/uers-page.css';
</style>
