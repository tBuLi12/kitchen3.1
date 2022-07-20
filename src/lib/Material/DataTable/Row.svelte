<script lang="ts">
  export let name: string;
  export let data: (string | number)[];
</script>

<tr class="mdc-data-table__row" on:click>
  <th class="mdc-data-table__cell" scope="row">{name}</th>
  {#each data as row}
    <td
      class="mdc-data-table__cell {typeof row == 'number'
        ? 'mdc-data-table__cell--numeric'
        : ''}">{row}</td
    >
  {/each}
</tr>
