<script lang="ts">
  import type { Track as TrackType } from '@prisma/client';
  import Track from './Track.svelte';
  import { onMount } from 'svelte';

  export let tracks: TrackType[];

  let audioCtx: AudioContext;
  let audioEls: NodeListOf<HTMLAudioElement>;
  let paused = true;
  console.log(paused);
  let currentTime = 0;

  onMount(() => {
    audioCtx = new AudioContext();
    audioEls = document.querySelectorAll('.track');
    audioEls.forEach((el) => {
      const track = audioCtx.createMediaElementSource(el);
      track.connect(audioCtx.destination);
    });
  });

  function togglePlay() {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    paused = !paused;
  }

  $: someSoloed = tracks.some((track) => track.soloed);
</script>

<div class="tracks">
  {#each tracks as track}
    <audio
      class="track"
      src={track.url}
      bind:paused
      muted={track.muted || (someSoloed && !track.soloed)}
    />
    <Track
      {track}
      implicitlyMuted={someSoloed}
      on:toggleMute={() => (track.muted = !track.muted)}
      on:toggleSolo={() => (track.soloed = !track.soloed)}
    />
  {/each}
</div>
<button on:click={togglePlay} type="button">{paused ? 'Play' : 'Pause'}</button>
<p>Current time: {currentTime}</p>

<style>
  .tracks {
    display: flex;
    gap: 2rem;
  }
</style>
