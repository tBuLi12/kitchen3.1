<script lang="ts" context="module">
  export type Dish = {
    name: string;
    tags: string[];
    image?: string;
    lastMade: Date;
    recipe?: DocumentReference;
    link?: string;
    reflect?: boolean;
  };
</script>

<script lang="ts">
  import type {
    DocumentReference,
    DocumentSnapshot,
    Timestamp,
  } from "firebase/firestore";
  import { push } from "svelte-spa-router";

  import { getDateStr } from "../../utils/dateFormatter";
  import Button from "../Material/Buttons/Button.svelte";
  import IconButton from "../Material/Buttons/IconButton.svelte";
  import Menu from "../Material/Menu.svelte";
  import NoImage from "../Utils/NoImage.svelte";

  export let dishDoc: DocumentSnapshot<Dish>;
  const dish = dishDoc.data();
  dish.lastMade = (dishDoc.get("lastMade") as Timestamp).toDate();
  console.log(dish);
  let menu: Menu;
</script>

<div class="mdc-card thumbnail menu-to-left">
  <span>{dish.name}</span>
  <span>{getDateStr(dish.lastMade)} </span>
  <IconButton on:click={() => menu.open()}
    >more_vert<Menu
      items={[{ name: "edit", action: () => null }]}
      bind:this={menu}
    /></IconButton
  >
  <div
    class="img"
    on:click={() => {
      if (dish.link) {
        location.href = dish.link;
      } else if (dish.recipe) {
        const ownerId = dish.recipe.parent.parent.id;
        push(`/recipe/${ownerId}/${dish.recipe.id}`);
      }
    }}
  >
    {#if dish.image}
      <img src={dish.image} alt="dish" />
    {:else}
      <NoImage />
    {/if}
  </div>
  <Button variant="outlined">done</Button>
</div>

<style>
  .thumbnail > :global(button:last-of-type) {
    grid-area: icons;
    justify-self: left;
    margin: 5px;
  }
</style>
