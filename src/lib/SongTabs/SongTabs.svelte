<script lang="ts">
  import Notation from '$lib/notation/Notation.svelte';
  import Tracks from '$lib/track/Tracks.svelte';
  import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@rgossiaux/svelte-headlessui';

  const tabs = ['Mixer', 'Notation'];
</script>

<TabGroup manual>
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
