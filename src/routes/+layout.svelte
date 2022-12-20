<script>
  import Header from '$lib/header/Header.svelte';
  import '../app.css';
</script>

<div class="h-full flex flex-col">
  <Header />

  <main class="flex-1">
    <slot />
  </main>

  <footer class="border-t p-2 text-center">Harmonious</footer>
</div>
