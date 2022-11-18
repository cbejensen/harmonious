<script>
  import Header from '$lib/header/Header.svelte';
  import '../app.css';
</script>

<div class="layout">
  <Header />

  <main>
    <slot />
  </main>
</div>

<style>
  .layout {
    display: flex;
    flex-direction: column;
  }
  main {
    flex: 1;
    padding: 1rem;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
  }
</style>
