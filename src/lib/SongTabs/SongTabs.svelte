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
  <TabList class="flex justify-center gap-2">
    {#each tabs as tab, i}
      <Tab class={({ selected }) => `${selected ? 'text-orange-500' : 'text-gray-500'}`}>{tab}</Tab>
      {#if i < tabs.length - 1}
        <div class="border-r border-gray-500" />
      {/if}
    {/each}
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
