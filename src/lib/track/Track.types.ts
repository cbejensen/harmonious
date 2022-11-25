import type { Track as DbTrack } from '../server/db';

/**
 * A track can be both soloed and muted at the same time.
 * If a track is soloed, `mute` does not become `true` on every non-soloed
 * track, even though they will stop making sound.
 */
export interface Track extends DbTrack {
  volume: number;
  muted: boolean;
  soloed: boolean;
}
