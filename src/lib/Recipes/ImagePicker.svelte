<script lang="ts">
  import {
    deleteObject,
    getDownloadURL,
    StorageReference,
    uploadBytes,
  } from "firebase/storage";
  import Button from "../Material/Buttons/Button.svelte";
  import NoImage from "../Utils/NoImage.svelte";

  export let image: string | null = null;
  export let imgRef: StorageReference;
  export let small = false;

  let input: HTMLInputElement;

  async function setImage(this: HTMLInputElement | HTMLButtonElement) {
    let file: File | undefined;

    if (this instanceof HTMLInputElement && (file = this.files?.[0])) {
      await uploadBytes(imgRef, file);
      image = await getDownloadURL(imgRef);
    } else {
      // TODO realtime database: set unsaved image
      await deleteObject(imgRef).catch(() => null);
      image = null;
      input.value = "";
    }
  }
</script>

<div class="buttons" class:small>
  <Button variant="contained" on:click={() => input.click()}
    >upload image</Button
  >
  <input
    id="upload-image-input"
    type="file"
    accept="image/*"
    on:input={setImage}
    bind:this={input}
  />
  {#if image}
    <Button on:click={setImage}>remove</Button>
  {/if}
</div>
<div style:background-image="url({image})" class="img">
  {#if !image}
    <NoImage />
  {/if}
</div>

<style>
  input {
    display: none;
  }

  .img {
    margin-top: -5px;
    border-radius: 5px;
    border: solid 1px rgb(175, 175, 175);
    aspect-ratio: 1;
    grid-area: image;
    background-size: cover;
    background-position: center;
  }

  .buttons {
    grid-area: upload;
    display: flex;
    gap: 10px;
  }

  .buttons.small > :global(*) {
    flex-grow: 1;
    flex-basis: 0;
  }

  @media (max-width: 900px) {
    .buttons > :global(*) {
      flex-grow: 1;
      flex-basis: 0;
    }
  }

  @media (max-width: 700px) and (min-width: 600px), (max-width: 400px) {
    .buttons:not(.small) {
      flex-direction: column;
      gap: 15px;
    }

    .buttons:not(.small) > :global(*) {
      flex-basis: unset;
    }
  }
</style>
