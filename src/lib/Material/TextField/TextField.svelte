<script lang="ts">
  import TextFieldOutlinedBase from "./TextFieldOutlinedBase.svelte";

  export let value: string;
  export let label: string;
</script>

<TextFieldOutlinedBase {label}>
  <input class="mdc-text-field__input" type="text" bind:value />
</TextFieldOutlinedBase>
