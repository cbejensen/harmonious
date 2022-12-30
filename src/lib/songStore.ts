import type { Arrangement, Track } from '@prisma/client';
import { Howl } from 'howler';
import { writable } from 'svelte/store';

export interface SongState {
  currentTime: number;
  duration: number;
  /** Map of ID's that have loaded (true) or failed to load (false) */
  loaded: Record<number, boolean>;
  name: string;
  paused: boolean;
  tracks: Track[];
  arrangement: Omit<Arrangement, 'id' | 'songId'>;
}

const defaultArrangement: Omit<Arrangement, 'id' | 'songId'> = {
  author: '',
  key: 'C',
  lyrics: '',
  name: '',
  sequence: [],
  tempo: 120,
  timeSignature: '4/4'
};

function createSongStore() {
  const { subscribe, update } = writable<SongState>({
    arrangement: defaultArrangement,
    currentTime: 0,
    duration: 0,
    loaded: {},
    name: '',
    paused: true,
    tracks: []
  });

  const howls = new Map<number, Howl>();

  function watchCurrentTime() {
    const firstHowl: Howl = howls.values().next().value;
    function advanceTime() {
      update((state) => ({
        ...state,
        currentTime: firstHowl?.seek() ?? 0
      }));
      if (firstHowl?.playing()) {
        requestAnimationFrame(advanceTime);
      }
    }
    firstHowl.on('play', advanceTime);
  }

  function watchDuration() {
    howls.forEach((howl, trackId) => {
      howl.on('load', () => {
        update((state) => ({ ...state, loaded: { ...state.loaded, [trackId]: true } }));
        updateDuration();
      });
      howl.on('loaderror', () => {
        update((state) => ({ ...state, loaded: { ...state.loaded, [trackId]: false } }));
      });
    });
  }

  function watchEnd() {
    const firstHowl: Howl = howls.values().next().value;
    firstHowl.on('end', () =>
      update((state) => ({
        ...state,
        paused: true
      }))
    );
  }

  function createHowls(tracks: Track[]) {
    const someSoloed = isSomeSoloed(tracks);
    update((state) => ({ ...state, loading: true }));
    tracks.forEach(({ id, src, muted, pan, soloed, volume }) => {
      if (src) {
        const howl = new Howl({
          src,
          mute: muted || (someSoloed && !soloed),
          volume
        });
        howl.stereo(pan);
        howls.set(id, howl);
      }
    });
  }

  function updateDuration() {
    let duration = 0;
    howls.forEach((howl) => {
      if (howl.duration() > duration) {
        duration = howl.duration();
      }
    });
    update((state) => ({ ...state, duration }));
  }

  return {
    subscribe,
    init: (name = 'New Song', arrangement = defaultArrangement, tracks: Track[] = []) =>
      update((state) => {
        Howler.stop();
        howls.clear();
        if (tracks?.length) {
          createHowls(tracks);
          watchDuration();
          watchCurrentTime();
          watchEnd();
        }
        return { ...state, name, arrangement, tracks };
      }),
    play: () => {
      update((state) => {
        if (Math.floor(state.currentTime) === Math.floor(state.duration)) {
          // We're at the end. Play from the beginning.
          howls.forEach((howl) => {
            howl.seek(0);
            howl.play();
          });
          return {
            ...state,
            paused: false,
            currentTime: 0
          };
        }
        howls.forEach((howl) => howl.play());
        return { ...state, paused: false };
      });
    },
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
    setPan: (trackId: number, pan: number) =>
      update((state) => {
        const howl = howls.get(trackId);
        if (!howl) {
          throw Error(`Could not find howl under track ID ${trackId}`);
        }
        howl.stereo(pan);
        return {
          ...state,
          tracks: state.tracks.map((t) =>
            t.id === trackId
              ? {
                  ...t,
                  pan
                }
              : t
          )
        };
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
    toggleMute: (trackId: number, shouldMute?: boolean) =>
      update((state) => {
        return {
          ...state,
          tracks: state.tracks.map((track) => {
            if (track.id === trackId) {
              const updatedTrack = {
                ...track,
                muted: shouldMute ?? !track.muted
              };
              const howl = howls.get(trackId);
              if (!howl) {
                throw Error(`Could not find howl under track ID ${trackId}`);
              }
              if (!track.soloed && isSomeSoloed(state.tracks)) {
                return updatedTrack;
              }
              howl.mute(shouldMute ?? !howl.mute());
              return updatedTrack;
            } else {
              return track;
            }
          })
        };
      }),
    toggleSolo: (trackId: number, soloed?: boolean) =>
      update((state) => {
        const tracks = state.tracks.map((track) =>
          track.id === trackId
            ? {
                ...track,
                soloed: soloed ?? !track.soloed
              }
            : track
        );
        const someSoloed = isSomeSoloed(tracks);
        tracks.forEach((track) => {
          const howl = howls.get(track.id);
          if (!howl) return;
          // If at least one track is soloed, all non-soloed tracks should be implicitly muted
          // (that is, the track makes no sound, regardless of the state of the mute button).
          if (track.soloed || !someSoloed) {
            howl.mute(track.muted);
          } else {
            // At least one track is soloed, but this one isn't, so it should be muted.
            howl.mute(true);
          }
        });
        return { ...state, tracks };
      })
  };
}

export function isSomeSoloed(tracks: Track[]) {
  return tracks.some((track) => track.soloed);
}

export const songStore = createSongStore();
