<script lang="ts">
  import { collectionData } from "rxfire/firestore";
  import { Dish, dishes } from "../data/dish";
  import Fab from "../Material/Buttons/Fab.svelte";
  import ErrorGuard from "../Utils/ErrorGuard.svelte";
  import DishThmubnail from "./Dish.svelte";
  import Editor from "./Editor.svelte";

  const dishes$ = collectionData(dishes!);

  let editorOpen = false;
  let editedDish = new Dish();
</script>

<ErrorGuard source={dishes$} let:item={dishes}>
  {#if dishes}
    <div class="thumbnail-grid">
      {#each dishes as dish}
        <DishThmubnail
          {dish}
          on:edit={(evt) => {
            editedDish = evt.detail;
            editorOpen = true;
          }}
        />
      {/each}
    </div>
    <Fab on:click={() => (editorOpen = true)} />
    <!-- {#if editorOpen} -->
    <Editor bind:isOpen={editorOpen} dish={editedDish} />
    <!-- {/if} -->
  {:else}
    loading
  {/if}
</ErrorGuard>
