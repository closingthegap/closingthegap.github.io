<script>
	import { onMount } from 'svelte';

	let upcoming = [];
	let past = [];
	let publications = [];

	const SHEET_ID = '1TwBvYnygSy1t4CSJHtiYBewntAPiVR5fAvjdeJwelvE';
	const API_KEY = 'AIzaSyD_uAmMav0SiCFz4FRrixvRyGNgsBBhG2c';
	const RANGE = 'Sheet1';
	const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

	function parseStartDate(dateStr) {
		const first = dateStr.split(/[-–—]/)[0]?.trim();
		const [d, m, y] = first?.split('.') || [];
		const dt = new Date(`${y}-${m}-${d}`);
		return isNaN(dt.getTime()) ? null : dt;
	}

	onMount(async () => {
		try {
			const res = await fetch(API_URL);
			const json = await res.json();
			const rows = json.values;

			if (!rows || rows.length < 2) return;

			const headers = rows[0];
			const data = rows
				.slice(1)
				.map((row) => Object.fromEntries(headers.map((key, i) => [key, row[i] || ''])));

			const today = new Date();

			const allConfs = data
				.filter((row) => row.Type?.toLowerCase() === 'conference')
				.map((c) => {
					const rawDate = parseStartDate(c.Date);
					return (
						rawDate && {
							name: c['Name of conference'],
							location: c.Location,
							date: c.Date,
							time: c['Lecture time'],
							title: c['Lecture title'],
							link: c.Link,
							author: c.Author,
							rawDate
						}
					);
				})
				.filter(Boolean)
				.sort((a, b) => a.rawDate - b.rawDate);

			upcoming = allConfs.filter((c) => c.rawDate >= today);
			past = allConfs
			.filter((c) => c.rawDate < today)
			.sort((a, b) => b.rawDate - a.rawDate);

			function parsePublicationDate(yearStr) {				
				if (!yearStr) return null;
				// "October 2025" → new Date("2025-10-01")
				const [month, year] = yearStr.trim().split(/\s+/);
				const dt = new Date(`${month} 1, ${year}`);
				return isNaN(dt.getTime()) ? null : dt;
			}
			
			publications = data
			.filter((row) => row.Type?.toLowerCase() === 'publication')
			.map((p) => {
				const rawDate = parsePublicationDate(p.Year);
				return (
					rawDate && {
						title: p.Title,
						author: p.Author,
						year: p.Year,
						link: p.Link,
						rawDate
					}
				);
			})
			.filter(Boolean)
			.sort((a, b) => b.rawDate - a.rawDate); // latest → earliest

		} catch (err) {
			console.error('Error loading research data:', err);
		}
	});
</script>

<div class="flex justify-center px-4">
	<div class="mb-4 w-full max-w-6xl rounded-lg bg-ctgtan p-4">
		<h1 class="mb-3.5 border-b border-ctgblue pb-2 text-2xl font-medium">Our Research</h1>
		<p class="mb-6 text-gray-800">
			We catalog non-Latin-script DH projects while investigating their long-term sustainability.
			Our mixed-methods study uncovers concerning lifecycle patterns: most grant-funded projects
			vanish when funding ends, erasing valuable scholarship. We trace this “preservation gap” to
			institutional stewardship failures, inadequate archiving infrastructure, and evaluation
			metrics that favour traditional outputs. Finally, we propose a combined technical-and-policy
			framework — standardised metadata, automated pipelines, and revised incentive structures — to
			ensure enduring access to digital humanities data.
		</p>

		<!-- Upcoming Conferences -->
		<h2 class="mb-3.5 border-b border-ctgblue pb-2 text-xl font-medium">Upcoming Conferences</h2>
		{#if upcoming.length}
			<div class="mb-6 grid gap-4">
				{#each upcoming as c}
					<div class="rounded bg-white p-4 shadow">
						<p class="text-lg font-bold text-ctgblue">
							{#if c.link}
								<a href={c.link} target="_blank" rel="noopener noreferrer" class="hover:underline"
									>{c.name}</a
								>
							{:else}
								{c.name}
							{/if}
						</p>
						<p class="text-sm">{c.date} | {c.time} | {c.location}</p>
						<p class="mt-1 italic text-gray-700">{c.title}</p>
						{#if c.author}
							<p class="text-sm text-gray-600">Presented by {c.author}</p>
						{/if}
					</div>
				{/each}
			</div>
		{:else}
			<p class="mb-6 text-gray-600">No upcoming conferences.</p>
		{/if}

		<!-- Past Conferences -->
		<h2 class="mb-3.5 border-b border-ctgblue pb-2 text-xl font-medium">Past Conferences</h2>
		{#if past.length}
			<div class="mb-6 grid gap-4">
				{#each past as c}
					<div class="rounded bg-white p-4 shadow">
						<p class="text-lg font-bold text-gray-700">
							{#if c.link}
								<a href={c.link} target="_blank" rel="noopener noreferrer" class="hover:underline"
									>{c.name}</a
								>
							{:else}
								{c.name}
							{/if}
						</p>
						<p class="text-sm">{c.date} | {c.time} | {c.location}</p>
						<p class="mt-1 italic text-gray-700">{c.title}</p>
						{#if c.author}
							<p class="text-sm text-gray-600">Presented by {c.author}</p>
						{/if}
					</div>
				{/each}
			</div>
		{:else}
			<p class="mb-6 text-gray-600">No past conferences listed yet.</p>
		{/if}

		<!-- Publications -->
		<h2 class="mb-3.5 border-b border-ctgblue pb-2 text-xl font-medium">Publications</h2>
		{#if publications.length}
			<ul class="mb-6 list-disc space-y-2 pl-5">
				{#each publications as p}
					<li>
						<a href={p.link} target="_blank" class="text-ctgblue hover:underline">{p.title}</a>
						<span class="text-sm text-gray-600"> — {p.author} ({p.year})</span>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="text-gray-600">No publications to display yet.</p>
		{/if}
	</div>
</div>

<style>
	p,
	span {
		color: black;
	}
</style>
