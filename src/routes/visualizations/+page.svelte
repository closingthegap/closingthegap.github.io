<script lang="ts">
	import { onMount } from 'svelte';

	import { default as vegaEmbed } from 'vega-embed';
	import type { VisualizationSpec } from 'vega-embed';

	import { createData } from './data_management';

	const { projects, siblingDependencies, parentChildDependencies, cooperationDependencies } =
		createData();
	let sustainabilityChartEl: HTMLDivElement;

	const spec1: VisualizationSpec = {
		$schema: 'https://vega.github.io/schema/vega/v5.json',
		description:
			'A network diagram of software dependencies, with edges grouped via hierarchical edge bundling',
		autosize: 'pad',
		width: 1000,
		height: 1000,
		padding: 12,
		title: {
			text: 'Relations',
			orient: 'top',
			fontSize: 35,
			fontWeight: 'bold',
			offset: 35,
			color: 'black',
			subtitle: [
				"This chart illustrates institutional and collaborative relationships between projects.'Sibling' denotes projects hosted by the same institution or",
				"university, 'parent' and 'child' indicate subprojects within a larger project or cluster, and 'cooperation' represents projects engaged in active collaboration."
			],
			subtitleFontSize: 17,
			subtitleFontWeight: 'normal',
			subtitleColor: 'black',
			subtitlePadding: 30
		},

		signals: [
			{ name: 'tension', value: 0.85 },
			{ name: 'radius', value: 280 },
			{ name: 'extent', value: 360 },
			{ name: 'rotate', value: 0 },
			{ name: 'textSize', value: 8 },
			{ name: 'textOffset', value: 8 },
			{ name: 'layout', value: 'cluster' },
			{ name: 'colorSib', value: 'firebrick' },
			{ name: 'colorPar', value: 'forestgreen' },
			{ name: 'colorChild', value: 'orange' },
			{ name: 'colorCoop', value: 'darkorchid' },
			{ name: 'originX', update: 'width / 2' },
			{ name: 'originY', update: 'height / 2' },
			{
				name: 'active',
				value: null,
				on: [
					{ events: 'text:mouseover', update: 'datum.id' },
					{ events: 'mouseover[!event.item]', update: 'null' }
				]
			},
			{ name: 'innerRadius', value: 281 },
			{ name: 'outerRadius', value: 287 }
		],

		data: [
			{
				name: 'tree',
				values: projects,
				transform: [
					{
						type: 'stratify',
						key: 'id',
						parentKey: 'parent'
					},
					{
						type: 'tree',
						method: { signal: 'layout' },
						size: [1, 1],
						as: ['alpha', 'beta', 'depth', 'children']
					},
					{
						type: 'formula',
						expr: '(rotate + extent * datum.alpha + 270) % 360',
						as: 'angle'
					},
					{
						type: 'formula',
						expr: 'inrange(datum.angle, [90, 270])',
						as: 'leftside'
					},
					{
						type: 'formula',
						expr: 'originX + radius * datum.beta * cos(PI * datum.angle / 180)',
						as: 'x'
					},
					{
						type: 'formula',
						expr: 'originY + radius * datum.beta * sin(PI * datum.angle / 180)',
						as: 'y'
					},
					{
						type: 'formula',
						expr: '2*PI*datum.alpha',
						as: 'rangle'
					}
				]
			},
			{
				name: 'leaves',
				source: 'tree',
				transform: [
					{
						type: 'filter',
						expr: '!datum.children'
					}
				]
			},
			{
				name: 'sib_dependencies',
				values: siblingDependencies,
				transform: [
					{
						type: 'formula',
						expr: "treePath('tree', datum.source, datum.target)",
						as: 'treepath',
						initonly: true
					}
				]
			},
			{
				name: 'sib_selected',
				source: 'sib_dependencies',
				transform: [
					{
						type: 'filter',
						expr: 'datum.source === active || datum.target === active'
					}
				]
			},
			{
				name: 'par_dependencies',
				values: parentChildDependencies,
				transform: [
					{
						type: 'formula',
						expr: "treePath('tree', datum.source, datum.target)",
						as: 'treepath',
						initonly: true
					}
				]
			},
			{
				name: 'par_selected',
				source: 'par_dependencies',
				transform: [
					{
						type: 'filter',
						expr: 'datum.source === active || datum.target === active'
					}
				]
			},
			{
				name: 'coop_dependencies',
				values: cooperationDependencies,
				transform: [
					{
						type: 'formula',
						expr: "treePath('tree', datum.source, datum.target)",
						as: 'treepath',
						initonly: true
					}
				]
			},
			{
				name: 'coop_selected',
				source: 'coop_dependencies',
				transform: [
					{
						type: 'filter',
						expr: 'datum.source === active || datum.target === active'
					}
				]
			}
		],

		marks: [
			{
				type: 'arc',
				from: { data: 'leaves' },
				encode: {
					enter: {
						fill: { scale: 'cat_color', field: 'root' },
						fillOpacity: { value: 0.6 },
						padAngle: { value: 0 },
						x: { signal: 'originX' },
						y: { signal: 'originY' },
						href: { field: 'parenturl' }
					},
					update: {
						startAngle: { signal: 'datum.rangle-0.075' },
						endAngle: { signal: 'datum.rangle+0.075' },
						innerRadius: { signal: 'innerRadius' },
						outerRadius: { signal: 'outerRadius' },
						cornerRadius: { value: 0 },
						tooltip: { field: 'parentName' }
					},
					hover: { cursor: { value: 'pointer' } }
				}
			},
			{
				type: 'text',
				from: { data: 'leaves' },
				encode: {
					enter: {
						text: { field: 'name' },
						limit: { value: 200 },
						baseline: { value: 'middle' },
						href: { field: 'url' }
					},
					update: {
						x: { field: 'x' },
						y: { field: 'y' },
						dx: { signal: 'textOffset * (datum.leftside ? -1 : 1)' },
						angle: { signal: 'datum.leftside ? datum.angle - 180 : datum.angle' },
						align: { signal: "datum.leftside ? 'right' : 'left'" },
						fontSize: { signal: 'textSize' },
						fontWeight: [
							{ test: "indata('sib_selected', 'source', datum.id)", value: 'bold' },
							{ test: "indata('sib_selected', 'target', datum.id)", value: 'bold' },
							{ test: "indata('par_selected', 'source', datum.id)", value: 'bold' },
							{ test: "indata('par_selected', 'target', datum.id)", value: 'bold' },
							{ test: "indata('coop_selected', 'source', datum.id)", value: 'bold' },
							{ test: "indata('coop_selected', 'target', datum.id)", value: 'bold' },
							{ value: null }
						],
						fill: [
							{ test: 'datum.id === active', value: 'black' },
							{ test: "indata('sib_selected', 'source', datum.id)", signal: 'colorSib' },
							{ test: "indata('sib_selected', 'target', datum.id)", signal: 'colorSib' },
							{ test: "indata('par_selected', 'source', datum.id)", signal: 'colorPar' },
							{ test: "indata('par_selected', 'target', datum.id)", signal: 'colorChild' },
							{ test: "indata('coop_selected', 'source', datum.id)", signal: 'colorCoop' },
							{ test: "indata('coop_selected', 'target', datum.id)", signal: 'colorCoop' },
							{ value: 'black' }
						]
					},
					hover: { cursor: { value: 'pointer' } }
				}
			},
			{
				type: 'group',
				from: {
					facet: {
						name: 'path',
						data: 'sib_dependencies',
						field: 'treepath'
					}
				},
				marks: [
					{
						type: 'line',
						interactive: false,
						from: { data: 'path' },
						encode: {
							enter: {
								interpolate: { value: 'bundle' },
								strokeWidth: { value: 1.5 }
							},
							update: {
								stroke: [
									{ test: 'parent.source === active', signal: 'colorSib' },
									{ test: 'parent.target === active', signal: 'colorSib' },
									{ value: 'steelblue' }
								],
								strokeOpacity: [
									{ test: 'parent.source === active || parent.target === active', value: 1 },
									{ value: 0.2 }
								],
								tension: { signal: 'tension' },
								x: { field: 'x' },
								y: { field: 'y' }
							}
						}
					}
				]
			},
			{
				type: 'group',
				from: {
					facet: {
						name: 'path',
						data: 'par_dependencies',
						field: 'treepath'
					}
				},
				marks: [
					{
						type: 'line',
						interactive: false,
						from: { data: 'path' },
						encode: {
							enter: {
								interpolate: { value: 'bundle' },
								strokeWidth: { value: 1.5 }
							},
							update: {
								stroke: [
									{ test: 'parent.source === active', signal: 'colorChild' },
									{ test: 'parent.target === active', signal: 'colorPar' },
									{ value: 'steelblue' }
								],
								strokeOpacity: [
									{ test: 'parent.source === active || parent.target === active', value: 1 },
									{ value: 0.2 }
								],
								tension: { signal: 'tension' },
								x: { field: 'x' },
								y: { field: 'y' }
							}
						}
					}
				]
			},
			{
				type: 'group',
				from: {
					facet: {
						name: 'path',
						data: 'coop_dependencies',
						field: 'treepath'
					}
				},
				marks: [
					{
						type: 'line',
						interactive: false,
						from: { data: 'path' },
						encode: {
							enter: {
								interpolate: { value: 'bundle' },
								strokeWidth: { value: 1.5 }
							},
							update: {
								stroke: [
									{ test: 'parent.source === active', signal: 'colorCoop' },
									{ test: 'parent.target === active', signal: 'colorCoop' },
									{ value: 'steelblue' }
								],
								strokeOpacity: [
									{ test: 'parent.source === active || parent.target === active', value: 1 },
									{ value: 0.2 }
								],
								tension: { signal: 'tension' },
								x: { field: 'x' },
								y: { field: 'y' }
							}
						}
					}
				]
			}
		],

		scales: [
			{
				name: 'color',
				type: 'ordinal',
				domain: ['sibling', 'parent', 'child', 'cooperation'],
				range: [
					{ signal: 'colorSib' },
					{ signal: 'colorPar' },
					{ signal: 'colorChild' },
					{ signal: 'colorCoop' }
				]
			},
			{
				name: 'cat_color',
				type: 'ordinal',
				domain: { data: 'leaves', field: 'root' },
				range: { scheme: 'set1' }
			},
			{
				name: 'opacity',
				type: 'linear',
				range: [0.6, 0.6]
			}
		],

		legends: [
			{
				stroke: 'color',
				orient: 'bottom-left',
				title: 'Relations',
				titleFontSize: 16,
				labelFontSize: 14,
				symbolType: 'stroke',
				symbolStrokeWidth: 3
			},
			{
				stroke: 'cat_color',
				orient: 'bottom-right',
				title: 'Categories',
				titleFontSize: 16,
				labelFontSize: 14,
				symbolType: 'circle',
				fill: 'cat_color',
				columns: 2
			}
		]
	};

	const spec2: VisualizationSpec = {
		$schema: 'https://vega.github.io/schema/vega/v5.json',
		description: 'An example of a space-fulling radial layout for hierarchical data.',
		autosize: 'pad',
		width: 750,
		height: 750,
		padding: 44,
		title: {
			text: 'Categories',
			orient: 'top',
			fontSize: 35,
			fontWeight: 'bold',
			offset: 50,
			color: 'black',
			subtitle: [
				'This chart displays categories and subcategories of the projects. In cases of overlap, the most prominent feature of each project was chosen as',
				'the display category.'
			],
			subtitleFontSize: 17,
			subtitleFontWeight: 'normal',
			subtitleColor: 'black',
			subtitlePadding: 30
		},

		data: [
			{
				name: 'tree',
				values: projects,
				transform: [
					{ type: 'stratify', key: 'id', parentKey: 'parent' },
					{
						type: 'partition',
						sort: { field: 'value' },
						size: [{ signal: '2 * PI' }, { signal: 'width / 2' }],
						as: ['a0', 'r0', 'a1', 'r1', 'depth', 'children']
					},
					{ type: 'filter', expr: 'datum.id !== "c14c4b13-2d8a-47da-9682-fce6a5131f04"' },
					{ type: 'filter', expr: 'datum.layer !== 1' },
					{ type: 'formula', as: 'root_parent', expr: 'datum.root' },
					{
						type: 'label',
						size: { signal: '[width, height]' },
						anchor: ['top', 'bottom', 'left', 'right']
					},
					{
						type: 'formula',
						expr: '((datum.a0 + datum.a1) / 2) > PI',
						as: 'leftside'
					}
				]
			}
		],

		scales: [
			{
				name: 'color',
				type: 'ordinal',
				domain: { data: 'tree', field: 'root_parent' },
				range: { scheme: 'category10' }
			},
			{
				name: 'brightness',
				type: 'linear',
				domain: { data: 'tree', field: 'depth' },
				range: [1.5, 0.7]
			}
		],

		marks: [
			{
				type: 'group',
				from: {
					facet: {
						name: 'layer',
						data: 'tree',
						groupby: 'layer'
					}
				},
				marks: [
					{
						type: 'arc',
						from: { data: 'layer' },
						encode: {
							enter: {
								x: { signal: 'width / 2' },
								y: { signal: 'height / 2' },
								fill: [{ scale: 'color', field: 'root_parent' }],
								fillOpacity: { scale: 'brightness', field: 'depth' },
								href: { field: 'url' },
								tooltip: {
									signal: 'datum.name'
								}
							},
							update: {
								startAngle: { field: 'a0' },
								endAngle: { field: 'a1' },
								innerRadius: { signal: 'datum.layer === 2 ? 100 : 280' },
								outerRadius: { field: 'r1' },
								stroke: { value: 'white' },
								strokeWidth: { value: 0.5 },
								zindex: { value: 0 }
							},
							hover: {
								stroke: { value: 'white' },
								strokeWidth: { value: 2 },
								zindex: { value: 0 }
							}
						}
					},
					{
						type: 'text',
						from: { data: 'layer' },
						encode: {
							enter: {
								text: { field: 'name' },
								fill: { value: 'white' },
								baseline: { value: 'middle' },
								fontSize: { signal: 'datum.layer === 3 ? 9 : 15' },
								limit: { signal: 'datum.layer === 3 ? 80 : 110' },
								href: { field: 'url' },
								tooltip: {
									signal: 'datum.name'
								}
							},
							update: {
								x: { signal: 'width / 2' },
								y: { signal: 'height / 2' },
								dx: { signal: 'datum.layer == 3 ? -37: (datum.leftside ? 80 : -80 )' },
								align: { signal: "datum.layer == 2 && datum.leftside ? 'right' : 'left'" },
								radius: { signal: '(datum.r0 == 0 ? 0 : datum.r0 + datum.r1) / 2' },
								theta: { signal: '(datum.a0 + datum.a1) / 2' },
								angle: {
									signal:
										'datum.r0 == 0 ? 0 : ((datum.a0 + datum.a1) / 2) * 180 / PI + (inrange(((datum.a0 + datum.a1 ) / 2) % (2 * PI), [0, PI]) ? 270 :90)'
								}
							}
						}
					}
				]
			}
		],

		legends: [
			{
				stroke: 'color',
				fill: 'color',
				// orient: 'none',
				title: 'Categories',
				symbolType: 'circle',
				orient: 'bottom-right',
				titleFontSize: 16,
				labelFontSize: 14,
				padding: -30
			}
		],

		config: {}
	};

	onMount(async () => {
		vegaEmbed('#vis2', spec2, {});
		vegaEmbed('#vis1', spec1, {});
		const res = await fetch(
			'https://raw.githubusercontent.com/closingthegap/closingthegap.github.io/master/PROJECTS.json'
		);
		const allProjects = await res.json();

		const rawBasePath =
			'https://raw.githubusercontent.com/closingthegap/closingthegap.github.io/master';

		const rawProjects = await Promise.all(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			Object.entries(allProjects).map(async ([uuid, project]: any) => {
				const folderPath = project.path;
				const filePath =
					rawBasePath +
					(folderPath.endsWith('/')
						? folderPath + uuid + '.json'
						: folderPath + '/' + uuid + '.json');

				try {
					const res = await fetch(filePath);
					const data = await res.json();
					const s = data.project?.research_data?.sustainability_plan ?? {};

					return {
						website: s.project_website ?? 'N/A',
						github: s.GitHub ?? 'N/A',
						data_accessibility: s.data_accessibility ?? 'N/A',
						publications: s.publications ?? 'N/A',
						publication_count: s.publication_count ?? 0,
						open_access_count: s.open_access_count ?? 0,
						webhosting: s.webhosting ?? 'N/A'
					};
				} catch (err) {
					console.warn(`⚠️ Failed to load project ${uuid}:`, err);
					return null;
				}
			})
		);
		const projects = rawProjects.filter((p) => p !== null);
		const total = projects.length;
		const countBy = (key: string, val: number) => projects.filter((p) => p[key] === val).length;
		const bar = (cat: string, label: string, count: number) => ({
			Category: cat,
			'Score Label': label,
			Count: count,
			Tooltip: `From ${total} total projects, ${count} projects are in category "${label}".`
		});

		const values = [
			bar('Github', 'Full / Yes', countBy('github', 1.0)),
			bar('Github', 'No / None', countBy('github', 0.0)),
			bar('Data Accessibility', 'Full / Yes', countBy('data_accessibility', 1.0)),
			bar('Data Accessibility', 'Partial / Mentioned', countBy('data_accessibility', 0.5)),
			bar('Data Accessibility', 'No / None', countBy('data_accessibility', 0.0)),
			bar('Publications', 'Full / Yes', countBy('publications', 1.0)),
			bar('Publications', 'No / None', countBy('publications', 0.0)),
			bar(
				'Open Access Publications',
				'Full / Yes',
				projects.filter(
					(p) => p.publication_count > 0 && p.publication_count === p.open_access_count
				).length
			),
			bar(
				'Open Access Publications',
				'Partial / Mentioned',
				projects.filter((p) => p.open_access_count > 0 && p.open_access_count < p.publication_count)
					.length
			),
			bar(
				'Open Access Publications',
				'No / None',
				projects.filter((p) => p.publication_count > 0 && p.open_access_count === 0).length
			),
			bar('Website', 'Full / Yes', countBy('website', 1.0)),
			bar('Website', 'No / None', countBy('website', 0.0)),
			bar('Webhosting', 'Full / Yes', countBy('webhosting', 1.0)),
			bar('Webhosting', 'Partial / Mentioned', countBy('webhosting', 0.5)),
			bar('Webhosting', 'No / None', countBy('webhosting', 0.0))
		];

		const sustainabilitySpec: VisualizationSpec = {
			$schema: 'https://vega.github.io/schema/vega-lite/v5.json',
			title: {
				text: 'Sustainability Overview',
				orient: 'top',
				fontSize: 24,
				fontWeight: 'bold',
				offset: 50,
				color: 'black',
				subtitle: [
					'This chart visualizes sustainability-related metadata for each project in our database, including their web presence, data accessibility, publications,',
					'open accessibility of their publications and their usage of GitHub'
				],
				anchor: 'middle',
				subtitleFontSize: 14,
				subtitleFontWeight: 'normal',
				subtitleColor: 'black',
				subtitlePadding: 30
			},
			axis: {
				labelFont: 'Inter',
				titleFont: 'Inter',
				labelFontSize: 16,
				titleFontSize: 14,
				labelColor: '#2F4A60',
				titleColor: '#2F4A60'
			},
			legend: {
				labelFont: 'bold',
				titleFont: 'bold',
				labelFontSize: 16,
				titleFontSize: 14
			},
			data: { values },
			selection: {
				highlight: { type: 'single', on: 'mouseover', empty: 'all', clear: 'mouseout' }
			},
			mark: 'bar',
			encoding: {
				x: {
					field: 'Category',
					type: 'nominal',
					title: 'Category',
					axis: { labelAngle: 15 },
					sort: [
						'Github',
						'Data Accessibility',
						'Publications',
						'Open Access Publications',
						'Website',
						'Webhosting'
					]
				},
				xOffset: { field: 'Score Label', type: 'nominal' },
				y: { field: 'Count', type: 'quantitative', title: 'Number of Projects' },
				color: {
					field: 'Score Label',
					type: 'nominal',
					legend: {
						title: 'Values',
						titleFontSize: 16,
						labelFontSize: 14,
						orient: 'bottom',
						direction: 'horizontal',
						columns: 2
					},
					scale: {
						domain: ['Full / Yes', 'Partial / Mentioned', 'No / None'],
						range: ['#2F4A60', '#F29559', '#B8B18F']
					}
				},
				opacity: {
					condition: { selection: 'highlight', value: 1 },
					value: 0.5
				},
				tooltip: [{ field: 'Tooltip', type: 'nominal', title: 'Details' }]
			},
			autosize: { type: 'pad', contains: 'padding' },
			width: 1050,
			height: 450,
			padding: 44,
			config: {
				bar: {
					innerPadding: 5
				}
			}
		};

		vegaEmbed(sustainabilityChartEl, sustainabilitySpec);
	});
</script>

<div class="flex justify-center overflow-auto px-4">
	<div
		bind:this={sustainabilityChartEl}
		id="vis3"
		class="mb-4 rounded-lg bg-gray-50 p-4"
		style="min-width: 750px; max-width: 1220px;"
	></div>
</div>

<div class="flex justify-center px-4">
	<div id="vis1" class="mb-4 rounded-lg bg-gray-50 p-4"></div>
</div>

<div class="flex justify-center px-4">
	<div id="vis2" class="mb-4 rounded-lg bg-gray-50 p-4"></div>
</div>
