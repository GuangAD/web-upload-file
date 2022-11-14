<script setup lang="ts">
import single_upload from './components/single.vue'
import multiple_upload from "./components/multiple.vue";
import directory_upload from "./components/directory.vue";
import directory_zip_upload from "./components/directory_zip.vue";
import drop_upload from "./components/drop.vue";

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>
<template>
  <div>
    <single_upload></single_upload>
    <multiple_upload></multiple_upload>
    <directory_upload></directory_upload>
    <directory_zip_upload></directory_zip_upload>
    <drop_upload></drop_upload>
  </div>
</template>

<style scoped>
</style>
