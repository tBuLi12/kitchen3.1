<script lang="ts">
  import TextFieldOutlinedBase from "../Material/TextField/TextFieldOutlinedBase.svelte";

  export let value: Date;
  let dateStr = value.toISOString().split("T")[0];

  function setValue(date: Date) {
    value = date;
  }

  $: setValue(new Date(dateStr));
</script>

<TextFieldOutlinedBase label="last made">
  <input class="mdc-text-field__input" type="date" bind:value={dateStr} />
</TextFieldOutlinedBase>
