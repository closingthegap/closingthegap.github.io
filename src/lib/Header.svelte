<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import LogotypeURL from '#lib/svg/Logotype.svg?url';
	const currentRoute = $derived(page.route.id);
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
			href={resolve('/')}
			class="underline-offset-2 hover:underline"
			class:underline={currentRoute === '/'}>Projects</a
		>
		<a
			href={resolve('/map')}
			class="underline-offset-2 hover:underline"
			class:underline={currentRoute === '/map'}>Map</a
		>
		<a
			href={resolve('/timeline')}
			class="underline-offset-2 hover:underline"
			class:underline={currentRoute === '/timeline'}>Timeline</a
		>
		<a
			href={resolve('/visualizations')}
			class="underline-offset-2 hover:underline"
			class:underline={currentRoute === '/visualizations'}>Visualizations</a
		>
		<a
			href={resolve('/research')}
			class="underline-offset-2 hover:underline"
			class:underline={currentRoute === '/research'}>Research</a
		>
		<a
			href={resolve('/blog')}
			class="underline-offset-2 hover:underline"
			class:underline={currentRoute === '/blog'}>Blog</a
		>
		<a
			href={resolve('/events')}
			class="underline-offset-2 hover:underline"
			class:underline={currentRoute === '/events'}>Events</a
		>
		<a
			href={resolve('/workshop')}
			class="underline-offset-2 hover:underline"
			class:underline={currentRoute === '/workshop'}>Workshop</a
		>
		<a
			href={resolve('/about')}
			class="underline-offset-2 hover:underline"
			class:underline={currentRoute === '/about'}>About</a
		>
	</div>
</div>
