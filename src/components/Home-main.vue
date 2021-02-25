<template>
  <div class="home-page_main">
    <div class="home-page_main_cards">
      <div
        v-for="card in cardList"
        :key="card.id"
        :class="
          card.file && card.file.width / card.file.height >= 1
            ? 'home-page_main_cards_item'
            : 'home-page_main_cards_item home-page_main_cards_item-big'
        "
      >
        <img
          :src="card.file.id ? `${lostelkUrl}/files/${card.file.id}/serve?size=medium` : card.file.fakeUrl"
          :alt="card.title"
        />
        <div class="card-abstract">
          <div class="card_abstract-left">
            <img v-if="card.user.avatar" class="card-avatar-32" :src="card.user.url" :alt="card.user.name" />
            <div v-else class="card-avatar-32">
              <svg class="card-avatar-32" aria-hidden="true">
                <use xlink:href="#icon-weidenglu"></use>
              </svg>
            </div>
            <div class="card-abstract-author">
              <span>{{ card.title }}</span> <br />
              <span>{{ card.user.name }}</span>
            </div>
          </div>
          <div class="card-abstract-right">
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xihuan"></use>
              </svg>
              <span>{{ card.totalLikes }}</span>
            </div>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-pinglun"></use>
              </svg>
              <span>{{ card.totalComments }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { lostelkUrl } from '../global';
// import { axios } from '../service/service';
export interface CardList {
  id: number;
  title: string;
  content: string;
  user: {
    id: number;
    name: string;
    avatar?: number;
    url?: string;
  };
  totalComments: number;
  file: {
    id?: number;
    width: number;
    height: number;
    fakeUrl?: string;
  };
  tags?: unknown;
  totalLikes: number;
}
export default defineComponent({
  name: 'HomeMain',
  props: {
    list: {
      type: Array as PropType<CardList[]>,
      required: true,
    },
  },
  setup(props) {
    const cardList = computed(() => {
      return props.list.map(card => {
        // 如果图片不存在 则添加默认图片
        if (!card.file) {
          card.file = {
            width: 300,
            height: 200,
            fakeUrl: require('@/assets/images/content2.jpeg'),
          };
        }
        // 如果头像存在设置url
        if (card.user.avatar) {
          card.user.url = `${lostelkUrl}/users/${card.user.id}/avatar?size=small`;
        }
        return card;
      });
    });

    // const giveLike = (id: number) => {
    //   axios.post(`/posts/${id}/like`);
    // };
    //  @click="giveLike(card.id)"

    return {
      lostelkUrl,
      cardList,
      // giveLike,
    };
  },
});
</script>

<style>
@import '../style/componentsStyle/home-main.css';
</style>
