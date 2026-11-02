<script lang="ts">
	import { onDestroy } from 'svelte';
	import { searchTerm, selectedEntries, selectedTab, selectedTerms } from '#lib/stores.ts';
	import { langNames } from '#lib/lang-names.ts';
	import entriesRaw from '../data/ENTRIES.json';

	import {
		searchEntries,
		resetHash,
		updateHash,
		getKeywords,
		getInvalidKeywords
	} from '#lib/utils.ts';
	import type { JsonStuff } from '#lib/utils.ts';

	export let keywordsCategorized: Record<string, string[]>;
	export let languages: string[];

	const entries = entriesRaw as [string, JsonStuff][];

	let searchTermValue = '';
	$: searchTermValue = $searchTerm;

	const keywordsMap = getKeywords(entries);
	$: keywordsToDisable = getInvalidKeywords(keywordsMap, $selectedTab, $selectedTerms);

	let debounce: ReturnType<typeof setTimeout>;
	onDestroy(() => clearTimeout(debounce));

	function handleSearch() {
		clearTimeout(debounce);

		debounce = setTimeout(() => {
			searchTerm.set(searchTermValue);
			const matchingEntries = searchEntries(entries, searchTermValue);
			selectedEntries.set(matchingEntries);
		}, 500);
	}

	function validate(
		keywords: Record<string, string[]>,
		langs: string[],
		selections: Set<string>,
		tab: string
	) {
		if (tab === 'search') {
			return false;
		}

		const keywordsFlat = Object.values(keywords).flat();
		const established = tab === 'keywords' ? keywordsFlat : langs;

		// Race condition: langs, at least, could still be empty
		// Function will run again
		if (established.length === 0) {
			return false;
		}

		for (const selection of selections) {
			if (!established.includes(selection)) {
				selectedTerms.update((value) => {
					value.delete(selection);
					return value;
				});
			}
		}

		if (selections.size === 0) {
			return false;
		} else {
			return true;
		}
	}

	$: validSelection = validate(keywordsCategorized, languages, $selectedTerms, $selectedTab);
</script>

<div class="mb-3.5 rounded-lg bg-ctgtan p-4">
	<div class="mb-4 border-b border-b-slate-800">
		<div class="flex gap-2 text-lg font-normal">
			<button
				on:click={() => {
					selectedTab.set('search');
					resetHash();
				}}
				class="rounded-t-md border-x border-t px-2 py-0.5 hover:border-slate-800 hover:bg-ctgorange"
				class:bg-ctgorange={$selectedTab === 'search'}
				class:border-slate-800={$selectedTab === 'search'}
				class:border-ctgtan={$selectedTab !== 'search'}
			>
				Search
			</button>

			<button
				on:click={() => {
					selectedTab.set('keywords');
					resetHash();
				}}
				class="rounded-t-md border-x border-t px-2 py-0.5 hover:border-slate-800 hover:bg-ctgorange"
				class:bg-ctgorange={$selectedTab === 'keywords'}
				class:border-slate-800={$selectedTab === 'keywords'}
				class:border-ctgtan={$selectedTab !== 'keywords'}
			>
				Keywords
			</button>

			<button
				on:click={() => {
					selectedTab.set('languages');
					resetHash();
				}}
				class="rounded-t-md border-x border-t px-2 py-0.5 hover:border-slate-800 hover:bg-ctgorange"
				class:bg-ctgorange={$selectedTab === 'languages'}
				class:border-slate-800={$selectedTab === 'languages'}
				class:border-ctgtan={$selectedTab !== 'languages'}
			>
				Languages
			</button>
		</div>
	</div>

	{#if $selectedTab !== 'search' && validSelection}
		<p class="-mt-1 mb-3.5">
			<button on:click={resetHash} class="font-normal text-red-900 underline"
				>Clear selection</button
			>
		</p>
	{/if}

	{#if $selectedTab === 'languages'}
		<div class="flex flex-wrap gap-2.5 text-sm">
			{#each languages as language}
				<button
					on:click={() => updateHash('languages', language)}
					class="rounded-md border px-2 py-0.5 font-mono hover:border-ctgblue hover:bg-ctgblue hover:text-gray-50"
					class:bg-ctgblue={$selectedTerms.has(language)}
					class:border-ctgblue={$selectedTerms.has(language)}
					class:border-slate-800={!$selectedTerms.has(language)}
					class:text-gray-50={$selectedTerms.has(language)}
					title={langNames[language] || language}
				>
					{language}
				</button>
			{/each}
		</div>

		<p class="mt-2.5 -mb-1.5">
			<em>Hover on a language code to see the full name</em>
		</p>
	{:else if $selectedTab === 'keywords'}
		{#each Object.keys(keywordsCategorized) as category, i}
			<div class="lg:flex">
				<div class="mb-4 text-sm lg:mb-0 lg:w-1/5 xl:w-1/6">
					<code><em>{category}</em></code>
				</div>

				<div class="flex flex-wrap gap-2.5 text-sm lg:w-4/5 xl:w-5/6">
					{#each keywordsCategorized[category] as keyword}
						<button
							on:click={() => updateHash('keywords', keyword)}
							class="rounded-md border px-2 py-0.5 font-mono"
							class:bg-ctgblue={$selectedTerms.has(keyword)}
							class:border-ctgblue={$selectedTerms.has(keyword)}
							class:border-slate-800={!$selectedTerms.has(keyword)}
							class:cursor-not-allowed={keywordsToDisable.has(keyword)}
							class:hover:bg-ctgblue={!keywordsToDisable.has(keyword)}
							class:hover:border-ctgblue={!keywordsToDisable.has(keyword)}
							class:hover:text-gray-50={!keywordsToDisable.has(keyword)}
							class:opacity-50={keywordsToDisable.has(keyword)}
							class:text-gray-50={$selectedTerms.has(keyword)}
							disabled={!$selectedTerms.has(keyword) && keywordsToDisable.has(keyword)}
						>
							{#if keyword === 'corpus_output' || keyword === 'corpus_resource'}
								corpus
							{:else}
								{keyword}
							{/if}
						</button>
					{/each}
				</div>
			</div>

			{#if i < Object.keys(keywordsCategorized).length - 1}
				<hr class="my-4 border-slate-800" />
			{/if}
		{/each}
	{:else}
		<div class="flex gap-2 font-normal">
			<input
				type="text"
				aria-label="Search projects"
				autocorrect="off"
				autocapitalize="none"
				class="w-56 rounded-sm border border-ctgblue bg-gray-100 px-2 py-1 focus:border-blue-600"
				bind:value={searchTermValue}
				on:input={handleSearch}
			/>

			{#if searchTermValue}
				<button on:click={() => searchTerm.set('')} class="rounded-sm bg-red-900 px-2 text-gray-100"
					>Clear</button
				>
			{/if}
		</div>
	{/if}
</div>
