<script lang="ts">
  import type { PageData } from './$types';
  // import Tracks from '$lib/track/Tracks.svelte';
  import { trackStore } from '$lib/track/trackStore';
  // import Notation from '$lib/notation/Notation.svelte';
  import SongTabs from '$lib/SongTabs/SongTabs.svelte';

  export let data: PageData;
  const { song } = data;
  let selectedArrangementId = song.defaultArrangementId || song.arrangements[0].id;
  $: selectedArrangement = song.arrangements.find(({ id }) => id === selectedArrangementId);
  $: {
    const tracks = selectedArrangement?.tracks ?? [];
    trackStore.init(tracks);
  }
</script>

<h1 class="text-center my-4 font-extrabold">{song.name}</h1>

{#if song.arrangements.length > 1}
  <div class="text-center">
    <select bind:value={selectedArrangementId} name="arrangement">
      {#each song.arrangements as { id, name }}
        <option value={id}>{name}</option>
      {/each}
    </select>
  </div>
{/if}

{#if selectedArrangement}
  <SongTabs />
  <!-- <Tracks />
  <hr style="margin: 2rem 0;" />
  <Notation arrangement={selectedArrangement} title={song.name} /> -->
{/if}
