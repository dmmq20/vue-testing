<script setup>
import { onMounted } from "vue";
import Editor from "./components/Editor.vue";
import { store } from "./store.js";

onMounted(() => {
  store.setDocuments();
});
</script>

<template>
  <div class="wrapper">
    <Editor v-if="store.documents" />
  </div>
</template>
