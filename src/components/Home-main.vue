<template>
  <div class="home-page_main">
    <div class="home-page_main_cards">
      <div
        v-for="card in cartList"
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
            <img
              v-if="card.user.avatar"
              class="card-avatar-32"
              :src="`${lostelkUrl}/users/${card.user.id}/avatar?size=small`"
              :alt="card.user.name"
            />
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
export interface CartList {
  id: number;
  title: string;
  content: string;
  user: {
    id: number;
    name: string;
    avatar?: number;
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
      type: Array as PropType<CartList[]>,
      required: true,
    },
  },
  setup(props) {
    // 如果图片不存在 则添加默认图片
    const cartList = computed(() => {
      return props.list.map(cart => {
        if (!cart.file) {
          cart.file = {
            width: 300,
            height: 200,
            fakeUrl: require('@/assets/images/content2.jpeg'),
          };
        }
        return cart;
      });
    });
    return {
      lostelkUrl,
      cartList,
    };
  },
});
</script>

<style>
@import '../style/componentsStyle/home-main.css';
</style>
