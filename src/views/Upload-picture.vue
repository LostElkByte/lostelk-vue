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
              <img v-if="imagePreviewUrl" class="image-preview" :src="imagePreviewUrl" alt="" />
              <svg v-else class="icon icon-size-32 icon-size-fill" aria-hidden="true">
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
            accept="image/jpeg,image/x-png,image/jpg"
            @change="onChangeFile"
            ref="fileElement"
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
import axios from 'axios';
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import createTooltip from '../components/createTooltip';
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
     * 使用FileReader 预览图像
     */
    const imagePreviewUrl = ref();
    const createImagePreview = (file: Blob) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = event => {
        imagePreviewUrl.value = event.target?.result;
      };
    };

    /**
     * change事件处理器
     * 选择文件用的文件字段
     */

    const fileMessage = ref();
    const onChangeFile = (event: Event) => {
      const currenTarget = event.target as HTMLInputElement;

      if (currenTarget.files) {
        const file = currenTarget.files[0];

        fileMessage.value = file;
        createImagePreview(file);
      }
    };

    /**
     * 请求上传文件
     */
    const fileElement = ref();
    const careateFile = async (file: Blob, postId: number) => {
      try {
        // 创建表单
        const formData = new FormData();

        // 添加字段
        formData.append('file', file);

        // 上传文件
        await axios.post(`/files?post=${postId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // 清理
        fileMessage.value = null;
        imagePreviewUrl.value = null;
        fileElement.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    /**
     * 请求上传标签
     */
    const createTag = async (postId: number) => {
      try {
        await axios.post(`/posts/${postId}/tag`, { name: tagVal.value });
      } catch (error) {
        console.log(error);
      }
    };

    /**
     * 请求上传内容
     */
    const createPost = async () => {
      try {
        const response = await axios.post('/posts', { title: headlineVal.value, content: describeVal.value });
        if (tagVal.value != '') {
          createTag(response.data.insertId);
        }
        if (fileMessage.value) {
          await careateFile(fileMessage.value, response.data.insertId);
        }
      } catch (error) {
        console.log(error);
      }
    };

    /**
     * 表单提交
     */
    const onFormSubmit = async (result: boolean) => {
      if (result) {
        await createPost();
        headlineVal.value = '';
        describeVal.value = '';
        tagVal.value = '';
        await createTooltip('上传成功', 'success', 3000);
        await router.push('/');
      } else {
        console.log('不通过');
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
      imagePreviewUrl,
      fileMessage,
      fileElement,
    };
  },
});
</script>

<style>
@import '../style/globalStyle/layout.css';
@import '../style/viewsStyle/upload-picture.css';
</style>
