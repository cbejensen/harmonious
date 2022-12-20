<script lang="ts">
  import Track from './Track.svelte';
  import { isSomeSoloed, songStore } from '../songStore';
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
