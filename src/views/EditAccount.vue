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
    <EditUserPassword></EditUserPassword>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import EditUserName from '../components/editAccount/EditUserName.vue';
import EditUserPassword from '../components/editAccount/EditUserPassword.vue';

export default defineComponent({
  name: 'EditAccount',
  components: {
    EditUserName,
    EditUserPassword,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
@import '../style/less/viewsStyle/edit-account.css';
</style>
