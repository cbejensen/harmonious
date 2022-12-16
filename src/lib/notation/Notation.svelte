<script lang="ts">
  import type { Arrangement, Track } from '@prisma/client';
  import abcjs from 'abcjs';
  import { onMount } from 'svelte';
  // import { trackStore } from '../track/trackStore';

  export let arrangement: Arrangement & { tracks: Track[] };

  let mounted = false;
  let viewMode: 'horizontal' | 'vertical' = 'horizontal';
  $: if (mounted) {
    if (viewMode === 'vertical') {
      abcjs.renderAbc('notation', notation, {
        responsive: 'resize'
      })[0];
    } else {
      abcjs.renderAbc('notation', notation);
    }
  }

  onMount(() => {
    mounted = true;
  });

  let notation: string;
  $: {
    const trackNotation = arrangement.tracks
      .map((track, i) => {
        if (!track.notation) {
          return;
        }
        const trackNotation = track.notation
          .split('\\n')
          .join(viewMode === 'horizontal' ? '' : '\n');
        return `
V:${i} name="${track.name}" sname="${track.shortName ?? track.name.slice(0, 3)}" clef="${
          track.clef
        }"
[L:${track.defaultNoteLength}]${trackNotation}`;
      })
      .join('')
      .trim();
    notation = `
X:1
T:${arrangement.name}
M:${arrangement.timeSignature}
Q:${arrangement.tempo}
K:${arrangement.key}
${trackNotation}
`;
    console.log(notation);
  }
</script>

<fieldset>
  <label>
    <input type="radio" bind:group={viewMode} value="horizontal" /> Horizontal
  </label>
  <label>
    <input type="radio" bind:group={viewMode} value="vertical" /> Vertical
  </label>
</fieldset>

<div class={`notation ${viewMode}`} id="notation" />

<style>
  .notation.horizontal {
    /* Override obnoxious styling from abcjs, which applies them as inline styles */
    display: block !important;
    overflow-x: auto !important;
  }
  :global(.notation.horizontal > svg) {
    max-width: none !important;
  }
</style>
