<svelte:options immutable />

<script lang="ts" context="module">
  const asMl: { [key: string]: number } = {
    tsp: 5.92,
    tbsp: 14.79,
    cup: 250,
    l: 1000,
    ml: 1,
  };

  const asG: { [key: string]: number } = {
    kg: 1000,
    g: 1,
  };

  const preferredVolumeUnits = [
    { unit: "tsp", vol: 5.92 },
    { unit: "tbsp", vol: 14.79 },
    { unit: "cup", vol: 250 },
  ];

  const preferredVolumeAmounts = [
    { str: "1/4", num: 1 / 4 },
    { str: "1/3", num: 1 / 3 },
    { str: "1/2", num: 1 / 2 },
    { str: "2/3", num: 2 / 3 },
    { str: "3/4", num: 3 / 4 },
    { str: "1", num: 1 },
    { str: "2", num: 2 },
    { str: "3", num: 3 },
    { str: "4", num: 4 },
  ];

  const preferredVolumes: { vol: number; repr: string }[] = [];
  for (let { unit, vol } of preferredVolumeUnits) {
    for (let { num, str } of preferredVolumeAmounts) {
      preferredVolumes.push({
        vol: num * vol,
        repr: str + " " + unit,
      });
    }
  }
  preferredVolumes.sort((a, b) => a.vol - b.vol);

  function fromMls(mls: number): string {
    if (mls >= 1000) {
      return `${mls / 1000} l`;
    }
    return `${mls} ml`;
  }

  function fromGrams(g: number): string {
    if (g >= 1000) {
      return `${(g / 1000).toPrecision(2)} kg`;
    }
    return `${g.toPrecision(2)} g`;
  }

  function normalizeUnit(ingredient: Ingredient, mult: number): string {
    if ("weight" in ingredient) {
      return fromGrams(ingredient.weight * mult);
    }

    if ("volume" in ingredient) {
      const mls = ingredient.volume * mult;
      const i = preferredVolumes.findIndex(({ vol }) => mls < vol);

      if (i == -1) {
        return fromMls(mls);
      }

      const moreDiff = preferredVolumes[i]!.vol - mls;
      const lessDiff = mls - (preferredVolumes[i - 1]?.vol ?? -Infinity);
      const closest = preferredVolumes[lessDiff < moreDiff ? i - 1 : i]!;

      if (Math.abs(closest.vol - mls) > 0.05 * mls) {
        return fromMls(mls);
      }

      return closest.repr;
    }

    return ingredient.amount * mult + " " + (ingredient.unit ?? "");
  }

  const ingRegEx = /^\S* \d+((\.|\/)\d+)?( \S+)?$/u;

  function parseAmount(amtStr: string): number {
    const [top, bot] = amtStr.split("/");
    if (top && bot) {
      return parseInt(top) / parseInt(bot);
    }
    return parseFloat(amtStr);
  }

  function parseIngredient(ingStr: string): Ingredient | null {
    if (ingRegEx.test(ingStr)) {
      const [name, amountStr, unit] = ingStr.split(" ") as [
        string,
        string,
        string
      ];
      const amount = parseAmount(amountStr);

      const weightMult = asG[unit];
      if (weightMult) {
        return { name, weight: weightMult * amount };
      }

      const volMult = asMl[unit];
      if (volMult) {
        return { name, volume: volMult * amount };
      }

      return unit ? { name, amount, unit } : { name, amount };
    }
    return null;
  }
</script>

<script lang="ts">
  import Button from "../Material/Buttons/Button.svelte";
  import Table from "../Material/DataTable/Table.svelte";
  import TextFieldOutlinedBase from "../Material/TextField/TextFieldOutlinedBase.svelte";
  import Portions from "./Portions.svelte";

  import type { Ingredient } from "../data/recipe";

  export let servingSize: number;
  export let editable = false;
  let ingredientStr = "";
  let selectedSize = servingSize;

  export let ingredients: Ingredient[];

  function addIngredient(): boolean {
    const ingredient = parseIngredient(ingredientStr);
    if (ingredient) {
      const i = ingredients.findIndex((ing) => ing.name == ingredient.name);
      // if (i > 0) {
      //   ingredients[i] =
      // } else {
      // }
      ingredients = [ingredient, ...ingredients];
      ingredientStr = "";
      return true;
    }
    return false;
  }

  function onInputKeydown(this: HTMLInputElement, evt: KeyboardEvent) {
    if (evt.key == "Enter") {
      this.blur();
      this.focus();
      addIngredient();
    }
  }
</script>

<div class="outer" class:editable>
  <span>Ingredients:</span>
  {#if editable}
    <Button variant="contained" on:click={addIngredient} --area="portions"
      >Add</Button
    >
    <TextFieldOutlinedBase label="new ingredient" --area="input">
      <input
        class="mdc-text-field__input"
        bind:value={ingredientStr}
        pattern={ingRegEx.source}
        on:keydown={onInputKeydown}
      />
    </TextFieldOutlinedBase>
  {:else}
    <div class="spacer" />
    <Portions bind:servingSize={selectedSize} />
  {/if}
  <div class="tab">
    <Table
      header={[{ name: "Name" }, { name: "Amt" }]}
      data={ingredients.map((ing) => ({
        name: ing.name,
        attrs: [normalizeUnit(ing, selectedSize / servingSize)],
        onClick: () => {
          if (editable) {
            ingredients = ingredients.filter((i) => i !== ing);
          }
        },
      }))}
    />
  </div>
</div>

<style>
  .spacer {
    grid-area: spacer;
    height: 1px;
    background-color: rgb(169, 169, 169);
  }
  span {
    grid-area: label;
    display: flex;
    align-items: center;
  }

  .outer {
    grid-area: ingredients;
    margin-top: -15px;
    display: grid;
    gap: 15px;
    grid:
      "spacer spacer" auto
      "label  portions" auto
      "table  table" 1fr
      / 1fr auto;
  }
  @media (min-width: 600px) {
    .outer {
      max-width: 230px;
    }
  }

  .outer.editable {
    margin-top: 0;
    grid:
      "label  portions" auto
      "input  input" auto
      "table  table" 1fr
      / 1fr auto;
  }
  .tab {
    width: 100%;
    grid-area: table;
    /* height: 0;
    min-height: 100%; */
    position: relative;
    overflow: auto;
  }

  .outer > :global(div:nth-child(3)) {
    grid-area: portions;
  }

  @media (min-width: 900px) {
    .tab > :global(div) {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
    }
  }

  .tab :global(table) {
    width: 100%;
  }
  .tab :global(th:last-child) {
    width: 90px;
  }
</style>
