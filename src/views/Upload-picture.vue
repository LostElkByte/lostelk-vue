<template>
  <div class="page upload-picture-page">
    <div class="header upload-picture_header"></div>
    <Sidebar></Sidebar>
    <div class="main upload-picture_main">
      <ValidateForm>
        <div class="content">
          <ValidateInput
            type="text"
            placeholder="标题"
            v-model="headlineVal"
            :rules="headlineRule"
          />
          <ValidateInput
            type="text"
            placeholder="描述"
            v-model="describeVal"
            :rules="describeRule"
          />
          <ValidateInput
            type="text"
            placeholder="标签"
            v-model="tagVal"
            :rules="tagRule"
          />
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
        <template v-slot:submit>
          <div class="publish">
            <a href="#" class="form-btn">
              发布
            </a>
          </div>
        </template>
      </ValidateForm>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import ValidateForm from '../components/ValidateForm.vue';
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue';

export default defineComponent({
  name: 'UploadPicture',
  components: {
    Sidebar,
    ValidateForm,
    ValidateInput,
  },
  setup() {
    const headlineVal = ref('');
    const describeVal = ref('');
    const tagVal = ref('');
    const headlineRule: RulesProp = [
      { type: 'null', message: '标题不能为空' },
      { type: 'headlineMaximum', message: '标题最多10个字符' },
    ];
    const describeRule: RulesProp = [
      { type: 'null', message: '描述不能为空' },
      { type: 'describeMaximum', message: '描述最多25个字符' },
    ];
    const tagRule: RulesProp = [
      { type: 'tagMaximum', message: '标签最多5个字符' },
    ];
    return {
      headlineVal,
      describeVal,
      tagVal,
      headlineRule,
      describeRule,
      tagRule,
    };
  },
});
</script>

<style>
@import '../style/globalStyle/layout.css';
@import '../style/viewsStyle/upload-picture.css';
</style>
