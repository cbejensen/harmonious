<script lang="ts">
  import { renderAbc, TimingCallbacks, type TuneObject } from 'abcjs';
  import { onMount, onDestroy } from 'svelte';

  import { songStore } from '../songStore';

  let abcjsInstance: TuneObject | undefined;
  let timingCallbacks: TimingCallbacks | undefined;

  onMount(() => {
    abcjsInstance = renderAbc('notation', notation, {
      selectTypes: false,
      staffwidth: 800,
      responsive: 'resize',
      wrap: { minSpacing: 1.8, maxSpacing: 2.7, preferredMeasuresPerLine: 4 }
    })[0];
    timingCallbacks = new TimingCallbacks(abcjsInstance, {
      eventCallback: (ev) => {
        if (ev) {
          // Not sure if the typing is just wrong or what, but this appears to be an array of arrays.
          // I assume this is because we have multiple voices, and each voice can have multiple notes
          // in a single chord.
          highlightElements(ev.elements as unknown as HTMLElement[][]);
        }
      }
    });
    if (!$songStore.paused) {
      timingCallbacks.start($songStore.currentTime, 'seconds');
    }
  });

  onDestroy(() => {
    timingCallbacks?.stop();
  });

  let prevPaused: boolean | undefined;
  $: if ($songStore.paused && !prevPaused) {
    prevPaused = true;
    timingCallbacks?.stop();
  } else if (!$songStore.paused && prevPaused !== false) {
    prevPaused = false;
    timingCallbacks?.start($songStore.currentTime, 'seconds');
  }

  // Update highlighted notation when `currentTime` changes (e.g. user seeks through song)
  let lastCurrentTimeSet: number | undefined;
  $: if (
    $songStore.lastCurrentTimeSet !== undefined &&
    $songStore.lastCurrentTimeSet !== lastCurrentTimeSet
  ) {
    lastCurrentTimeSet = $songStore.lastCurrentTimeSet;
    timingCallbacks?.[$songStore.paused ? 'setProgress' : 'start'](
      $songStore.lastCurrentTimeSet,
      'seconds'
    );
  }

  function highlightElements(voiceEls: HTMLElement[][]) {
    document
      .querySelectorAll('.abcjs-highlighted')
      .forEach((el) => el.classList.remove('abcjs-highlighted'));
    voiceEls.forEach((chordEls) => {
      chordEls.forEach((noteEl) => {
        noteEl.classList.add('abcjs-highlighted');
      });
    });
  }

  const {
    arrangement: { key, tempo, timeSignature },
    tracks
  } = $songStore;

  $: trackNotation = tracks
    .map((track, i) => {
      if (!track.notation) {
        return;
      }
      return [
        `V:${i} name="${track.name}" sname="${track.shortName ?? track.name.slice(0, 3)}" clef="${
          track.clef
        }"`,
        track.notation
      ].join('\n');
    })
    .join('\n')
    .trim();

  $: notation = [`X:1`, `M:${timeSignature}`, `Q:${tempo}`, `K:${key}`, trackNotation].join('\n');
</script>

<div class="wrap">
  <div class="notation" id="notation" />
</div>

<style>
  .wrap {
    margin: auto;
    max-width: 1000px;
  }

  /* Override obnoxious styling from abcjs, which applies them as inline styles */
  /* .notation.horizontal {
    display: block !important;
    overflow-x: auto !important;
  } */

  :global(.notation > svg) {
    margin: auto;
  }

  /* :global(.notation.horizontal > svg) {
    max-width: none !important;
  } */

  :global(.abcjs-highlighted) {
    fill: goldenrod;
  }
</style>
