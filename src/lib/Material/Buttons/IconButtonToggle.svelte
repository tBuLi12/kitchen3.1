<script lang="ts" context="module">
  import { MDCIconButtonToggle } from "@material/icon-button";
  import { MDCRipple } from "@material/ripple";
  function material(node: HTMLElement) {
    new MDCRipple(node).unbounded = true;
    new MDCIconButtonToggle(node);
  }
</script>

<script lang="ts">
  export let checked: boolean;
  export let icon: string;
</script>

<button
  class="mdc-icon-button material-icons"
  on:click={() => (checked = !checked)}
>
  <div class="mdc-icon-button__ripple" />
  {icon + (checked ? "" : "_border")}
</button>
