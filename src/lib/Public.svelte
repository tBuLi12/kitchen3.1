<script lang="ts">
  import Button from "./Material/Buttons/Button.svelte";
  import Spinner from "./Material/Spinner.svelte";
</script>

<Button variant="contained">
  save
  <Spinner slot="spinner" />
</Button>
<Spinner />
