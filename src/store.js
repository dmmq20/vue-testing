import { reactive } from "vue";

export const store = reactive({
  documents: false,
  setDocuments: async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/documents");
      if (!response.ok) {
        throw new Error("Failed to fetch documents");
      }
      const data = await response.json();
      store.documents = data;
    } catch (error) {
      console.error("Error fetching documents:", error.message);
    }
  },
});
