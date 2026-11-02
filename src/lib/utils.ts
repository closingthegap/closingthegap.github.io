import { get } from 'svelte/store';
import { searchTerm, selectedTab, selectedTerms } from '#lib/stores.ts';
import keywordsRaw from '../data/KEYWORDS.json' with { type: 'json' };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JsonStuff = Record<string, any>;

export function fetchCategories(keywordsMap: Record<string, string[]>): Record<string, string[]> {
	const usedKeys = new Set(Object.keys(keywordsMap));
	return Object.fromEntries(
		Object.entries(keywordsRaw).map(([category, keywords]) => [
			category,
			keywords.filter((keyword) => usedKeys.has(keyword)).sort()
		])
	);
}

export function filterPlaces(places: JsonStuff[]): JsonStuff[] {
	return places.filter((place) => place.place_name.text);
}

export function getInvalidKeywords(
	keywordsMap: Record<string, string[]>,
	selectedTab: string,
	selectedTerms: Set<string>
): Set<string> {
	if (selectedTab !== 'keywords' || selectedTerms.size === 0) {
		return new Set<string>();
	}

	//
	// First, reconstruct which entries are selected, based on keywords
	//

	const selectedUrls = new Set<string>();
	let firstIteration = true;

	for (const keyword of selectedTerms) {
		const nextUrls = keywordsMap[keyword] ?? [];

		if (firstIteration) {
			nextUrls.forEach((url) => selectedUrls.add(url));
			firstIteration = false;
			continue;
		}

		for (const url of selectedUrls) {
			if (!nextUrls.includes(url)) {
				selectedUrls.delete(url);
			}
		}
	}

	//
	// Second, determine which further keywords would yield no entries
	//

	const keywordsToDisable = new Set<string>();

	outer: for (const [keyword, urls] of Object.entries(keywordsMap)) {
		for (const url of urls) {
			if (selectedUrls.has(url)) continue outer;
		}

		keywordsToDisable.add(keyword);
	}

	return keywordsToDisable;
}

export function getKeywords(entries: [string, JsonStuff][]): Record<string, string[]> {
	const keywordsMap: Record<string, string[]> = {};

	for (const [url, data] of entries) {
		const keywords: string[] = data.project.keywords;

		for (const keyword of keywords) {
			if (keywordsMap[keyword]) {
				keywordsMap[keyword].push(url);
			} else {
				keywordsMap[keyword] = [url];
			}
		}
	}

	return keywordsMap;
}

export function getLanguages(entries: [string, JsonStuff][]): Record<string, string[]> {
	const languagesMap: Record<string, string[]> = {};

	for (const [url, data] of entries) {
		const languages: string[] = data.project.research_data.lang;

		for (const language of languages) {
			if (languagesMap[language]) {
				languagesMap[language].push(url);
			} else {
				languagesMap[language] = [url];
			}
		}
	}

	return languagesMap;
}

export function handleHash() {
	if (window.location.hash) {
		if (window.location.hash.startsWith('#keywords=')) {
			selectedTab.set('keywords');

			const keywords = window.location.hash.split('keywords=')[1];
			const keywordsArray = keywords.split(',');

			selectedTerms.set(new Set(keywordsArray));
		} else if (window.location.hash.startsWith('#languages=')) {
			selectedTab.set('languages');

			const langs = window.location.hash.split('languages=')[1];
			const langsArray = langs.split(',');

			selectedTerms.set(new Set(langsArray));
		} else {
			// TODO: handle search hash?
			// For now, just reset
			searchTerm.set('');
			selectedTerms.set(new Set());
		}
	} else {
		// No hash; just make sure everything is reset
		searchTerm.set('');
		selectedTerms.set(new Set());
	}
}

export function resetHash() {
	searchTerm.set('');
	selectedTerms.set(new Set());
	window.location.hash = '';
}

export function searchEntries(entries: [string, JsonStuff][], term: string): [string, JsonStuff][] {
	const termLower = term.toLowerCase();
	const matches: [string, JsonStuff][] = [];

	for (const [url, entry] of entries) {
		// Title
		const title = entry.project.title.toLowerCase();
		if (title.includes(termLower)) {
			matches.push([url, entry]);
			continue;
		}

		// Abbreviation
		const abbr = entry.project.abbr.toLowerCase();
		if (abbr.includes(termLower)) {
			matches.push([url, entry]);
			continue;
		}

		// Description
		const description = entry.project.project_desc.toLowerCase();
		if (description.includes(termLower)) {
			matches.push([url, entry]);
			continue;
		}

		// Keywords
		const keywords = entry.project.keywords.join(' ').toLowerCase();
		if (keywords.includes(termLower)) {
			matches.push([url, entry]);
			continue;
		}

		// Places
		let places = '';
		for (const place of entry.project.places) {
			if (place.place_name.text) {
				places += place.place_name.text.toLowerCase();
				places += ' ';
			}
		}
		places = places.trim();
		if (places.includes(termLower)) {
			matches.push([url, entry]);
			continue; // Not needed at the moment, but maybe later
		}
		// Hosting University
		if (entry.project.related_institutions) {
			for (const inst of entry.project.related_institutions) {
				const name = inst.org_name?.text?.toLowerCase();
				if (name && name.includes(termLower)) {
					matches.push([url, entry]);
					break;
				}
			}
		}
	}

	return matches;
}

export function updateHash(type: string, term: string) {
	selectedTerms.update((terms) => {
		if (terms.has(term)) {
			terms.delete(term);
		} else {
			terms.add(term);
		}
		return terms;
	});

	const termsArray = Array.from(get(selectedTerms));

	if (termsArray.length === 0) {
		window.location.hash = '';
		return;
	}

	const termsString = termsArray.join(',');
	window.location.hash = `#${type}=${termsString}`;
}
