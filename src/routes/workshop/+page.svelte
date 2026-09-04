<script>

	const sessions = [
		{
			id: 1,
			day: 'Day 1 · Monday, 21 September 2026',
			theme: 'NLP and Digital Research Methods',
			tab: 'NLP for Non-Latin Scripts',
			blurb:
				'Natural language processing for non-Latin script languages, especially where the resulting data, models, or analytical outputs challenge conventional modes of scholarly presentation.',
			schedule: [
				{
					type: 'logistics',
					time: '13:00 – 13:30',
					label: 'Registration & Welcome Coffee',
					detail: 'Arrival and informal networking'
				},
				{
					type: 'logistics',
					time: '13:30 – 14:00',
					label: 'Opening Remarks',
					detail: 'Introduction to the workshop aims, themes, and programme'
				},
				{
					type: 'keynote',
					time: '14:00 – 15:00',
					name: 'Prof. Dr. Ingo Scholtes',
					affiliation:
						'Machine Learning for Complex Networks, Center for Artificial Intelligence and Data Science (CAIDAS), Julius-Maximilians-Universität Würzburg',
					link: 'https://www.caidas.uni-wuerzburg.de/ml4nets/team/prof-dr-ingo-scholtes/'
				},
				{ type: 'break', time: '15:00 – 15:15', label: 'Coffee break' },
				{
					type: 'talk',
					time: '15:15 – 15:40',
					speaker: 'Maida Farooq',
					institution: 'Martin Luther University Halle-Wittenberg',
					link: 'https://bibliothek.uni-halle.de/blog/mitarbeiter-in/maida-farooq-buttar/',
					title:
						'From Digitized Images to Sustainable Research Data — An Adaptive, Self-Improving Pipeline for Heterographic Ottoman-Era Print (Karamanlidika and Armeno-Turkish)',
					abstract: [
						'Within the Specialized Information Service (FID) Middle East, North Africa and Islamic Studies, we have developed OCR workflows for historical sources in Arabic and Persian script, including multilingual and multiscript materials, evaluating the limited range of available open-source OCR engines and language models. While these workflows have produced promising results, they have also highlighted the limitations of current OCR technologies for historical non-Latin and multiscript sources, where print quality, orthographic variation, script diversity, and complex page layouts significantly affect recognition accuracy.',
						'In the late Ottoman period, Turkish was written in several scripts according to confessional affiliation. Karamanlidika (Turkish in Greek script) and Armeno-Turkish (Turkish in Armenian script) periodicals are important witnesses to heterographic communication, but pose an acute challenge: a text’s linguistic identity cannot be inferred from its graphic form, no language models exist for these script–language pairs, and orthography is unstable. No single engine performs well across this heterogeneity of scripts, layouts, and scans.',
						'We present an adaptive, quality-assured pipeline with three stages — layout segmentation, line segmentation, and OCR — each offering many engine × model combinations. Rather than fixing one pipeline, the system selects the best combination per stage and per image through a selector benchmark: cheap, stage-specific pre-filters reduce the candidates, which are then ranked by a repeated pairwise tournament in which a vision-language model (VLM) compares two at a time. Each candidate is converted into a simplified, stage-specific, engine-agnostic representation, so the model answers one concrete visual question rather than interpreting raw output.',
						'OCR is the anchor. The pipeline applies the selected combinations by default; the benchmark is invoked only when the OCR stage fails a quality check, whereupon the system falls back to the next-ranked combination and re-runs the selection. Every outcome is recorded and tagged by manuscript characteristics, turning the pipeline into a self-improving loop: a lightweight meta-selector trained on these records recommends combinations directly, while the growing body of extracted texts provides training data to bootstrap a dedicated OCR model for these script–language pairs — a resource that does not yet exist.',
						'As preliminary work, the layout- and line-segmentation stages were applied to ten periodical pages (five Karamanlidika, five Armeno-Turkish), selecting a suitable engine–model combination for each page. Beyond the technical development, this work raises broader questions about how automatically extracted texts can become sustainable and reusable digital research data: how OCR results can be documented, enriched, preserved, and integrated into scholarly workflows, and what infrastructures are needed to move beyond mere file storage towards long-term citation, interoperability, and reuse.'
					]
				},
				{
					type: 'talk',
					time: '15:40 – 16:05',
					speaker: 'Marcus Pöckelmann',
					institution: 'Freie Universität Berlin',
					link: 'https://www.geschkult.fu-berlin.de/e/compas/mitarbeiter_innen/drittmittel/marcus-poeckelmann/index.html',
					title:
						'Hittite state treaties as a case study to test the processing of cuneiform texts in LERA',
					abstract: [
						'Collation, i.e. the comparison of differing witnesses of a text, is a common task for humanities scholars from various disciplines. The free web-based tool LERA (Locate, Explore, Retrace and Apprehend) provides support for the collation of challenging textual material, e.g. having many or extensive witnesses that contain complex textual variation. Initially LERA was developed in the context of European languages with Latin alphabet, but soon applied and enhanced for other languages within the Digital Humanities focus like Arabic and Hebrew. However, getting back to earliest writing systems is a gap that still demands closing due to the complexity of the oldest documents and their digital representation.',
						'The present contribution uses passages from a group of Hittite state treaties as a case study to test the processing of cuneiform texts in LERA. The texts in question come from a number of treaties that were issued by the Hittite king for principalities in Syria and contain passages that are shared not only between manuscripts of the same treaty but between documents issued for different treaty partners. Initial results of these experiments demonstrate the tool’s usefulness, but also raise open questions, such as how the highly fragmentary nature of the texts should be taken into account in a comparative analysis. Evaluating the current limitations and possible solutions for a specific use case thus leads to more general solutions and better tool support for low-resource languages.'
					]
				},
				{
					type: 'panel',
					time: '16:05 – 16:35',
					label: 'Panel Discussion — NLP',
					participants: 'Scholtes, Farooq, and Pöckelmann'
				}
			]
		},
		{
			id: 2,
			day: 'Day 2 · Tuesday, 22 September 2026 · Morning',
			theme: 'Digital Scholarly Communication',
			tab: 'Digital Scholarly Communication',
			blurb:
				'How digital research can be presented beyond the limits of the traditional academic paper — through interactive publications, computational notebooks, dynamic visualizations, and narrative interfaces that integrate data, method, and interpretation.',
			schedule: [
				{
					type: 'logistics',
					time: '09:30 – 10:00',
					label: 'Coffee & Networking',
					detail: 'Informal exchange'
				},
				{
					type: 'keynote',
					time: '10:00 – 11:00',
					name: 'Dr. Maxim G. Romanov',
					affiliation:
						'Emmy Noether research group “The Evolution of Islamic Societies (c. 600–1600 CE)”, Universität Hamburg',
					introducedBy: 'Christian D. Casey',
					introducedByLink: 'https://www.caseyegyptologist.com/',
					link: 'https://www.aai.uni-hamburg.de/en/voror/personen/romanov.html'
				},
				{ type: 'break', time: '11:00 – 11:15', label: 'Coffee break' },
				{
					type: 'talk',
					time: '11:15 – 11:40',
					speaker: 'Tal Bernstein',
					coauthor: 'with Prof. Dr. Letizia Cerqueglini',
					institution: 'Tel Aviv University',
					link: 'https://telaviv.academia.edu/TBernstein',
					title: 'From Digital Edition to Interactive Argument: Publishing Philological Interpretation',
					abstract: [
						'Digital editions often inherit the logic of the paper: they present a stabilized text, while the decisions behind it remain scattered across apparatus, commentary, and bibliography. Addressing Digital Scholarly Communication, we ask what happens when those decisions become part of the publication itself. We argue that digital philology can integrate data, method, and interpretation by preserving the links that connect them.',
						'Scholarly digital editions are critical representations shaped by modeling, not neutral reproductions. In Northwest Semitic epigraphy, especially Phoenician and Punic, largely unrecorded vowels can leave a consonantal sequence open to several lexical or grammatical interpretations, while word division may also be uncertain. A transcription is therefore already an argument.',
						'We demonstrate this through implemented work in the Semitic Epigraphy Annotated & Layered Research Platform, currently centered on Phoenician and Punic inscriptions. Its annotation environment links graphemic evidence to transliteration and linguistic analysis even when textual units cross the monument’s visual lineation. Each proposal retains its source, confidence assessment, and editorial status, while review decisions are recorded without erasing rejected or superseded possibilities. By letting users move from an inscription to a claim, inspect its evidence, and compare alternatives, the interface becomes a curated scholarly reading environment rather than a display surface.',
						'The project also exposes a practical fragility. Relations that specify how textual units combine, how analyses depend on one another, and how claims were evaluated can be represented within an application but are difficult to preserve independently of it. We therefore trace the same scholarly objects from research and interactive presentation to preservation and reuse, distinguishing current capabilities from future design requirements.',
						'We refer to this model as an interactive philological argument. It lets users examine how an interpretation was assembled, challenged, reviewed, and revised. The broader contribution is a methodological shift from publishing conclusions to publishing interpretation as an explorable and reusable scholarly object, while exposing the technical and institutional conditions it requires.'
					]
				},
				{
					type: 'talk',
					time: '11:40 – 12:05',
					speaker: 'Oualid El-Khattabi',
					institution: 'Freie Universität Berlin',
					link: 'https://www.geschkult.fu-berlin.de/e/semiarab/arabistik/team/dfg/el_khattabi/index.html',
					title: 'When You Can See All of It at Once: Synoptic Record, Synoptic Navigation, Derived Maps',
					abstract: [
						'Every major advancement in media/information technology has expanded the scale of what can be held in view. However, the ratio between the quantity of available information and the resolution at which any one scholar can engage it widens with each turn, pushing the individual reader toward increasingly abstract levels of relation to the object of study. A navigational crisis ensues with each expansion of what is available at scale. To navigate, to build the map, becomes both means and end — an attitude toward scholarship.',
						'This distinction emerged from my work on Variorum, an AI-assisted collation environment for automatic drafting, editing, and annotating synoptic alignments of variant-rich Arabic fluid textual traditions. Variorum uses LLMs to draft the time-consuming steps of segmentation and alignment, opening up capacity for review, judgment, iteration, and scale. Once the synoptic edition arrives at this speed and can be expanded at unprecedented scales, the object — what I term the synoptic record — itself begins to require navigation; for once you can see the whole tradition at once, you can no longer hold it in view.',
						'My argument unfolds in three steps. First, I distinguish between the synoptic view and the synoptic record: the edition as a rendered form of comparison, and the record as the segmented, aligned, and reviewable substrate from which that view is produced. Second, I ask what becomes possible once the record is treated as an object in its own right, when annotation and classification function as derived views or maps of the tradition. Third, I describe this movement through the record as synoptic navigation: any derived map gives the scholar distance from the tradition while preserving the possibility of re-entry.',
						'Because these maps are derived from a structured record, I argue that sustainability is increasingly a non-problem in this new age of software abundance. What must persist is a documented record, deposited in open-access repositories according to standards that make it retrievable by AI agents and available for ad hoc visualization through reusable specifications set by their curators. I will share illustrative examples of all the above.'
					]
				},
				{
					type: 'panel',
					time: '12:05 – 12:35',
					label: 'Panel Discussion — Digital Scholarly Communication',
					participants: 'Romanov, Bernstein, El-Khattabi, and Casey'
				},
				{ type: 'logistics', time: '12:35 – 14:00', label: 'Lunch', detail: 'Networking' }
			]
		},
		{
			id: 3,
			day: 'Day 2 · Tuesday, 22 September 2026 · Afternoon',
			theme: 'Sustainability of Digital Scholarship',
			tab: 'Sustainability of Digital Scholarship',
			blurb:
				'Practical strategies for sustaining digital research outputs — low-cost hosting, static and hybrid web architectures, dependency management, data preservation, and institutional or community-based maintenance models.',
			schedule: [
				{
					type: 'keynote',
					time: '14:00 – 15:00',
					name: 'Prof. Dr. Frank Fischer',
					affiliation: 'Professor of Digital Humanities, Freie Universität Berlin',
					introducedBy: 'Joudy Sido Bozan',
					introducedByLink:
						'https://www.geschkult.fu-berlin.de/e/arabistik/team/sido-bozan/index.html',
					link: 'https://www.geisteswissenschaften.fu-berlin.de/we02/institut/mitarbeiter/Professoren/fischerf/index.html'
				},
				{ type: 'break', time: '15:00 – 15:15', label: 'Coffee break' },
				{
					type: 'talk',
					time: '15:15 – 15:40',
					speaker: 'Marwa Ahmed',
					institution: 'Freie Universität Berlin',
					link: 'https://www.geschkult.fu-berlin.de/e/semiarab/arabistik/team/leibniz/ahmed/index.html',
					title:
						'Beyond the Book: Building a Sustainable AI-Driven Scholarly Edition for Arabic Manuscripts',
					abstract: [
						'The increasing use of artificial intelligence and computational methods in manuscript studies is transforming how textual scholarship is conducted, particularly for non-Latin script traditions. However, many of the resulting research outputs — machine-generated transcriptions, textual alignments, manuscript metadata, interactive visualisations, and comparative analyses — cannot be adequately communicated through conventional scholarly publications alone. This presents the digital infrastructure developed for the Kalīla wa-Dimna project as a case study demonstrating how the complete research pipeline, from AI-assisted data generation to long-term sustainable publication, can be implemented within a single scholarly environment.',
						'The platform integrates handwritten text recognition (HTR), structured manuscript metadata, multilingual text processing, automated translation, and interactive textual comparison into a web-based digital edition. Rather than treating the publication as a static endpoint, the system enables readers to explore manuscript witnesses through synchronised facsimiles, line-level transcriptions, comparative reading interfaces, manuscript maps, and dynamic textual visualisations. This transforms the scholarly edition into an interactive research environment where both evidence and methodology remain transparent and reproducible.',
						'The presentation further discusses the technical architecture supporting this workflow. The platform employs a serverless cloud infrastructure based on AWS services, JSON-based data models, and a modular web application that minimises operational costs while allowing continuous development and scalability. Particular attention is given to sustainability strategies, including lightweight deployment, separation of data from application logic, reusable APIs, and maintainable software architecture designed for long-term digital preservation.',
						'Although developed for Arabic manuscript studies, the presented framework is largely script-independent and can be applied to other non-Latin textual traditions. The project demonstrates how AI-based computational research, digital presentation, and sustainable infrastructure can be combined to create scholarly resources that extend well beyond the limitations of the printed book.'
					]
				},
				{
					type: 'talk',
					time: '15:40 – 16:05',
					speaker: 'Lingyue Ma',
					institution: 'Freie Universität Berlin',
					link: 'https://de.linkedin.com/in/lingyue-ma-13398830b',
					title:
						'A method for comparing computational procedures in premodern Chinese astronomical texts',
					abstract: [
						'This presentation introduces MATHesis, a digital research project that develops a method for comparing computational procedures in premodern Chinese astronomical texts. The method begins by dividing long technical passages into source-linked chunks and modelling each procedural chunk through its ordered operations, quantity flows, parameter roles, and target outputs. A rule-based extraction pipeline identifies recurring actions such as setting out quantities, addition, subtraction, multiplication, division, remainder handling, and cyclical counting. Pairwise comparison then evaluates structural and semantic similarity across six weighted dimensions, while giving limited weight to shared wording and terminology.',
						'Applied to the annotated text of Sifen li (四分曆), the current corpus contains 250 chunks, including 121 procedure-related chunks. Sixty contain extractable operation sequences and twenty-nine contain recurring computational motifs. The comparison produced thirty-three substantive alignments, with one classified as strong and thirty-two as partial. These results suggest that procedural repetition in the text usually occurs through reusable local patterns — especially multiplication followed by remainder operations and cyclical counting — while differences in quantities, parameters, and intended outputs preserve the distinct function of each procedure.',
						'The project demonstrates how interactive scholarly presentation can expose intermediate analytical decisions and make structural comparison open to inspection, correction, and historical interpretation.'
					]
				},
				{
					type: 'panel',
					time: '16:05 – 16:35',
					label: 'Panel Discussion — Sustainability of Digital Scholarship',
					participants: 'Fischer, Ahmed, Ma, and Sido Bozan'
				},
				{
					type: 'logistics',
					time: '16:35 – 16:45',
					label: 'Closing Discussion & Reflections',
					detail: 'Key outcomes, future collaborations, and concluding remarks'
				}
			]
		}
	];

	// --- Interactive state -----------------------------------------------
	let activeSession = 1;

	// Track which abstract panels are open, keyed by "sessionId-rowIndex".
	/** @type {Record<string, boolean>} */
	let openAbstracts = {};

	/** @param {number} sessionId @param {number} rowIndex */
	const toggleAbstract = (sessionId, rowIndex) => {
		const key = `${sessionId}-${rowIndex}`;
		openAbstracts = { ...openAbstracts, [key]: !openAbstracts[key] };
	};

	$: current = sessions.find((s) => s.id === activeSession);
</script>

<div class="flex justify-center px-4">
	<div class="mb-4 w-full max-w-6xl rounded-lg bg-ctgtan p-4 sm:p-6">
		<!-- Intro -->
		<section class="mb-6">
			<h1 class="mb-3.5 border-b border-ctgblue pb-2 text-2xl font-medium">
				Beyond the Book: Digital Research, Presentation, and Sustainability
			</h1>

			<h2 class="mb-3 text-xl font-medium">September 21–22, 2026</h2>

			<p class="mb-3 text-gray-800">
				This 1.5-day workshop explores how digital research—particularly in the context of non-Latin
				script languages—can move beyond traditional scholarly formats by examining the complete
				research pipeline: production, presentation, and long-term sustainability.
			</p>

			<p class="mb-3 text-gray-800">
				The programme features three thematic sessions, each consisting of a keynote lecture, two
				invited talks, and a panel discussion:
			</p>

			<ul class="mb-4 ml-6 list-disc text-gray-800">
				<li>NLP for Non-Latin Scripts</li>
				<li>Digital Scholarly Communication</li>
				<li>Sustainability of Digital Scholarship</li>
			</ul>

			<p class="text-gray-800">
				The workshop is held <strong>on site only</strong> at Freie Universität Berlin and will not be
				streamed or offered in a hybrid format.
			</p>

			<p class="mt-3 text-gray-800">
				Brought to you by the <strong>Berlin University Alliance (BUA)</strong> and organized by
				<a
					href="https://www.geschkult.fu-berlin.de/e/arabistik/team/sido-bozan/index.html"
					target="_blank"
					rel="noopener noreferrer"
					class="font-medium text-ctgblue underline hover:text-ctgorange">Joudy Sido Bozan</a
				>
				and
				<a
					href="https://www.caseyegyptologist.com/"
					target="_blank"
					rel="noopener noreferrer"
					class="font-medium text-ctgblue underline hover:text-ctgorange">Christian D. Casey</a
				>.
			</p>
		</section>

		<!-- Registration closed notice -->
		<section class="mb-8">
			<div
				class="flex items-start gap-3 rounded-md border-l-4 border-ctgblue bg-white/80 p-4 shadow-sm"
			>
				<span class="text-2xl leading-none" aria-hidden="true">✓</span>
				<div>
					<h2 class="mb-1 text-lg font-semibold text-ctgblue">Registration is now closed</h2>
					<p class="text-gray-800">
						We have reached full capacity for the workshop. Thank you to everyone who registered. We
						look forward to welcoming our confirmed participants to Freie Universität Berlin. For any
						enquiries, please <a
							href="mailto:j.sido.bozan@fu-berlin.de"
							class="font-medium text-ctgblue underline hover:text-ctgorange">get in touch</a
						>.
					</p>
				</div>
			</div>
		</section>

		<!-- Interactive Programme -->
		<section>
			<h2 class="mb-1.5 border-b border-ctgblue pb-2 text-xl font-medium">Workshop Programme</h2>
			<div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<p class="text-sm text-gray-700">Select a session below, then open a talk to read its abstract.</p>
				<a
					href="/Beyond-the-Book-Programme.pdf"
					download
					class="inline-flex shrink-0 items-center gap-2 rounded-md border border-ctgblue bg-ctgorange px-4 py-2 text-sm font-medium text-ctgblue hover:underline"
				>
					<span aria-hidden="true">⭳</span> Download programme (PDF)
				</a>
			</div>

			<!-- Session tabs -->
			<div class="mb-6 flex flex-col gap-2 sm:flex-row" role="tablist" aria-label="Workshop sessions">
				{#each sessions as s}
					<button
						role="tab"
						aria-selected={activeSession === s.id}
						class="flex-1 rounded-md border px-4 py-3 text-left transition-colors {activeSession ===
						s.id
							? 'border-ctgblue bg-ctgblue text-white shadow'
							: 'border-ctgblue/40 bg-white text-ctgblue hover:bg-ctgorange/20'}"
						on:click={() => (activeSession = s.id)}
					>
						<span
							class="block text-xs font-semibold uppercase tracking-wide {activeSession === s.id
								? 'text-ctgorange'
								: 'text-ctgtan'}"
						>
							Session {s.id}
						</span>
						<span class="block text-sm font-medium leading-snug">{s.tab}</span>
					</button>
				{/each}
			</div>

			<!-- Active session panel -->
			{#if current}
				<div class="rounded-lg bg-white p-5 shadow">
					<p class="text-xs font-semibold uppercase tracking-wide text-ctgorange">{current.day}</p>
					<h3 class="mt-1 text-lg font-bold text-ctgblue">
						Session {current.id}: {current.theme}
					</h3>
					<p class="mt-2 text-sm text-gray-700">{current.blurb}</p>

					<!-- Timed run-of-show -->
					<div class="mt-5 space-y-2">
						{#each current.schedule as row, i}
							{@const key = `${current.id}-${i}`}
							{@const open = openAbstracts[key]}

							{#if row.type === 'keynote'}
								<div class="flex flex-col gap-1 sm:flex-row sm:gap-4">
									<div class="shrink-0 pt-1 font-mono text-xs text-gray-500 sm:w-28">{row.time}</div>
									<div class="flex-1 rounded-md border border-ctgorange/50 bg-ctgorange/10 p-4">
										<span
											class="inline-block rounded bg-ctgorange px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white"
										>
											Keynote
										</span>
										<p class="mt-2 text-base font-semibold text-ctgblue">{row.name}</p>
										<p class="mt-1 text-sm text-gray-700">{row.affiliation}</p>
										<p class="mt-1 text-xs italic text-gray-600">
											{#if row.introducedBy}Introduced by {#if row.introducedByLink}<a
													href={row.introducedByLink}
													target="_blank"
													rel="noopener noreferrer"
													class="font-medium text-ctgblue underline hover:text-ctgorange"
													>{row.introducedBy}</a
												>{:else}{row.introducedBy}{/if} · followed by questions & discussion{:else}Followed
												by questions & discussion{/if}
										</p>
										<a
											href={row.link}
											target="_blank"
											rel="noopener noreferrer"
											class="mt-2 inline-flex items-center gap-1 text-sm font-medium text-ctgblue underline hover:text-ctgorange"
										>
											View profile <span aria-hidden="true">↗</span>
										</a>
									</div>
								</div>
							{:else if row.type === 'talk'}
								<div class="flex flex-col gap-1 sm:flex-row sm:gap-4">
									<div class="shrink-0 pt-3 font-mono text-xs text-gray-500 sm:w-28">{row.time}</div>
									<div class="flex-1 overflow-hidden rounded-md border border-ctgblue/20">
										<button
											class="flex w-full items-start justify-between gap-3 bg-white px-4 py-3 text-left hover:bg-ctgtan/10"
											aria-expanded={open}
											on:click={() => toggleAbstract(current.id, i)}
										>
											<span>
												<span class="block font-medium text-ctgblue">
													{row.speaker}
													{#if row.tbc}
														<span class="text-xs font-normal italic text-gray-500">(t.b.c.)</span>
													{/if}
													{#if row.coauthor}
														<span class="text-xs font-normal text-gray-500">{row.coauthor}</span>
													{/if}
												</span>
												<span class="block text-xs text-gray-600">{row.institution}</span>
												<span class="mt-1 block text-sm text-gray-800">{row.title}</span>
											</span>
											<span
												class="mt-1 shrink-0 text-ctgorange transition-transform duration-200 {open
													? 'rotate-180'
													: ''}"
												aria-hidden="true"
											>
												▾
											</span>
										</button>

										{#if open}
											<div class="border-t border-ctgblue/10 bg-ctgtan/5 px-4 py-3">
												<p class="mb-2 text-xs font-semibold uppercase tracking-wide text-ctgtan">
													Abstract
												</p>
												{#each row.abstract as para}
													<p class="mb-2 text-sm leading-relaxed text-gray-800">{para}</p>
												{/each}
											</div>
										{/if}
										{#if row.link}
											<div class="border-t border-ctgblue/10 bg-white px-4 py-2">
												<a
													href={row.link}
													target="_blank"
													rel="noopener noreferrer"
													class="inline-flex items-center gap-1 text-sm font-medium text-ctgblue underline hover:text-ctgorange"
												>
													View profile <span aria-hidden="true">↗</span>
												</a>
											</div>
										{/if}
									</div>
								</div>
							{:else if row.type === 'panel'}
								<div class="flex flex-col gap-1 sm:flex-row sm:gap-4">
									<div class="shrink-0 pt-3 font-mono text-xs text-gray-500 sm:w-28">{row.time}</div>
									<div class="flex-1 rounded-md bg-ctgblue/5 px-4 py-3">
										<span
											class="inline-block rounded bg-ctgblue px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white"
										>
											Panel
										</span>
										<p class="mt-2 text-sm font-medium text-ctgblue">{row.label}</p>
										<p class="text-sm text-gray-700">{row.participants}</p>
									</div>
								</div>
							{:else}
								<!-- logistics / break -->
								<div class="flex flex-col gap-1 sm:flex-row sm:gap-4">
									<div class="shrink-0 font-mono text-xs text-gray-500 sm:w-28 sm:pt-0.5">
										{row.time}
									</div>
									<div class="flex-1 border-l-2 border-ctgtan/40 pl-3">
										<p class="text-sm font-medium text-gray-700">
											{row.label}
											{#if row.type === 'break'}
												<span aria-hidden="true">☕</span>
											{/if}
										</p>
										{#if row.detail}
											<p class="text-xs text-gray-500">{row.detail}</p>
										{/if}
									</div>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			{/if}
		</section>

		<!-- Venue & funding -->
		<section class="mt-8 rounded-lg bg-white p-5 shadow">
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div>
					<h3 class="mb-1 text-sm font-semibold uppercase tracking-wide text-ctgtan">Venue</h3>
					<p class="text-gray-800">
						Freie Universität Berlin<br />
						Seminarzentrum L116<br />
						Otto-von-Simson-Straße 26<br />
						14195 Berlin, Germany
					</p>
				</div>
				<div>
					<h3 class="mb-1 text-sm font-semibold uppercase tracking-wide text-ctgtan">Funding</h3>
					<p class="text-gray-800">
						The event is funded by the Open Science Ambassador-Program of the Berlin University
						Alliance.
					</p>
				</div>
			</div>
		</section>
	</div>
</div>
