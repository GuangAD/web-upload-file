<template>
  <input ref="input" id="uploadFile" type="file" accept="image/*" />
  <button id="submit" @click="uploadFile">上传文件</button>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { upload } from "../utils/upload";
const input = ref<HTMLInputElement | null>();

function uploadFile(){
  console.log(input.value);
  const uploadFileEle = input.value;
  if (uploadFileEle) {
    const file = uploadFileEle.files![0];
    upload({url: '/single', file})
  }
}
</script>

<style scoped></style>
