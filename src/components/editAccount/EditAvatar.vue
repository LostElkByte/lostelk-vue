<template>
  <div class="edit-avatar margin-bottom-36">
    <div class="avatar">
      <h2 class="Edit-account-header">设置头像</h2>
      <form class="avatar-form" @submit.prevent="submitFrom">
        <div class="choose-before">
          <div class="avatar-img">
            <img class="avatar-img" v-if="imagePreviewUrl" :src="`${imagePreviewUrl}`" :alt="userData.name" />
            <img
              class="avatar-img"
              v-else-if="userData.avatar != null"
              :src="`${lostelkUrl}/users/${userData.id}/avatar`"
              :alt="userData.name"
            />
            <svg v-else class="icon avatar-img" aria-hidden="true">
              <use xlink:href="#icon-touxiangnvhai"></use>
            </svg>
          </div>

          <input
            class="avatar-form-input"
            ref="fileRef"
            type="file"
            id="avatar"
            @change="onChangeFile"
            accept="image/png, image/jpeg, image/jpg"
          />
          <label for="avatar" class="avatar-form-choose" v-if="!imagePreviewUrl">
            选择头像
          </label>
        </div>
        <div class="choose-then" v-if="imagePreviewUrl">
          <label for="avatar" class="avatar-form-choose">
            重新选择
          </label>
          <div class="avatar-form-choose" @click="cancel">
            取消
          </div>
          <button class="avatar-form-choose" type="submit">
            提交
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { computed, defineComponent, ref } from 'vue';
import { lostelkUrl } from '../../global';
import router from '../../router';
import store from '../../store';
import createTooltip from '../globalFun/createTooltip';

export default defineComponent({
  name: 'EditAvatar',
  components: {},
  setup() {
    const userData = computed(() => store.state.user);
    const fileRef = ref();
    const fileData = ref();

    /**
     *  预览图像
     **/
    const imagePreviewUrl = ref();

    const createImagePreview = (file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        imagePreviewUrl.value = event.target?.result;
      };
    };

    /**
     * 获取图像数据
     */
    const onChangeFile = (event: Event) => {
      // 拿到当前dom节点
      const currenTarget = event.target as HTMLInputElement;
      if (currenTarget.files) {
        // 拿到第一张图片
        const file = currenTarget.files[0];
        if (file) {
          fileData.value = file;
          createImagePreview(file);
        }
      }
    };

    /**
     * 上传头像
     */
    const createFile = async (file: File) => {
      // 创建表单
      const formData = new FormData();

      // 添加字段
      formData.append('avatar', file);

      // 上传文件
      try {
        await axios.post('/avatar', formData);

        // 清理
        imagePreviewUrl.value = null;
        fileRef.value.value = '';
        fileData.value = null;

        await createTooltip('修改头像成功', 'success', 1000);

        setTimeout(() => {
          router.go(0);
        }, 1000);
      } catch (error) {
        console.log(error);
        await createTooltip('上传失败,可能是您的照片不符合要求或网络波动', 'error', 3000);
      }
    };

    /**
     * 提交
     */
    const submitFrom = () => {
      createFile(fileData.value);
    };

    /**
     * 取消
     */
    const cancel = () => {
      imagePreviewUrl.value = null;
      fileRef.value.value = '';
      fileData.value = null;
    };

    return {
      userData,
      lostelkUrl,
      onChangeFile,
      imagePreviewUrl,
      fileRef,
      submitFrom,
      cancel,
    };
  },
});
</script>
