<script lang="ts">
  import type { Track as TrackState } from './Track.types';
  import Track from './Track.svelte';
  import { audio } from '$lib/stores/audio';

  export let tracks: TrackState[];

  $: {
    audio.setTracks(tracks);
  }

  $: someSoloed = $audio.tracks.some((track) => track.soloed);
</script>

<div class="tracks">
  {#each $audio.tracks as track}
    <Track
      {track}
      implicitlyMuted={someSoloed}
      on:toggleMute={() => audio.toggleMute(track.id)}
      on:toggleSolo={() => audio.toggleSolo(track.id)}
    />
  {/each}
</div>

<style>
  .tracks {
    display: flex;
    gap: 2rem;
  }
</style>
