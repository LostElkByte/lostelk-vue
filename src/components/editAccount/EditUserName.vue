<template>
  <div class="user-name margin-bottom-36">
    <form @submit.prevent="submitFrom">
      <div class="input-box">
        <label for="user-name" class="Edit-account-header">
          Change user name
        </label>
        <input
          class="EditUserInput"
          type="text"
          id="user-name"
          placeholder="Enter a new user name"
          v-model="newUserName"
          @blur="newUserNameValidation"
        />
        <span class="edit-account-form-error" v-if="newUserNameMessage !== ''">
          {{ newUserNameMessage }}
        </span>
      </div>
      <div class="input-box">
        <input
          class="EditUserInput"
          type="password"
          autocomplete="off"
          placeholder="Enter the password"
          v-model="userPassword"
          @blur="userPasswordValidation"
        />
        <span class="edit-account-form-error" v-if="newPasswordMessage !== ''">
          {{ newPasswordMessage }}
        </span>
      </div>
      <button class="edit-account-form-submit" type="submit">
        submit
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
    const newUserName = ref('');
    const userPassword = ref('');
    const newUserNameMessage = ref('');
    const newPasswordMessage = ref('');
    const userNameReg = /^[-_a-zA-Z0-9\u4E00-\u9FA5]{0,20}$/;

    const newUserNameValidation = () => {
      if (!userNameReg.test(newUserName.value)) {
        newUserNameMessage.value =
          'Limited to letters, digits, and underscores (_)';
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
        newUserNameMessage.value = 'The user name cannot be empty';
        passed = false;
      }
      if (!userNameReg.test(newUserName.value)) {
        newUserNameMessage.value =
          'Limited to letters, digits, and underscores (_)';
        passed = false;
      }
      if (userPassword.value.trim() == '') {
        newPasswordMessage.value = 'The password cannot be empty';
        passed = false;
      }

      if (passed) {
        const newUserNameObject = {
          validate: {
            password: userPassword.value
          },
          update: {
            name: newUserName.value
          }
        };

        try {
          await axios.patch('/users', newUserNameObject).then(() => {
            newUserNameMessage.value = '';
            newPasswordMessage.value = '';
            createTooltip('Change user name success', 'success', 1000);
            setTimeout(() => {
              router.go(0);
            }, 1000);
          });
        } catch (error) {
          // console.log(error);
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
      newPasswordMessage
    };
  }
});
</script>

<style scoped>
@import '../../style/less/viewsStyle/edit-account.css';
</style>
