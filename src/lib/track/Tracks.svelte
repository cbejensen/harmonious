<script lang="ts">
  import Track from './Track.svelte';
  import { trackStore } from './trackStore';

  function formatTime(timeInSeconds: number) {
    const minutes = Math.floor(timeInSeconds / 60);
    let seconds: string | number = Math.floor(timeInSeconds % 60);
    if (seconds < 10) seconds = '0' + seconds;

    return `${minutes}:${seconds}`;
  }
</script>

{#if $trackStore.tracks.length}
  <div class="tracks">
    {#each $trackStore.tracks as { id, muted, name, pan, soloed, type, volume }}
      <Track
        {muted}
        {name}
        {pan}
        {soloed}
        {type}
        {volume}
        on:volumeChange={({ detail }) => trackStore.setVolume(id, detail)}
      />
    {/each}
  </div>
{/if}
<button on:click={$trackStore.paused ? trackStore.play : trackStore.pause} type="button"
  >{$trackStore.paused ? 'Play' : 'Pause'}</button
>
<p>Current time: {formatTime($trackStore.currentTime)}</p>
<input
  type="range"
  value={$trackStore.currentTime}
  on:input={(e) => trackStore.setCurrentTime(parseFloat(e.currentTarget.value))}
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
