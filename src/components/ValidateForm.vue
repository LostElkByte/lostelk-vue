<template>
  <form>
    <slot name="default"> </slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <div class="form-groug">
          <a href="#" class="form-btn">
            提交
          </a>
        </div>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue';
// 导入mitt事件监听器
import mitt from 'mitt';
// 新建mitt事件监听器并导出
export const emitter = mitt();

export default defineComponent({
  // 定义一个事件 叫做form-submit
  emits: ['form-submit'],
  setup(props, context) {
    // 存放ValidateInput组件传来的一组validateInput函数 返回结果是布尔值
    // eslint-disable-next-line
    let funcArr: any[] = [];
    /**
     * 全局验证函数
     * result: 一键判断所有表单是否通过 最终的结果 true或false
     * every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。如果有一个是false即停止运行
     * map() 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。
     * 通过form-submit事件 发送result结果
     */
    const submitForm = () => {
      const result = funcArr.map(func => func()).every(result => result);
      context.emit('form-submit', result);
    };
    /**
     * form-item-created事件的回调函数
     * 参数类型: func: ValidateFunc
     */
    // eslint-disable-next-line
    const callback = (func: any) => {
      funcArr.push(func);
    };
    // 将form-item-created事件添加到mitt监听器中
    emitter.on('form-item-created', callback);
    // 在组件卸载时清理form-item-created事件监听 并 清空funcArr数组
    onUnmounted(() => {
      emitter.off('form-item-created', callback);
      funcArr = [];
    });
    return {
      submitForm,
    };
  },
});
</script>

<style>
@import '../style/less/componentsStyle/validateForm.css';
</style>
