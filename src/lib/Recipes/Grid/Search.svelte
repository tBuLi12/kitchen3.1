<script lang="ts">
  import Button from "../../Material/Buttons/Button.svelte";
  import TextField from "../../Material/TextField/TextField.svelte";
  import Tags from "../Tags.svelte";
  export let value: string;
</script>

<Tags editable />
<TextField --area="search" bind:value label="search" />
<Button --area="tbut" variant="contained">filter</Button>
<Button --area="sbut"variant="contained">search</Button>
