import { ok } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

test('data freshness', async () => {
	const generated = await readFile('./src/data/generated.txt', 'utf8');
	const generatedDate = new Date(generated).getTime();
	const now = new Date().getTime();
	const diff = now - generatedDate;
	ok(diff < 1000 * 60 * 60 * 24 * 30, 'Archived data must be less than 30 days old');
});
