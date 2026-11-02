import { sveltekit } from '@sveltejs/kit/vite';
import staticAdapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			preprocess: vitePreprocess(),
			adapter: staticAdapter(),
			appDir: 'app',
			version: { pollInterval: 0 },
			prerender: { handleMissingId: 'ignore', handleHttpError: 'warn' }
		})
	]
});
