import { test, expect } from '@playwright/test';
import entries from '../src/data/ENTRIES.json' with { type: 'json' };
import type { JsonStuff } from '../src/lib/utils.ts';
import projects from '../src/data/PROJECTS.json' with { type: 'json' };

const records = entries as [string, JsonStuff][];

test('search, clear, language and keyword filters, and unknown URL terms', async ({ page }) => {
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	await page.goto('/');
	const cards = page.locator('h3');
	const expectProjects = async (expected: [string, JsonStuff][]) => {
		await expect
			.poll(async () => (await cards.allTextContents()).map((title) => title.trim()).sort())
			.toEqual(expected.map(([, entry]) => entry.project.title).sort());
	};
	await expect(cards).toHaveCount(entries.length);
	await page.getByRole('textbox', { name: 'Search projects' }).fill('Mishnah');
	await expect(cards).toHaveText(['A Digital Synopsis of the Mishnah and Tosefta']);
	await page.getByRole('button', { name: 'Clear', exact: true }).click();
	await expect(cards).toHaveCount(entries.length);
	await page.getByRole('button', { name: 'Languages', exact: true }).click();
	await page.getByRole('button', { name: 'ara', exact: true }).click();
	await expect(page).toHaveURL(/#languages=ara$/);
	await expectProjects(
		records.filter(([, entry]) => entry.project.research_data.lang.includes('ara'))
	);
	await page.reload();
	await expectProjects(
		records.filter(([, entry]) => entry.project.research_data.lang.includes('ara'))
	);
	await page.getByRole('button', { name: 'Keywords', exact: true }).click();
	await page.getByRole('button', { name: 'arabic_studies', exact: true }).click();
	await expect(page).toHaveURL(/#keywords=arabic_studies$/);
	await expectProjects(
		records.filter(([, entry]) => entry.project.keywords.includes('arabic_studies'))
	);
	await page.goto('/#keywords=unknown-keyword');
	await expect(cards).toHaveCount(entries.length);
	expect(errors).toEqual([]);
});

test('entry links and client navigation keep the active menu current', async ({ page }) => {
	await page.goto('/');
	const project = page.locator('h3 a').first();
	const title = await project.innerText();
	await project.click();
	await expect(page).toHaveURL(/\/entry\/#/);
	await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible();
	await page.getByRole('link', { name: 'About', exact: true }).click();
	await expect(page.getByRole('link', { name: 'About', exact: true })).toHaveClass(
		/(?:^|\s)underline(?:\s|$)/
	);
	await page.getByRole('link', { name: 'Projects', exact: true }).click();
	await expect(page.locator('h3')).toHaveCount(entries.length);
	await expect(page.getByRole('link', { name: 'About', exact: true })).not.toHaveClass(
		/(?:^|\s)underline(?:\s|$)/
	);
});

test('map and all three charts render without runtime errors', async ({ page }) => {
	// Keep chart data deterministic and independent of the live database.
	await page.route(
		'https://raw.githubusercontent.com/closingthegap/closingthegap.github.io/master/**',
		(route) => {
			const url = route.request().url();
			const record = entries.find(([source]) => source === url)?.[1];
			return route.fulfill({ json: url.endsWith('/PROJECTS.json') ? projects : record });
		}
	);

	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	await page.route('https://*.tile.openstreetmap.org/**', (route) =>
		route.fulfill({
			contentType: 'image/svg+xml',
			body: '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"/>'
		})
	);
	await page.goto('/map/');
	await expect(page.locator('.leaflet-marker-icon').first()).toBeVisible();
	await page.locator('.leaflet-marker-icon').first().click();
	await expect(page.locator('.leaflet-popup a').first()).toHaveAttribute('href', /\/entry\/#/);
	await page.getByRole('link', { name: 'Visualizations', exact: true }).click();
	for (const id of ['vis1', 'vis2', 'vis3']) {
		await expect(page.locator(`#${id} svg.marks`)).toBeVisible({ timeout: 20_000 });
	}
	expect(errors).toEqual([]);
});
