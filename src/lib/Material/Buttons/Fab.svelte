<script lang="ts" context="module">
  import { MDCRipple } from "@material/ripple";
  function material(node: HTMLElement) {
    new MDCRipple(node);
  }
</script>

<button class="mdc-fab" aria-label="Favorite" use:material on:click>
  <div class="mdc-fab__ripple" />
  <span class="mdc-fab__icon material-icons">add</span>
</button>

<style>
  button {
    position: fixed;
    bottom: 40px;
    right: 40px;
  }
</style>
