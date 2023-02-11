<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  import { signOut } from '@auth/sveltekit/client';
</script>

<h1>admin</h1>
<button data-sveltekit-preload-data="off" type="button" on:click={() => signOut('google')}>
  Sign out
</button>

<form method="POST">
  <textarea
    class="resize"
    name="notation"
    id=""
    cols="30"
    rows="10"
    value={data.song.arrangements[0].tracks[0].notation}
  />
  <button>save</button>
</form>
