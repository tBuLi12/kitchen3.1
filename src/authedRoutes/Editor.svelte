<script lang="ts">
  import AuthGuard from "../lib/AuthGuard.svelte";
  import Editor from "../lib/Recipes/Editor/EditorView.svelte";

  export let params: { id: string | null; otherUser: string | null };
</script>

<AuthGuard>
  <Editor {...params} />
</AuthGuard>
