import type { Track } from '../track/Track.types';
import { writable } from 'svelte/store';

function createAudio() {
  const { subscribe, update } = writable({
    soloedTrackIds: new Set<number>(),
    tracks: [] as Track[],
    currentTime: 0
  });

  return {
    subscribe,
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
      }))
  };
}

export const audio = createAudio();
