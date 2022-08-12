<script lang="ts">
  import ChipSet from "../Material/Chips/ChipSet.svelte";

  export let editable = false;
  export let tags = ["one", "two", "three", "four", "five", "sixxx", "seveen"];
  const allTags = ["one", "two", "three", "four", "five", "sixxx", "seveen"];
</script>

<div class="outer">
  <div>Tags:</div>
  <slot />
  <ChipSet idPrefix="tags-chips" {editable} texts={tags} allTexts={allTags} />
</div>

<style>
  .outer > div {
    margin-bottom: 10px;
    align-items: center;
  }
  .outer {
    display: grid;
    grid:
      "name button" auto
      "chips chips" auto
      / auto 1fr;
    /* width: max-content; */
    max-width: 100%;
    grid-area: tags;
  }
  .outer > :global(span) {
    grid-area: chips;
  }
</style>
