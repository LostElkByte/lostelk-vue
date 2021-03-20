<template>
  <div class="page upload-picture-page">
    <Header :user="loginJudge"></Header>
    <Sidebar></Sidebar>
    <div class="main upload-picture_main">
      <ValidateForm @form-submit="onFormSubmit">
        <div class="content">
          <ValidateInput type="text" placeholder="标题" v-model="headlineVal" :rules="headlineRule" />
          <ValidateInput type="text" placeholder="描述" v-model="describeVal" :rules="describeRule" />
          <ValidateInput type="text" placeholder="标签" v-model="tagVal" :rules="tagRule" />
        </div>

        <div class="picture">
          <div class="picture-style">
            <label for="file">
              <svg class="icon icon-size-32 icon-size-fill" aria-hidden="true">
                <use xlink:href="#icon-tubiaolunkuo-"></use>
              </svg>
            </label>
          </div>
          <ValidateInput
            class="picture-style_file"
            type="file"
            id="file"
            v-model="pictureVal"
            :rules="pictureRule"
            accept="image/gif,image/jpeg,image/x-png,image/jpg"
            @change="onChangeFile"
          />
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
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import ValidateForm from '../components/ValidateForm.vue';
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue';

export default defineComponent({
  name: 'UploadPicture',
  components: {
    Header,
    Sidebar,
    ValidateForm,
    ValidateInput,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    /**
     * 表单校验
     */
    const headlineVal = ref('');
    const describeVal = ref('');
    const pictureVal = ref('');
    const tagVal = ref('');
    const headlineRule: RulesProp = [
      { type: 'null', message: '标题不能为空' },
      { type: 'headlineMaximum', message: '标题最多10个字符' },
    ];
    const describeRule: RulesProp = [
      { type: 'null', message: '描述不能为空' },
      { type: 'describeMaximum', message: '描述最多25个字符' },
    ];
    const tagRule: RulesProp = [{ type: 'tagMaximum', message: '标签最多5个字符' }];
    const pictureRule: RulesProp = [{ type: 'null', message: '请上传一张照片' }];

    /**
     * 表单提交
     */
    const onFormSubmit = (result: boolean) => {
      if (result) {
        router.push('/');
      } else {
        console.log('不通过');
      }
    };

    /**
     * change事件处理器
     */
    const onChangeFile = (event: Event) => {
      const currenTarget = event.target as HTMLInputElement;

      if (currenTarget.files) {
        const file = currenTarget.files[0];
      }
    };

    /**
     * 判断是否登录
     */
    const loginJudge = computed(() => {
      return store.state.user;
    });

    return {
      headlineVal,
      describeVal,
      tagVal,
      headlineRule,
      describeRule,
      pictureRule,
      tagRule,
      onFormSubmit,
      loginJudge,
      pictureVal,
      onChangeFile,
    };
  },
});
</script>

<style>
@import '../style/globalStyle/layout.css';
@import '../style/viewsStyle/upload-picture.css';
</style>
