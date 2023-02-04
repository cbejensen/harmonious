<script lang="ts">
  import Track from './Track.svelte';
  import { isSomeSoloed, songStore } from '../songStore';
</script>

{#if $songStore.tracks.length}
  <div class="flex justify-center gap-2 overflow-scroll pb-[16px]">
    {#each $songStore.tracks as { id, muted, name, pan, soloed, volume }, i}
      <Track
        {muted}
        {name}
        {pan}
        {soloed}
        {volume}
        implicitlyMuted={isSomeSoloed($songStore.tracks) && !soloed}
        on:toggleMute={() => songStore.toggleMute(id, !muted)}
        on:toggleSolo={() => songStore.toggleSolo(id, !soloed)}
        on:volumeChange={({ detail }) => songStore.setVolume(id, detail)}
        on:pan={({ detail }) => songStore.setPan(id, detail)}
      />
      {#if i < $songStore.tracks.length - 1}
        <hr class="border-gray-300 border-r h-auto" />
      {/if}
    {/each}
  </div>
{/if}
