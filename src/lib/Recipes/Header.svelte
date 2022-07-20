<script lang="ts">
  import NoImage from "../Utils/NoImage.svelte";

  export let name: string;
  export let description: string;
  export let image: string | undefined;
</script>

<div class="mdc-card">
  <span class="name">{name}</span>
  <span class="description">{description}</span>
  {#if image}
    <img src={image} alt="dish" />
  {:else}
    <NoImage />
  {/if}
</div>

<style>
  div {
    grid-area: header;
  }
  div > :global(div) {
    aspect-ratio: 1;
  }
  .name {
    padding: 15px 10px 5px 10px;
    text-align: center;
    font-size: 2.7rem;
    font-weight: 300;
  }
  .description {
    padding: 10px 20px;
    padding-bottom: 20px;
    text-align: center;
    font-size: 1.3rem;
    font-weight: 400;
  }
</style>
