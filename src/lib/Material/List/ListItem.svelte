<script lang="ts" context="module">
  import { MDCRipple } from "@material/ripple";
  function material(node: HTMLElement) {
    new MDCRipple(node);
  }
</script>

<script lang="ts">
  export let text: string;
  export let icon: string | undefined = undefined;
</script>

<li
  class="mdc-list mdc-list-item mdc-list-item--non-interactive mdc-list-item--with-one-line"
  use:material
  class:mdc-list-item--with-leading-icon={icon}
  on:click
>
  {#if icon}
    <span class="mdc-list-item__start">
      <i class="material-icons" aria-hidden="true">{icon}</i>
    </span>
  {/if}
  <span class="mdc-list-item__ripple" />
  <span class="mdc-list-item__content">
    <span class="mdc-list-item__primary-text">{text}</span></span
  >
</li>
