<script lang="ts" context="module">
  import { MDCTextField } from "@material/textfield";
  function material(node: HTMLElement) {
    new MDCTextField(node);
  }
</script>

<script lang="ts">
  export let value: string;
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label
  class="mdc-text-field mdc-text-field--outlined mdc-text-field--textarea mdc-text-field--no-label var-area"
  use:material
>
  <span class="mdc-notched-outline">
    <span class="mdc-notched-outline__leading" />
    <span class="mdc-notched-outline__trailing" />
  </span>
  <textarea class="mdc-text-field__input" bind:value />
</label>
