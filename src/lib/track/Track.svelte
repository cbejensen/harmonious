<script lang="ts">
  // import { Howl } from 'howler';

  // export let track: Track;
  export let implicitlyMuted = false;
  export let muted: boolean;
  export let name: string;
  export let pan: number;
  export let soloed: boolean;
  export let volume = 0.5;

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{
    toggleMute: undefined;
    toggleSolo: undefined;
    volumeChange: number;
    pan: number;
  }>();
</script>

<section class="wrap">
  <div class="text-ellipsis whitespace-nowrap overflow-hidden w-full text-center font-bold">
    {name}
  </div>
  <input
    aria-orientation="vertical"
    aria-label={`Volume for ${name}`}
    class="volume"
    min={0}
    max={1}
    step={0.01}
    value={volume}
    on:input={(e) => dispatch('volumeChange', parseFloat(e.currentTarget.value))}
    orient="vertical"
    type="range"
    {name}
  />
  <div class="flex gap-1">
    <label
      class="modifier mute w-8 h-8 grid place-content-center"
      class:active={muted}
      class:active-implicit={implicitlyMuted}
    >
      M
      <input
        class="sr-only"
        type="checkbox"
        checked={muted || implicitlyMuted}
        on:change={() => dispatch('toggleMute')}
      />
    </label>
    <label class="modifier solo w-8 h-8 grid place-content-center" class:active={soloed}>
      S
      <input
        class="sr-only"
        type="checkbox"
        checked={soloed}
        on:change={() => dispatch('toggleSolo')}
      />
    </label>
  </div>
  <input
    class="w-full"
    type="range"
    min={-1}
    max={1}
    step={0.01}
    value={pan}
    on:input={(e) => dispatch('pan', parseFloat(e.currentTarget.value))}
  />
</section>

<style>
  section {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    width: 6rem;
  }
  .volume {
    -webkit-appearance: slider-vertical;
    width: 100%;
  }
  .modifier {
    padding: 0.5rem;
    font-size: 1rem;
    text-align: center;
    width: 100%;
    border: 1px solid var(--color);
    color: var(--color);
  }
  .modifier:focus-within {
    outline: 5px auto Highlight;
    outline: 5px auto -webkit-focus-ring-color;
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
