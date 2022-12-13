<script lang="ts">
  import type { Track as TrackType } from '@prisma/client';
  import Track from './Track.svelte';
  import { Howler } from 'howler';
  import { onDestroy } from 'svelte';
  import { Howl } from 'howler';
  import { trackStore } from './trackStore';
  // import Howl, { howls } from './Howl.svelte';

  onDestroy(() => Howler.stop());

  const howls = new Map<number, Howl>();
  let isSeeking = false;

  export let tracks: TrackType[] = [];
  $: {
    howls.clear();
    tracks.forEach((track) => howls.set(track.id, new Howl({ src: track.src })));
    if (howls.size) {
      const firstHowl = howls.get(tracks[0].id);
      function trackCurrentTime() {
        if (!isSeeking) {
          currentTime = firstHowl?.seek() ?? 0;
        }
        if (firstHowl?.playing()) {
          requestAnimationFrame(trackCurrentTime);
        }
      }
      firstHowl?.on('play', () => {
        trackCurrentTime();
      });
    }
  }

  let paused = true;
  $: {
    howls.forEach((howl) => (paused ? howl.pause() : howl.play()));
  }

  let currentTime = 0;

  // function startOver() {
  //   if (paused) {
  //     Howler.stop();
  //   } else {
  //     Howler.stop();
  //     play();
  //   }
  // }

  function setCurrentTime(time: string) {
    console.log(time);
    currentTime = parseFloat(time);
    // Not sure why, but we need to stop playback first to avoid a weird bug where
    // it doesn't actually seek until you hit play again.
    Howler.stop();
    howls.forEach((howl) => {
      howl.seek(currentTime);
      howl.play();
    });
  }

  function formatTime(timeInSeconds: number) {
    const minutes = Math.floor(timeInSeconds / 60);
    let seconds: string | number = Math.floor(timeInSeconds % 60);
    if (seconds < 10) seconds = '0' + seconds;

    return `${minutes}:${seconds}`;
  }
  // $: someSoloed = tracks.some((track) => track.soloed);
</script>

{#if $trackStore.tracks.length}
  <div class="tracks">
    {#each $trackStore.tracks as { id, muted, name, pan, soloed, type, volume }}
      <!-- <Howl {id} {src}> -->
      <Track
        {muted}
        {name}
        {pan}
        {soloed}
        {type}
        {volume}
        on:volumeChange={({ detail }) => {
          console.log(detail);

          trackStore.setVolume(id, detail);
        }}
      />
      <!-- </Howl> -->
    {/each}
  </div>
{/if}
<!-- <button on:click={startOver} type="button">Start Over</button> -->
<button on:click={$trackStore.paused ? trackStore.play : trackStore.pause} type="button"
  >{$trackStore.paused ? 'Play' : 'Pause'}</button
>
<p>Current time: {formatTime($trackStore.currentTime)}</p>
<input
  type="range"
  value={$trackStore.currentTime}
  on:change={(e) => trackStore.setCurrentTime(parseFloat(e.currentTarget.value))}
  on:mousedown={() => (isSeeking = true)}
  on:mouseup={() => (isSeeking = false)}
/>

<!-- {#if duration}
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
{/if} -->
<style>
  .tracks {
    display: flex;
    gap: 2rem;
  }
</style>
