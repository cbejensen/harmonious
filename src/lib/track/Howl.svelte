<script context="module" lang="ts">
  import { Howl } from 'howler';
  export const howls = new Map<string | number, Howl>();

  export function setCurrentTime(time: number) {
    howls.forEach((howl) => howl.seek(time));
  }
</script>

<script lang="ts">
  let howl: Howl;
  export let id: string | number;
  export let src: string;

  $: {
    console.log('setting howl ', id);
    howl = new Howl({ src });
    howls.delete(id);
    howls.set(id, howl);
  }

  // export let implicitlyMuted = false;
  // export let muted: boolean;
  // export let name: string;
  // export let pan: number;
  // export let soloed: boolean;
  // export let type: string;
  // export let paused: boolean;
  // export let volume = 0.5;

  // $: track.volume(volume);
  // $: track.seek(currentTime);
  // $: if (paused && track.playing()) {
  //   track.pause();
  // } else if (!paused && !track.playing()) {
  //   console.log(track);
  //   track.play();
  // }
  // $: if (!soloed && (muted || implicitlyMuted)) {
  //   console.log(soloed, muted, implicitlyMuted);
  //   track.mute(true);
  // } else {
  //   console.log(soloed, muted, implicitlyMuted);
  //   track.mute(false);
  // }
</script>

<slot {howl} />
