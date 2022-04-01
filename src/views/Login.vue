<template>
  <div class="login-wrapper">
    <div class="login-form">
      <div class="login-center">
        <div class="login-logo">
          <router-link to="/">
            <img src="../assets/icons/logoTouMing.png" alt="LostElk" />
          </router-link>
        </div>
        <h1 class="login-title">Sign in to LostElk</h1>
        <p class="login-subtitle">Welcome back</p>
      </div>
      <div class="from">
        <ValidateForm @form-submit="onFormSubmit">
          <div class="form-group">
            <label for="user_username">
              Email
            </label>
            <ValidateInput
              :rules="userEmailRule"
              v-model="userEmailVal"
              class="form-control"
              type="text"
              placeholder=""
              id="user_username"
            >
            </ValidateInput>
          </div>

          <div class="form-group">
            <div style="display: flex;align-items: center;justify-content: space-between;">
              <label for="user_password">
                Password
              </label>
              <span class="text-secondary" style="font-size: 12px">
                <router-link to="/StartRetrieve">Forgot your password?</router-link>
              </span>
            </div>

            <ValidateInput
              :rules="passwordRule"
              v-model="passwordVal"
              class="form-control"
              type="password"
              placeholder=""
              autocomplete="off"
              id="user_password"
            >
            </ValidateInput>
          </div>

          <template v-slot:submit>
            <div class="form-groug">
              <a href="#" class="form-btn">
                Login
              </a>
            </div>
          </template>
        </ValidateForm>
        <p class="register">
          Don't have an account?
          <span class="text-secondary">
            <router-link to="/Register">Join</router-link>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import ValidateInput, { RulesProp } from '../components/form/ValidateInput.vue';
import ValidateForm from '../components/form/ValidateForm.vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    // 1.接收ValidateInput组件发送过来的值  2.发送默认值给ValidateInput组件
    const userEmailVal = ref('');
    const passwordVal = ref('');
    // 定义表单验证规则 发送到 ValidateInput组件中
    const userEmailRule: RulesProp = [
      { type: 'null', message: 'The email address cannot be empty' },
      { type: 'userEmail', message: 'Please enter the correct email address' },
    ];
    const passwordRule: RulesProp = [
      { type: 'null', message: 'The password cannot be empty' },
      { type: 'password', message: 'The password must be between 6 and 16 characters long' },
    ];

    /**
     * form-submit事件触发的函数
     * 参数: result ValidateForm组件通过 form-submit 事件传来的最终结果
     */
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const userLoginData = {
          email: userEmailVal.value,
          password: passwordVal.value,
        };
        // 登陆并且获取用户信息
        store.dispatch('loginAndGetCurrentUser', userLoginData).then(() => {
          // 如果已经登陆成功则跳转到主页
          if (store.state.user.isLogin) {
            router.back();
          }
        });
      } else {
        console.log('不通过');
      }
    };

    return {
      userEmailRule,
      userEmailVal,
      passwordVal,
      passwordRule,
      onFormSubmit,
    };
  },
});
</script>
<style scoped>
@import '../style/less/viewsStyle/login.css';
</style>
<style scoped>
label {
  cursor: pointer;
}
</style>
