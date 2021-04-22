<template>
  <div class="registrations-wrapper">
    <div class="registrations-container">
      <div class="registrations-left-panel">
        <img
          v-if="registeredImgArrange === 'column'"
          class="registrations-show-figure"
          src="../assets/images/content3.jpg"
          alt=""
        />
        <img v-else class="registrations-show-figure" src="../assets/images/content2.jpeg" alt="" />
        <div class="registrations__content">
          <div>
            <router-link to="/">
              <img class="registrations__logo" src="../assets/icons/logoWhite.png" alt="" />
            </router-link>
          </div>
          <div>
            <h1 class="registrations__title">创作从这里开始</h1>
            <h2 class="registrations__sub-title">
              访问免费的高分辨率照片，这些都是其它地方所找不到的
            </h2>
          </div>
          <div>
            <p class="registrations__credit">
              迷路中悠然自得——迷鹿
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
                  加入LostElk—迷鹿
                </div>
                <p>
                  已经有帐号了？
                  <router-link to="/Login">
                    <span class="text-secondary">
                      登录
                    </span>
                  </router-link>
                </p>
              </div>

              <ValidateForm @form-submit="onFormSubmit">
                <div class="row clearfix">
                  <div class="col-xs-6">
                    <div class="form-group">
                      <label for="user_first_name">
                        名字
                        <!-- <span class="text-secondary">
                          （可选）
                        </span> -->
                      </label>
                      <ValidateInput
                        :rules="userLastNameRule"
                        v-model="userLastNameVal"
                        class="form-control"
                        type="text"
                        placeholder="可选"
                        id="user_first_name"
                      >
                      </ValidateInput>
                    </div>
                  </div>
                  <div class="col-xs-6">
                    <div class="form-group">
                      <label for="user_last_name">
                        姓
                        <!-- <span class="text-secondary">
                          （可选）
                        </span> -->
                      </label>
                      <ValidateInput
                        :rules="userFirstNameRule"
                        v-model="userFirstNameVal"
                        class="form-control"
                        type="text"
                        placeholder="可选"
                        id="user_last_name"
                      >
                      </ValidateInput>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="user_email">
                    电子邮件
                    <!-- <span class="text-secondary">
                      （可选）
                    </span> -->
                  </label>
                  <ValidateInput
                    :rules="userEmileRule"
                    v-model="userEmileVal"
                    class="form-control"
                    type="email"
                    placeholder="可选"
                    id="user_email"
                  >
                  </ValidateInput>
                </div>

                <div class="form-group">
                  <label for="user_username">
                    用户名
                    <!-- <span class="text-secondary">
                      （用于登录账号,请牢记）
                    </span> -->
                  </label>

                  <ValidateInput
                    :rules="userNameRule"
                    v-model="userNameVal"
                    class="form-control"
                    type="text"
                    placeholder="用于登录账号,请牢记"
                    id="user_username"
                  >
                  </ValidateInput>
                </div>

                <div class="form-group">
                  <label for="user_password">
                    密码
                    <!-- <span class="text-secondary">
                      （密码长度在6-16位之间。）
                    </span> -->
                  </label>
                  <ValidateInput
                    :rules="passwordRule"
                    v-model="passwordVal"
                    class="form-control"
                    type="password"
                    placeholder="密码长度在6-16位之间"
                    autocomplete="off"
                    id="user_password"
                  >
                  </ValidateInput>
                </div>

                <div class="form-group">
                  <label for="user_affirmPassword">
                    确认密码
                  </label>
                  <ValidateInput
                    :rules="affirmPasswordRule"
                    v-model="affirmPasswordVal"
                    class="form-control"
                    type="password"
                    placeholder="请再次输入密码"
                    autocomplete="off"
                    id="user_affirmPassword"
                  >
                  </ValidateInput>
                </div>
                <template v-slot:submit>
                  <div class="form-groug">
                    <a href="#" class="form-btn">
                      注册
                    </a>
                  </div>
                </template>
              </ValidateForm>
              <span class="text-secondary zeta">
                注册即表示您同意 <a href="#">条款</a> 和 <a href="#">隐私政策</a>。
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
import ValidateInput, { RulesProp } from '../components/form/ValidateInput.vue';
import ValidateForm from '../components/form/ValidateForm.vue';
import createTooltip from '../components/globalFun/createTooltip';
import axios from 'axios';
import router from '../router';

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
    const userEmileVal = ref('');
    const affirmPasswordVal = ref('');
    const userNameRule: RulesProp = [
      { type: 'null', message: '用户名不能为空' },
      { type: 'userName', message: '仅限于字母、数字、下划线' },
    ];
    const passwordRule: RulesProp = [
      { type: 'null', message: '密码不能为空' },
      { type: 'password', message: '密码长度在6-16位之间' },
    ];
    const userLastNameRule: RulesProp = [{ type: 'userLastName', message: '名字格式错误' }];
    const userFirstNameRule: RulesProp = [{ type: 'userfirstName', message: '名字格式错误' }];
    const userEmileRule: RulesProp = [{ type: 'userEmile', message: '邮箱格式错误' }];
    const affirmPasswordRule: RulesProp = [
      { type: 'null', message: '确认密码不能为空' },
      {
        type: 'custom',
        validator: () => {
          return passwordVal.value === affirmPasswordVal.value;
        },
        message: '密码不相同',
      },
    ];

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const userRegisterData = {
          name: userNameVal.value,
          password: passwordVal.value,
        };
        axios.post('/users', userRegisterData).then(() => {
          createTooltip('注册成功 跳转到登陆页面', 'success', 2000);
          setTimeout(() => {
            router.push('/login');
          }, 1000);
        });
      } else {
        console.log('不通过');
      }
    };

    /**
     * 生成随机数设置展示图片
     */
    const registeredImgArrange = computed(() => props.registeredImg);
    const num = computed(() => Math.floor(Math.random() * 10) + 1);

    return {
      userNameRule,
      userNameVal,
      passwordVal,
      passwordRule,
      onFormSubmit,
      userLastNameVal,
      userLastNameRule,
      userFirstNameVal,
      userFirstNameRule,
      userEmileVal,
      userEmileRule,
      affirmPasswordVal,
      affirmPasswordRule,
      num,
      registeredImgArrange,
    };
  },
});
</script>

<style scoped>
@import '../style/less/viewsStyle/register.css';
label {
  cursor: pointer;
}
</style>
