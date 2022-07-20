<script lang="ts">
  import { catchError, Observable } from "rxjs";

  type Item = $$Generic;
  interface $$Slots {
    default: { item: Item | undefined };
  }

  export let source: Observable<Item>;

  let error: any = undefined;
  let data = source.pipe<Item>(
    catchError<Item, Observable<Item>>((err) => (error = err))
  );
</script>

{#if error}
  {error}
{:else}
  <slot item={$data} />
{/if}
