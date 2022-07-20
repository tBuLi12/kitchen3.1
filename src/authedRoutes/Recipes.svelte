<script>
  import AuthGuard from "../lib/AuthGuard.svelte";
  import Grid from "../lib/Recipes/Grid/Grid.svelte";
</script>

<AuthGuard>
  <Grid />
</AuthGuard>
