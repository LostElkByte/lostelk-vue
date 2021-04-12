<template>
  <div class="page upload-picture-page">
    <Header :user="loginJudge"></Header>
    <Sidebar></Sidebar>
    <div class="main upload-picture_main">
      <ValidateForm @form-submit="onFormSubmit">
        <div class="content">
          <ValidateInput type="text" placeholder="标题(必选)" v-model="headlineVal" :rules="headlineRule" />
          <ValidateInput
            type="text"
            placeholder="描述一下您的制作灵感、构图、想法..."
            v-model="describeVal"
            :rules="describeRule"
          />
          <ValidateInput type="text" placeholder="标签(必选)" v-model="tagVal" :rules="tagRule" />
          <div class="content-tags">
            <span>
              秋
              <svg class="icon delete-tages-icon" aria-hidden="true">
                <use xlink:href="#icon-guanbi1"></use>
              </svg>
            </span>
          </div>
        </div>

        <div class="picture">
          <div class="picture-style">
            <label for="file">
              <img v-if="imagePreviewUrl" class="image-preview" :src="imagePreviewUrl" alt="" />
              <svg v-else class="icon icon-size-32 icon-size-fill" aria-hidden="true">
                <use xlink:href="#icon-tubiaolunkuo-"></use>
              </svg>
              <div
                v-if="imageUploadProgress"
                class="image-upload-progress"
                :style="'width:' + imageUploadProgress + '%'"
              >
                <span v-if="imageUploadProgress < 100"> {{ imageUploadProgress + '%' }}</span>
                <div v-else class="image-upload-await">
                  <span>正在处理图像,请稍后</span>
                  <span class="throbber-loader">Loading&#8230;</span>
                </div>
              </div>
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
            :fileIsNull="fileIsNull"
          />
        </div>

        <template v-slot:submit>
          <div class="publish">
            <input ref="isDisabled" type="submit" name="commit" value="发表" class="form-btn" />
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
    const uploaderror = ref();

    /**
     * 表单校验
     */
    const headlineVal = ref('');
    const describeVal = ref('');
    const pictureVal = ref('');
    const tagVal = ref('');
    const headlineRule: RulesProp = [
      { type: 'null', message: '需要给您的图像起一个名字' },
      { type: 'headlineMaximum', message: '标题最多15个字符' },
    ];
    const describeRule: RulesProp = [{ type: 'describeMaximum', message: '描述最多个100字符' }];
    const tagRule: RulesProp = [
      { type: 'null', message: '为了便于搜索,需要为图像添加一个初始标签' },
      { type: 'tagMaximum', message: '标签最多10个字符' },
      { type: 'tag', message: '标签仅支持字母或中文' },
    ];
    const pictureRule: RulesProp = [{ type: 'fileNull', message: '需要上传一张图像' }];

    /**
     * 使用FileReader 预览图像
     */
    const imagePreviewUrl = ref();
    const createImagePreview = (file: Blob) => {
      const reader = new FileReader();
      // 读取图像,将file处理成base64格式,并添加到event.target?.result
      reader.readAsDataURL(file);
      // 读取完毕,将base64格式的图像数据设置到imagePreviewUrl上,用于src展示
      reader.onload = event => {
        imagePreviewUrl.value = event.target?.result;
      };
    };

    /**
     * change事件处理器
     * 获取选择文件用的文件字段
     */

    // 存储上一次选择的图片数据的临时变量
    const lastPrev = ref();
    // 文件数据
    const fileMessage = ref();
    // 传给input组件验证用的数据
    const fileIsNull = ref();

    const onChangeFile = (event: Event) => {
      // 拿到当前dom节点
      const currenTarget = event.target as HTMLInputElement;

      // 判断当前节点存在files属性
      if (currenTarget.files) {
        // 如果存在图像数据就将第一个图像数据给file,如没有就把上一张选择的图片数据给file
        const file = currenTarget.files[0] || lastPrev.value;
        // 将本次获得的file存储到lastPrev临时变量中
        lastPrev.value = file;
        // 将file文件数据发送给fileMessage,用作上传文件函数的file参数
        fileMessage.value = file;
        // 获得传给input组件验证用的数据
        fileIsNull.value = computed(() => file);
        // 执行createImagePreview预览图像
        createImagePreview(file);
      }
    };

    /**
     * 请求上传文件
     */
    const fileElement = ref();
    const imageUploadProgress = ref();
    const careateFile = async (file: Blob, postId: number) => {
      try {
        // 创建表单
        const formData = new FormData();

        // 添加字段
        formData.append('file', file);

        // 禁止显示全局请求样式
        store.commit('setIsShowLoading', false);

        // 上传文件
        await axios.post(`/files?post=${postId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          // 上传进度值
          onUploadProgress: event => {
            const { loaded, total } = event;
            // 将上传进度传递给imageUploadProgress
            imageUploadProgress.value = Math.round((loaded * 100) / total);
          },
        });

        // 清理
        fileMessage.value = null;
        imagePreviewUrl.value = null;
        pictureVal.value = '';
        imageUploadProgress.value = null;
        lastPrev.value = '';
      } catch (error) {
        // 清理
        fileMessage.value = null;
        imagePreviewUrl.value = null;
        pictureVal.value = '';
        imageUploadProgress.value = null;
        lastPrev.value = '';

        uploaderror.value = error;
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
          await createTag(response.data.insertId);
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

    // 获取dom
    const isDisabled = ref();

    const onFormSubmit = async (result: boolean) => {
      if (result) {
        // 将提交按钮内容设置为...,并且禁止操作
        isDisabled.value.disabled = 'isDisabled';
        isDisabled.value.value = '...';

        // 执行请求上传内容组件

        await createPost();

        //上传完毕 清空表单内容、恢复提交按钮功能与样式
        headlineVal.value = '';
        describeVal.value = '';
        tagVal.value = '';
        isDisabled.value.removeAttribute('disabled');
        isDisabled.value.value = '发表';

        // 如果有错误
        if (uploaderror.value) {
          uploaderror.value = '';
        } else {
          // 如果有上传成功,执行成功提示;
          await createTooltip('上传成功,3秒后跳转到首页', 'success', 3000);
          await setTimeout(() => {
            router.push('/');
          }, 3000);
        }
      } else {
        console.log('不通过');
      }
    };

    /**
     * 判断是否登录,用于header组件
     */
    const loginJudge = computed(() => {
      return store.state.user;
    });

    return {
      headlineVal,
      describeVal,
      pictureVal,
      tagVal,
      headlineRule,
      describeRule,
      pictureRule,
      tagRule,
      onFormSubmit,
      loginJudge,
      onChangeFile,
      imagePreviewUrl,
      fileMessage,
      fileElement,
      imageUploadProgress,
      isDisabled,
      fileIsNull,
    };
  },
});
</script>

<style scoped>
@import '../style/less/globalStyle/layout.css';
@import '../style/less/viewsStyle/upload-picture.css';
</style>
