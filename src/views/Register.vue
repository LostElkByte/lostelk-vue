<template>
  <div class="registrations-wrapper">
    <div class="registrations-container">
      <div class="registrations-left-panel">
        <div class="registrations__content">
          <div>
            <img
              class="registrations__logo"
              src="../assets/icons/logoWhite.png"
              alt=""
            />
          </div>
          <div>
            <h1 class="registrations__title">创作从这里开始</h1>
            <h2 class="registrations__sub-title">
              访问免费的高分辨率照片，这些都是其他地方所找不到的
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
                  加入LostElk——迷鹿
                </div>
                <p>
                  已经有帐号了？
                  <a href="#">
                    <span class="text-secondary">
                      登录
                    </span>
                  </a>
                </p>
              </div>

              <ValidateForm @form-submit="onFormSubmit">
                <div class="row clearfix">
                  <div class="col-xs-6">
                    <div class="form-group">
                      <label for="user_first_name">
                        名字
                        <span class="text-secondary">
                          （可选）
                        </span>
                      </label>
                      <ValidateInput
                        :rules="userLastNameRule"
                        v-model="userLastNameVal"
                        class="form-control"
                        type="text"
                      >
                      </ValidateInput>
                    </div>
                  </div>
                  <div class="col-xs-6">
                    <div class="form-group">
                      <label for="user_last_name">
                        姓
                        <span class="text-secondary">
                          （可选）
                        </span>
                      </label>
                      <ValidateInput
                        :rules="userFirstNameRule"
                        v-model="userFirstNameVal"
                        class="form-control"
                        type="text"
                      >
                      </ValidateInput>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="user_email">
                    电子邮件
                    <span class="text-secondary">
                      （可选）
                    </span>
                  </label>
                  <ValidateInput
                    :rules="userEmileRule"
                    v-model="userEmileVal"
                    class="form-control"
                    type="email"
                  >
                  </ValidateInput>
                </div>

                <div class="form-group">
                  <label for="user_username">
                    用户名
                    <span class="text-secondary">
                      （仅字母，数字和下划线。）
                    </span>
                  </label>

                  <ValidateInput
                    :rules="userNameRule"
                    v-model="userNameVal"
                    class="form-control"
                    type="text"
                    placeholder="用于登录账号使用,请牢记"
                  >
                  </ValidateInput>
                </div>

                <div class="form-group">
                  <label for="user_password">
                    密码
                    <span class="text-secondary">
                      （密码长度在6-16位之间。）
                    </span>
                  </label>
                  <ValidateInput
                    :rules="passwordRule"
                    v-model="passwordVal"
                    class="form-control"
                    type="password"
                    placeholder="请输入密码"
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
                注册即表示您同意 <a href="#">条款</a> 和
                <a href="#">隐私政策</a>。
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue';
import ValidateForm from '../components/ValidateForm.vue';
export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const userNameVal = ref('');
    const passwordVal = ref('');
    const userLastNameVal = ref('');
    const userEmileVal = ref('');
    const userNameRule: RulesProp = [
      { type: 'null', message: '用户名不能为空' },
      { type: 'userName', message: '用户名格式错误' },
    ];
    const passwordRule: RulesProp = [
      { type: 'null', message: '密码不能为空' },
      { type: 'password', message: '密码长度在6-16位之间' },
    ];
    const userLastNameRule: RulesProp = [
      { type: 'userLastName', message: '名字格式错误' },
    ];
    const userFirstNameRule: RulesProp = [
      { type: 'userfirstName', message: '名字格式错误' },
    ];
    const userEmileRule: RulesProp = [
      { type: 'userEmile', message: '邮箱格式错误' },
    ];

    const onFormSubmit = (result: boolean) => {
      if (result) {
        console.log('通过');
      } else {
        console.log('不通过');
      }
    };
    return {
      userNameRule,
      userNameVal,
      passwordVal,
      passwordRule,
      onFormSubmit,
      userLastNameVal,
      userLastNameRule,
      userFirstNameRule,
      userEmileVal,
      userEmileRule,
    };
  },
});
</script>

<style>
@import '../style/viewsStyle/register.css';
</style>
