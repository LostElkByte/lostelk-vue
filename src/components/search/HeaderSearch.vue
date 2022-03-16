<template>
  <div class="header-search-box">
    <label class="header-search-button" for="header-search">
      <span class="search-button-20">
        <svg class="icon icon-size-fill" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </span>
    </label>
    <input type="text" v-model.trim="searchVal" @keyup.enter="search" id="header-search" placeholder="search photos" />
    <div class="vertical-moulding"></div>
    <div class="header-search-type" @click.stop="typeSwitch">
      <span class="header-search-name">{{ typeName }}</span>
      <div :class="[typeOpen ? 'recover' : 'spin', 'search-button-12 ', 'header-search-name']">
        <svg class="icon icon-size-fill" aria-hidden="true">
          <use xlink:href="#icon-down"></use>
        </svg>
      </div>
      <div class="search-popup" v-show="typeOpen">
        <template v-for="(item, index) in typeList" :key="index">
          <div
            :class="[type === item.type ? 'search-popup-item-checked' : '', 'search-popup-item']"
            @click.stop="selectType(item)"
          >
            {{ item.name }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import router from '../../router';
export default defineComponent({
  setup() {
    const typeOpen = ref(false);
    const type = ref('tag');
    const typeName = ref('标签');
    const typeList = [
      { name: '标签', type: 'tag' },
      { name: '颜色', type: 'color' },
    ];
    const typeSwitch = () => {
      typeOpen.value = !typeOpen.value;
    };
    const selectType = (val: { type: string; name: string }) => {
      type.value = val.type;
      typeName.value = val.name;
      typeOpen.value = !typeOpen.value;
    };

    const searchVal = ref();
    const search = () => {
      if (searchVal.value) {
        switch (type.value) {
          case 'tag':
            router.push(`/search/tag/${searchVal.value}`);
            break;
          case 'color':
            router.push(`/search/color/${searchVal.value}`);
            break;
          default:
            break;
        }
      }
    };
    return {
      search,
      searchVal,
      typeList,
      typeOpen,
      typeSwitch,
      selectType,
      type,
      typeName,
    };
  },
});
</script>

<style>
@import '../../style/less/componentsStyle/header-search.css';
</style>
