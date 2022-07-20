<script lang="ts">
  import {
    collection as collRef,
    CollectionReference,
  } from "firebase/firestore";

  import { collection } from "rxfire/firestore";
  import { db } from "../../firebase/app";
  import { user } from "../AuthGuard.svelte";

  import Fab from "../Material/Buttons/Fab.svelte";
  import ErrorGuard from "../Utils/ErrorGuard.svelte";

  import DishThmubnail, { Dish } from "./Dish.svelte";
  import Editor from "./Editor.svelte";

  const dishes = collection(
    collRef(db, "users", $user.uid, "dishes") as CollectionReference<Dish>
  );
  // const dishes: Dish[] = [recipe, recipe, recipe, recipe, recipe, recipe];
  let editorOpen = false;
</script>

<ErrorGuard source={dishes} let:item={dishes}>
  {#if dishes}
    <div class="thumbnail-grid">
      {#each dishes as dishDoc}
        <DishThmubnail {dishDoc} />
      {/each}
    </div>
    <Fab on:click={() => (editorOpen = true)} />
    {#if editorOpen}
      <Editor bind:isOpen={editorOpen} />
    {/if}
  {:else}
    loading
  {/if}
</ErrorGuard>
