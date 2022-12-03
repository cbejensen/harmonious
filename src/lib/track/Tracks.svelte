<script lang="ts">
  import type { Track as TrackType } from '@prisma/client';
  import Track from './Track.svelte';
  import { onMount } from 'svelte';
  import { Howl, Howler } from 'howler';

  export let tracks: TrackType[];

  function formatTime(timeInSeconds: number) {
    const minutes = Math.floor(timeInSeconds / 60);
    let seconds: string | number = Math.floor(timeInSeconds % 60);
    if (seconds < 10) seconds = '0' + seconds;

    return `${minutes}:${seconds}`;
  }
  // $: someSoloed = tracks.some((track) => track.soloed);

  const howls: Record<number, Howl> = {};
  let duration = 0;
  let paused = true;
  let currentTime = 0;

  let howlsLoaded = false;
  $: if (howlsLoaded) {
    duration = Object.values(howls).reduce((longest, howl) => {
      const dur = howl.duration();
      return dur > longest ? dur : longest;
    }, 0);
  }

  onMount(() => {
    let loadedCount = 0;
    tracks.forEach((track) => {
      howls[track.id] = new Howl({
        src: [track.url ?? ''],
        preload: true,
        volume: 0.5,
        onload: () => {
          loadedCount++;
          if (loadedCount === tracks.length) {
            howlsLoaded = true;
          }
        }
      });
    });
  });

  function play() {
    Object.values(howls).forEach((howl) => (howl.playing() ? null : howl.play()));
    paused = false;
  }
  function pause() {
    Object.values(howls).forEach((howl) => howl.pause());
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
  function setCurrentTime(e) {
    currentTime = parseFloat(e.target.value);
    Object.values(howls).forEach((howl) => {
      howl.seek(currentTime);
    });
  }
</script>

{#if howlsLoaded}
  <div class="tracks">
    {#each tracks as track}
      <Track
        name={track.name}
        volume={howls[track.id].volume()}
        on:setVolume={(volume) => howls[track.id].volume(volume.detail)}
      />
      <!-- <Track
				 {track}
				 implicitlyMuted={someSoloed && !track.soloed}
				 on:toggleMute={() => (track.muted = !track.muted)}
				 on:toggleSolo={() => (track.soloed = !track.soloed)}
			 /> -->
    {/each}
  </div>
{/if}
<button on:click={startOver} type="button">Start Over</button>
<button on:click={paused ? play : pause} type="button">{paused ? 'Play' : 'Paused'}</button>
<p>Current time: {formatTime(currentTime)}</p>

{#if duration}
  <p>Duration: {formatTime(duration)}</p>
  <input
    type="range"
    name="seek song"
    min={0}
    max={duration}
    step={0.01}
    value={currentTime}
    on:change={setCurrentTime}
  />
{/if}

<style>
  .tracks {
    display: flex;
    gap: 2rem;
  }
</style>
