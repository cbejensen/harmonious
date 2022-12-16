<script lang="ts">
  import type { PageData } from './$types';
  import Tracks from '$lib/track/Tracks.svelte';
  import { trackStore } from '$lib/track/trackStore';
  import Notation from '$lib/notation/Notation.svelte';

  export let data: PageData;
  const { song } = data;
  let selectedArrangementId = song.defaultArrangementId || song.arrangements[0].id;
  $: selectedArrangement = song.arrangements.find(({ id }) => id === selectedArrangementId);
  $: {
    const tracks = selectedArrangement?.tracks ?? [];
    trackStore.init(tracks);
  }
</script>

<h1>{song.name}</h1>

<select bind:value={selectedArrangementId} name="arrangement">
  {#each song.arrangements as { id, name }}
    <option value={id}>{name}</option>
  {/each}
</select>

{#if selectedArrangement}
  <Tracks />
  <hr style="margin: 2rem 0;" />
  <Notation arrangement={selectedArrangement} title={song.name} />
{/if}

<style>
  h1 {
    margin-bottom: 2rem;
  }
</style>
