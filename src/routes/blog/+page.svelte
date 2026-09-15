<script lang="ts">
	import blogRaw from '../../data/BLOG.json';

	interface BlogPost {
		id: number;
		date: string;
		link: string;
		title: string;
		excerpt: string;
		author: string;
	}

	const posts = (blogRaw as BlogPost[]).slice().sort((a, b) => b.date.localeCompare(a.date));

	const formatDate = (iso: string): string =>
		new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
</script>

<svelte:head>
	<title>Closing the Gap in Non-Latin-Script Data – Blog</title>
</svelte:head>

<div class="flex justify-center px-4">
	<div class="mb-4 w-full max-w-6xl rounded-lg bg-ctgtan p-4">
		<h1 class="mb-3.5 border-b border-ctgblue pb-2 text-2xl font-medium">Blog</h1>

		<div class="grid gap-4">
			{#each posts as post (post.id)}
				<div class="rounded bg-white p-4 shadow">
					<p class="text-lg font-bold text-ctgblue">
						<a href={post.link} target="_blank" rel="noopener noreferrer" class="hover:underline">
							{post.title}
						</a>
					</p>
					<p class="text-sm text-gray-600">
						{formatDate(post.date)}{#if post.author}
							&middot; {post.author}{/if}
					</p>
					{#if post.excerpt}
						<p class="mt-1 text-gray-800">{post.excerpt}</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>
