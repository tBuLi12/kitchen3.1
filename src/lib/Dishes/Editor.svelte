<script lang="ts">
  import Button from "../Material/Buttons/Button.svelte";
  import Dialog from "../Material/Dialog.svelte";
  import TextField from "../Material/TextField/TextField.svelte";
  import ImagePicker from "../Recipes/ImagePicker.svelte";
  import Tags from "../Recipes/Tags.svelte";
  import DatePicker from "../Utils/DatePicker.svelte";
  import type { Dish } from "../data/dish";

  export let isOpen = true;
  export let dish: Dish;

  let link = "";
</script>

<Dialog bind:isOpen>
  <div class="outer">
    <span>Edit dish</span>
    <TextField bind:value={dish.name} label="name" />
    {#if dish.recipe}
      <input
        type="checkbox"
        bind:checked={dish.reflect}
        on:input={async function () {
          // if (this.checked) {
          //   const recipeDoc = await getDocFromCache(recipe).catch(() =>
          //     getDoc(recipe)
          //   );
          //   // relfect could have been unchecked while awaiting
          //   if (reflect) {
          //     ({ tags, name, image } = recipeDoc.data());
          //   }
          // }
        }}
      />
    {:else}
      <TextField bind:value={link} label="link" />
    {/if}
    <DatePicker bind:value={dish.lastMade} />
    <Tags editable bind:tags={dish.tags} />
    <div class="spacer" />
    <span>image</span>
    <div class="image">
      <ImagePicker imgRef={dish.imageRef} bind:image={dish.image} />
    </div>
    <div class="actions">
      <Button variant="contained" on:click={() => null}>save</Button>
      <Button on:click={() => (isOpen = false)}>cancel</Button>
    </div>
  </div>
</Dialog>

<style lang="scss">
  .outer {
    display: flex;
    width: 340px;
    padding: 20px;
    gap: 20px;
  }

  span {
    text-align: center;

    &:first-of-type {
      font-size: 1.4rem;
      font-weight: 500;
    }

    &:last-of-type {
      text-transform: uppercase;
      font-size: 0.8rem;
      margin-top: -10px;
    }
  }
  /* .mdc-dialog__surface > :global(div:first-of-type) {
  } */
  .spacer {
    width: 270px;
    background-color: gray;
    height: 1px;
  }

  .image {
    display: grid;
    grid:
      "upload loading" auto
      "image  image" auto
      / auto 1fr;
    gap: 10px;
  }

  .actions {
    display: flex;
    flex-direction: row-reverse;
    margin: -10px;
    gap: 10px;
  }
</style>
