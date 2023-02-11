<script lang="ts">
  import { signIn } from '@auth/sveltekit/client';
</script>

<button data-sveltekit-preload-data="off" on:click={() => signIn('google')}>Sign in</button>
