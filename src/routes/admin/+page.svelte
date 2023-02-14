<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  const { tracks } = data.song.arrangements[0];
  let selectedTrackId = tracks[0].id;
  $: selectedTrack = tracks.find((track) => track.id === selectedTrackId);

  import { signOut } from '@auth/sveltekit/client';
</script>

<h1>admin</h1>
<button data-sveltekit-preload-data="off" type="button" on:click={() => signOut('google')}>
  Sign out
</button>

<form method="POST" class="flex gap-2 flex-col max-w-sm">
  <select class="block" bind:value={selectedTrackId} name="track">
    {#each tracks as { id, name }}
      <option value={id}>{name}</option>
    {/each}
  </select>
  <textarea
    class="resize"
    name="notation"
    id=""
    cols="30"
    rows="10"
    value={selectedTrack?.notation}
  />
  <button>save</button>
</form>
