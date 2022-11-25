<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

{#if data}
  <ul>
    {#each data.songs as song}
      <li><a href={`/songs/${song.id}`}>{song.name}</a></li>
    {/each}
  </ul>
{:else}
  <p>loading...</p>
{/if}
