<template>
  <div class="account">
    <div class="edit-avatar margin-bottom-36">
      <div class="avatar">
        <h2 class="Edit-account-header">设置头像</h2>
        <form class="avatar-form" action="">
          <div class="choose-before">
            <div class="avatar-img">
              <svg class="icon avatar-icon" aria-hidden="true">
                <use xlink:href="#icon-weidenglu"></use>
              </svg>
            </div>

            <input class="avatar-form-input" type="file" id="avatar" />
            <label for="avatar" class="avatar-form-choose">
              选择头像
            </label>
          </div>
          <div class="choose-then">
            <label for="avatar" class="avatar-form-choose">
              重新选择
            </label>
            <div class="avatar-form-choose">
              取消
            </div>
            <div class="avatar-form-choose">
              提交
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="user-name margin-bottom-36">
      <ValidateForm>
        <label for="user-name" class="Edit-account-header">修改用户名</label>
        <ValidateInput
          type="text"
          id="user-name"
          placeholder="输入新的用户名"
          v-model="newUserName"
          :rules="newUserNameRule"
        />
        <ValidateInput type="text" placeholder="输入密码" v-model="userPassword" :rules="userPasswordRule" />
        <template v-slot:submit>
          <div class="edit-account-form-submit">
            提交
          </div>
        </template>
      </ValidateForm>
    </div>
    <div class="user-password margin-bottom-36">
      <ValidateForm action="">
        <label for="user-password" class="Edit-account-header">修改密码</label>
        <ValidateInput type="text" placeholder="输入旧的密码" v-model="oldUserPassword" :rules="oldUserPasswordRule" />
        <ValidateInput
          type="text"
          id="user-password"
          placeholder="输入新的密码"
          v-model="newUserPassword"
          :rules="newUserPasswordRule"
        />
        <template v-slot:submit>
          <div class="edit-account-form-submit">
            提交
          </div>
        </template>
      </ValidateForm>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ValidateForm from '../components/form/ValidateForm.vue';
import ValidateInput, { RulesProp } from '../components/form/ValidateInput.vue';

export default defineComponent({
  name: 'EditAccount',
  components: {
    ValidateForm,
    ValidateInput,
  },
  setup() {
    const newUserName = ref();
    const userPassword = ref();
    const oldUserPassword = ref();
    const newUserPassword = ref();
    const newUserNameRule: RulesProp = [
      { type: 'null', message: '用户名不能为空' },
      { type: 'userName', message: '仅限于字母、数字、下划线,最多20个字符' },
    ];
    const userPasswordRule: RulesProp = [
      { type: 'null', message: '密码不能为空' },
      { type: 'password', message: '密码长度在6-16位之间' },
    ];
    const oldUserPasswordRule: RulesProp = [
      { type: 'null', message: '旧密码不能为空' },
      { type: 'password', message: '密码长度在6-16位之间' },
    ];
    const newUserPasswordRule: RulesProp = [
      { type: 'null', message: '新密码不能为空' },
      { type: 'password', message: '密码长度在6-16位之间' },
    ];
    return {
      newUserName,
      userPassword,
      oldUserPassword,
      newUserPassword,
      newUserNameRule,
      userPasswordRule,
      oldUserPasswordRule,
      newUserPasswordRule,
    };
  },
});
</script>

<style scoped>
@import '../style/less/viewsStyle/edit-account.css';
</style>
