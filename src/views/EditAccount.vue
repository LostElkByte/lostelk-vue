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
    <EditUserName></EditUserName>
    <div class="user-password margin-bottom-36">
      <ValidateForm>
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
          <span class="edit-account-form-submit">
            提交
          </span>
        </template>
      </ValidateForm>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ValidateForm from '../components/form/ValidateForm.vue';
import ValidateInput, { RulesProp } from '../components/form/ValidateInput.vue';
import EditUserName from '../components/editAccount/EditUserName.vue';

export default defineComponent({
  name: 'EditAccount',
  components: {
    ValidateForm,
    ValidateInput,
    EditUserName,
  },
  setup() {
    const oldUserPassword = ref();
    const newUserPassword = ref();

    const oldUserPasswordRule: RulesProp = [
      { type: 'null', message: '旧密码不能为空' },
      { type: 'password', message: '密码长度在6-16位之间' },
    ];
    const newUserPasswordRule: RulesProp = [
      { type: 'null', message: '新密码不能为空' },
      { type: 'password', message: '密码长度在6-16位之间' },
    ];
    return {
      oldUserPassword,
      newUserPassword,

      oldUserPasswordRule,
      newUserPasswordRule,
    };
  },
});
</script>

<style scoped>
@import '../style/less/viewsStyle/edit-account.css';
</style>
