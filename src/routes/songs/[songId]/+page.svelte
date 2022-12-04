<script lang="ts">
  import type { PageData } from './$types';
  import Tracks from '$lib/track/Tracks.svelte';

  export let data: PageData;
  const { song } = data;
  let selectedArrangementId = song.defaultArrangementId || song.arrangements[0].id;
  $: selectedArrangment = song.arrangements[selectedArrangementId];
  $: tracks = selectedArrangment.tracks;
</script>

<h1>{song.name}</h1>

<select bind:value={selectedArrangementId} name="arrangement">
  {#each song.arrangements as { id, name }}
    <option value={id}>{name}</option>
  {/each}
</select>

{#if tracks.length}
  <Tracks {tracks} />
{:else}
  <!-- TODO -->
  <button>add track</button>
{/if}

<style>
  h1 {
    margin-bottom: 2rem;
  }
</style>
