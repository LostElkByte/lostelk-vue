<template>
  <div class="page upload-picture-page">
    <Header :user="loginJudge"></Header>
    <Sidebar></Sidebar>
    <div
      class="main upload-picture_main"
      v-if="postData && (userId === postData.user.id || userId === 1)"
    >
      <ValidateForm @form-submit="onFormSubmit">
        <div class="content">
          <label for="title">
            title of works
          </label>
          <ValidateInput
            id="title"
            type="text"
            placeholder="the title of works (required)"
            v-model="headlineVal"
            :value="headlineVal"
            :rules="headlineRule"
          />

          <label for="describe">
            describe
          </label>
          <ValidateInput
            id="describe"
            :tag="`textarea`"
            placeholder="Describe your inspiration, composition, ideas..."
            v-model="describeVal"
            :value="describeVal"
            :rules="describeRule"
          />

          <label for="tag">
            tag
          </label>
          <ValidateInput
            id="tag"
            type="text"
            maxlength="30"
            placeholder=""
            v-model="tagVal"
            :value="tagVal"
            @keyup.enter="addTag"
          />
          <div class="choose-tag" v-if="tagVal != ''" @click="addTag">
            <span>
              {{ tagVal }}
              <svg class="icon delete-tages-icon" aria-hidden="true">
                <use xlink:href="#icon-jiahao10"></use>
              </svg>
            </span>
          </div>
          <span class="edit-card-form-error" v-if="tagRule !== ''">
            {{ tagRule }}
          </span>
          <div class="content-tags" v-if="tags.length != 0">
            <span v-for="tag in tags" :key="tag.id">
              {{ tag.name }}
              <svg
                class="icon delete-tages-icon"
                aria-hidden="true"
                @click="deleteTag(tag)"
              >
                <use xlink:href="#icon-ziyuan1-copy"></use>
              </svg>
            </span>
          </div>
        </div>

        <div class="picture">
          <div class="picture-style">
            <label for="file">
              <img
                v-if="imagePreviewUrl"
                class="image-preview"
                :src="imagePreviewUrl"
                alt=""
              />
              <img
                v-else
                :src="
                  `${lostelkUrl}/files/${postData.file.id}/serve?size=large`
                "
                :alt="postData.title"
                class="image-preview"
              />
              <div class="image-icon">
                <svg
                  class="icon icon-size-32 icon-size-fill"
                  aria-hidden="true"
                >
                  <use xlink:href="#icon-tubiaolunkuo-"></use>
                </svg>
              </div>
              <div
                v-if="imageUploadProgress"
                class="image-upload-progress"
                :style="'width:' + imageUploadProgress + '%'"
              >
                <span v-if="imageUploadProgress < 100">
                  {{ imageUploadProgress + '%' }}
                </span>
                <div v-else class="image-upload-await">
                  <div>
                    <span>Please wait while images are being processed</span>
                    <span class="throbber-loader">Loading&#8230;</span>
                  </div>
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
            <input
              ref="isDisabled"
              type="submit"
              name="commit"
              value="save"
              class="form-btn"
            />
          </div>
        </template>
      </ValidateForm>
    </div>
    <NoPermission
      class="main"
      v-else-if="postData && (userId !== postData.user.id || !(userId != 1))"
    >
      <p>You do not have permission to edit this content</p>
    </NoPermission>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { lostelkUrl } from '../global';
import { computed, defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import createTooltip from '../components/globalFun/createTooltip';
import Header from '../components/header/HeaderBox.vue';
import Sidebar from '../components/sidebar/SidebarBox.vue';
import ValidateForm from '../components/form/ValidateForm.vue';
import NoPermission from '../components/globalFun/NoPermission.vue';
import ValidateInput, { RulesProp } from '../components/form/ValidateInput.vue';

export default defineComponent({
  name: 'UploadPicture',
  components: {
    Header,
    Sidebar,
    ValidateForm,
    ValidateInput,
    NoPermission
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const uploaderror = ref();
    // 获取进入页的url
    const uploadAfterToUrl = computed(() => store.state.uploadAfterToUrl);
    // 获取是从哪个页进入
    const fromWhichPage = computed(() => store.state.fromWhichPage);

    /**
     * 表单校验
     */
    const headlineVal = ref('');
    const describeVal = ref('');
    const pictureVal = ref('');
    const tagVal = ref('');
    const headlineRule: RulesProp = [
      { type: 'null', message: 'need to give your photo a name' },
      {
        type: 'headlineMaximum',
        message: 'Headings can contain up to 15 characters'
      }
    ];
    const describeRule: RulesProp = [
      {
        type: 'describeMaximum',
        message: 'The description contains a maximum of 100 characters'
      }
    ];
    const tagRule = ref();
    const pictureRule: RulesProp = [];

    watch(
      () => tagVal.value,
      () => {
        if (tagVal.value.length >= 30) {
          tagRule.value = 'A tag contains a maximum of 30 characters';
        } else {
          tagRule.value = '';
        }
      }
    );

    /**
     * 获取当前登陆用户的id
     */
    const userId = computed(() => store.state.user.id);

    /**
     * 获取要编辑的内容
     */
    // 获取当前帖子的ID
    const postId = computed(() => Number(props.id));
    const postData = ref();
    const tags = ref();
    const getPost = async () => {
      await store.dispatch('getCard', postId.value).then(data => {
        postData.value = data;
        tags.value = data.tags ? data.tags : [];
        headlineVal.value = data.title;
        describeVal.value = data.content;
      });
    };
    getPost();

    /**
     * 添加标签
     * 1.判断新标签内容不为空 并且 在tags数组中不存在
     * 2.将新标签内容添加到tags数组中,用于实时展示
     * 3.将新标签内容添加到newAddTagData数组中,用于发送请求时,上传标签
     */
    const newAddTagData = ref([] as { name: string }[]);
    const addTag = () => {
      if (
        tagVal.value.trim() !== '' &&
        !tags.value.some((item: { name: string }) => item.name === tagVal.value)
      ) {
        if (tagVal.value === '精选横图' || tagVal.value === '精选纵图') {
          if (userId.value !== 1) {
            tagVal.value = '';
            createTooltip('您没有权限使用这个标签', 'error', 3000);
            return;
          }
        }
        const tag = tagVal.value.trim();
        tags.value.push({ name: tag });
        newAddTagData.value.push({ name: tag });
        tagVal.value = '';
      } else {
        tagVal.value = '';
      }
    };

    /**
     * 删除标签
     * 1.如果 新添加标签的数组里包含要删除的标签内容,则在newAddTagData中删除掉
     * 2.否则 记录到deleteTagData数组中,用于删除标签请求时使用
     * 3.在tags展示列表中删除对应标签
     */
    const deleteTagData = ref([] as { id: number; name: string }[]);
    const deleteTag = (tag: { id: number; name: string }) => {
      if (
        newAddTagData.value.some(
          (item: { name: string }) => item.name === tag.name
        )
      ) {
        newAddTagData.value = newAddTagData.value.filter(
          (item: { name: string }) => item.name !== tag.name
        );
      } else {
        deleteTagData.value.push(tag);
      }
      tags.value = tags.value.filter(
        (item: { name: string }) => item.name !== tag.name
      );
    };

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
            'Content-Type': 'multipart/form-data'
          },
          // 上传进度值
          onUploadProgress: event => {
            const { loaded, total } = event;
            // 将上传进度传递给imageUploadProgress
            imageUploadProgress.value = Math.round((loaded * 100) / total);
          }
        });

        // 清理
        fileMessage.value = null;
        imagePreviewUrl.value = null;
        pictureVal.value = '';
        describeVal.value = '';
        imageUploadProgress.value = null;
        lastPrev.value = '';
      } catch (error) {
        // 清理
        fileMessage.value = null;
        imagePreviewUrl.value = null;
        pictureVal.value = '';
        describeVal.value = '';
        imageUploadProgress.value = null;
        lastPrev.value = '';

        uploaderror.value = error;
        // console.log(error);
        await createTooltip('上传失败,可能是您的照片不符合要求', 'error', 3000);
      }
    };

    /**
     * 请求修改标题与描述
     */
    const EditPost = async () => {
      if (
        headlineVal.value !== postData.value.title &&
        describeVal.value !== postData.value.content
      ) {
        await axios.patch(`/posts/${postId.value}`, {
          title: headlineVal.value,
          content: describeVal.value
        });
      } else if (headlineVal.value !== postData.value.title) {
        await axios.patch(`/posts/${postId.value}`, {
          title: headlineVal.value
        });
      } else if (describeVal.value !== postData.value.content) {
        await axios.patch(`/posts/${postId.value}`, {
          content: describeVal.value
        });
      }
    };

    /**
     * 表单修改
     */

    // 获取修改按钮的dom元素
    const isDisabled = ref();

    const onFormSubmit = async (result: boolean) => {
      if (result) {
        // 将提交按钮内容设置为...,并且禁止操作
        isDisabled.value.disabled = 'isDisabled';
        isDisabled.value.value = '...';

        // 执行修改标题与描述
        await EditPost();

        // 执行删除标签
        if (deleteTagData.value.length > 0) {
          for (let i = 0; i < deleteTagData.value.length; i++) {
            const tagParameter = {
              postId: postId.value,
              tagId: deleteTagData.value[i].id
            };
            await store.dispatch('deleteTag', tagParameter);
          }
        }

        // 执行添加标签
        if (newAddTagData.value.length > 0) {
          for (let i = 0; i < newAddTagData.value.length; i++) {
            const tagParameter = {
              postId: postId.value,
              tag: newAddTagData.value[i].name
            };
            await store.dispatch('createTag', tagParameter);
          }
        }

        // 执行修改图片
        try {
          if (fileMessage.value) {
            await careateFile(fileMessage.value, postId.value);
          }
        } catch (error) {
          // console.log(error);
        }

        //修改完毕 恢复提交按钮功能与样式
        isDisabled.value.removeAttribute('disabled');
        isDisabled.value.value = 'save';

        // 如果错误信息存在 则清空
        if (uploaderror.value) {
          uploaderror.value = '';
        } else {
          // 如何上传成功执行
          if (fromWhichPage.value === 'home') {
            const card = await store.dispatch('getCard', postId.value);
            const oldCard = store.state.cardList;
            const newCard = oldCard.map((item: { id: unknown }) =>
              item.id === card.id ? card : item
            );
            await store.commit('getCardList', newCard);
          } else if (fromWhichPage.value === 'search') {
            const card = await store.dispatch('getCard', postId.value);
            const oldCard = store.state.searchCardList;
            const newCard = oldCard.map((item: { id: unknown }) =>
              item.id === card.id ? card : item
            );
            await store.commit('getSearchValCardList', newCard);
          } else if (fromWhichPage.value === 'user') {
            const card = await store.dispatch('getCard', postId.value);
            const oldCard = store.state.userPhotosCardList;
            const newCard = oldCard.map((item: { id: unknown }) =>
              item.id === card.id ? card : item
            );
            await store.commit('getUserPhotosCardList', newCard);
          } else if (fromWhichPage.value === 'userLike') {
            const card = await store.dispatch('getCard', postId.value);
            const oldCard = store.state.userLikeCardList;
            const newCard = oldCard.map((item: { id: unknown }) =>
              item.id === card.id ? card : item
            );
            await store.commit('getUserLikeCardList', newCard);
          }

          // 如果上传成功,执行成功提示;
          await createTooltip('Modify the success', 'success', 3000);

          await setTimeout(() => {
            router.push(`${uploadAfterToUrl.value}`);
            document.body.style.overflow = 'hidden';
          }, 500);
        }
      } else {
        // console.log('不通过');
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
      addTag,
      tags,
      deleteTag,
      postData,
      lostelkUrl,
      userId
    };
  }
});
</script>

<style scoped>
@import '../style/less/globalStyle/layout.css';
@import '../style/less/viewsStyle/edit-card.css';
</style>
