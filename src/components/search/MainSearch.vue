<template>
  <div
    v-if="transverse.length != 0"
    class="main-search"
    :style="`background-image: url(${lostelkUrl}/files/${transverse[random].file.id}/serve?size=large);`"
  >
    <div class="main-search-superstratum">
      <div class="search-superstratum-center">
        <div class="search-superstratum-content">
          <span>LostElk</span>
          <div>
            <h1>The internet’s source of freely-usable images.</h1>
            <p>Powered by creators everywhere.</p>
          </div>
          <div class="main-search-box">
            <label class="main-search-button" for="main-search">
              <div class="search-button-32">
                <svg class="icon icon-size-fill" aria-hidden="true">
                  <use xlink:href="#icon-sousuo"></use>
                </svg>
              </div>
            </label>
            <input
              type="text"
              id="main-search"
              placeholder="search photos"
              v-model.trim="searchVal"
              @keyup.enter="search"
            />
            <div class="vertical-moulding"></div>
            <div class="header-search-type" @click.stop="typeSwitch">
              <span class="header-search-name">{{ typeName }}</span>
              <div :class="[typeOpen ? 'spin' : 'recover', 'search-button-12 ', 'header-search-name']">
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
        </div>
      </div>
      <div class="search-buttom">
        <span
          >This photo is from user
          <router-link :to="`/@${transverse[random].user.id}`">{{ transverse[random].user.name }}</router-link></span
        >
        <span>LostElk</span>
        <span>Discover the world’s free HD pictures & Creatives.</span>
      </div>
    </div>
  </div>
  <div v-else class="main-search">
    <div class="main-search-superstratum">
      <div class="search-superstratum-center">
        <div class="search-superstratum-content">
          <span>LostElk</span>
          <div>
            <h1>The internet’s source of freely-usable images.</h1>
            <p>Powered by creators everywhere.</p>
          </div>
          <div class="main-search-box">
            <label class="main-search-button" for="main-search">
              <div class="search-button-32">
                <svg class="icon icon-size-fill" aria-hidden="true">
                  <use xlink:href="#icon-sousuo"></use>
                </svg>
              </div>
            </label>
            <input
              type="text"
              id="main-search"
              placeholder="search photos"
              v-model.trim="searchVal"
              @keyup.enter="search"
            />
          </div>
        </div>
      </div>
      <div class="search-buttom">
        <span>No display diagram</span>
        <span>LostElk</span>
        <span>Discover the world’s free HD pictures & Creatives.</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { lostelkUrl } from '../../global';
import router from '../../router';
import store from '../../store';
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

    // 获取精选横图
    const transverse = computed(() => store.state.veryGoodsTransverseList);
    // 生成数组下标随机数
    const random = computed(() => Math.floor(Math.random() * transverse.value.length));

    return {
      lostelkUrl,
      search,
      type,
      typeList,
      typeSwitch,
      selectType,
      searchVal,
      typeName,
      typeOpen,
      transverse,
      random,
    };
  },
});
</script>

<style>
@import '../../style/less/componentsStyle/main-search-box.css';
</style>
