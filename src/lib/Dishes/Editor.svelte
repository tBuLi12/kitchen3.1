<script lang="ts" context="module">
  type DishSnap = DocumentSnapshot<Dish>;
  type RecipeSnap = DocumentSnapshot<RecipeHeader>;
  type State = Dish & { dishRef: DishSnap };

  function getInitDish(): Dish {
    return {
      image: null,
      link: "",
      reflect: false,
      tags: [],
      name: "",
      lastMade: new Date(),
    };
  }

  function getInitState(user: string): State {
    let dishRef: DocumentReference<Dish>;
    let dishData: Dish;

    if (editedDish) {
      dishRef = editedDish.ref;
      dishData = editedDish.data();
    } else {
      dishRef = doc(
        collection(db, "users", user, "dishes") as CollectionReference<Dish>
      );
      dishData = getInitDish();
    }
    return { ...dishData, dishRef };
  }
</script>

<script lang="ts">
  import {
    collection,
    CollectionReference,
    doc,
    DocumentReference,
    DocumentSnapshot,
    getDoc,
    getDocFromCache,
    setDoc,
  } from "firebase/firestore";
  import { ref } from "firebase/storage";
  import { db, storage } from "../../firebase/app";
  import { user } from "../AuthGuard.svelte";
  import Button from "../Material/Buttons/Button.svelte";
  import Dialog from "../Material/Dialog.svelte";
  import TextField from "../Material/TextField/TextField.svelte";
  import ImagePicker from "../Recipes/ImagePicker.svelte";
  import type { RecipeHeader } from "../Recipes/Recipe.svelte";
  import Tags from "../Recipes/Tags.svelte";
  import DatePicker from "../Utils/DatePicker.svelte";
  import Dish from "./Dish.svelte";
  import type { Dish } from "./Dish.svelte";
  import Search from "../Recipes/Grid/Search.svelte";

  export let isOpen = true;
  export let editedDish: DocumentSnapshot<Dish> | undefined = undefined;

  export let recipe: DocumentReference<RecipeHeader> | undefined = undefined;

  let { image, link, reflect, tags, name, lastMade, dishRef } = getInitState(
    editedDish,
    $user.uid
  );
  let imgRef = ref(storage, `${$user.uid}/dishImages/${dishRef.id}`);
</script>

<Dialog bind:isOpen>
  <div class="outer">
    <span>Edit dish</span>
    <TextField bind:value={name} label="name" />
    {#if recipe}
      <input
        type="checkbox"
        bind:checked={reflect}
        on:input={async function () {
          if (this.checked) {
            const recipeDoc = await getDocFromCache(recipe).catch(() =>
              getDoc(recipe)
            );

            // relfect could have been unchecked while awaiting
            if (reflect) {
              ({ tags, name, image } = recipeDoc.data());
            }
          }
        }}
      />
    {:else}
      <TextField bind:value={link} label="link" />
    {/if}
    <DatePicker bind:value={lastMade} />
    <Tags editable bind:tags />
    <div class="spacer" />
    <span>image</span>
    <div class="image">
      <ImagePicker {imgRef} bind:image />
    </div>
    <div class="actions">
      <Button
        variant="contained"
        on:click={() =>
          setDoc(dish, {
            recipe,
            reflect,
            tags,
            name,
            image,
            lastMade,
            link,
          })}>{editedDish ? "save" : "add"}</Button
      >
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
