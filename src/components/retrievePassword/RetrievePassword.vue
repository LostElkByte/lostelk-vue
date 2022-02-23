<template>
  <div class="login-wrapper">
    <div class="login-form">
      <div class="login-center">
        <div class="login-logo">
          <router-link to="/">
            <img src="../../assets/icons/logoTouMing.png" alt="迷鹿" />
          </router-link>
        </div>
        <h1 class="login-title">Chang your password</h1>
        <p class="login-subtitle" style="font-weight: 400;font-size: 14px;">
          修改您的密码~
        </p>
      </div>
      <div class="from">
        <ValidateForm @form-submit="onFormSubmit">
          <div class="form-group">
            <label for="user_username">
              新密码
            </label>
            <ValidateInput
              :rules="passwordRule"
              v-model="passwordVal"
              class="form-control"
              type="password"
              placeholder="请输入密码"
              autocomplete="off"
              id="user_password"
            >
            </ValidateInput>
          </div>

          <template v-slot:submit>
            <div class="form-groug">
              <a href="#" class="form-btn">
                修改密码
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
import { useRoute } from 'vue-router';
import ValidateInput, { RulesProp } from '../form/ValidateInput.vue';
import ValidateForm from '../form/ValidateForm.vue';
import createTooltip from '../globalFun/createTooltip';
import router from '../../router';

export default defineComponent({
  name: 'RetrievePassword',
  components: {
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const { email, retrievePasswordVerifyKey } = route.query;

    // 1.接收ValidateInput组件发送过来的值  2.发送默认值给ValidateInput组件
    const passwordVal = ref('');
    // 定义表单验证规则 发送到 ValidateInput组件中
    const passwordRule: RulesProp = [
      { type: 'null', message: '密码不能为空' },
      { type: 'password', message: '密码长度在6-16位之间' },
    ];

    /**
     * form-submit事件触发的函数
     * 参数: result ValidateForm组件通过 form-submit 事件传来的最终结果
     */
    const onFormSubmit = async (result: boolean) => {
      if (result) {
        // 找回密码
        try {
          const res = await store.dispatch('retrievePassword', {
            email,
            password: passwordVal.value,
            retrievePasswordVerifyKey,
          });
          createTooltip(res.message, 'default', 10000);
          setTimeout(() => {
            router.push('/');
          }, 2000);
        } catch (error) {
          setTimeout(() => {
            router.push('/StartRetrieve');
          }, 2000);
        }
      } else {
        console.log('不通过');
      }
    };

    return {
      passwordRule,
      passwordVal,
      onFormSubmit,
    };
  },
});
</script>
<style src="../../style/less/viewsStyle/login.css"></style>
<style scoped>
label {
  cursor: pointer;
}
</style>
