<template>
  <div class="header">
    <div class="header_toolbar">
      <div v-if="!user.isLogin">
        <div class="header_loginRegister_item">
          <a href="#">登陆</a>
        </div>
        <div class="header_loginRegister_item">
          <a href="#">注册</a>
        </div>
      </div>

      <div v-else>
        <!-- <div class="header_toolbar_item header_toolbar_item_size-24">
          <a href="#">
            <svg class="icon icon-size-fill" aria-hidden="true">
              <use xlink:href="#icon-zuocelan"></use>
            </svg>
          </a>
        </div> -->
        <DropDownList>
          <a href="#" class="dropbtn">
            <svg class="icon icon-size-fill" aria-hidden="true">
              <use xlink:href="#icon-zuocelan"></use>
            </svg>
          </a>
        </DropDownList>
        <!-- <div class="header_toolbar_item header_toolbar_item_size-24">
          <a href="#">
            <svg class="icon icon-size-fill" aria-hidden="true">
              <use xlink:href="#icon-celanliebiaogengduo"></use>
            </svg>
          </a>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import DropDownList from './drop-down-list.vue';
export interface UserMode {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export default defineComponent({
  name: 'header',
  components: {
    DropDownList,
  },
  props: {
    user: {
      type: Object as PropType<UserMode>,
      required: true,
    },
  },
});
</script>

<style>
@import './style/header.css';
</style>
