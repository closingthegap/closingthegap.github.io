import { deepEqual, equal } from 'node:assert/strict';
import { test } from 'node:test';
import { fetchCategories, getInvalidKeywords, searchEntries } from '../src/lib/utils.ts';
import type { JsonStuff } from '../src/lib/utils.ts';

const entries: [string, JsonStuff][] = [
	[
		'one',
		{
			project: {
				title: 'Manuscript Atlas',
				abbr: '',
				project_desc: '',
				places: [],
				keywords: ['Arabic_Studies'],
				related_institutions: [{ org_name: { text: 'Example University' } }]
			}
		}
	],
	[
		'two',
		{
			project: {
				title: 'Other Project',
				abbr: '',
				project_desc: '',
				places: [],
				keywords: [],
				related_institutions: []
			}
		}
	]
];

test('search matches title, keyword and institution independently, ignoring case', () => {
	for (const term of ['MANUSCRIPT', 'ARABIC_STUDIES', 'EXAMPLE UNIVERSITY']) {
		deepEqual(searchEntries(entries, term), [entries[0]], term);
	}
	deepEqual(searchEntries(entries, ''), entries);
	deepEqual(searchEntries(entries, 'no match'), []);
});

test('building a subset of categories leaves the full taxonomy unchanged', () => {
	const keywords = { arabic_studies: [], jewish_studies: [] };
	const before = structuredClone(fetchCategories(keywords));
	equal(Object.values(before).flat().length, 2);
	fetchCategories({ arabic_studies: [] });
	deepEqual(fetchCategories(keywords), before);
});

test('keyword availability uses intersections and tolerates unknown URL terms', () => {
	const keywords = { a: ['one', 'two'], b: ['two', 'three'], c: ['three'], d: ['one'] };
	deepEqual(getInvalidKeywords(keywords, 'keywords', new Set(['a', 'b'])), new Set(['c', 'd']));
	deepEqual(
		getInvalidKeywords(keywords, 'keywords', new Set(['unknown'])),
		new Set(['a', 'b', 'c', 'd'])
	);
});
