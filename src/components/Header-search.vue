<template>
  <form class="header-search-box">
    <label class="header-search-button" for="header-search">
      <span class="search-button-20">
        <svg class="icon icon-size-fill" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </span>
    </label>
    <input type="text" id="header-search" placeholder="search photos" />
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style>
.header-search-box {
  position: relative;
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: flex-start;
  border-radius: 20px;
  background-color: #f5f5f5;
  color: #767676;
  max-width: 600px;
  float: left;
}

.header-search-button {
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  font-size: 16px;
  height: 100%;
  border: none;
  padding: 0;
  background-color: initial;
  text-align: inherit;
}

.search-button-20 {
  width: 20px;
  height: 20px;
}
.search-button-24 {
  width: 24px;
  height: 24px;
}
.header-search-box input {
  display: inline-block;
  display: flex;
  flex-grow: 1;
  height: 100%;
  border: none;
  padding: 0;
  background-color: initial;
  text-align: inherit;
  overflow: hidden;
}

.header-search-box:hover {
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
}
</style>
