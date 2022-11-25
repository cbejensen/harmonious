<script lang="ts">
  import type { Track } from './Track.types';
  import { createEventDispatcher, onMount } from 'svelte';

  export let track: Track;

  const dispatch = createEventDispatcher();

  let audio: HTMLAudioElement;
  onMount(() => {
    audio = new Audio(track.url ?? undefined);
  });
</script>

<div class="wrap">
  {track.name}
  <input
    class="volume"
    aria-label={`Volume for ${track.name}`}
    type="range"
    name={track.name}
    bind:value={track.volume}
    min={0}
    max={1}
    step={0.01}
  />
  <button class="mute" on:click={() => dispatch('toggleMute')} class:active={track.muted}>M</button>
  <button class="solo" on:click={() => dispatch('toggleSolo')} class:active={track.soloed}>S</button
  >
</div>

<style>
  .wrap {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
  }
  button {
    border: none;
    color: white;
    padding: 0.5rem;
    font-size: 1rem;
  }
  .mute {
    background-color: blue;
  }
  .solo {
    background-color: goldenrod;
  }
  .active {
    color: red;
  }
</style>
