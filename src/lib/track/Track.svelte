<script lang="ts">
  import { Howl } from 'howler';

  // export let track: Track;
  export let implicitlyMuted = false;
  export let currentTime: number;
  export let muted: boolean;
  export let name: string;
  export let pan: number;
  export let soloed: boolean;
  export let src: string;
  export let type: string;
  export let paused: boolean;
  export let volume = 0.5;

  $: track = new Howl({ src });

  $: track.volume(volume);
  $: if (paused && track.playing()) {
    track.pause();
  } else if (!paused && !track.playing()) {
    console.log(track);
    track.play();
  }
  $: if (!soloed && (muted || implicitlyMuted)) {
    console.log(soloed, muted, implicitlyMuted);
    track.mute(true);
  } else {
    console.log(soloed, muted, implicitlyMuted);
    track.mute(false);
  }
</script>

<section class="wrap">
  <div role="heading" class="name">{name}</div>
  <input
    aria-orientation="vertical"
    aria-label={`Volume for ${name}`}
    min={0}
    max={1}
    step={0.01}
    bind:value={volume}
    orient="vertical"
    type="range"
    {name}
  />
  <label class="modifier mute" class:active={muted} class:active-implicit={implicitlyMuted}>
    Mute
    <input
      class="sr-only"
      type="checkbox"
      checked={muted || implicitlyMuted}
      on:change={() => (muted = !muted)}
    />
  </label>
  <label class="modifier solo" class:active={soloed}>
    Solo
    <input class="sr-only" type="checkbox" bind:checked={soloed} />
  </label>
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
