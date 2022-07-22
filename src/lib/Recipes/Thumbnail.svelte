<script lang="ts">
  import IconButton from "../Material/Buttons/IconButton.svelte";
  import IconButtonToggle from "../Material/Buttons/IconButtonToggle.svelte";
  import Menu from "../Material/Menu.svelte";
  import NoImage from "../Utils/NoImage.svelte";
  import type { RecipeHeader } from "../data/recipe";

  export let recipe: RecipeHeader;

  let menu: Menu;
</script>

<div class="mdc-card thumbnail menu-to-left">
  <span>{recipe.name} </span>
  <span>{recipe.description} </span>
  <IconButton on:click={() => menu.open()}
    >more_vert<Menu
      bind:this={menu}
      items={[{ name: "delete", action: () => recipe.delete() }]}
    /></IconButton
  >
  <div class="img" on:click={() => recipe.open()}>
    {#if recipe.image}
      <img src={recipe.image} alt="dish" />
    {:else}
      <NoImage />
    {/if}
  </div>
  <div class="icons">
    <IconButtonToggle checked={true} icon="favorite" />
    <IconButton>share</IconButton>
  </div>
</div>
