<script lang="ts" context="module">
  import { MDCTextField } from "@material/textfield";
  function material(node: HTMLElement) {
    new MDCTextField(node);
  }
</script>

<script lang="ts">
  export let label: string;
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="mdc-text-field mdc-text-field--filled" use:material>
  <span class="mdc-text-field__ripple" />
  <span class="mdc-floating-label">{label}</span>
  <slot />
  <span class="mdc-line-ripple" />
</label>
