<template>
  <input
    :value="inputRef.val"
    @blur="validateInput"
    @input="updateValue"
    v-bind="$attrs"
  />

  <span class="form-error" v-if="inputRef.error">
    {{ inputRef.message }}
  </span>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue';
import { emitter } from './ValidateForm.vue';

const userNameReg = /^[-_a-zA-Z0-9\u4E00-\u9FA5]{1,12}$/;
const passwordReg = /^.{6,16}$/;

interface RulesProp {
  type: 'null' | 'userName' | 'password';
  message: string;
}
export type RulesProp = RulesProp[];

export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    // 绑定modelValue属性 接收父组件发送过来的v-modal值
    modelValue: String,
  },

  // 不希望继承非prop的attribute
  inheritAttrs: false,

  setup(props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: '',
    });

    // 用户输入时触发此函数
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value;
      //手动设置inputRef.val 值
      inputRef.val = targetValue;
      //绑定父子组件v-model向父组件发送targetValue
      context.emit('update:modelValue', targetValue);
    };

    // validateInput 验证表单函数
    const validateInput = () => {
      if (props.rules) {
        // 全部通过即返回true,如果有一项是false就立即停止并返回false
        const allPassed = props.rules.every(rule => {
          let passed = true;
          inputRef.message = rule.message;
          switch (rule.type) {
            case 'null':
              passed = inputRef.val.trim() !== '';
              break;
            case 'userName':
              passed = userNameReg.test(inputRef.val);
              break;
            case 'password':
              passed = passwordReg.test(inputRef.val);
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
        return allPassed;
      }
      // 没有验证规则就永远都返回true
      return true;
    };

    onMounted(() => {
      emitter.emit('form-item-created', validateInput);
    });

    return {
      inputRef,
      validateInput,
      updateValue,
    };
  },
});
</script>

<style></style>
