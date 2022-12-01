<script lang="ts">
  import type { PageData } from './$types';
  import Tracks from '$lib/track/Tracks.svelte';

  export let data: PageData;
  const { song } = data;
  const { tracks } = song;
</script>

<h1>{song.name}</h1>

<Tracks {tracks} />

<style>
  h1 {
    margin-bottom: 2rem;
  }
</style>
