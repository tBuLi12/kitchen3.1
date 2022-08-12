<script lang="ts">
  import type { Dish } from "../data/dish";
  import { getDateStr } from "../../utils/dateFormatter";
  import Button from "../Material/Buttons/Button.svelte";
  import IconButton from "../Material/Buttons/IconButton.svelte";
  import Menu from "../Material/Menu.svelte";
  import NoImage from "../Utils/NoImage.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{ edit: Dish }>();

  export let dish: Dish;

  let menu: Menu;
</script>

<div class="mdc-card thumbnail menu-to-left">
  <span>{dish.name}</span>
  <span>{getDateStr(dish.lastMade)} </span>
  <IconButton on:click={() => menu.open()}
    >more_vert<Menu
      items={[
        { name: "edit", action: () => dispatch("edit", dish.deepcopy()) },
      ]}
      bind:this={menu}
    /></IconButton
  >
  <div class="img" on:click={() => dish.open()}>
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
