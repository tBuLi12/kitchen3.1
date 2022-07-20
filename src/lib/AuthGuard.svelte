<script lang="ts" context="module">
  import type { User } from "firebase/auth";
  import { currAuth } from "../firebase/user";
  import { tick } from "svelte";

  export let user: User | null = null;
  currAuth.subscribe(async (newUser) => {
    if (newUser) {
      user = newUser;
    } else {
      await tick();
      user = null;
    }
  });
</script>

<script lang="ts">
  import { push } from "svelte-spa-router";
  $: $currAuth === null && push("/login");
</script>

{#if $currAuth}
  <slot />
{/if}
