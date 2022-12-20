<script lang="ts">
  import abcjs, { TimingCallbacks } from 'abcjs';
  import { onMount } from 'svelte';
  // import { songStore } from '../track/songStore';

  import { songStore } from '../songStore';

  let mounted = false;
  let viewMode: 'horizontal' | 'vertical' = 'vertical';
  let timingCallbacks: TimingCallbacks | undefined;
  $: if (mounted) {
    const abcjsInstance = abcjs.renderAbc(
      'notation',
      notation,
      viewMode === 'vertical'
        ? {
            responsive: 'resize'
          }
        : undefined
    )[0];

    timingCallbacks = new abcjs.TimingCallbacks(abcjsInstance, {
      eventCallback: (ev) => {
        if (ev) {
          // Not sure if the typing is just wrong or what, but this appears to be an array of arrays.
          // I assume this is because we have multiple voices, and each voice can have multiple notes
          // in a single chord.
          highlightElements(ev.elements as unknown as HTMLElement[][]);
        }
      },
      extraMeasuresAtBeginning: 1
    });

    function highlightElements(voiceEls: HTMLElement[][]) {
      document
        .querySelectorAll('.abcjs-highlighted')
        .forEach((el) => el.classList.remove('abcjs-highlighted'));
      voiceEls.forEach((chordEls) => {
        chordEls.forEach((noteEl) => {
          console.log(noteEl);
          noteEl.classList.add('abcjs-highlighted');
        });
      });
    }
  }

  onMount(() => {
    mounted = true;
  });

  let notation: string;
  $: {
    const {
      arrangement: { key, tempo, timeSignature },
      name,
      tracks
    } = $songStore;

    const trackNotation = tracks
      .map((track, i) => {
        if (!track.notation) {
          return;
        }
        const trackNotation = track.notation
          .split('\\n')
          .join(viewMode === 'horizontal' ? '' : '\n');
        return [
          `V:${i} name="${track.name}" sname="${track.shortName ?? track.name.slice(0, 3)}" clef="${
            track.clef
          }"`,
          `[L:${track.defaultNoteLength}]${trackNotation}`
        ].join('\n');
      })
      .join('\n')
      .trim();

    notation = [`X:1`, `M:${timeSignature}`, `Q:${tempo}`, `K:${key}`, trackNotation].join('\n');
  }
</script>

<!-- <fieldset>
  <label>
    <input type="radio" bind:group={viewMode} value="horizontal" /> Horizontal
  </label>
  <label>
    <input type="radio" bind:group={viewMode} value="vertical" /> Vertical
  </label>
</fieldset> -->

{#if timingCallbacks}
  <button on:click={() => timingCallbacks?.start()}>Start</button>
{/if}

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

  :global(.abcjs-highlighted) {
    fill: goldenrod;
  }
</style>
