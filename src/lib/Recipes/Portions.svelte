<script lang="ts">
  import Button from "../Material/Buttons/Button.svelte";
  export let servingSize: number;
  let value: number | null = servingSize;

  $: if (value > 0) {
    servingSize = value;
  }
</script>

<div class="var-area">
  <Button variant="contained" on:click={() => ++value}>+</Button>
  <input type="number" bind:value />
  <Button variant="contained" on:click={() => --value > 0 || (value = 1)}
    >-</Button
  >
</div>

<style>
  div {
    display: flex;
    justify-self: flex-end;
    height: min-content;
  }
  div > :global(*) {
    height: 30px;
  }
  div :global(button) {
    width: 10px;
    min-width: 0;
  }
  div :global(button:first-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  div :global(button:last-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  input {
    width: 32px;
    box-sizing: border-box;
    border-radius: 0;
    border: solid rgb(168, 168, 168) 1px;
    padding: 0;
    text-align: center;
  }
  input:focus {
    outline: none;
  }
</style>
