<script lang="ts" context="module">
  export interface RecipeHeader {
    name: string;
    description: string;
    tags: string[];
    image?: string;
    link?: string;
  }
</script>

<script lang="ts">
  import { Recipe } from "../data/recipe";

  import Header from "./Header.svelte";
  import Ingredients from "./Ingredients.svelte";
  import Tags from "./Tags.svelte";

  export let params: { userId: string; recipeId: string };
  const { userId, recipeId } = params;
</script>

<div class="outer">
  {#await Recipe.fetch(recipeId, userId)}
    loading
  {:then recipe}
    {@const { name, description, image, tags, portions, ingredients, text } =
      recipe}
    <Header {name} {description} {image} />
    <Tags {tags} />
    <Ingredients servingSize={portions} {ingredients} />
    <div class="recipe-text mdc-card">
      <span>Directions</span>
      {text}
    </div>
  {/await}
</div>

<style>
  .outer {
    margin: 40px 0;
    display: grid;
    grid:
      "header tags" auto
      "header ingredients" 1fr
      "text   text" auto
      / 600px 270px;
    justify-content: center;
    gap: 30px;
  }
  .recipe-text {
    grid-area: text;
    padding: 20px;
  }
  span {
    font-size: 1.5rem;
    text-align: center;
    padding-bottom: 10px;
  }
</style>
