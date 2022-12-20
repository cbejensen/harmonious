<script lang="ts">
  import Track from './Track.svelte';
  import { isSomeSoloed, songStore } from '../songStore';

  function formatTime(timeInSeconds: number) {
    const minutes = Math.floor(timeInSeconds / 60);
    let seconds: string | number = Math.floor(timeInSeconds % 60);
    if (seconds < 10) seconds = '0' + seconds;

    return `${minutes}:${seconds}`;
  }
</script>

{#if $songStore.tracks.length}
  <div class="flex justify-center gap-2">
    {#each $songStore.tracks as { id, muted, name, pan, soloed, type, volume }}
      <Track
        {muted}
        {name}
        {pan}
        {soloed}
        {type}
        {volume}
        implicitlyMuted={isSomeSoloed($songStore.tracks) && !soloed}
        on:toggleMute={() => songStore.toggleMute(id, !muted)}
        on:toggleSolo={() => songStore.toggleSolo(id, !soloed)}
        on:volumeChange={({ detail }) => songStore.setVolume(id, detail)}
        on:pan={({ detail }) => songStore.setPan(id, detail)}
      />
    {/each}
  </div>
{/if}
<button on:click={$songStore.paused ? songStore.play : songStore.pause} type="button"
  >{$songStore.paused ? 'Play' : 'Pause'}</button
>

{#if $songStore.duration}
  <p>Current time: {formatTime($songStore.currentTime)}</p>
  <p>Duration: {formatTime($songStore.duration)}</p>
  <input
    name="seek through the song by changing the playback position"
    type="range"
    value={$songStore.currentTime}
    min={0}
    max={$songStore.duration}
    step={0.01}
    on:input={(e) => songStore.setCurrentTime(parseFloat(e.currentTarget.value))}
  />
{/if}
