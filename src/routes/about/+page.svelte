<svelte:head>
	<title>Closing the Gap in Non-Latin-Script Data – About</title>
</svelte:head>

<div class="mx-auto max-w-6xl px-4">
	<div class="space-y-4 rounded-lg bg-ctgtan p-4 text-lg">
		<h2 class="text-center text-2xl">About Us</h2>

		<div class="space-y-4">
			<p>
				This database was created as part of the project
				<a
					class="font-medium hover:underline"
					href="https://www.berlin-university-alliance.de/commitments/research-quality/forschung/ongoing/closing-the-gap/index.html"
					target="_blank"
					rel="noreferrer">Closing the Gap in Non-Latin-Script Data</a
				>
				under the auspices of the
				<a
					class="font-medium hover:underline"
					href="https://www.berlin-university-alliance.de/index.html"
					target="_blank"
					rel="noreferrer">Berlin University Alliance</a
				>
				and the
				<a class="font-medium hover:underline" href="https://www.fu-berlin.de/"
					>Freie Universität Berlin</a
				>, which aimed to improve the agency and visibility of NLS-related research in the Digital
				Humanities in Germany. One part of the project was to get an idea of the state of the field
				of “Digitale Arabistik” in Germany, mainly in terms of completed, ongoing, and future
				research projects, but also in terms of available infrastructure and relevant initiatives in
				the field.
			</p>

			<p>
				As we began gathering data on digital projects dealing with Arabic or similar languages, we
				thought about how to provide this data in a way that commits to OpenScience principles. So
				we chose a public Git repository as our main data store, offering the data as JSON in a way
				that should be as straightforward as possible. Everyone who is interested should be able to
				contribute without having to deal with too much of a technology stack.
			</p>

			<p>
				For those who are not able or willing to work with JSON, we developed a graphical user
				interface—this website—which offers not only a list of all projects for which we have
				collected data, but also small visualizations (on which we continue to iterate). For an
				easier way to provide data than writing plain JSON, we offer a web form that can generate a
				file conforming to our schema. All of these features will be improved over time, depending
				on the needs and demands of the community.
			</p>
		</div>
		<div class="mt-8">
			<h3 class="mb-6 text-center text-2xl">The Team</h3>
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<!-- Profile 1 -->
				<div class="rounded-lg bg-white p-4 text-center shadow">
					<a
						href="https://www.caseyegyptologist.com"
						target="_blank"
						rel="noreferrer"
						class="block rounded-lg bg-white p-4 text-center shadow transition-shadow hover:shadow-lg"
					>
						<img
							src="/team/christian.png"
							alt="Christian Casey"
							class="mx-auto mb-4 h-32 w-32 rounded-full object-cover"
						/>
						<h4 class="text-xl font-semibold">Dr. Christian Casey</h4>
						<p class="mt-2 text-sm">
							Christian is an Egyptologist with wide interest in the digital humanities, especially
							data sustainability. As the leader of the Closing the Gap team, his role is getting
							out of the way and letting Xenia, Aibaniz, and Joudy do amazing work curating our
							collection of DH projects.
						</p>
					</a>
				</div>

				<!-- Profile 2 -->
				<div class="rounded-lg bg-white p-4 text-center shadow">
					<!-- <a href="https://www.example.com" target="_blank" rel="noreferrer" class="block bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow"> -->
					<img
						src="/team/xenia.jpg"
						alt="M. Xenia Kudela"
						class="mx-auto mb-4 h-32 w-32 rounded-full object-cover"
					/>
					<h4 class="text-xl font-semibold">M. Xenia Kudela</h4>
					<p class="mt-2 text-sm">
						Xenia is responsible for supervising the database and workflows of the project. Her
						current interests include the sustainability of human heritage in the digital era,
						workflow optimization with AI, exploring the limits of NLP, and as much tech-related
						stuff as she can still fit into her schedule.
					</p>
					<!-- </a> -->
				</div>

				<!-- Profile 3 -->
				<div class="rounded-lg bg-white p-4 text-center shadow">
					<!-- <a href="https://www.example.com" target="_blank" rel="noreferrer" class="block bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow"> -->
					<img
						src="/team/aya.jpg"
						alt="Aibaniz Alieva"
						class="mx-auto mb-4 h-32 w-32 rounded-full object-cover"
					/>
					<h4 class="text-xl font-semibold">Aibaniz Alieva</h4>
					<p class="mt-2 text-sm">
						Aibaniz, with a background in Arabic Studies and digital humanities, works on Closing
						the Gap by identifying Arabic-focused and underrepresented projects, collecting accurate
						metadata, and developing tools to structure it. She also contributes to research on DH
						project sustainability and designed the project’s logo and logotype.
					</p>
					<!-- </a> -->
				</div>

				<!-- Profile 4 -->
				<div class="rounded-lg bg-white p-4 text-center shadow">
					<!-- <a href="https://www.example.com" target="_blank" rel="noreferrer" class="block bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow"> -->
					<img
						src="/team/joudy.jpg"
						alt="Joudy Sido-Bozan"
						class="mx-auto mb-4 h-32 w-32 rounded-full object-cover"
					/>
					<h4 class="text-xl font-semibold">Joudy Sido-Bozan</h4>
					<p class="mt-2 text-sm">
						Joudy Sido Bozan works at the intersection of digital humanities and programming,
						developing tools to collect, organize, and visualize research projects in non-Latin
						scripts. Her work focuses on automating data extraction and creating visual
						representations, ensuring accessibility, sustainability and structured analysis of
						research in underrepresented languages.
					</p>
					<!-- </a> -->
				</div>
			</div>

			<!-- Project Gallery -->
			<section class="mt-12">
				<h3 class="mb-6 text-center text-2xl">Project Gallery</h3>

				<!-- “Bleed” out to cancel the parent’s px-4, so this truly spans the tan box -->
				<div class="-mx-4 overflow-x-auto">
					<!-- re-apply px-4 for alignment, flex-nowrap to force one row, min-w-full to fill container -->
					<div class="flex min-w-full flex-nowrap gap-6 px-4 pb-4">
						<!-- Card 1 -->
						<a
							href="/gallery/img1.jpg"
							target="_blank"
							rel="noreferrer"
							class="h-48 w-48 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 shadow transition-transform hover:scale-105"
						>
							<img
								src="/gallery/img1.jpg"
								alt="Project screenshot 1"
								class="h-full w-full object-cover"
							/>
						</a>

						<!-- Card 2 -->
						<a
							href="/gallery/img2.jpg"
							target="_blank"
							rel="noreferrer"
							class="h-48 w-48 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 shadow transition-transform hover:scale-105"
						>
							<img
								src="/gallery/img2.jpg"
								alt="Project screenshot 2"
								class="h-full w-full object-cover"
							/>
						</a>

						<!-- Card 3 -->
						<a
							href="/gallery/img3.jpg"
							target="_blank"
							rel="noreferrer"
							class="h-48 w-48 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 shadow transition-transform hover:scale-105"
						>
							<img
								src="/gallery/img3.jpg"
								alt="Project screenshot 3"
								class="h-full w-full object-cover"
							/>
						</a>

						<!-- Card 4 -->
						<a
							href="/gallery/img4.jpg"
							target="_blank"
							rel="noreferrer"
							class="h-48 w-48 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 shadow transition-transform hover:scale-105"
						>
							<img
								src="/gallery/img4.jpg"
								alt="Project screenshot 4"
								class="h-full w-full object-cover"
							/>
						</a>

						<!-- Card 5 -->
						<a
							href="/gallery/img5.jpg"
							target="_blank"
							rel="noreferrer"
							class="h-48 w-48 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 shadow transition-transform hover:scale-105"
						>
							<img
								src="/gallery/img5.jpg"
								alt="Project screenshot 5"
								class="h-full w-full object-cover"
							/>
						</a>

						<!-- Card 6 -->
						<a
							href="/gallery/img6.jpg"
							target="_blank"
							rel="noreferrer"
							class="h-48 w-48 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 shadow transition-transform hover:scale-105"
						>
							<img
								src="/gallery/img6.jpg"
								alt="Project screenshot 6"
								class="h-full w-full object-cover"
							/>
						</a>
					</div>
				</div>
			</section>
		</div>

		<div class="space-y-4 text-center">
			<p class="text-xl">
				If you want to contribute in any way, to work on a localization of this service or to report
				bugs or feature requests, feel free to contact us via
				<a
					class="font-medium hover:underline"
					href="https://github.com/M-L-D-H/Closing-The-Gap-In-Non-Latin-Script-Data"
					target="_blank"
					rel="noreferrer">GitHub</a
				>
				or
				<a
					class="font-medium hover:underline"
					href="mailto:ctg@geschkult.fu-berlin.de"
					target="_blank"
					rel="noreferrer">E-Mail</a
				>
				. For ongoing updates, detailed discussions, and more information about our project, visit our
				<a
					class="font-medium hover:underline"
					href="https://ctg.hypotheses.org/"
					target="_blank"
					rel="noreferrer">blog</a
				>.
			</p>

			<p>Other initiatives and institutions with which we are involved include:</p>

			<ul>
				<li>
					<a
						class="font-medium hover:underline"
						href="https://www.ada.fu-berlin.de/ada-labs/multilingual-dh/index.html"
						target="_blank"
						rel="noreferrer">Multilingual DH Lab @ Freie Universität Berlin</a
					>
				</li>

				<li>
					Staats- und Universitätsbibliothek Hamburg Carl von Ossietzky (Dr. Jonas Müller-Laackman,
					Department <a
						class="font-medium hover:underline"
						href="https://www.sub.uni-hamburg.de/service/digitale-forschungsdienste.html"
						target="_blank"
						rel="noreferrer">Digitale Forschungsdienste</a
					>)
				</li>

				<li>
					<a
						class="font-medium hover:underline"
						href="https://dig-hum.de/ag-multilingual-dh"
						target="_blank"
						rel="noreferrer">DHd AG Multilingual DH</a
					>
				</li>

				<li>Decolonization initiatives @ Freie Universität Berlin</li>

				<li>
					<a
						class="font-medium hover:underline"
						href="https://www.geschkult.fu-berlin.de/e/semiarab/arabistik/index.html"
						target="_blank"
						rel="noreferrer">Institute for Arabic Studies</a
					>
				</li>
			</ul>
		</div>
	</div>
</div>
