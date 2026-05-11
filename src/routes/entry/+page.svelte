<script lang="ts">
	import { onMount } from 'svelte';
	import type { JsonStuff } from '$lib/utils.svelte';
	import type { PlaceData, DateRange, Institution, RelatedEntity, Contact } from './types.svelte';

	import projectsRaw from '../../data/PROJECTS.json';
	import entriesRaw from '../../data/ENTRIES.json';

	let title = '';
	let places: PlaceData[] = [];
	let langs: string[] = [];
	let desc = '';
	let keywords: string[] = [];
	let jsonLink = '';
	let websites: string[] = [];
	let abbr = '';
	let entityType = '';
	let periods: DateRange[] = [];
	let relatedInsts: Institution[] = [];
	let relatedEnts: RelatedEntity[] = [];
	let contacts: Contact[] = [];
	let researchLangs: string[] = [];

	$: entityCap = entityType.charAt(0).toUpperCase() + entityType.slice(1);

	let loading = true;

	onMount(() => {
		const hash = window.location.hash;

		if (!hash || hash.length < 2) {
			window.location.href = '..';
			return;
		}

		const listData = projectsRaw as Record<string, Record<string, string>>;
		const id = hash.slice(1);
		const selectedProj = listData[id];

		if (!selectedProj) {
			window.location.href = '..';
			return;
		}

		const entries = entriesRaw as [string, JsonStuff][];

		const selectedEntry = entries.find(
			([, data]) => data.record_metadata.uuid === id
		);

		if (!selectedEntry) {
			window.location.href = '..';
			return;
		}

		const selectedProjData: JsonStuff = selectedEntry[1];

		jsonLink = `https://github.com/closingthegap/closingthegap.github.io/tree/master${selectedProj.path}${id}.json`;

		title = selectedProjData.project.title;
		places = selectedProjData.project.places;
		langs = selectedProjData.project.lang;
		desc = selectedProjData.project.project_desc;
		keywords = selectedProjData.project.keywords;
		websites = selectedProjData.project.websites;
		abbr = selectedProjData.project.abbr || 'N/A';
		entityType = selectedProjData.project.type;
		periods = selectedProjData.project.date;
		relatedInsts = selectedProjData.project.related_institutions;
		relatedEnts = selectedProjData.project.related_entities;
		contacts = selectedProjData.project.people;
		researchLangs = selectedProjData.project.research_data.lang;

		loading = false;
	});
</script>

<svelte:window
	on:hashchange={() => {
		location.reload();
	}}
/>

<svelte:head>
	<title>Closing the Gap in Non-Latin-Script Data</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-4">
	<div class="rounded-lg bg-ctgtan p-4 text-lg">
		{#if loading}
			<h3 class="mb-3 text-2xl font-normal">Loading…</h3>
		{:else}
			<h3 class="mb-3 text-2xl font-normal">{title}</h3>
			<p class="mb-3"><span class="font-normal">Abbreviated title:</span> {abbr}</p>
			<p class="mb-3"><span class="font-normal">Entity type:</span> {entityType}</p>
			<p class="mb-3"><span class="font-normal">Description:</span> {desc}</p>
			<p class="mb-1 font-normal">Periods of funding/operation:</p>
			<ul class="mb-3 ml-4 list-disc">
				{#each periods as period}
					<li>
						{period.from.slice(0, 4)}&thinsp;–&thinsp;{period.to.slice(0, 4)}
					</li>
				{/each}
			</ul>
			<p class="mb-1 font-normal">{entityCap} locations:</p>
			<ul class="mb-3 ml-4 list-disc">
				{#each places as place}
					<li>
						<a
							href={place.place_name.ref[0]}
							target="_blank"
							rel="noreferrer"
							class="hover:underline"
						>
							{place.place_name.text}</a
						>
					</li>
				{/each}
			</ul>
			<hr class="mb-3 border-ctgblue" />
			<p class="mb-1 font-normal">{entityCap} working languages:</p>
			<ul class="mb-3 ml-4 list-disc">
				{#each langs as lang}
					<li>{lang}</li>
				{/each}
			</ul>
			<p class="mb-1 font-normal">{entityCap} research languages:</p>
			<ul class="mb-3 ml-4 list-disc">
				{#each researchLangs as lang}
					<li>{lang}</li>
				{/each}
			</ul>
			<p class="mb-1 font-normal">Keywords:</p>
			<ul class="mb-3 ml-4 list-disc">
				{#each keywords as keyword}
					<li>{keyword}</li>
				{/each}
			</ul>
			<hr class="mb-3 border-ctgblue" />
			<p class="mb-3">
				<span class="font-normal">Link to JSON record:</span>
				<a href={jsonLink} target="_blank" rel="noreferrer" class="break-words hover:underline"
					>{jsonLink}</a
				>
			</p>
			<p class="mb-1 font-normal">Links to {entityType} websites:</p>
			<ul class="mb-3 ml-4 list-disc">
				{#each websites as website}
					<li>
						<a href={website} target="_blank" rel="noreferrer" class="break-words hover:underline"
							>{website}</a
						>
					</li>
				{/each}
			</ul>
			<hr class="mb-3 border-ctgblue" />
			<p class="mb-1 font-normal">Related institutions:</p>
			<ul class="mb-3 ml-4 list-disc">
				{#each relatedInsts as inst}
					<li>
						<a href={inst.websites[0]} target="_blank" rel="noreferrer" class="hover:underline"
							>{inst.org_name.text}</a
						>
						(<em>{inst.relation_type}</em>)
					</li>
				{/each}
			</ul>
			<p class="mb-1 font-normal">Related entities:</p>
			<ul class="mb-3 ml-4 list-disc">
				{#if relatedEnts.length === 0}
					<li>N/A</li>
				{:else}
					{#each relatedEnts as ent}
						<li>
							<a href={`../entry/#${ent.uuid}`} class="hover:underline">{ent.title}</a> (<em
								>{ent.relation_type}</em
							>)
						</li>
					{/each}
				{/if}
			</ul>
			<hr class="mb-3 border-ctgblue" />
			<p class="mb-1 font-normal">Involved researchers:</p>
			<ul class="ml-4 list-disc">
				{#each contacts as contact}
					{#if contact.pers_name.text !== ''}
						<li>
							{contact.pers_name.text}
							{#each contact.pers_name.ref.filter( (r) => r.startsWith('https://orcid.org') ) as orcid}
								: <a
									href={orcid}
									target="_blank"
									rel="noreferrer"
									class="break-words hover:underline">{orcid}</a
								>
							{/each}
						</li>
					{:else if contact.pers_name.ref.some((r) => r.startsWith('https://orcid.org'))}
						{#each contact.pers_name.ref.filter((r) => r.startsWith('https://orcid.org')) as orcid}
							<li>
								<a href={orcid} target="_blank" rel="noreferrer" class="break-words hover:underline"
									>{orcid}</a
								>
							</li>
						{/each}
					{/if}
				{/each}
			</ul>
		{/if}
	</div>
</div>
