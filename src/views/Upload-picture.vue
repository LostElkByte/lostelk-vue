<template>
  <div class="page upload-picture-page">
    <div class="header upload-picture_header"></div>
    <Sidebar></Sidebar>
    <div class="main upload-picture_main">
      <form action="">
        <div class="content">
          <input type="text" placeholder="标题" />
          <input type="text" placeholder="描述" />
          <input type="text" placeholder="标签" />
        </div>
        <div class="picture">
          <div class="picture-style">
            <input
              class="picture-style_file"
              type="file"
              id="file"
              accept="image/gif,image/jpeg,image/x-png"
            />
            <label for="file">
              <svg class="icon icon-size-fill" aria-hidden="true">
                <use xlink:href="#icon-tubiaolunkuo-"></use>
              </svg>
            </label>
          </div>
        </div>
        <div class="publish">
          <a href="#" class="form-btn">
            发布
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Sidebar from '../components/Sidebar.vue';
export default defineComponent({
  name: 'UploadPicture',
  components: {
    Sidebar,
  },
});
</script>

<style>
@import '../style/globalStyle/layout.css';
@import '../style/viewsStyle/upload-picture.css';
</style>
