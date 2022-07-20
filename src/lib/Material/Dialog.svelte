<script lang="ts">
  import { MDCDialog } from "@material/dialog";

  export let retainContentState = false;
  export let isOpen = false;

  function material(node: HTMLElement, open: boolean) {
    const dialog = new MDCDialog(node);

    const onClosed = () => (isOpen = false);
    const update = (open: boolean) => (open ? dialog.open() : dialog.close());

    update(open);

    dialog.listen("MDCDialog:closed", onClosed);

    return {
      destroy() {
        dialog.unlisten("MDCDialog:closed", onClosed);
      },
      update,
    };
  }
</script>

<div class="mdc-dialog" use:material={isOpen}>
  <div class="mdc-dialog__container">
    <div class="mdc-dialog__surface" role="alertdialog">
      {#if retainContentState || isOpen}
        <slot />
      {/if}
    </div>
  </div>
  <div class="mdc-dialog__scrim" />
</div>
