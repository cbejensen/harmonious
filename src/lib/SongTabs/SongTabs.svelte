<script lang="ts">
  import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@rgossiaux/svelte-headlessui';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

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
  <TabList class="text-center">
    {#each tabs as tab, i}
      <Tab class={({ selected }) => `flex-1 ${selected ? 'text-orange-500' : 'text-gray-500'}`}
        >{tab}</Tab
      >
      {#if i === 0}
        <span class="mx-2 text-gray-500">|</span>
      {/if}
    {/each}
  </TabList>
  <TabPanels>
    <TabPanel>Mixer</TabPanel>
    <TabPanel>Notation</TabPanel>
  </TabPanels>
</TabGroup>
