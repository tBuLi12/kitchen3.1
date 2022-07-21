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
    }
  }
</script>

<Button --area="upload" variant="contained" on:click={() => input.click()}
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
  <Button --area="loading" on:click={setImage}>remove</Button>
{/if}
<div>
  {#if image}
    <img src={image} alt="dish" />
  {:else}
    <NoImage />
  {/if}
</div>

<style>
  input {
    display: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  div {
    margin-top: -5px;
    border-radius: 5px;
    border: solid 1px rgb(175, 175, 175);
    aspect-ratio: 1;
    grid-area: image;
  }
</style>
