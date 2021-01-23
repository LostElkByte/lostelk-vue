<template>
  <div class="login-wrapper">
    <div class="login-form">
      <div class="text-center">
        <div class="login-logo">
          <img src="../assets/icons/logo.jpg" alt="迷鹿" />
        </div>
        <h1 class="login-title">登录</h1>
        <p class="login-subtitle">Lost elk—迷鹿照片分享</p>
      </div>
      <div class="from">
        <ValidateForm @form-submit="onFormSubmit">
          <div class="form-group">
            <label for="user_username">
              用户名
            </label>
            <ValidateInput
              :rules="userNameRule"
              v-model="userNameVal"
              class="form-control"
              type="text"
              placeholder="请输入用户名"
            >
            </ValidateInput>
          </div>

          <div class="form-group">
            <label for="user_password">
              密码
            </label>
            <ValidateInput
              :rules="passwordRule"
              v-model="passwordVal"
              class="form-control"
              type="password"
              placeholder="请输入密码"
              autocomplete="off"
            >
            </ValidateInput>
          </div>

          <template v-slot:submit>
            <div class="form-groug">
              <a href="#" class="form-btn">
                登录
              </a>
            </div>
          </template>
        </ValidateForm>
        <p class="register">
          还没有帐号？
          <span class="text-secondary">
            <router-link to="/Reglister">注册</router-link>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue';
import ValidateForm from '../components/ValidateForm.vue';
export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const userNameVal = ref('');
    const passwordVal = ref('');
    const userNameRule: RulesProp = [
      { type: 'null', message: '用户名不能为空' },
      { type: 'userName', message: '请输入正确的用户名' },
    ];
    const passwordRule: RulesProp = [
      { type: 'null', message: '密码不能为空' },
      { type: 'password', message: '密码长度在6-16位之间' },
    ];

    const onFormSubmit = (result: boolean) => {
      if (result) {
        console.log('通过');
      } else {
        console.log('不通过');
      }
    };
    return {
      userNameRule,
      userNameVal,
      passwordVal,
      passwordRule,
      onFormSubmit,
    };
  },
});
</script>

<style>
@import '../style/viewsStyle/login.css';
</style>
