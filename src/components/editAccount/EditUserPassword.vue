<template>
  <div class="user-name margin-bottom-36">
    <form @submit.prevent="submitFrom">
      <div class="input-box">
        <label for="user-password" class="Edit-account-header">Change password</label>
        <input
          class="EditUserInput"
          type="password"
          autocomplete="off"
          placeholder="Enter the old password"
          v-model="oldUserPassword"
          @blur="oldUserPasswordValidation"
        />
        <span class="edit-account-form-error" v-if="oldUserPasswordMessage !== ''">
          {{ oldUserPasswordMessage }}
        </span>
      </div>
      <div class="input-box">
        <input
          class="EditUserInput"
          type="password"
          autocomplete="off"
          placeholder="Enter a new password"
          v-model="newUserPassword"
          @blur="newUserPasswordValidation"
        />
        <span class="edit-account-form-error" v-if="newUserPasswordMessage !== ''">
          {{ newUserPasswordMessage }}
        </span>
      </div>
      <div class="input-box">
        <input
          class="EditUserInput"
          type="password"
          autocomplete="off"
          placeholder="Confirm the new password"
          v-model="affirmUserPassword"
          @blur="affirmUserPasswordValidation"
        />
        <span class="edit-account-form-error" v-if="affirmUserPassworMessage !== ''">
          {{ affirmUserPassworMessage }}
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
import createTooltip from '../globalFun/createTooltip';

export default defineComponent({
  name: 'EditUserPassword',
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
        newUserPasswordMessage.value = 'The password is any 6-16 characters';
      } else {
        newUserPasswordMessage.value = '';
      }
    };

    const affirmUserPasswordValidation = () => {
      if (affirmUserPassword.value !== newUserPassword.value) {
        affirmUserPassworMessage.value = 'The entered passwords are inconsistent';
      } else {
        affirmUserPassworMessage.value = '';
      }
    };

    const submitFrom = async () => {
      let passed = true;
      if (oldUserPassword.value.trim() == '') {
        oldUserPasswordMessage.value = 'The old password cannot be empty';
        passed = false;
      }
      if (newUserPassword.value.trim() == '') {
        newUserPasswordMessage.value = 'The new password cannot be empty';
        passed = false;
      }
      if (affirmUserPassword.value.trim() == '') {
        affirmUserPassworMessage.value = 'Confirm password cannot be empty';
        passed = false;
      }
      if (!passwordReg.test(newUserPassword.value)) {
        newUserPasswordMessage.value = 'The password is any 6-16 characters';
        passed = false;
      }
      if (affirmUserPassword.value !== newUserPassword.value) {
        affirmUserPassworMessage.value = 'The entered passwords are inconsistent';
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
            createTooltip('Change password success', 'success', 2000);
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
