<script>
	import emailjs from '@emailjs/browser';

	let name = '';
	let institution = '';
	let email = '';
	let participationType = '';
	let abstract = '';

	const formType = 'workshop';

	let success = false;
	let error = '';
	let sending = false;

	/** @param {Event} event */
	const sendWorkshopApplication = async (event) => {
		event.preventDefault();
		success = false;
		error = '';
		sending = true;

		const subject = `Workshop Application: ${name || 'No Name Provided'}`;

		const templateParams = {
			name,
			institution,
			email,
			participationType,
			abstract,
			subject,
			formType,
			isContributor: false,
			isConsultation: false,
			isWorkshop: true
		};

		try {
			await emailjs.send(
				'service_s513c3i',
				'template_nqj4aum',
				templateParams,
				'5SbE9iKVe1cS7XMy2'
			);

			success = true;

			name = '';
			institution = '';
			email = '';
			participationType = '';
			abstract = '';
		} catch (err) {
			error = '❌ Failed to send application. Please try again later.';
			console.error('Error:', err);
		} finally {
			sending = false;
		}
	};
</script>

<div class="flex justify-center px-4">
	<div class="mb-4 w-full max-w-6xl rounded-lg bg-ctgtan p-4">
		<!-- Intro -->
		<section class="mb-6">
			<h1 class="mb-3.5 border-b border-ctgblue pb-2 text-2xl font-medium">
				Beyond the Book: Digital Research, Presentation, and Sustainability
			</h1>

			<h2 class="mb-3 text-xl font-medium">September 21–22, 2026</h2>

			<p class="mb-3 text-gray-800">
				The workshop explores how digital research, particularly in non-Latin
				script contexts, can be produced, presented, and sustained beyond traditional
				scholarly formats.
			</p>

			<p class="mb-3 font-medium">Submission deadline: July 15, 2026</p>

            <p class="text-gray-800">
	            Registration is required for all participants. Please note that the workshop is on-site only and will not be held in a hybrid format. To submit an abstract or register to attend, please use the form below.
            </p>
		</section>

		<!-- Application Form -->
		<form on:submit|preventDefault={sendWorkshopApplication}>
			<h2 class="mb-3 text-xl font-medium">Workshop Application Form</h2>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div>
					<label for="name" class="mb-3.5">Name*</label>
					<input
						id="name"
						type="text"
						bind:value={name}
						required
						class="mt-1 w-full rounded border-ctgblue p-2"
					/>
				</div>

				<div>
					<label for="email" class="mb-3.5">Email*</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						required
						class="mt-1 w-full rounded border-ctgblue p-2"
					/>
				</div>
			</div>

			<div>
				<label for="institution" class="mb-3.5">Institution*</label>
				<input
					id="institution"
					type="text"
					bind:value={institution}
					required
					class="mt-1 w-full rounded border-ctgblue p-2"
				/>
			</div>

			<div>
				<label for="participationType" class="mb-3.5">Participation Type*</label>
				<select
					id="participationType"
					bind:value={participationType}
					required
					class="mt-1 w-full rounded border-ctgblue p-2"
				>
					<option value="">-- Select --</option>
					<option value="Presenting">Presenting</option>
					<option value="Attending only">Attending only</option>
				</select>
			</div>

			{#if participationType === 'Presenting'}
				<div>
					<label for="abstract" class="mb-3.5">Abstract*</label>
					<textarea
						id="abstract"
						bind:value={abstract}
						required
						rows="8"
						class="mt-1 w-full rounded border-ctgblue p-2"
					></textarea>
				</div>
			{/if}

			<button
				type="submit"
				class="rounded-md border border-ctgblue bg-ctgorange px-4 py-2 font-mono hover:underline disabled:opacity-50"
				disabled={sending}
			>
				{sending ? 'Sending...' : 'Submit'}
			</button>

			{#if success}
				<p class="mt-4 text-green-600">✅ Your workshop application was sent successfully!</p>
			{:else if error}
				<p class="mt-4 text-red-600">{error}</p>
			{/if}
		</form>

		<!-- Call for Papers -->
		<section class="mt-8">
			<h2 class="mb-3.5 border-b border-ctgblue pb-2 text-xl font-medium">
				Call for Papers
			</h2>

			<div class="rounded bg-white p-4 shadow">
				<h3 class="mb-3 text-lg font-bold text-ctgblue">
					Beyond the Book: Digital Research, Presentation, and Sustainability
				</h3>

				<p>
					This 1.5-day workshop explores how digital research, particularly in the context
					of non-Latin script languages, can move beyond the constraints of traditional
					scholarly formats. While books and articles remain central to academic knowledge
					production, many forms of computational research generate data, models, workflows,
					and analytical results that cannot be adequately represented through static text,
					images, or tables alone.
				</p>

				<p>
					The workshop focuses on a central pipeline: how digital research is produced, how
					it can be presented, and how it can be sustained over time. We invite contributions
					that engage with one or more stages of this process, especially through concrete
					projects, implementations, case studies, and practical experiences.
				</p>

				<p>
					Organized by the project <em>Closing the Gap in Non-Latin Script Data</em>, the
					workshop builds on ongoing work examining the creation, presentation, and long-term
					viability of digital humanities projects, with particular attention to the challenges
					faced by projects working with non-Latin scripts.
				</p>

				<h3 class="mt-6 mb-3 text-lg font-bold text-ctgblue">Workshop Themes</h3>

				<h4 class="mt-4 font-bold">NLP for Non-Latin Scripts</h4>
				<p>
					We invite contributions on natural language processing for non-Latin script
					languages, especially where the resulting data, models, or analytical outputs
					challenge conventional modes of scholarly presentation. We are particularly
					interested in work that benefits from interactive, dynamic, or multi-dimensional
					forms of representation.
				</p>

				<h4 class="mt-4 font-bold">Digital Scholarly Communication</h4>
				<p>
					This section focuses on how digital research can be presented beyond the limits
					of the traditional academic paper. Contributions may address interactive
					publications, computational notebooks, dynamic visualizations, narrative
					interfaces, or other forms of digital scholarly output that integrate data,
					method, and interpretation.
				</p>

				<h4 class="mt-4 font-bold">Sustainability of Digital Scholarship</h4>
				<p>
					Digital formats enable new forms of research and presentation, but they also
					introduce challenges related to hosting, maintenance, funding, and institutional
					support. We welcome contributions on practical strategies for sustaining digital
					research outputs, including low-cost hosting, static and hybrid web architectures,
					dependency management, data preservation, and institutional or community-based
					maintenance models.
				</p>

				<h3 class="mt-6 mb-3 text-lg font-bold text-ctgblue">How to Participate</h3>

				<p>
					We welcome submissions from researchers, developers, and practitioners working
					in digital humanities, computational linguistics, and related fields. Submissions
					should clearly indicate which workshop theme they address and should foreground
					concrete work, case studies, implementations, or practical experience.
				</p>

				<p>
					Contributions that engage multiple stages of the research–presentation–sustainability
					pipeline are especially encouraged. We also welcome reflections on fragile,
					incomplete, or failed approaches, where these offer useful insights into the
					practical challenges of digital scholarship.
				</p>

				<p class="mt-4 font-bold">Submission deadline: July 15, 2026</p>

				<p>To submit an abstract or register to attend, please use the form above.</p>

				<br />
				<p>The event is funded by the Open Science Ambassador-Program of the Berlin University Alliance.</p>
			</div>
		</section>
	</div>
</div>

<style>
	form {
		max-width: 80vw;
		margin: 2rem auto;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	input,
	textarea,
	select {
		padding: 0.5rem;
		font-size: 1rem;
	}

	label,
	p {
		color: black;
	}
</style>