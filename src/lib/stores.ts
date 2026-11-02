import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { JsonStuff } from '#lib/utils.ts';

export const searchTerm: Writable<string> = writable('');
export const selectedTab: Writable<string> = writable('search');
export const selectedTerms: Writable<Set<string>> = writable(new Set());

export const selectedEntries: Writable<[string, JsonStuff][]> = writable([]);
