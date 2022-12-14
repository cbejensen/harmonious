<script lang="ts">
  import Track from './Track.svelte';
  import { isSomeSoloed, trackStore } from './trackStore';

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
        implicitlyMuted={isSomeSoloed($trackStore.tracks) && !soloed}
        on:toggleMute={() => trackStore.toggleMute(id, !muted)}
        on:toggleSolo={() => trackStore.toggleSolo(id, !soloed)}
        on:volumeChange={({ detail }) => trackStore.setVolume(id, detail)}
      />
    {/each}
  </div>
{/if}
<button on:click={$trackStore.paused ? trackStore.play : trackStore.pause} type="button"
  >{$trackStore.paused ? 'Play' : 'Pause'}</button
>

{#if $trackStore.duration}
  <p>Current time: {formatTime($trackStore.currentTime)}</p>
  <p>Duration: {formatTime($trackStore.duration)}</p>
  <input
    name="seek through the song by changing the playback position"
    type="range"
    value={$trackStore.currentTime}
    min={0}
    max={$trackStore.duration}
    step={0.01}
    on:input={(e) => trackStore.setCurrentTime(parseFloat(e.currentTarget.value))}
  />
{/if}

<style>
  .tracks {
    display: flex;
    gap: 2rem;
  }
</style>
