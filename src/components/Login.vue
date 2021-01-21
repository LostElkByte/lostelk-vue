<template>
  <div class="login-wrapper">
    <div class="login-form">
      <div class="text-center">
        <div class="login-logo">
          <img src="../assets/logo.jpg" alt="迷鹿" />
        </div>
        <h1 class="login-title">登录</h1>
        <p class="login-subtitle">Lost elk—迷鹿照片分享</p>
      </div>
      <div class="from">
        <form action="">
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
            >
            </ValidateInput>
          </div>

          <div class="form-groug">
            <a href="#" class="form-btn">
              登录
            </a>
          </div>
          <p class="register">
            还没有帐号？
            <span class="text-secondary">
              <a href="#">加入</a>
            </span>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ValidateInput, { RulesProp } from './ValidateInput';

export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
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
    return {
      userNameRule,
      userNameVal,
      passwordVal,
      passwordRule,
    };
  },
});
</script>

<style>
@import './style/login.css';
</style>
