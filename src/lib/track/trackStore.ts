import type { Track } from '@prisma/client';
import { Howl } from 'howler';
import { writable } from 'svelte/store';

function createTrackStore() {
  const { subscribe, update } = writable({
    currentTime: 0,
    paused: true,
    tracks: [] as Track[]
  });

  const howls = new Map<number, Howl>();

  function trackCurrentTime() {
    const firstHowl: Howl = howls.values().next().value;
    update((state) => ({
      ...state,
      currentTime: firstHowl?.seek() ?? 0
    }));
    if (firstHowl?.playing()) {
      requestAnimationFrame(trackCurrentTime);
    }
  }

  return {
    subscribe,
    play: () =>
      update((state) => {
        howls.forEach((howl) => howl.play());
        return { ...state, paused: false };
      }),
    pause: () =>
      update((state) => {
        howls.forEach((howl) => howl.pause());
        return { ...state, paused: true };
      }),
    setCurrentTime: (currentTime: number) =>
      update((state) => {
        howls.forEach((howl) => howl.seek(currentTime));
        return { ...state, currentTime };
      }),
    setTracks: (tracks: Track[]) =>
      update((state) => {
        Howler.stop();
        howls.clear();
        if (tracks.length) {
          const someSoloed = tracks.some(({ soloed }) => soloed);
          tracks.forEach(({ id, src, muted, pan, soloed, volume }) => {
            const howl = new Howl({
              src,
              mute: muted || (someSoloed && !soloed),
              volume
            });
            howl.stereo(pan);
            howls.set(id, howl);
          });
          const firstHowl: Howl = howls.values().next().value;
          firstHowl.on('play', trackCurrentTime);
        }
        return { ...state, tracks };
      }),
    setVolume: (trackId: number, volume: number) =>
      update((state) => {
        const howl = howls.get(trackId);
        if (!howl) {
          throw Error(`Could not find howl under track ID ${trackId}`);
        }
        howl.volume(volume);
        return {
          ...state,
          tracks: state.tracks.map((t) =>
            t.id === trackId
              ? {
                  ...t,
                  volume
                }
              : t
          )
        };
      }),
    toggleMute: (trackId: number, muted?: boolean) =>
      update((state) => {
        const howl = howls.get(trackId);
        if (!howl) {
          throw Error(`Could not find howl under track ID ${trackId}`);
        }
        howl.mute(muted ?? !howl.mute());
        return {
          ...state,
          tracks: state.tracks.map((track) =>
            track.id === trackId
              ? {
                  ...track,
                  muted: !track.muted
                }
              : track
          )
        };
      })
    // toggleSolo: (trackId: number) =>
    //   update((state) => ({
    //     ...state,
    //     tracks: state.tracks.map((track) =>
    //       track.id === trackId
    //         ? {
    //             ...track,
    //             soloed: !track.soloed
    //           }
    //         : track
    //     )
    //   }))
  };
}

export const trackStore = createTrackStore();
