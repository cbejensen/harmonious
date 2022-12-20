<script>
  import Header from '$lib/header/Header.svelte';
  import PlaybackControls from '$lib/track/PlaybackControls.svelte';
</script>

<div class="min-h-screen flex flex-col">
  <Header />

  <main class="flex-1 pb-32">
    <slot />
  </main>

  <footer class="fixed bottom-0 w-full">
    <PlaybackControls />
  </footer>
</div>
