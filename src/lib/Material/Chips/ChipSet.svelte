<script lang="ts" context="module">
  import { MDCChipSet } from "@material/chips";

  function material(node: HTMLElement) {
    new MDCChipSet(node);
  }
</script>

<script lang="ts">
  import { flip } from "svelte/animate";
  import Menu from "../Menu.svelte";

  export let idPrefix = "";
  export let texts: string[];
  export let editable = false;
  export let allTexts: string[] = [];

  let textsSet = new Set(texts);
  let menuTexts = allTexts.filter((t) => !textsSet.has(t));

  class MenuItem {
    constructor(public name: string) {}
    action() {
      texts.push(this.name);
      menuTexts = menuTexts.filter((mt) => mt != this.name);
      texts = texts;
    }
  }

  let menu: Menu;
</script>

<span class="mdc-evolution-chip-set" role="grid" use:material>
  <span class="mdc-evolution-chip-set__chips" role="presentation">
    {#if editable}
      <span
        class="mdc-evolution-chip mdc-evolution-chip--with-trailing-action"
        role="presentation"
        id={idPrefix}
      >
        <span
          class="mdc-evolution-chip__cell mdc-evolution-chip__cell--trailing"
          role="gridcell"
        >
          <button
            class="mdc-evolution-chip__action mdc-evolution-chip__action--trailing"
            type="button"
            tabindex="-1"
            data-mdc-deletable="true"
            on:click={() => menu.open()}
          >
            <span
              class="mdc-evolution-chip__ripple mdc-evolution-chip__ripple--trailing"
            />
            <span
              class="mdc-evolution-chip__icon mdc-evolution-chip__icon--trailing material-icons"
              >add</span
            >
          </button>
        </span>
        <Menu bind:this={menu} items={menuTexts.map((t) => new MenuItem(t))} />
      </span>
    {/if}
    {#each texts as text (text)}
      <span
        class="mdc-evolution-chip {editable
          ? 'mdc-evolution-chip--with-trailing-action'
          : ''}"
        role="presentation"
        id="{idPrefix}-{text}"
        animate:flip={{ duration: 250 }}
      >
        <span
          class="mdc-evolution-chip__cell mdc-evolution-chip__cell--primary"
          role="gridcell"
        >
          <button
            class="mdc-evolution-chip__action mdc-evolution-chip__action--primary"
            type="button"
            tabindex="0"
            data-mdc-deletable="true"
          >
            <span
              class="mdc-evolution-chip__ripple mdc-evolution-chip__ripple--primary"
            />
            <span class="mdc-evolution-chip__text-label">{text}</span>
          </button>
        </span>
        {#if editable}
          <span
            class="mdc-evolution-chip__cell mdc-evolution-chip__cell--trailing"
            role="gridcell"
          >
            <button
              class="mdc-evolution-chip__action mdc-evolution-chip__action--trailing"
              type="button"
              tabindex="-1"
              data-mdc-deletable="true"
              on:click={() => {
                texts = texts.filter((t) => t != text);
                menuTexts.push(text);
                menuTexts = menuTexts;
              }}
            >
              <span
                class="mdc-evolution-chip__ripple mdc-evolution-chip__ripple--trailing"
              />
              <span
                class="mdc-evolution-chip__icon mdc-evolution-chip__icon--trailing material-icons"
                >close</span
              >
            </button>
          </span>
        {/if}
      </span>
    {/each}
  </span>
</span>
