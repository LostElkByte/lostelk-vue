<template>
  <div class="user-synopsis margin-bottom-36">
    <form @submit.prevent="submitFrom">
      <div class="input-box">
        <label for="user-synopsis" class="Edit-account-header">修改个人简介</label>
        <textarea
          class="EditUserInput"
          id="user-synopsis"
          placeholder="输入新的个人简介"
          v-model="newUserSynopsis"
          @blur="newUserSynopsisValidation"
        />
        <span class="edit-account-form-error" v-if="newUserSynopsisMessage !== ''">
          {{ newUserSynopsisMessage }}
        </span>
      </div>
      <button class="edit-account-form-submit" type="submit">
        提交
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, ref } from 'vue';
import router from '../../router';
import createTooltip from '../globalFun/createTooltip';

export default defineComponent({
  name: 'EditUserName',
  components: {},
  setup() {
    const newUserSynopsis = ref('');
    const newUserSynopsisMessage = ref('');
    const userSynopsisReg = /^.{0,40}$/;

    const newUserSynopsisValidation = () => {
      if (!userSynopsisReg.test(newUserSynopsis.value)) {
        newUserSynopsisMessage.value = '最多40个字符';
      } else {
        newUserSynopsisMessage.value = '';
      }
    };

    const submitFrom = async () => {
      let passed = true;
      if (newUserSynopsis.value.trim() == '') {
        newUserSynopsisMessage.value = '个人简介不能为空';
        passed = false;
      }
      if (!userSynopsisReg.test(newUserSynopsis.value)) {
        newUserSynopsisMessage.value = '最多40个字符';
        passed = false;
      }

      if (passed) {
        const newUserSynopsisObject = {
          update: {
            synopsis: newUserSynopsis.value,
          },
        };

        try {
          await axios.patch('/users', newUserSynopsisObject).then(() => {
            newUserSynopsisMessage.value = '';
            createTooltip('修改个人简介成功', 'success', 1000);
            setTimeout(() => {
              router.go(0);
            }, 1000);
          });
        } catch (error) {
          console.log(error);
        }
      }
    };

    return {
      newUserSynopsis,
      submitFrom,
      newUserSynopsisValidation,
      newUserSynopsisMessage,
    };
  },
});
</script>

<style scoped>
@import '../../style/less/viewsStyle/edit-account.css';
</style>
