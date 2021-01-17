<template>
  <div class="home-page_main">
    <div class="home-page_main_cards">
      <div
        v-for="card in list"
        :key="card.id"
        :class="
          card.file.width / card.file.height >= 1
            ? 'home-page_main_cards_item'
            : 'home-page_main_cards_item home-page_main_cards_item-big'
        "
      >
        <img
          src="https://ovoiii.com/files/1/serve?size=large"
          :alt="card.title"
        />
        <div class="card-abstract">
          <div class="card_abstract-left">
            <img
              class="card-avatar-32"
              src="https://ovoiii.com/users/1/avatar?size=small"
              :alt="card.user.name"
            />
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
              <span>15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export interface CartList {
  id: number;
  title: string;
  content: string;
  user: {
    id: number;
    name: string;
    avatar: number;
  };
  totalComments: number;
  file: {
    id: number;
    width: number;
    height: number;
  };
  tags: null;
  totalLikes: number;
}
export default defineComponent({
  name: 'HomePageMain',
  props: {
    list: {
      type: Array as PropType<CartList[]>,
      required: true,
    },
  },
});
</script>

<style>
@import './style/home-page_main.css';
</style>
