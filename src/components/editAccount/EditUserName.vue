<template>
  <div class="user-name margin-bottom-36">
    <form @submit.prevent="submitFrom">
      <div class="input-box">
        <label for="user-name" class="Edit-account-header">修改用户名</label>
        <input
          type="text"
          id="user-name"
          placeholder="输入新的用户名"
          v-model="newUserName"
          @blur="newUserNameValidation"
        />
        <span class="edit-account-form-error" v-if="newUserNameMessage !== ''">
          {{ newUserNameMessage }}
        </span>
      </div>
      <div class="input-box">
        <input
          type="password"
          autocomplete="off"
          placeholder="输入密码"
          v-model="userPassword"
          @blur="userPasswordValidation"
        />
        <span class="edit-account-form-error" v-if="newPasswordMessage !== ''">
          {{ newPasswordMessage }}
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
  name: 'EditAccount',
  components: {},
  setup() {
    const newUserName = ref('');
    const userPassword = ref('');
    const newUserNameMessage = ref('');
    const newPasswordMessage = ref('');
    const userNameReg = /^[-_a-zA-Z0-9\u4E00-\u9FA5]{0,20}$/;

    const newUserNameValidation = () => {
      if (!userNameReg.test(newUserName.value)) {
        newUserNameMessage.value = '仅限于字母、数字、下划线,最多20个字符';
      } else {
        newUserNameMessage.value = '';
      }
    };

    const userPasswordValidation = () => {
      newPasswordMessage.value = '';
    };

    const submitFrom = async () => {
      let passed = true;
      if (newUserName.value.trim() == '') {
        newUserNameMessage.value = '用户名不能为空';
        passed = false;
      }
      if (!userNameReg.test(newUserName.value)) {
        newUserNameMessage.value = '仅限于字母、数字、下划线,最多20个字符';
        passed = false;
      }
      if (userPassword.value.trim() == '') {
        newPasswordMessage.value = '密码不能为空';
        passed = false;
      }

      if (passed) {
        const newUserNameObject = {
          validate: {
            password: userPassword.value,
          },
          update: {
            name: newUserName.value,
          },
        };

        try {
          await axios.patch('/users', newUserNameObject).then(() => {
            newUserNameMessage.value = '';
            newPasswordMessage.value = '';
            createTooltip('修改用户名成功', 'success', 1000);
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
      newUserName,
      userPassword,
      submitFrom,
      newUserNameValidation,
      newUserNameMessage,
      userPasswordValidation,
      newPasswordMessage,
    };
  },
});
</script>
