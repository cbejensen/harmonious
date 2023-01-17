<script lang="ts">
  function formatTime(timeInSeconds: number) {
    if (Number.isNaN(timeInSeconds)) {
      return '--:--';
    }
    const minutes = Math.floor(timeInSeconds / 60);
    let seconds: string | number = Math.floor(timeInSeconds % 60);
    if (seconds < 10) seconds = '0' + seconds;

    return `${minutes}:${seconds}`;
  }

  import { songStore } from '../songStore';

  let seekTime: number | null = null;
</script>

<div>
  <div class="absolute top-10 bg-gray-300 w-full h-10" />
  <button
    class="relative grid place-content-center m-auto w-20 h-20 bg-gray-700 text-white rounded-full border-4 border-white"
    on:click={$songStore.paused ? songStore.play : songStore.pause}
    type="button">{$songStore.paused ? 'Play' : 'Pause'}</button
  >
  <div class="flex items-center gap-2 px-4 h-10 bg-gray-300">
    <div class="text-right w-[60px]" aria-label="current song position">
      {formatTime(seekTime ?? $songStore.currentTime)}
    </div>
    <input
      class="flex-1"
      name="seek through the song by changing the playback position"
      type="range"
      value={seekTime ?? $songStore.currentTime}
      min={0}
      max={$songStore.duration}
      step={0.01}
      on:mousedown={() => {
        seekTime = $songStore.currentTime;
      }}
      on:mouseup={(e) => {
        seekTime = null;
        songStore.setCurrentTime(parseFloat(e.currentTarget.value));
      }}
      on:input={(e) => {
        seekTime = parseFloat(e.currentTarget.value);
      }}
      on:keydown={(e) => {
        if (e.key === 'ArrowLeft') {
          songStore.setCurrentTime(Math.max(parseFloat(e.currentTarget.value) - 5, 0));
        } else if (e.key === 'ArrowRight') {
          songStore.setCurrentTime(
            Math.min(parseFloat(e.currentTarget.value) + 5, $songStore.duration)
          );
        }
      }}
    />
    <div class="w-[60px]" aria-label="song duration">{formatTime($songStore.duration)}</div>
  </div>
</div>
