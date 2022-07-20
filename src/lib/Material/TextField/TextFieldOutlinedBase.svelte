<script lang="ts">
  import { MDCTextField } from "@material/textfield";
  export let label: string;

  let field: MDCTextField;

  function material(node: HTMLElement) {
    field = new MDCTextField(node);
  }
  // export let disabled = false;
  // export let helper: string | undefined = undefined;
</script>

<!-- class:mdc-text-field--disabled={disabled} -->
<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="mdc-text-field mdc-text-field--outlined var-area" use:material>
  <span class="mdc-notched-outline">
    <span class="mdc-notched-outline__leading" />
    <span class="mdc-notched-outline__notch">
      <span class="mdc-floating-label">{label}</span>
    </span>
    <span class="mdc-notched-outline__trailing" />
  </span>
  <slot invalidate={() => (field.valid = false)} />
</label>
