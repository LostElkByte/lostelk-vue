<template>
  <div class="registrations-wrapper">
    <div class="registrations-container">
      <div
        v-if="registeredImgArrange === 'column' && longitudinal.length != 0"
        class="registrations-left-panel"
        :style="
          `background-image: url(${lostelkUrl}/files/${longitudinal[longitudinalRandom].file.id}/serve?size=large);`
        "
      >
        <div class="registrations__content">
          <div>
            <router-link to="/">
              <img class="registrations__logo" src="../assets/icons/logoWhite.png" alt="" />
            </router-link>
          </div>
          <div>
            <h1 class="registrations__title">Creation starts here</h1>
            <h2 class="registrations__sub-title">
              Access free high-resolution photos you can't find anywhere else
            </h2>
          </div>
          <div>
            <p class="registrations__credit">
              迷失中悠然自得—LostElk
            </p>
          </div>
        </div>
      </div>
      <div
        v-else-if="registeredImgArrange === 'row' && transverse.length != 0"
        class="registrations-left-panel"
        :style="`background-image: url(${lostelkUrl}/files/${transverse[transverseRandom].file.id}/serve?size=large);`"
      >
        <div class="registrations__content">
          <div>
            <router-link to="/">
              <img class="registrations__logo" src="../assets/icons/logoWhite.png" alt="" />
            </router-link>
          </div>
          <div>
            <h1 class="registrations__title">Creation starts here</h1>
            <h2 class="registrations__sub-title">
              Access free high-resolution photos you can't find anywhere else
            </h2>
          </div>
          <div>
            <p class="registrations__credit">
              迷失中悠然自得—LostElk
            </p>
          </div>
        </div>
      </div>
      <div v-else-if="registeredImgArrange === 'row'" class="registrations-left-panel">
        <div class="registrations__content">
          <div>
            <router-link to="/">
              <img class="registrations__logo" src="../assets/icons/logoWhite.png" alt="" />
            </router-link>
          </div>
          <div>
            <h1 class="registrations__title">Creation starts here</h1>
            <h2 class="registrations__sub-title">
              Access free high-resolution photos you can't find anywhere else
            </h2>
          </div>
          <div>
            <p class="registrations__credit">
              迷失中悠然自得—LostElk
            </p>
          </div>
        </div>
      </div>
      <div v-else-if="registeredImgArrange === 'column'" class="registrations-left-panel">
        <div class="registrations__content">
          <div>
            <router-link to="/">
              <img class="registrations__logo" src="../assets/icons/logoWhite.png" alt="" />
            </router-link>
          </div>
          <div>
            <h1 class="registrations__title">Creation starts here</h1>
            <h2 class="registrations__sub-title">
              Access free high-resolution photos you can't find anywhere else
            </h2>
          </div>
          <div>
            <p class="registrations__credit">
              迷失中悠然自得—LostElk
            </p>
          </div>
        </div>
      </div>

      <div class="registrations-right-panel">
        <div class="registrations-form">
          <div class="row">
            <div class="col-xs-12">
              <div class="text-center">
                <div class="alpha">
                  Sign up to LostElk
                </div>
                <p>
                  Already have an account?
                  <router-link to="/Login">
                    <span class="text-secondary">
                      Login
                    </span>
                  </router-link>
                </p>
              </div>

              <ValidateForm @form-submit="onFormSubmit">
                <div class="row clearfix">
                  <div class="col-xs-6">
                    <div class="form-group">
                      <label for="user_first_name">
                        First name
                      </label>
                      <ValidateInput
                        :rules="userLastNameRule"
                        v-model="userLastNameVal"
                        class="form-control"
                        type="text"
                        placeholder="Not required"
                        id="user_first_name"
                      >
                      </ValidateInput>
                    </div>
                  </div>
                  <div class="col-xs-6">
                    <div class="form-group">
                      <label for="user_last_name">
                        Last name
                      </label>
                      <ValidateInput
                        :rules="userFirstNameRule"
                        v-model="userFirstNameVal"
                        class="form-control"
                        type="text"
                        placeholder="Not required"
                        id="user_last_name"
                      >
                      </ValidateInput>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="user_email">
                    Email
                  </label>
                  <ValidateInput
                    :rules="userEmailRule"
                    v-model="userEmailVal"
                    class="form-control"
                    type="email"
                    placeholder="Please enter your email address"
                    id="user_email"
                  >
                  </ValidateInput>
                </div>

                <div class="form-group">
                  <label for="user_username">
                    Username
                  </label>

                  <ValidateInput
                    :rules="userNameRule"
                    v-model="userNameVal"
                    class="form-control"
                    type="text"
                    placeholder="Please enter a user name"
                    id="user_username"
                  >
                  </ValidateInput>
                </div>

                <div class="form-group">
                  <label for="user_password">
                    Password
                  </label>
                  <ValidateInput
                    :rules="passwordRule"
                    v-model="passwordVal"
                    class="form-control"
                    type="password"
                    placeholder="The length is between 6 and 16 bits"
                    autocomplete="off"
                    id="user_password"
                  >
                  </ValidateInput>
                </div>

                <div class="form-group">
                  <label for="user_affirmPassword">
                    Confirm password
                  </label>
                  <ValidateInput
                    :rules="affirmPasswordRule"
                    v-model="affirmPasswordVal"
                    class="form-control"
                    type="password"
                    placeholder="Please enter your password again"
                    autocomplete="off"
                    id="user_affirmPassword"
                  >
                  </ValidateInput>
                </div>
                <template v-slot:submit>
                  <div class="form-groug">
                    <a href="#" class="form-btn">
                      Join
                    </a>
                  </div>
                </template>
              </ValidateForm>
              <span class="text-secondary zeta">
                By joining, you agree to the <router-link to="/Clause">Terms</router-link> and
                <router-link to="/Privacy">Privacy Policy</router-link>.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { lostelkUrl } from '../global';
import ValidateInput, { RulesProp } from '../components/form/ValidateInput.vue';
import ValidateForm from '../components/form/ValidateForm.vue';
import createTooltip from '../components/globalFun/createTooltip';
import axios from 'axios';
import store from '../store';

export default defineComponent({
  name: 'Register',
  components: {
    ValidateInput,
    ValidateForm,
  },
  props: {
    registeredImg: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const userNameVal = ref('');
    const passwordVal = ref('');
    const userLastNameVal = ref('');
    const userFirstNameVal = ref('');
    const userEmailVal = ref('');
    const affirmPasswordVal = ref('');
    const userNameRule: RulesProp = [
      { type: 'null', message: 'The user name cannot be empty' },
      { type: 'userName', message: 'limited to letters, digits, underscores and up to 20 characters' },
    ];
    const passwordRule: RulesProp = [
      { type: 'null', message: 'The password cannot be empty' },
      { type: 'password', message: 'The password must be between 6 and 16 characters long' },
    ];
    const userLastNameRule: RulesProp = [{ type: 'userLastName', message: 'Incorrect name format' }];
    const userFirstNameRule: RulesProp = [{ type: 'userfirstName', message: 'Incorrect name format' }];
    const userEmailRule: RulesProp = [
      { type: 'null', message: 'The email address cannot be empty' },
      { type: 'userEmail', message: 'Email format error' },
    ];
    const affirmPasswordRule: RulesProp = [
      { type: 'null', message: 'Confirm password cannot be empty' },
      {
        type: 'custom',
        validator: () => {
          return passwordVal.value === affirmPasswordVal.value;
        },
        message: 'Different passwords',
      },
    ];

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const userRegisterData = {
          email: userEmailVal.value,
          name: userNameVal.value,
          password: passwordVal.value,
        };
        axios.post('/users', userRegisterData).then(() => {
          createTooltip(
            'Registration is successful, the activation link has been sent to your email. Please activate your account within 30 minutes ~',
            'default',
            null,
          );
          // setTimeout(() => {
          //   router.push('/login');
          // }, 1000);
        });
      } else {
        console.log('不通过');
      }
    };

    /**
     * 获取图片为横图还是纵图
     */
    const registeredImgArrange = computed(() => props.registeredImg);

    /**
     * 获取精选恒横图/纵图,以及随机数组下标
     */
    const transverse = computed(() => store.state.veryGoodsTransverseList);
    const transverseRandom = ref(Math.floor(Math.random() * transverse.value.length));
    const longitudinal = computed(() => store.state.veryGoodsLongitudinalList);
    const longitudinalRandom = ref(Math.floor(Math.random() * longitudinal.value.length));

    return {
      lostelkUrl,
      transverse,
      transverseRandom,
      longitudinal,
      longitudinalRandom,
      userNameRule,
      userNameVal,
      passwordVal,
      passwordRule,
      onFormSubmit,
      userLastNameVal,
      userLastNameRule,
      userFirstNameVal,
      userFirstNameRule,
      userEmailVal,
      userEmailRule,
      affirmPasswordVal,
      affirmPasswordRule,
      registeredImgArrange,
    };
  },
});
</script>

<style src="../style/less/viewsStyle/register.css"></style>
<style scoped>
label {
  cursor: pointer;
}
</style>
