<!-- <div class="bar">
  <slot />
  <div class="spacer" />
  <slot name="right" />
</div> -->
<script lang="ts" context="module">
  import { MDCTopAppBar } from "@material/top-app-bar";
  function material(node: HTMLElement) {
    new MDCTopAppBar(node);
  }
</script>

<header class="mdc-top-app-bar" use:material>
  <div class="mdc-top-app-bar__row">
    <section
      class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start"
    >
      <slot name="left" />
      <span class="mdc-top-app-bar__title"><slot /></span>
    </section>
    <section
      class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
      role="toolbar"
    >
      <slot name="right" />
    </section>
  </div>
</header>

<style>
  header .mdc-top-app-bar__section--align-end > :global(button) {
    color: var(--mdc-theme-on-primary);
    border-color: var(--mdc-theme-on-primary);
  }
  header
    .mdc-top-app-bar__section--align-end
    > :global(button)
    > :global(span)::before,
  header
    .mdc-top-app-bar__section--align-end
    > :global(button)
    > :global(span)::after {
    background-color: var(--mdc-theme-on-primary);
  }
  header {
    box-shadow: 0 0 7px rgb(44, 44, 44);
  }
</style>
