<script lang="ts">
  import { collectionData } from "rxfire/firestore";
  import Fab from "../../Material/Buttons/Fab.svelte";
  import ErrorGuard from "../../Utils/ErrorGuard.svelte";
  import Thumbnail from "../Thumbnail.svelte";
  import Search from "./Search.svelte";
  import { push } from "svelte-spa-router";
  import { headers } from "../../data/recipe";

  const recipes$ = collectionData(headers!);
</script>

<ErrorGuard source={recipes$} let:item={recipes}>
  {#if recipes}
    <div class="thumbnail-grid">
      <Search value="eee" />
      {#each recipes as recipe (recipe.ref.id)}
        <Thumbnail {recipe} />
      {/each}
    </div>
    <Fab on:click={() => push("/edit")} />
  {:else}
    loading
  {/if}
</ErrorGuard>
