<script lang="ts" context="module">
  import { MDCDataTable } from "@material/data-table";
  import Header from "./Header.svelte";
  function material(node: HTMLElement) {
    new MDCDataTable(node);
  }
</script>

<script lang="ts">
  import Row from "./Row.svelte";

  export let header: { name: string; numeric?: boolean }[];
  export let data: {
    name: string;
    attrs: (number | string)[];
    onClick?: () => void;
  }[];
</script>

<div class="mdc-data-table" use:material>
  <div class="mdc-data-table__table-container">
    <table class="mdc-data-table__table">
      <thead>
        <tr class="mdc-data-table__header-row">
          {#each header as { name, numeric }}
            <Header data={name} {numeric} />
          {/each}
        </tr>
      </thead>
      <tbody class="mdc-data-table__content">
        {#each data as { name, attrs, onClick }}
          <Row data={attrs} {name} on:click={() => onClick?.()} />
        {/each}
      </tbody>
    </table>
  </div>
</div>
