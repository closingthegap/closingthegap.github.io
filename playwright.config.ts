import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	use: {
		baseURL: 'http://127.0.0.1:4174',
		viewport: { width: 1440, height: 1000 },
		trace: 'retain-on-failure',
		...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {})
	},
	webServer: {
		command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4174 --strictPort',
		url: 'http://127.0.0.1:4174',
		timeout: 120_000
	}
});
