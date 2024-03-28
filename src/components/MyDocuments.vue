<template>
  <div>
    <h1>Document Titles</h1>
    <ul>
      <li v-for="(document, index) in documents" :key="index">
        <router-link :to="{ name: 'editor', params: { id: document.id } }">{{
          document.title
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const documents = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/documents");
    if (!response.ok) {
      throw new Error("Failed to fetch documents");
    }
    const data = await response.json();
    documents.value = data;
  } catch (error) {
    console.error("Error fetching documents:", error.message);
  }
});
</script>
