<script lang="ts">
  import Button from "../../Material/Buttons/Button.svelte";
  import TextArea from "../../Material/TextField/TextArea.svelte";
  import TextField from "../../Material/TextField/TextField.svelte";
  import Ingredients from "../Ingredients.svelte";
  import Portions from "../Portions.svelte";
  import Tags from "../Tags.svelte";
  import Spinner from "../../Material/Spinner.svelte";
  import ImagePicker from "../ImagePicker.svelte";
  import type { Recipe } from "../../data/recipe";

  export let recipe: Recipe;

  let linkMode = !!recipe.link;
  let saving = false;

  let link = "";
</script>

<div class="mdc-card" class:show-dir={!linkMode}>
  <div class="edit-title">Edit Recipe</div>
  <TextField --area="name" bind:value={recipe.name} label="name" />
  <TextField
    --area="description"
    bind:value={recipe.description}
    label="description"
  />
  <Tags editable bind:tags={recipe.tags} />
  <div class="portions">
    <span>Portions:</span>
    <Portions bind:servingSize={recipe.portions} />
  </div>
  <div class="dir-title">
    {linkMode ? "Link" : "Directions"}
    <span class="link" on:click={() => (linkMode = !linkMode)}>
      provide {linkMode ? "directions" : "a link"} instead
    </span>
  </div>
  {#if linkMode}
    <TextField --area="text" label="link" bind:value={link} />
  {:else}
    <TextArea --area="text" bind:value={recipe.text} />
  {/if}
  <div class="spacer" />
  <ImagePicker imgRef={recipe.imageRef} bind:image={recipe.image} />
  {#if !linkMode}
    <Ingredients
      editable
      servingSize={1}
      bind:ingredients={recipe.ingredients}
    />
  {/if}
  <div class="save">
    <Button variant="outlined" on:click={() => history.back()}>cancel</Button>
    <Button
      variant="contained"
      on:click={async () => {
        saving = true;

        if (link) {
          recipe.link = link;
        }

        await recipe.save();
        history.back();
      }}
      >{#if saving}
        <Spinner slot="spinner" />
      {:else}
        save
      {/if}</Button
    >
  </div>
</div>

<style>
  .edit-title {
    text-align: center;
    grid-area: edit-title;
    font-size: 1.7rem;
  }
  .dir-title {
    font-size: 1.5rem;
    grid-area: dir-title;
    border-top: 1px solid rgb(175, 175, 175);
    padding: 0 10px;
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dir-title > span {
    margin-left: 10px;
  }

  .portions {
    grid-area: portions;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-self: right;
    padding-right: 20px;
  }

  .mdc-card {
    margin: 30px auto;
    display: grid;
    grid:
      "edit-title edit-title  edit-title" auto
      "name       description description" auto
      "tags       tags        portions" auto
      "dir-title  dir-title   dir-title" auto
      "text       text        text" auto
      "spacer     spacer      spacer" auto
      "upload     upload      ingredients" auto
      "image      image       ingredients" auto
      "image      image       save" auto
      / auto 1fr auto;
    gap: 20px;
    padding: 20px;
    width: min(1000px, 100%);
  }

  @media (max-width: 900px) {
    .mdc-card {
      grid:
        "edit-title edit-title  edit-title" auto
        "name       description description" auto
        "tags       tags        portions" auto
        "dir-title  dir-title   dir-title" auto
        "text       text        text" auto
        "spacer     spacer      spacer" auto
        "upload     upload      ingredients" auto
        "image      image       ingredients" auto
        "image      image       save" auto
        / auto 1fr auto;
    }
  }

  @media (max-width: 600px) {
    .mdc-card {
      grid:
        "edit-title  edit-title" auto
        "name        name" auto
        "description description" auto
        "tags        portions" auto
        "dir-title   dir-title" auto
        "text        text" auto
        "spacer      spacer" auto
        "upload      upload" auto
        "image       image" auto
        "ingredients ingredients" auto
        "save        save" auto
        / 1fr auto;
    }
  }

  .save {
    grid-area: save;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-bottom: -5px;
    margin-right: -10px;
  }

  .spacer {
    background-color: rgb(175, 175, 175);
    height: 1px;
    grid-area: spacer;
  }

  .link {
    /* float: right; */
    font-size: 0.9rem;
  }

  .show-dir :global(textarea) {
    height: 400px;
  }
</style>
