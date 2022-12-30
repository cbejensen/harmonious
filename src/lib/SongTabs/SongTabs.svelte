<script lang="ts">
  import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@rgossiaux/svelte-headlessui';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Tracks from '$lib/track/Tracks.svelte';
  import Notation from '$lib/notation/Notation.svelte';
  // import Notation from '$lib/notation/Notation.svelte';

  let activeTabIndex = parseInt($page.url.searchParams.get('tab') ?? '0', 10);
  const tabs = ['Mixer', 'Notation'];
</script>

<TabGroup
  manual
  defaultIndex={activeTabIndex}
  on:change={({ detail: tab }) => {
    const url = new URL($page.url);
    url.searchParams.set('tab', tab);
    goto(url.href, { keepFocus: true, noScroll: true, replaceState: true });
  }}
>
  <TabList class="flex mb-8">
    <div class="flex-1 border-b border-gray-300 " />
    {#each tabs as tab}
      <Tab
        class={({ selected }) =>
          `px-2 py-1 border-gray-300 ${
            selected
              ? 'text-orange-500 border-t border-x rounded-tl-sm rounded-tr-sm'
              : 'text-gray-500 border-b'
          }`}>{tab}</Tab
      >
    {/each}
    <div class="flex-1 border-b border-gray-300 " />
  </TabList>
  <TabPanels>
    <TabPanel>
      <Tracks />
    </TabPanel>
    <TabPanel>
      <Notation />
    </TabPanel>
  </TabPanels>
</TabGroup>
