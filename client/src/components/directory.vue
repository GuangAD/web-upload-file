<template>
  <div>
    <input ref="input" id="uploadFile" type="file" accept="image/*" webkitdirectory />
    <button id="submit" @click="uploadFile">目录上传文件</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { upload } from "../utils/upload";
const input = ref<HTMLInputElement | null>();

function uploadFile() {
  const uploadFileEle = input.value;  
  if (uploadFileEle) {
    const file = uploadFileEle.files!;
    upload({ url: "/multiple", file: Array.from(file) });
  }
}
</script>

<style scoped></style>
