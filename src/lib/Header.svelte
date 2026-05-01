<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	import LogotypeURL from '$lib/svg/Logotype.svg?url';
</script>

<div class="mx-auto mb-4 max-w-[76rem] px-4 text-gray-50">
	<div class="flex items-start space-x-4">
		<div>
			<img
				src={LogotypeURL}
				alt="Closing the Gap in Non-Latin Script Data"
				class="block h-24 w-auto"
			/>
		</div>
	</div>
</div>

<div class="mb-4 bg-ctgorange py-3">
	<div class="mx-auto flex max-w-[76rem] flex-wrap gap-x-4 gap-y-2 px-4 text-xl font-normal">
		<a
			href="{base}/"
			class="underline-offset-2 hover:underline"
			class:underline={$page.route.id === '/'}>Projects</a
		>
		<a
			href="{base}/map/"
			class="underline-offset-2 hover:underline"
			class:underline={$page.route.id === '/map'}>Map</a
		>
		<a
			href="{base}/timeline/"
			class="underline-offset-2 hover:underline"
			class:underline={$page.route.id === '/timeline'}>Timeline</a
		>
		<a
			href="{base}/visualizations/"
			class="underline-offset-2 hover:underline"
			class:underline={$page.route.id === '/visualizations'}>Visualizations</a
		>
		<a
			href="{base}/research/"
			class="underline-offset-2 hover:underline"
			class:underline={$page.route.id === '/research'}>Research</a
		>
		<a
			href="{base}/events/"
			class="underline-offset-2 hover:underline"
			class:underline={$page.route.id === '/events'}>Events</a
		>
		<a
			href="{base}/workshop/"
			class="underline-offset-2 hover:underline"
			class:underline={$page.route.id === '/workshop'}>Workshop</a
		>
		<a
			href="{base}/contribute/"
			class="underline-offset-2 hover:underline"
			class:underline={$page.route.id === '/contribute'}>Contribute</a
		>
		<a
			href="{base}/consulting/"
			class="underline-offset-2 hover:underline"
			class:underline={$page.route.id === '/consulting'}>Consulting</a
		>
		<a
			href="{base}/about/"
			class="underline-offset-2 hover:underline"
			class:underline={$page.route.id === '/about'}>About</a
		>
	</div>
</div>
