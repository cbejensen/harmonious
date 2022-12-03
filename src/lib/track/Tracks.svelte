<script lang="ts">
  import type { Track as TrackType } from '@prisma/client';
  // import Track from './Track.svelte';
  import { onMount } from 'svelte';
  import { Howl } from 'howler';

  export let tracks: TrackType[];

  // let audioCtx: AudioContext;
  // let trackEls: NodeListOf<HTMLAudioElement>;
  // let paused = true;

  // let currentTime = 0;
  // $: duration = trackEls?.[0].duration;

  function formatTime(timeInSeconds: number) {
    const minutes = Math.floor(timeInSeconds / 60);
    let seconds: string | number = Math.floor(timeInSeconds % 60);
    if (seconds < 10) seconds = '0' + seconds;

    return `${minutes}:${seconds}`;
  }
  // $: someSoloed = tracks.some((track) => track.soloed);

  let howls: Howl[];
  let duration = 0;
  let paused = true;

  onMount(() => {
    howls = tracks.map((track) => new Howl({ src: [track.url ?? ''] }));
    duration = howls.reduce((longest, howl) => {
      const dur = howl.duration();
      return dur > longest ? dur : longest;
    }, 0);
    console.log(duration);
  });

  function play() {
    howls.forEach((howl) => (howl.playing() ? null : howl.play()));
    paused = false;
  }
  function pause() {
    howls.forEach((howl) => howl.pause());
    paused = true;
  }
  function startOver() {
    if (paused) {
      Howler.stop();
    } else {
      Howler.stop();
      play();
    }
  }
</script>

<!-- <div class="tracks">
  {#each tracks as track}
    <audio class="track" src={track.url} />
    <Track
      {track}
      implicitlyMuted={someSoloed && !track.soloed}
      on:toggleMute={() => (track.muted = !track.muted)}
      on:toggleSolo={() => (track.soloed = !track.soloed)}
    />
  {/each}
</div> -->
<button on:click={startOver} type="button">Start Over</button>
<button on:click={paused ? play : pause} type="button">{paused ? 'Play' : 'Paused'}</button>
<!-- <p>Current time: {formatTime(currentTime)}</p> -->

{#if duration}
  <p>Duration: {formatTime(duration)}</p>
  <input type="range" name="seek song" min={0} max={duration} step={0.01} />
{/if}

<style>
  .tracks {
    display: flex;
    gap: 2rem;
  }
</style>
