import type { Track } from '../track/Track.types';
import { writable } from 'svelte/store';

function createAudio() {
  const { subscribe, update } = writable({
    currentTime: 0,
    paused: true,
    soloedTrackIds: new Set<number>(),
    tracks: [] as Track[]
  });

  return {
    subscribe,
    play: () => update((state) => ({ ...state, paused: false })),
    pause: () => update((state) => ({ ...state, paused: true })),
    setCurrentTime: (currentTime: number) => update((state) => ({ ...state, currentTime })),
    setTracks: (tracks: Track[]) => update((state) => ({ ...state, tracks })),
    toggleMute: (trackId: number) =>
      update((state) => ({
        ...state,
        tracks: state.tracks.map((track) =>
          track.id === trackId
            ? {
                ...track,
                muted: !track.muted
              }
            : track
        )
      })),
    toggleSolo: (trackId: number) =>
      update((state) => ({
        ...state,
        tracks: state.tracks.map((track) =>
          track.id === trackId
            ? {
                ...track,
                soloed: !track.soloed
              }
            : track
        )
      }))
  };
}

export const audio = createAudio();
