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
            <input
              class="form-control"
              pattern="/^[-_a-zA-Z0-9]{1,16}$/"
              required="required"
              type="text"
              name="user[username]"
              id="user_username"
              v-model="userNameRef.val"
              @blur="validateuserName"
            />
            <span class="form-error" v-if="userNameRef.error">
              {{ userNameRef.message }}
            </span>
          </div>

          <div class="form-group">
            <label for="user_password">
              密码
            </label>
            <input
              autocomplete="off"
              minlength="6"
              class="form-control"
              required="required"
              type="password"
              name="user[password]"
              id="user_password"
            />
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
import { defineComponent, reactive } from 'vue';

const userNameReg = /^[-_a-zA-Z0-9]{1,16}$/;
export default defineComponent({
  name: 'Login',
  setup() {
    const userNameRef = reactive({
      val: '',
      error: false,
      message: '',
    });
    const validateuserName = () => {
      if (userNameRef.val.trim() === '') {
        userNameRef.error = true;
        userNameRef.message = '用户名不能为空';
      } else if (!userNameReg.test(userNameRef.val)) {
        userNameRef.error = true;
        userNameRef.message = '请输入正确的用户名';
      } else {
        userNameRef.error = false;
        userNameRef.message = '';
      }
    };

    return {
      userNameRef,
      validateuserName,
    };
  },
});
</script>

<style>
@import './style/login.css';
</style>
