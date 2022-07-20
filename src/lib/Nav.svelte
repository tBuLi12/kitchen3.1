<script lang="ts">
  import { breakpoint } from "../utils/mediaQueries";
  import { push } from "svelte-spa-router";
  import List from "./Material/List/List.svelte";
  import ListItem from "./Material/List/ListItem.svelte";
  export let open: boolean;
  let element: HTMLDivElement;
  interface Link {
    icon: string;
    url: string;
    name: string;
  }
  const links: Link[] = [
    { url: "/", name: "About", icon: "info" },
    { url: "/recipe", name: "Recipe", icon: "menu_book" },
    { url: "/recipes", name: "Recipes", icon: "menu_book" },
    { url: "/dishes", name: "Dishes", icon: "menu_book" },
    { url: "/edit", name: "edit", icon: "edit" },
  ];
  $: navShouldFloat = $breakpoint == 0;
  function checkOutsideClick(event: MouseEvent & { openedNav?: boolean }) {
    if (
      navShouldFloat &&
      open &&
      !event.openedNav &&
      !(event.target instanceof Node && element.contains(event.target))
    ) {
      open = false;
    }
  }
</script>

<svelte:window on:click={checkOutsideClick} />
<div class="outer" class:open class:navShouldFloat bind:this={element}>
  <div>
    <List>
      {#each links as { name, icon, url }}
        <ListItem text={name} {icon} on:click={() => push(url)} />
      {/each}
    </List>
  </div>
</div>

<style>
  .outer {
    overflow-x: hidden;
    width: 56px;
    transition: width 0.3s;
    background-color: white;
    border-right: 1px solid rgb(186, 186, 186);
  }
  .navShouldFloat {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 0;
    z-index: 1;
    direction: rtl;
  }
  .outer > div {
    direction: ltr;
    min-width: min-content;
  }
  .open {
    width: 150px;
  }
</style>
