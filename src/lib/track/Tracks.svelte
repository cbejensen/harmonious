<script lang="ts">
  import type { Track as TrackState } from './Track.types';
  import Track from './Track.svelte';
  import { audio } from '$lib/stores/audio';

  export let tracks: TrackState[];

  $: {
    audio.setTracks(tracks);
  }
</script>

<div class="tracks">
  {#each $audio.tracks as track}
    <Track {track} on:toggleMute={() => audio.toggleMute(track.id)} />
  {/each}
</div>

<style>
  .tracks {
    display: flex;
    gap: 2rem;
  }
</style>
