<script lang="ts" context="module">
  import { Recipe } from "../../data/recipe";

  async function getRecipe(id: string | null, otherUser: string | null) {
    if (id) {
      if (otherUser) {
        return (await Recipe.fetch(id, otherUser)).copyForCurrentUser();
      }
      return Recipe.fetch(id);
    }
    return new Recipe();
  }
</script>

<script lang="ts">
  import Editor from "./Editor.svelte";

  export let id: string | null;
  export let otherUser: string | null = null;
</script>

{#await getRecipe(id, otherUser)}
  loading
{:then recipe}
  <Editor {recipe} />
{/await}
