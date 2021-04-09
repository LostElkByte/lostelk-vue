<template>
  <div class="affirm">
    <div class="affirm-tooltip">
      <h3 class="affirm-title">你确定要删除这条评论吗？</h3>
      <div class="affirm-content">
        <div class="affirm-button">
          <button type="button" class="Button">取消</button>
          <button type="button" class="Button Button-black">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
<style>
@import '../style/less/componentsStyle/Affirm.css';
</style>
