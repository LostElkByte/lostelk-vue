<template>
  <div class="user-name margin-bottom-36">
    <form @submit.prevent="submitFrom">
      <div class="input-box">
        <label for="user-password" class="Edit-account-header">修改密码</label>
        <input
          type="password"
          autocomplete="off"
          placeholder="输入原密码"
          v-model="oldUserPassword"
          @blur="oldUserPasswordValidation"
        />
        <span class="edit-account-form-error" v-if="oldUserPasswordMessage !== ''">
          {{ oldUserPasswordMessage }}
        </span>
      </div>
      <div class="input-box">
        <input
          type="password"
          autocomplete="off"
          placeholder="输入新的密码"
          v-model="newUserPassword"
          @blur="newUserPasswordValidation"
        />
        <span class="edit-account-form-error" v-if="newUserPasswordMessage !== ''">
          {{ newUserPasswordMessage }}
        </span>
      </div>
      <div class="input-box">
        <input
          type="password"
          autocomplete="off"
          placeholder="确认一下新的密码"
          v-model="affirmUserPassword"
          @blur="affirmUserPasswordValidation"
        />
        <span class="edit-account-form-error" v-if="affirmUserPassworMessage !== ''">
          {{ affirmUserPassworMessage }}
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
import createTooltip from '../globalFun/createTooltip';

export default defineComponent({
  name: 'EditAccount',
  components: {},
  setup() {
    const oldUserPassword = ref('');
    const oldUserPasswordMessage = ref('');

    const newUserPassword = ref('');
    const newUserPasswordMessage = ref('');

    const affirmUserPassword = ref('');
    const affirmUserPassworMessage = ref('');

    const passwordReg = /^.{6,16}$/;

    const oldUserPasswordValidation = () => {
      oldUserPasswordMessage.value = '';
    };

    const newUserPasswordValidation = () => {
      if (!passwordReg.test(newUserPassword.value)) {
        newUserPasswordMessage.value = '密码为6-16位任意组合';
      } else {
        newUserPasswordMessage.value = '';
      }
    };

    const affirmUserPasswordValidation = () => {
      if (affirmUserPassword.value !== newUserPassword.value) {
        affirmUserPassworMessage.value = '两次输入的密码不一致';
      } else {
        affirmUserPassworMessage.value = '';
      }
    };

    const submitFrom = async () => {
      let passed = true;
      if (oldUserPassword.value.trim() == '') {
        oldUserPasswordMessage.value = '原密码不能为空';
        passed = false;
      }
      if (newUserPassword.value.trim() == '') {
        newUserPasswordMessage.value = '新密码不能为空';
        passed = false;
      }
      if (affirmUserPassword.value.trim() == '') {
        affirmUserPassworMessage.value = '确认密码不能为空';
        passed = false;
      }
      if (!passwordReg.test(newUserPassword.value)) {
        newUserPasswordMessage.value = '密码为6-16位任意组合';
        passed = false;
      }
      if (affirmUserPassword.value !== newUserPassword.value) {
        affirmUserPassworMessage.value = '两次输入的密码不一致';
        passed = false;
      }

      if (passed) {
        const newUserPasswordObject = {
          validate: {
            password: oldUserPassword.value,
          },
          update: {
            password: newUserPassword.value,
          },
        };

        try {
          await axios.patch('/users', newUserPasswordObject).then(() => {
            oldUserPassword.value = '';
            newUserPassword.value = '';
            affirmUserPassword.value = '';
            createTooltip('修改密码成功', 'success', 2000);
          });
        } catch (error) {
          oldUserPassword.value = '';
          newUserPassword.value = '';
          affirmUserPassword.value = '';
          console.log(error);
        }
      }
    };

    return {
      submitFrom,
      oldUserPassword,
      oldUserPasswordValidation,
      oldUserPasswordMessage,
      newUserPassword,
      newUserPasswordValidation,
      newUserPasswordMessage,
      affirmUserPassword,
      affirmUserPasswordValidation,
      affirmUserPassworMessage,
    };
  },
});
</script>
