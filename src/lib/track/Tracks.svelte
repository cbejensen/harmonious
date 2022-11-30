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
      bind:paused={$audio.paused}
      bind:currentTime={$audio.currentTime}
      on:toggleMute={() => audio.toggleMute(track.id)}
      on:toggleSolo={() => audio.toggleSolo(track.id)}
    />
  {/each}
</div>
<button on:click={() => ($audio.paused ? audio.play() : audio.pause())}
  >{$audio.paused ? 'Play' : 'Pause'}</button
>
<p>Current time: {$audio.currentTime}</p>

<style>
  .tracks {
    display: flex;
    gap: 2rem;
  }
</style>
