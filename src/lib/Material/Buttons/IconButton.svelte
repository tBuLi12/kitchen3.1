<script lang="ts" context="module">
  import { MDCRipple } from "@material/ripple";
  function material(node: HTMLElement) {
    new MDCRipple(node).unbounded = true;
  }
</script>

<script lang="ts">
  export let nav = false;
</script>

<button
  class="mdc-icon-button material-icons"
  class:mdc-top-app-bar__navigation-icon={nav}
  use:material
  on:click|self
>
  <div class="mdc-icon-button__ripple" />
  <slot />
</button>
