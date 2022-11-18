<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	console.log(data)
</script>

{#if data}
	<ul>
		{#each data.songs as song}
			<li>{song.name}</li>
		{/each}
	</ul>
{:else}
	<p>loading...</p>
{/if}