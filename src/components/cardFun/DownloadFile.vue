<template>
  <div @click.stop="download">
    <slot>
      <button class="card-button">
        <span>download</span>
      </button>
    </slot>
    <a :href="fileDownloadUrl" ref="downloadLink"></a>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { lostelkUrl } from '../../global';
export default defineComponent({
  props: {
    fileId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const fileDownloadUrl = computed(() => `${lostelkUrl}/files/${props.fileId}/download`);
    const downloadLink = ref();

    const download = async () => {
      downloadLink.value.click();
    };
    return {
      download,
      fileDownloadUrl,
      downloadLink,
    };
  },
});
</script>

<style>
@import '../../style/less/componentsStyle/download-file.css';
</style>
