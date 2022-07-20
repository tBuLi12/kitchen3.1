<script lang="ts">
  import { MDCMenu } from "@material/menu";

  let openMenu = () => null;
  let closeMenu = () => null;

  export function open() {
    openMenu();
  }

  function material(node: HTMLElement) {
    const menu = new MDCMenu(node);
    openMenu = () => (menu.open = true);
    closeMenu = () => (menu.open = false);
  }

  interface Item {
    name: string;
    action: () => void;
  }

  export let items: Item[];
</script>

<div class="mdc-menu mdc-menu-surface" id="demo-menu" use:material>
  <ul class="mdc-list" role="menu" tabindex="-1">
    {#each items as item}
      <li
        class="mdc-list mdc-list-item mdc-list-item--non-interactive mdc-list-item--with-one-line"
        on:click={() => {
          item.action();
          closeMenu();
        }}
      >
        <span class="mdc-list-item__ripple" />
        <span class="mdc-list-item__content">
          <span class="mdc-list-item__primary-text">{item.name}</span></span
        >
      </li>
    {/each}
  </ul>
</div>

<style>
  :global(.menu-to-left) div {
    right: 0 !important;
    left: unset !important;
  }
  .mdc-list-item.mdc-list-item--with-one-line {
    height: 35px;
  }
</style>
