<script lang="ts">
  import Button from "../Material/Buttons/Button.svelte";
  import Dialog from "../Material/Dialog.svelte";
  import TextField from "../Material/TextField/TextField.svelte";
  import ImagePicker from "../Recipes/ImagePicker.svelte";
  import Tags from "../Recipes/Tags.svelte";
  import DatePicker from "../Utils/DatePicker.svelte";
  import type { Dish } from "../data/dish";
  import Spinner from "../Material/Spinner.svelte";

  export let isOpen = true;
  export let dish: Dish;

  let link = "";
  let saving = false;
</script>

<Dialog bind:isOpen>
  <div class="outer">
    <span>Edit dish</span>
    <TextField bind:value={dish.name} label="name" />
    {#if !dish.recipe}
      <TextField bind:value={dish.link} label="link" />
    {/if}
    <DatePicker bind:value={dish.lastMade} />
    <Tags editable bind:tags={dish.tags} />
    <ImagePicker imgRef={dish.imageRef} bind:image={dish.image} small />
    <div class="actions">
      <Button
        variant="contained"
        on:click={async () => {
          saving = true;
          await dish.save();
          saving = isOpen = false;
        }}
        >{#if saving}
          <Spinner slot="spinner" />
        {:else}
          save
        {/if}</Button
      >
      <Button on:click={() => (isOpen = false)}>cancel</Button>
    </div>
  </div>
</Dialog>

<style lang="scss">
  .outer {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 20px;
    gap: 20px;
  }

  span {
    text-align: center;

    &:first-of-type {
      font-size: 1.4rem;
      font-weight: 500;
    }

    // &:last-of-type {
    //   text-transform: uppercase;
    //   font-size: 0.8rem;
    //   margin-top: -10px;
    // }
  }
  /* .mdc-dialog__surface > :global(div:first-of-type) {
  } */
  // .spacer {
  //   width: 270px;
  //   background-color: gray;
  //   height: 1px;
  // }

  // .image {
  //   display: grid;
  //   grid:
  //     "upload loading" auto
  //     "image  image" auto
  //     / auto 1fr;
  //   gap: 10px;
  // }

  .actions {
    display: flex;
    flex-direction: row-reverse;
    margin: -10px;
    gap: 10px;
  }
</style>
