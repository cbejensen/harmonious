<script lang="ts">
  import type { Track as TrackState } from '$lib/track/Track.types';
  import type { PageData } from './$types';
  import Tracks from '$lib/track/Tracks.svelte';

  export let data: PageData;
  const { song } = data;

  const tracks = song.tracks.map(
    (track): TrackState => ({
      ...track,
      muted: false,
      soloed: false,
      volume: 1
    })
  );
</script>

<h1>{song.name}</h1>

<Tracks {tracks} />
