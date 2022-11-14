<template>
  <div
    id="dropArea"
    @dragenter.prevent.stop="highlightHandler"
    @dragover.prevent.stop="highlightHandler"
    @dragleave.prevent.stop="unhighlightHandler"
    @drop.prevent.stop="unhighlightHandler();handleDrop($event)"
    :class="isLight ? 'highlighted' : ''"
  >
    <p>拖拽上传文件</p>
    <div id="imagePreview" ref="imgPreviewEle"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
const IMAGE_MIME_REGEX = /^image\/(jpe?g|gif|png)$/i;
const isLight = ref<boolean>(false);
const imgPreviewEle = ref<HTMLElement>()
function highlightHandler() {
  isLight.value = true;
}
function unhighlightHandler() {
  isLight.value = false;
}
function handleDrop(e: DragEvent) {
  const dt = e.dataTransfer;
  if(dt !==null && dt.files.length > 0){
    const files = Array.from(dt.files);
    files.forEach((file) => {
      previewImage(file, imgPreviewEle.value!);
    });
  }
}


function previewImage(file: File, container: HTMLElement) {
  if (IMAGE_MIME_REGEX.test(file.type)) {
    const reader = new FileReader();
    reader.onload = function (e) {
      let img = document.createElement("img");
      img.src = e.target!.result as string;
      container.append(img);
    };
    reader.readAsDataURL(file);
  }
}


function preventDefaults(e: Event) {
  e.preventDefault();
  e.stopPropagation();
}
onMounted(() => {
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults, false);
  });
});
onUnmounted(() => {
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults, false);
  });
});
</script>
<style scoped>
#dropArea {
  width: 300px;
  height: 300px;
  border: 1px dashed gray;
  margin-bottom: 20px;
}
#dropArea p {
  text-align: center;
  color: #999;
}
#dropArea.highlighted {
  background-color: #ddd;
}
#imagePreview {
  max-height: 250px;
  overflow-y: scroll;
}
#imagePreview img {
  width: 100%;
  display: block;
  margin: auto;
}
</style>
