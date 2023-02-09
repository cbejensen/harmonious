<script lang="ts">
  import { page } from '$app/stores';
  import { signIn, signOut } from '@auth/sveltekit/client';
</script>

<main class="p-2">
  <p class="nojs-show loaded">
    {#if $page.data.session}
      {#if $page.data.session.user?.image}
        <span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
      {/if}
      <span class="signedInText">
        <small>Signed in as</small><br />
        <strong>{$page.data.session.user?.email ?? $page.data.session.user?.name}</strong>
      </span>
      <a
        href="/auth/signout"
        class="button"
        data-sveltekit-preload-data="off"
        on:click={() => signOut('github')}>Sign out</a
      >
    {:else}
      <span>You are not signed in</span>
      <button data-sveltekit-preload-data="off" on:click={() => signIn('github')}>Sign in</button>
    {/if}
  </p>
  <slot />
</main>
