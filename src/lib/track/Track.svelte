<script lang="ts">
  // import type { Track } from '@prisma/client';
  import { createEventDispatcher } from 'svelte';

  // export let track: Track;
  // export let implicitlyMuted = false;
  export let name: string;
  export let volume = 0.5;

  const dispatch = createEventDispatcher<{ setVolume: number }>();

  function setVolume(e: Event) {
    dispatch('setVolume', parseFloat((e.target as HTMLInputElement).value));
  }
</script>

<section class="wrap">
  <div role="heading" class="name">{name}</div>
  <input
    aria-orientation="vertical"
    aria-label={`Volume for ${name}`}
    value={volume}
    min={0}
    max={1}
    step={0.01}
    on:input={setVolume}
    orient="vertical"
    type="range"
    {name}
  />
  <!-- <button
    class="modifier mute"
    on:click={() => dispatch('toggleMute')}
    class:active={track.muted}
    class:active-implicit={implicitlyMuted}>Mute</button
  >
  <button class="modifier solo" on:click={() => dispatch('toggleSolo')} class:active={track.soloed}
    >Solo</button
  > -->
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
