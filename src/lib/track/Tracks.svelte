<script lang="ts">
  import type { Track as TrackType } from '@prisma/client';
  import Track from './Track.svelte';
  import { onMount } from 'svelte';

  export let tracks: TrackType[];

  let audioCtx: AudioContext | undefined;
  let audioEls: NodeListOf<HTMLAudioElement> | undefined;
  let paused = true;

  let currentTime = 0;
  $: duration = audioEls?.[0].duration;

  function formatTime(timeInSeconds: number) {
    const minutes = Math.floor(timeInSeconds / 60);
    let seconds: string | number = Math.floor(timeInSeconds % 60);
    if (seconds < 10) seconds = '0' + seconds;

    return `${minutes}:${seconds}`;
  }

  onMount(() => {
    audioCtx = new AudioContext();
    audioEls = document.querySelectorAll('.track');
    audioEls.forEach((el) => {
      const track = audioCtx!.createMediaElementSource(el);
      track.connect(audioCtx!.destination);
    });
  });

  function togglePlay() {
    if (audioCtx?.state === 'suspended') {
      audioCtx.resume();
    }
    paused = !paused;
  }

  $: someSoloed = tracks.some((track) => track.soloed);
</script>

<div class="tracks">
  {#each tracks as track, i}
    {#if i === 0}
      <!-- content here -->
      <audio
        class="track"
        src={track.url}
        bind:paused
        bind:currentTime
        muted={track.muted || (someSoloed && !track.soloed)}
      />
    {:else}
      <audio
        class="track"
        src={track.url}
        bind:paused
        {currentTime}
        muted={track.muted || (someSoloed && !track.soloed)}
      />
    {/if}
    <Track
      {track}
      implicitlyMuted={someSoloed && !track.soloed}
      on:toggleMute={() => (track.muted = !track.muted)}
      on:toggleSolo={() => (track.soloed = !track.soloed)}
    />
  {/each}
</div>
<button on:click={togglePlay} type="button">{paused ? 'Play' : 'Pause'}</button>
<p>Current time: {formatTime(currentTime)}</p>
{#if duration}
  <p>Duration: {formatTime(duration)}</p>
  <input
    type="range"
    name="seek song"
    bind:value={currentTime}
    min={0}
    max={duration}
    step={0.01}
  />
{/if}

<style>
  .tracks {
    display: flex;
    gap: 2rem;
  }
</style>
