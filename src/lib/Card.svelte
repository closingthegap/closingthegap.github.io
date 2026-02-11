<script lang="ts">
	import type { JsonStuff } from '$lib/utils.svelte';

	import Arrow from '$lib/svg/Arrow.svelte';
	import Brackets from '$lib/svg/Brackets.svelte';
	import Calendar from '$lib/svg/Calendar.svelte';
	import Lang from '$lib/svg/Lang.svelte';
	import Link from '$lib/svg/Link.svelte';
	import Pin from '$lib/svg/Pin.svelte';

	export let title: string;
	export let description: string;
	export let periods: Record<string, string>[];
	export let places: JsonStuff[];
	export let languages: string[];
	export let websiteLinks: string[];
	export let url: string;
	export let lastEdited: string;
	export let keywords: string[];
	export let uuid: string;

	$: realPeriods = periods.filter((period) => period.from);

	const prefix =
		'https://github.com/closingthegap/closingthegap.github.io/tree/master/PROJECTS/';
	$: suffix = url.split('/PROJECTS/')[1];
	$: jsonLink = prefix + suffix;
</script>

<div class="mb-auto w-[22.5rem] rounded-lg bg-ctgtan text-base lg:w-96">
	<div class="p-4 pb-0">
		{#if places.length > 0}
			<div class="mb-3 flex gap-x-1.5">
				<div class="w-6 shrink-0"><Pin /></div>

				<div class="flex flex-wrap gap-x-1.5">
					{#each places as place, i}
						<div>
							<a
								href={place.place_name.ref}
								target="_blank"
								rel="noreferrer"
								class="hover:underline">{place.place_name.text}</a
							>{#if i < places.length - 1},{/if}
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<h3 class="mb-3 text-xl font-medium"><a href="entry/#{uuid}">{title}</a></h3>

		<div class="mb-3">
			<div class="mb-2">
				{#each realPeriods as period}
					<div class="mb-2 flex items-center gap-x-1.5">
						<div class="w-7"><Calendar /></div>
						<div class="font-mono">{period.from.slice(0, 4)}</div>
						<div class="w-6"><Arrow /></div>
						<div class="font-mono">{period.to.slice(0, 4)}</div>
					</div>
				{/each}
			</div>

			{#if languages.length > 0}
				<div class="flex items-center gap-x-1.5">
					<div class="w-7"><Lang /></div>

					{#each languages as language, i}
						<div>
							<code>{language}</code>{#if i < languages.length - 1}&#8202;,{/if}
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<p class="mb-3.5">{description}</p>

		<div class="mb-4 flex flex-wrap gap-2 text-sm">
			{#each keywords as keyword}
				<code class="rounded-md border border-slate-800 px-2 py-0.5">{keyword}</code>
			{/each}
		</div>

		<div class="flex gap-x-2">
			{#each websiteLinks as link}
				<div class="w-8 rounded-full border border-slate-800 bg-ctgorange p-1">
					<a
						href={link}
						target="_blank"
						rel="noreferrer"
						title="Link to website (may be multiple)"
						class="hover:text-amber-200"><Link /></a
					>
				</div>
			{/each}

			<div class="w-8 rounded-full border border-slate-800 bg-ctgorange p-1">
				<a
					href={jsonLink}
					target="_blank"
					rel="noreferrer"
					title="Link to JSON record"
					class="hover:text-amber-200"><Brackets /></a
				>
			</div>
		</div>
	</div>

	<div class="-mt-4 rounded-b-lg bg-slate-800 px-3 py-1.5">
		<p class="text-right text-sm text-gray-300">
			Last edit: <code>{lastEdited}</code>
		</p>
	</div>
</div>
