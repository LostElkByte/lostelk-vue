<template>
  <div class="inputParent">
    <input v-if="tag !== 'textarea'" :value="inputRef.val" @blur="validateInput" @input="updateValue" v-bind="$attrs" />
    <textarea v-else :value="inputRef.val" @blur="validateInput" @input="updateValue" v-bind="$attrs" />

    <span class="form-error" v-if="inputRef.error">
      {{ inputRef.message }}
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, reactive } from 'vue';
// 导入已经建立好的mitt事件监听器
import { emitter } from './ValidateForm.vue';

/**
 * 表单验证所需的正则表达式
 */
const userNameReg = /^[-_a-zA-Z0-9\u4E00-\u9FA5]{1,20}$/;
const passwordReg = /^.{6,16}$/;
const userFirstNameReg = /^[a-zA-Z\u4E00-\u9FA5]{0,14}$/;
const userLastNameReg = /^[a-zA-Z\u4E00-\u9FA5]{0,4}$/;
const TagReg = /^[a-zA-Z\u4E00-\u9FA5]{0,20}$/;
const userEmailReg = /^$|^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
const headlineMaximumReg = /^.{1,15}$/;
const describeMaximumReg = /^.{0,100}$/;
const tagMaximumReg = /^.{0,10}$/;
// 声明 验证规则 RulesProp 接口类型
interface RuleProp {
  type:
    | 'null'
    | 'userName'
    | 'password'
    | 'userLastName'
    | 'userfirstName'
    | 'userEmail'
    | 'headlineMaximum'
    | 'describeMaximum'
    | 'tagMaximum'
    | 'fileNull'
    | 'tag'
    | 'custom';
  message: string;
  validator?: () => boolean;
}
// 导出 验证规则 RulesProp 接口类型
export type RulesProp = RuleProp[];
// 表单标签类型
export type TagType = 'input' | 'textarea';

export default defineComponent({
  props: {
    // 接收 父组件传过来的表单验证规则
    rules: Array as PropType<RulesProp>,
    // Vue3自定义组件双向绑定  1.创建绑定modelValue属性 接收父组件发送过来的v-modal值 2.更新值的时候 发送update:modelValue事件
    modelValue: String,
    // 默认将表单类型设置为input
    tag: {
      type: String as PropType<TagType>,
    },
    fileIsNull: {
      type: Object,
    },
  },

  // 不希望根元素继承非prop的attribute
  inheritAttrs: false,

  setup(props, context) {
    // 计算属性接收props的val
    const val = computed(() => (props.modelValue ? props.modelValue : ''));
    const fileIsNull = computed(() => props.fileIsNull || []);
    const inputRef = reactive({
      // 表单input初始值 为 传入的 modelValue 没有即为 空
      val: val.value || '',
      // 错误提示判断 默认false
      error: false,
      // 错误提示内容 默认空
      message: '',
    });

    /**
     * 用户进行表单输入时触发此函数
     * 1.拿到input实时的值更新给inputRef.val
     * 2.将input实时的值发送给父组件
     */
    const updateValue = (e: KeyboardEvent) => {
      // 拿到 input 当前的值
      const targetValue = (e.target as HTMLInputElement).value;
      //手动更新设置 inputRef.val 值
      inputRef.val = targetValue;
      //自定义组件v-model 绑定父子组件v-model向父组件发送 targetValue
      context.emit('update:modelValue', targetValue);
    };

    /**
     * validateInput 抽象验证表单流程函数
     */
    const validateInput = () => {
      // 判断rules 验证规则是否存在
      if (props.rules) {
        // Array.every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
        // 全部通过即返回true,如果有一项是false就立即停止并返回false
        const allPassed = props.rules.every(rule => {
          // 每个 rule 的临时变量
          let passed = true;
          // 每次循环时先将rule的错误提示message 设置给 inputRef.message
          inputRef.message = rule.message;
          //  循环进行rule.type规则验证
          switch (rule.type) {
            case 'null':
              passed = val.value.trim() !== '';
              break;
            case 'fileNull':
              passed = Object.keys(fileIsNull.value).length !== 0;
              break;
            case 'tag':
              passed = TagReg.test(inputRef.val);
              break;
            case 'userName':
              passed = userNameReg.test(inputRef.val);
              break;
            case 'password':
              passed = passwordReg.test(inputRef.val);
              break;
            case 'userfirstName':
              passed = userFirstNameReg.test(inputRef.val);
              break;
            case 'userLastName':
              passed = userLastNameReg.test(inputRef.val);
              break;
            case 'userEmail':
              passed = userEmailReg.test(inputRef.val);
              break;
            case 'headlineMaximum':
              passed = headlineMaximumReg.test(inputRef.val);
              break;
            case 'describeMaximum':
              passed = describeMaximumReg.test(inputRef.val);
              break;
            case 'tagMaximum':
              passed = tagMaximumReg.test(inputRef.val);
              break;
            case 'custom':
              passed = rule.validator ? rule.validator() : true;
              break;
            default:
              break;
          }
          // 返回passed 这时 allPassed 就是通过与否的布尔类型
          return passed;
        });
        // 如果allPassed 没有通过 即将inputRef.error设置为true 显示出来错误
        inputRef.error = !allPassed;
        // 返回 allPassed的结果
        return allPassed;
      }
      // 没有验证规则就永远都返回true
      return true;
    };
    /**
     * 触发 form-item-created 事件
     * 发送 validateInput 方法
     */
    onMounted(() => {
      emitter.emit('form-item-created', validateInput);
    });

    return {
      inputRef,
      validateInput,
      updateValue,
      val,
    };
  },
});
</script>

<style>
@import '../../style/less/componentsStyle/validateInput.css';
</style>
