<script>
  import { page } from '$app/stores';
</script>

<header class="bg-gray-300 border-b">
  <nav>
    <ul>
      <!-- <li class:active={$page.url.pathname === '/'}>
        <a data-sveltekit-prefetch href="/">Home</a>
      </li> -->
      <li class="hover:text-orange-800" class:active={$page.url.pathname === '/songs'}>
        <a data-sveltekit-prefetch href="/songs">Songs</a>
      </li>
    </ul>
  </nav>
</header>

<style>
  nav {
    margin: auto;
    display: flex;
    justify-content: center;
  }

  ul {
    position: relative;
    padding: 0;
    margin: 0;
    height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
  }

  li {
    position: relative;
    height: 100%;
  }

  li.active::before {
    --size: 6px;
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: calc(50% - var(--size));
    border: var(--size) solid transparent;
    border-top: var(--size) solid var(--accent-color);
  }

  nav a {
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 1em;
    color: var(--heading-color);
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
    transition: color 0.2s linear;
  }

  a:hover {
    color: var(--accent-color);
  }
</style>
