<script>
  import AuthGuard from "../lib/AuthGuard.svelte";
  import Grid from "../lib/Dishes/Grid.svelte";
</script>

<AuthGuard>
  <Grid />
</AuthGuard>
