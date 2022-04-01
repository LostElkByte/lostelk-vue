<template>
  <div class="login-wrapper">
    <div class="login-form">
      <div class="login-center">
        <div class="login-logo">
          <router-link to="/">
            <img src="../../assets/icons/logoTouMing.png" alt="迷鹿" />
          </router-link>
        </div>
        <h1 class="login-title">Forgot your password?</h1>
        <p class="login-subtitle" style="font-weight: 400;font-size: 14px;">
          Enter the email address associated with your account and we’ll send you a link to reset your password.
        </p>
      </div>
      <div class="from">
        <ValidateForm @form-submit="onFormSubmit">
          <div class="form-group">
            <label for="user_username">
              Email
            </label>
            <ValidateInput
              style=" margin-bottom: 0px;"
              :rules="userEmailRule"
              v-model="userEmailVal"
              class="form-control"
              type="text"
              placeholder="Please enter email address"
              id="user_username"
            >
            </ValidateInput>
          </div>

          <template v-slot:submit>
            <div class="form-groug">
              <a href="#" class="form-btn">
                Send a password reset email
              </a>
            </div>
          </template>
        </ValidateForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import ValidateInput, { RulesProp } from '../form/ValidateInput.vue';
import ValidateForm from '../form/ValidateForm.vue';
import createTooltip from '../globalFun/createTooltip';
export default defineComponent({
  name: 'StartRetrieve',
  components: {
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const store = useStore();
    // 1.接收ValidateInput组件发送过来的值  2.发送默认值给ValidateInput组件
    const userEmailVal = ref('');
    // 定义表单验证规则 发送到 ValidateInput组件中
    const userEmailRule: RulesProp = [
      { type: 'null', message: 'The email address cannot be empty' },
      { type: 'userEmail', message: 'Please enter the correct email address' },
    ];

    /**
     * form-submit事件触发的函数
     * 参数: result ValidateForm组件通过 form-submit 事件传来的最终结果
     */
    const onFormSubmit = async (result: boolean) => {
      if (result) {
        // 发送找回密码邮件
        try {
          const res = await store.dispatch('sendRetrievePassword', userEmailVal.value);
          createTooltip(res.message, 'default', 10000);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('不通过');
      }
    };

    return {
      userEmailRule,
      userEmailVal,
      onFormSubmit,
    };
  },
});
</script>
<style scoped>
@import '../../style/less/viewsStyle/login.css';
label {
  cursor: pointer;
}
</style>
