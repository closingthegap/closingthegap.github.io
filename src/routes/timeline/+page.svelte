<script lang="ts">
	import type { JsonStuff } from '$lib/utils.svelte';
	import entriesRaw from '../../data/ENTRIES.json';

	const entries = entriesRaw as [string, JsonStuff][];

	$: entriesFiltered = entries.filter(
		([, entry]) => entry.project.date[0].from && entry.project.date[0].to
	);

	const currentYear = new Date().getFullYear();
	const backEighteen = currentYear - 18;
	const forwardTwelve = currentYear + 12;
	const years = Array.from({ length: forwardTwelve - backEighteen + 1 }, (_, i) =>
		String(backEighteen + i)
	);

	function truncateTitle(title: string): string {
		const maxLength = 36;

		if (title.length <= maxLength) {
			return title;
		}

		let i = maxLength;
		while (title[i] !== ' ') {
			i--;
		}
		return `${title.slice(0, i)} …`;
	}

	function fundedYear(year: number, entry: JsonStuff): boolean {
		for (const period of entry.project.date) {
			if (
				period.from &&
				period.to &&
				year >= period.from.slice(0, 4) &&
				year <= period.to.slice(0, 4)
			) {
				return true;
			}
		}

		return false;
	}

	function fixUrl(url: string): string {
		const prefix =
			'https://github.com/closingthegap/closingthegap.github.io/tree/master/PROJECTS/';
		const suffix = url.split('/PROJECTS/')[1];
		return prefix + suffix;
	}
</script>

<svelte:head>
	<title>Closing the Gap in Non-Latin-Script Data – Timeline</title>
</svelte:head>

<div class="mx-auto max-w-[76rem] px-4">
	<table class="mx-auto w-full table-auto border-separate border-spacing-0 bg-ctgtan">
		<thead class="sticky top-0">
			<tr class="border-b border-slate-800">
				<th class="border-b border-r border-slate-800">Project title</th>
				{#each years as year, i}
					{#if i === years.length - 1}
						<th class="border-b border-slate-800 px-1 py-1.5 text-sm">’{year.slice(-2)}</th>
					{:else}
						<th class="border-b border-r border-slate-800 px-1 py-1.5 text-sm">’{year.slice(-2)}</th
						>
					{/if}
				{/each}
			</tr>
		</thead>

		<tbody>
			{#each entriesFiltered as [url, entry], i}
				<tr>
					{#if i === entriesFiltered.length - 1}
						<td class="border-r border-slate-800 px-2 py-0.5"
							>{truncateTitle(entry.project.title)}</td
						>

						{#each years as year, j}
							{#if fundedYear(Number(year), entry)}
								<td class="bg-slate-800" />
							{:else if j === years.length - 1}
								<td />
							{:else}
								<td class="border-r border-slate-800/25" />
							{/if}
						{/each}
					{:else}
						<td class="border-b border-r border-slate-800 px-2 py-0.5"
							><a href={fixUrl(url)} target="_blank" rel="noreferrer"
								>{truncateTitle(entry.project.title)}</a
							></td
						>

						{#each years as year, j}
							{#if fundedYear(Number(year), entry)}
								<td class="bg-slate-800" />
							{:else if j === years.length - 1}
								<td class="border-b border-slate-800/25" />
							{:else}
								<td class="border-b border-r border-slate-800/25" />
							{/if}
						{/each}
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
