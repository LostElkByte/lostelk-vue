<template>
  <div class="account">
    <EditAvatar></EditAvatar>
    <EditUserName></EditUserName>
    <EditUserPassword></EditUserPassword>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import EditUserName from '../components/editAccount/EditUserName.vue';
import EditUserPassword from '../components/editAccount/EditUserPassword.vue';
import EditAvatar from '../components/editAccount/EditAvatar.vue';

export default defineComponent({
  name: 'EditAccount',
  components: {
    EditUserName,
    EditUserPassword,
    EditAvatar,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
@import '../style/less/viewsStyle/edit-account.css';
</style>
