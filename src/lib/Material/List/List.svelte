<script lang="ts" context="module">
  import { MDCList } from "@material/list";
  function material(node: HTMLElement) {
    new MDCList(node);
  }
</script>

<ul class="mdc-list" use:material>
  <slot />
</ul>
