<template>
  <editor-content :editor="editor" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, onUnmounted } from "vue";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Editor, EditorContent } from "@tiptap/vue-3";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { HocuspocusProvider } from "@hocuspocus/provider";

import { store } from "../store.js";

const doc = new Y.Doc();
const editor = ref(null);

const provider = new HocuspocusProvider({
  url: "ws://127.0.0.1:1234",
  // name: "example-document",
  document: doc,
});

onMounted(async () => {
  editor.value = new Editor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Collaboration.configure({
        document: doc,
      }),
      CollaborationCursor.configure({
        provider,
        user: { name: "John Doe", color: "#ffcc00" },
      }),
    ],
    content: store.documents[1].content,
  });
  // console.log(store.documents[0].content);
  // editor.value.commands.setContent(store.documents[1].content);

  // try {
  //   const response = await fetch("http://127.0.0.1:8000/documents/2");
  //   if (!response.ok) {
  //     throw new Error("Failed to fetch documents");
  //   }
  //   const data = await response.json();
  //   // console.log(data);
  //   // console.log(editor.value);
  //   editor.value.commands.setContent(data.content);
  // } catch (error) {
  //   console.error("Error fetching documents:", error.message);
  // }
});

onBeforeUnmount(() => {
  editor.value.destroy();
});

// onUnmounted(() => {
//   editor.value.commands.setContent("");
// });
</script>
