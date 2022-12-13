import type { Track } from '@prisma/client';
import { Howl } from 'howler';
import { writable } from 'svelte/store';

function createTrackStore() {
  const { subscribe, update } = writable({
    currentTime: 0,
    paused: true,
    tracks: [] as Track[],
    _howls: new Map<number, Howl>()
  });

  return {
    subscribe,
    play: () =>
      update((state) => {
        state._howls.forEach((howl) => howl.play());
        return { ...state, paused: false };
      }),
    pause: () =>
      update((state) => {
        state._howls.forEach((howl) => howl.pause());
        return { ...state, paused: true };
      }),
    // setCurrentTime: (currentTime: number) => update((state) => ({ ...state, currentTime })),
    setTracks: (tracks: Track[]) =>
      update((state) => {
        Howler.stop();
        state._howls.clear();
        const someSoloed = tracks.some(({ soloed }) => soloed);
        tracks.forEach(({ id, src, muted, pan, soloed, volume }) => {
          const howl = new Howl({
            src,
            mute: muted || (someSoloed && !soloed),
            volume
          });
          howl.stereo(pan);
          state._howls.set(id, howl);
        });
        return { ...state, tracks };
      }),
    setVolume: (trackId: number, volume: number) =>
      update((state) => {
        const howl = state._howls.get(trackId);
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
      })
    // toggleMute: (trackId: number) =>
    //   update((state) => ({
    //     ...state,
    //     tracks: state.tracks.map((track) =>
    //       track.id === trackId
    //         ? {
    //             ...track,
    //             muted: !track.muted
    //           }
    //         : track
    //     )
    //   })),
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
