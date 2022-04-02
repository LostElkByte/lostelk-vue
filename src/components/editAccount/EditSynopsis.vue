<template>
  <div class="user-synopsis margin-bottom-36">
    <form @submit.prevent="submitFrom">
      <div class="input-box">
        <label for="user-synopsis" class="Edit-account-header">Change your synopsis</label>
        <textarea
          class="EditUserInput"
          id="user-synopsis"
          placeholder="Enter a new synopsis"
          v-model="newUserSynopsis"
          @blur="newUserSynopsisValidation"
        />
        <span class="edit-account-form-error" v-if="newUserSynopsisMessage !== ''">
          {{ newUserSynopsisMessage }}
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
    const newUserSynopsis = ref('');
    const newUserSynopsisMessage = ref('');
    const userSynopsisReg = /^.{0,40}$/;

    const newUserSynopsisValidation = () => {
      if (!userSynopsisReg.test(newUserSynopsis.value)) {
        newUserSynopsisMessage.value = 'A maximum of 40 characters';
      } else {
        newUserSynopsisMessage.value = '';
      }
    };

    const submitFrom = async () => {
      let passed = true;
      if (newUserSynopsis.value.trim() == '') {
        newUserSynopsisMessage.value = 'The synopsis cannot be empty';
        passed = false;
      }
      if (!userSynopsisReg.test(newUserSynopsis.value)) {
        newUserSynopsisMessage.value = 'A maximum of 40 characters';
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
            createTooltip('Change your synopsis success', 'success', 1000);
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
