<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import Header from '#lib/Header.svelte';
	interface Props {
		children?: Snippet;
	}

	const { children }: Props = $props();
</script>

<Header />

{@render children?.()}
