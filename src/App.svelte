<script lang="ts">
  import Appbar from "./lib/Material/Appbar.svelte";
  import Nav from "./lib/Nav.svelte";
  import { signOut, currAuth } from "./firebase/user";
  import Router, { push } from "svelte-spa-router";
  import Public from "./lib/Public.svelte";
  import Login from "./lib/Login.svelte";
  import Recipe from "./lib/Recipes/Recipe.svelte";
  import IconButton from "./lib/Material/Buttons/IconButton.svelte";
  import Button from "./lib/Material/Buttons/Button.svelte";
  import RecipeEditor from "./authedRoutes/Editor.svelte";
  import Recipes from "./authedRoutes/Recipes.svelte";
  import Dishes from "./authedRoutes/Dishes.svelte";

  const routes = {
    "/": Public,
    "/login": Login,
    "/recipe/:userId/:recipeId": Recipe,
    "/recipes": Recipes,
    "/dishes": Dishes,
    "/edit/:otherUser/:id": RecipeEditor,
    "/edit/:id?": RecipeEditor,
  };

  let navOpen = true;

  function toggleNav(event: MouseEvent & { openedNav?: boolean }) {
    event.openedNav = navOpen = !navOpen;
  }

  function loginButtonAction() {
    if ($currAuth) {
      signOut();
    } else {
      push("/login");
    }
  }
</script>

<Appbar>
  <Button slot="right" variant="outlined" on:click={loginButtonAction}
    >{$currAuth ? "sign out" : "log in"}</Button
  >
  <IconButton on:click={toggleNav} nav slot="left">menu</IconButton>
  Kitchen
</Appbar>
<main class="mdc-top-app-bar--fixed-adjust">
  <Nav bind:open={navOpen} />
  <div>
    <Router {routes} />
  </div>
</main>

<style>
  main {
    display: flex;
    flex-grow: 1;
    align-items: stretch;
    position: relative;
  }
  main > div {
    background-color: rgb(241, 241, 241);
    flex-grow: 1;
    flex-basis: 0;
    padding: 0 20px;
    min-width: 0;
  }
  /* span {
    margin-left: 5px;
    font-size: 1.1rem;
    color: white;
  } */
</style>
