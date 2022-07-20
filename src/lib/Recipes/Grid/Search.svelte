<script lang="ts">
  import Button from "../../Material/Buttons/Button.svelte";
  import TextField from "../../Material/TextField/TextField.svelte";
  import Tags from "../Tags.svelte";
  export let value: string;
</script>

<Tags editable />
<TextField bind:value label="search" />
<Button variant="contained">filter</Button>
<Button variant="contained">search</Button>
