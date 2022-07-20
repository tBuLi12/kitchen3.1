<script lang="ts">
  import { replace } from "svelte-spa-router";
  import { redirectToLogin, currAuth } from "../firebase/user";
  import Button from "./Material/Buttons/Button.svelte";
  import TextField from "./Material/TextField/TextField.svelte";
  import TextFieldOutlinedBase from "./Material/TextField/TextFieldOutlinedBase.svelte";

  let email = "";
  let password = "";

  $: $currAuth && replace("/");
</script>

<div class="outer">
  <div class="mdc-card">
    <div>
      <span class="title">Log in to your account</span>
      <span class="subtitle"
        >or log in with <span class="link" on:click={redirectToLogin}
          >google</span
        ></span
      >
    </div>
    <form on:submit|preventDefault={() => console.log(email)}>
      <TextField label="Email" bind:value={email} />
      <TextFieldOutlinedBase label="Password">
        <input
          class="mdc-text-field__input"
          type="password"
          bind:value={password}
        />
      </TextFieldOutlinedBase>
      <div>
        <Button>Sign up</Button>
        <Button variant="contained" submit>Log in</Button>
      </div>
    </form>
  </div>
</div>

<style>
  .outer {
    margin: 0 20px;
    padding-top: 70px;
    display: flex;
    justify-content: center;
  }

  .outer > .mdc-card {
    width: 95%;
    max-width: 340px;
    padding: 20px 25px;
  }

  .mdc-card > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    font-size: 1.4rem;
  }

  .subtitle {
    color: gray;
  }

  form {
    margin-top: 20px;
    display: flex;
    gap: 20px;
    flex-direction: column;
  }

  form > :global(*) {
    width: 100%;
  }

  form > div {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: right;
  }

  span {
    text-align: center;
  }

  .link {
    color: blue;
    cursor: pointer;
    text-decoration: underline;
  }
</style>
