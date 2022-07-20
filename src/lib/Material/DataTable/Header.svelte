<script lang="ts">
  export let data: string;
  export let numeric = false;
</script>

<th
  class="mdc-data-table__header-cell {numeric
    ? 'mdc-data-table__header-cell--numeric'
    : ''}"
  role="columnheader"
  scope="col">{data}</th
>
