<template>
  <h1>注册激活页面</h1>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
export default defineComponent({
  name: 'RegisterActivation',
  components: {},
  props: {},
  setup() {
    const route = useRoute();
    const store = useStore();
    const email = route.query.email;
    const name = route.query.name;
    const registrationVerifyKey = route.query.registration_verify_key;
    store.dispatch('registerActivation', { email, name, registrationVerifyKey }).then(data => {
      console.log(data);
    });
  },
});
</script>
