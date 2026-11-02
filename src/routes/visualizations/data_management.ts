import entriesRaw from '../../data/ENTRIES.json';
import type { JsonStuff } from '#lib/utils.ts';

interface Dependency {
	source: string;
	target: string;
}

export function createData() {
	const entries = entriesRaw as [string, JsonStuff][];

	const parentChildDependencies: Dependency[] = [];
	const siblingDependencies: Dependency[] = [];
	const cooperationDependencies: Dependency[] = [];

	const projects: Record<string, string | number>[] = [
		{
			id: 'c14c4b13-2d8a-47da-9682-fce6a5131f04',
			name: 'projects'
		},
		{
			id: '48e3d654-64a5-4e44-895c-4e3be2948c25',
			name: 'digital preservation',
			parent: 'c14c4b13-2d8a-47da-9682-fce6a5131f04',
			root: 'Digital Preservation',
			layer: 1
		},
		{
			id: '2b06fd08-c945-4e4b-8cb8-3f8ab8ea508b',
			name: 'tools and analysis',
			parent: 'c14c4b13-2d8a-47da-9682-fce6a5131f04',
			root: 'Tools and Analysis',
			layer: 1
		},
		{
			id: 'e8cef6bd-48b1-4993-9f65-090131ecab4f',
			name: 'infrastructure',
			parent: 'c14c4b13-2d8a-47da-9682-fce6a5131f04',
			root: 'Infrastructure',
			layer: 1
		},
		{
			id: '1846617d-2f8b-4bd6-b3a6-f9dde81885c1',
			name: 'other',
			parent: 'c14c4b13-2d8a-47da-9682-fce6a5131f04',
			root: 'Other',
			layer: 1
		},
		{
			id: '71b6fa5b-4ca1-45c7-ac0e-83f358c3fa10',
			name: 'digital edition',
			parent: '48e3d654-64a5-4e44-895c-4e3be2948c25',
			root: 'Digital Preservation',
			layer: 2
		},
		{
			id: '6d0412ff-4845-46cc-8745-81838c752735',
			name: 'corpus',
			parent: '48e3d654-64a5-4e44-895c-4e3be2948c25',
			root: 'Digital Preservation',
			layer: 2
		},
		{
			id: '27c02a0a-2437-43a6-8f42-a8d857cb89a4',
			name: 'catalog',
			parent: '48e3d654-64a5-4e44-895c-4e3be2948c25',
			root: 'Digital Preservation',
			layer: 2
		},
		{
			id: 'cce3d241-a4c2-4f50-829c-d99b74c4b15c',
			name: 'other',
			parent: '48e3d654-64a5-4e44-895c-4e3be2948c25',
			root: 'Digital Preservation',
			layer: 2
		},
		{
			id: 'b1f60044-c453-41c0-a303-353c5919d6a3',
			name: 'ocr',
			parent: '2b06fd08-c945-4e4b-8cb8-3f8ab8ea508b',
			root: 'Tools and Analysis',
			layer: 2
		},
		{
			id: 'b09a4bb7-902c-4eba-a739-26dbd02bfe81',
			name: 'computational text analysis',
			parent: '2b06fd08-c945-4e4b-8cb8-3f8ab8ea508b',
			root: 'Tools and Analysis',
			layer: 2
		},
		{
			id: 'd0120075-b751-449b-91b1-9a6f65295c80',
			name: 'language documentation',
			parent: '2b06fd08-c945-4e4b-8cb8-3f8ab8ea508b',
			root: 'Tools and Analysis',
			layer: 2
		},
		{
			id: '23bd726f-2a19-41b0-8f76-67f57f13d14f',
			name: 'lexicon',
			parent: '2b06fd08-c945-4e4b-8cb8-3f8ab8ea508b',
			root: 'Tools and Analysis',
			layer: 2
		},
		{
			id: '3f761412-15a1-40e0-bdf9-79a12876a93c',
			name: 'network analysis',
			parent: '2b06fd08-c945-4e4b-8cb8-3f8ab8ea508b',
			root: 'Tools and Analysis',
			layer: 2
		},
		{
			id: '39313b86-36cd-4b40-a7f8-0ced04cc5370',
			name: 'encyclopedia',
			parent: '2b06fd08-c945-4e4b-8cb8-3f8ab8ea508b',
			root: 'Tools and Analysis',
			layer: 2
		},
		{
			id: 'cf6cfc52-a5cc-428b-a7d5-4804a8681a4a',
			name: 'other',
			parent: '2b06fd08-c945-4e4b-8cb8-3f8ab8ea508b',
			root: 'Tools and Analysis',
			layer: 2
		},
		{
			id: 'aa68aab0-4051-46a6-9279-f2a46033316b',
			name: 'infrastructure',
			parent: 'e8cef6bd-48b1-4993-9f65-090131ecab4f',
			root: 'Infrastructure',
			layer: 2
		},
		{
			id: '691f8f99-77e8-46fa-86c8-0453718d7ab2',
			name: 'other',
			parent: '1846617d-2f8b-4bd6-b3a6-f9dde81885c1',
			root: 'Other',
			layer: 2
		}
	];

	for (const row of entries) {
		const relations: Record<string, string>[] = row[1]['project']['related_entities'];
		const category: string = row[1]['project']['category'];
		const keywords: string[] = row[1]['project']['keywords'];
		const uuid: string = row[1]['record_metadata']['uuid'];
		// Create projects array

		if (category === 'digital_preservation') {
			if (keywords.includes('digital_edition')) {
				appendProjects(projects, row, uuid, '71b6fa5b-4ca1-45c7-ac0e-83f358c3fa10');
			} else if (keywords.includes('corpus_output')) {
				appendProjects(projects, row, uuid, '6d0412ff-4845-46cc-8745-81838c752735');
			} else if (keywords.includes('catalog')) {
				appendProjects(projects, row, uuid, '27c02a0a-2437-43a6-8f42-a8d857cb89a4');
			} else appendProjects(projects, row, uuid, 'cce3d241-a4c2-4f50-829c-d99b74c4b15c');
		} else if (category === 'tools_and_analysis') {
			if (keywords.includes('ocr')) {
				appendProjects(projects, row, uuid, 'b1f60044-c453-41c0-a303-353c5919d6a3');
			} else if (keywords.includes('computational_text_analysis')) {
				appendProjects(projects, row, uuid, 'b09a4bb7-902c-4eba-a739-26dbd02bfe81');
			} else if (keywords.includes('language_documentation')) {
				appendProjects(projects, row, uuid, 'd0120075-b751-449b-91b1-9a6f65295c80');
			} else if (keywords.includes('lexicon')) {
				appendProjects(projects, row, uuid, '23bd726f-2a19-41b0-8f76-67f57f13d14f');
			} else if (keywords.includes('network_analysis')) {
				appendProjects(projects, row, uuid, '3f761412-15a1-40e0-bdf9-79a12876a93c');
			} else if (keywords.includes('encyclopedia')) {
				appendProjects(projects, row, uuid, '39313b86-36cd-4b40-a7f8-0ced04cc5370');
			} else appendProjects(projects, row, uuid, 'cf6cfc52-a5cc-428b-a7d5-4804a8681a4a');
		} else if (category === 'infrastructure') {
			appendProjects(projects, row, uuid, 'aa68aab0-4051-46a6-9279-f2a46033316b');
		} else appendProjects(projects, row, uuid, '691f8f99-77e8-46fa-86c8-0453718d7ab2');

		// Create dependencies
		appendDependencies(relations, 'sibling', siblingDependencies, uuid);
		appendDependencies(relations, 'child', parentChildDependencies, uuid);
		appendDependencies(relations, 'cooperation', cooperationDependencies, uuid);
	}

	return { projects, siblingDependencies, parentChildDependencies, cooperationDependencies };
}

function appendProjects(
	projects: Record<string, string | number>[],
	row: [string, JsonStuff],
	uuid: string,
	parentId: string
) {
	const parent = projects.find((project) => project.id === parentId);
	const name = row[1]['project']['title'];

	const projectItem = {
		id: uuid,
		name,
		parent: parentId,
		parentName: parent ? parent['name'] : '',
		root: parent ? parent['root'] : '',
		url: row[1]['project']['websites'][0],
		layer: 3
	};

	projects.push(projectItem);
}

function appendDependencies(
	relations: Record<string, string>[],
	relationType: string,
	dependencyType: Dependency[],
	uuid: string
) {
	for (const row of relations) {
		if (row['relation_type'] === relationType) {
			const dependencyItem = {
				source: uuid,
				target: row['uuid']
			};

			dependencyType.push(dependencyItem);
		}
	}
}
