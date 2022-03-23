<template>
  <div class="account">
    <EditAvatar></EditAvatar>
    <EditSynopsis></EditSynopsis>
    <EditUserName></EditUserName>
    <EditUserPassword></EditUserPassword>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import EditUserName from '../components/editAccount/EditUserName.vue';
import EditUserPassword from '../components/editAccount/EditUserPassword.vue';
import EditAvatar from '../components/editAccount/EditAvatar.vue';
import EditSynopsis from '../components/editAccount/EditSynopsis.vue';

export default defineComponent({
  name: 'EditAccount',
  components: {
    EditUserName,
    EditUserPassword,
    EditAvatar,
    EditSynopsis,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
@import '../style/less/viewsStyle/edit-account.css';
</style>
