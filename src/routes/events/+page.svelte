<script>
	import { onMount } from 'svelte';

	let upcoming = [];
	let past = [];

	const SHEET_ID = '1TwBvYnygSy1t4CSJHtiYBewntAPiVR5fAvjdeJwelvE';
	const API_KEY = 'AIzaSyD_uAmMav0SiCFz4FRrixvRyGNgsBBhG2c';
	const RANGE = 'Sheet2';
	const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

	function parseDate(dateStr) {
		const first = dateStr?.split(/[-–—]/)[0]?.trim();
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

			const events = data
				.map((e) => {
					const rawDate = parseDate(e.Date);
					return (
						rawDate && {
							name: e.Event,
							location: e.Location,
							date: e.Date,
							link: e.Link,
							rawDate
						}
					);
				})
				.filter(Boolean)
				.sort((a, b) => a.rawDate - b.rawDate);

			upcoming = events.filter((e) => e.rawDate >= today);
			past = events
			.filter((e) => e.rawDate < today)
			.sort((a, b) => b.rawDate - a.rawDate); // latest → earliest
		} catch (err) {
			console.error('Error loading events:', err);
		}
	});
</script>

<div class="flex justify-center px-4">
	<div class="mb-4 w-full max-w-6xl rounded-lg bg-ctgtan p-4">
		<h1 class="mb-3.5 border-b border-ctgblue pb-2 text-2xl font-medium">Events</h1>
		<p class="mb-6 text-gray-800">Explore upcoming Digital Humanities events in Berlin.</p>

		<!-- Upcoming Events -->
		<h2 class="mb-3.5 border-b border-ctgblue pb-2 text-xl font-medium">Upcoming Events</h2>
		{#if upcoming.length}
			<div class="mb-6 grid gap-4">
				{#each upcoming as e}
					<div class="rounded bg-white p-4 shadow">
						<p class="text-lg font-bold text-ctgblue">
							{#if e.link}
								<a href={e.link} target="_blank" rel="noopener noreferrer" class="hover:underline">
									{e.name}
								</a>
							{:else}
								{e.name}
							{/if}
						</p>
						<p class="text-sm">{e.date} | {e.location}</p>
					</div>
				{/each}
			</div>
		{:else}
			<p class="mb-6 text-gray-600">No upcoming events.</p>
		{/if}

		<!-- Past Events -->
		<h2 class="mb-3.5 border-b border-ctgblue pb-2 text-xl font-medium">Past Events</h2>
		{#if past.length}
			<div class="mb-6 grid gap-4">
				{#each past as e}
					<div class="rounded bg-white p-4 shadow">
						<p class="text-lg font-bold text-gray-700">
							{#if e.link}
								<a href={e.link} target="_blank" rel="noopener noreferrer" class="hover:underline">
									{e.name}
								</a>
							{:else}
								{e.name}
							{/if}
						</p>
						<p class="text-sm">{e.date} | {e.location}</p>
					</div>
				{/each}
			</div>
		{:else}
			<p class="mb-6 text-gray-600">No past events listed yet.</p>
		{/if}
	</div>
</div>

<style>
	p {
		color: black;
	}
</style>
