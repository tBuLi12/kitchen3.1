<script lang="ts" context="module">
  import { MDCRipple } from "@material/ripple";
  import { getContext } from "svelte";
  function material(node: HTMLElement) {
    new MDCRipple(node);
  }
  const variants = {
    outlined: "mdc-button--outlined",
    contained: "mdc-button--raised",
    text: "",
  };
</script>

<script lang="ts">
  export let submit = false;
  export let icon: string | undefined = undefined;
  export let variant: keyof typeof variants = "text";

  const inCard = getContext("card");
</script>

<button
  class="mdc-button var-area {variants[variant]} {inCard
    ? 'mdc-card__action mdc-card__action--button'
    : ''}"
  class:colored-spinner={$$slots.spinner}
  class:mdc-button--icon-leading={icon}
  type={submit ? "submit" : ""}
  use:material
  on:click
>
  <span class="mdc-button__ripple" />
  {#if icon}
    <i class="material-icons mdc-button__icon" aria-hidden="true">{icon}</i>
  {/if}
  <slot name="spinner" />
  <span class="mdc-button__label"> <slot /></span>
</button>

<style>
  .colored-spinner :global(.mdc-circular-progress) {
    --mdc-theme-primary: white;
  }
  .colored-spinner :global(.mdc-button__label) {
    display: none;
  }
</style>
