<script lang="ts">
  import type { Track } from './Track.types';
  import { createEventDispatcher, onMount } from 'svelte';

  export let track: Track;
  export let implicitlyMuted = false;

  const dispatch = createEventDispatcher();

  let audio: HTMLAudioElement;
  onMount(() => {
    audio = new Audio(track.url ?? undefined);
  });
</script>

<section class="wrap" class:muted={track.muted}>
  <div role="heading" class="name">{track.name}</div>
  <input
    orient="vertical"
    aria-orientation="vertical"
    aria-label={`Volume for ${track.name}`}
    type="range"
    name={track.name}
    bind:value={track.volume}
  />
  <button
    class="modifier mute"
    on:click={() => dispatch('toggleMute')}
    class:active={track.muted}
    class:active-implicit={implicitlyMuted}>Mute</button
  >
  <button class="modifier solo" on:click={() => dispatch('toggleSolo')} class:active={track.soloed}
    >Solo</button
  >
</section>

<style>
  section {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    width: 6rem;
  }
  .name {
    overflow: hidden;
    overflow-wrap: anywhere;
    text-align: center;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  input[type='range'] {
    -webkit-appearance: slider-vertical;
  }
  .modifier {
    padding: 0.5rem;
    font-size: 1rem;
    width: 100%;
    background: none;
    border: 1px solid var(--color);
    color: var(--color);
  }
  .modifier.mute {
    --color: steelblue;
  }
  .modifier.solo {
    --color: goldenrod;
  }
  .modifier.active {
    background-color: var(--color);
    color: white;
  }
  .modifier.active-implicit {
    --color: gray;
  }
</style>
