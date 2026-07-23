<script>
	import emailjs from '@emailjs/browser';

	let name = '';
	let institution = '';
	let email = '';
	let participationType = 'Attending';

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

		const subject = `Workshop Registration: ${name || 'No Name Provided'}`;

		const templateParams = {
    		name,
    		institution,
    		email,
    		subject,
    		formType,
    		isContributor: false,
    		isConsultation: false,
    		isWorkshop: true,
    		registration: true
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

    		<h2 class="mb-3 text-xl font-medium">
        		September 21–22, 2026
    		</h2>

    		<p class="mb-3 text-gray-800">
        		This 1.5-day workshop explores how digital research—particularly in the
        		context of non-Latin script languages—can move beyond traditional
        		scholarly formats by examining the complete research pipeline:
        		production, presentation, and long-term sustainability.
    		</p>

    		<p class="mb-3 text-gray-800">
        		The programme features three thematic sessions consisting of keynote
        		lectures, invited talks, and panel discussions:
    		</p>

    		<ul class="list-disc ml-6 mb-4">
        		<li>NLP for Non-Latin Scripts</li>
        		<li>Digital Scholarly Communication</li>
        		<li>Sustainability of Digital Scholarship</li>
    		</ul>

    		<p class="text-gray-800">
        		Registration is required for all participants.
        		The workshop is held <strong>on site only</strong> at
        		Freie Universität Berlin and will not be streamed or offered in a hybrid format.
    		</p>
		</section>

		<!--Download Programme Button
		<div class="mt-6 text-center">
			<a
				href="/Beyond-the-Book-Programme.pdf"
				class="inline-block rounded-md border border-ctgblue bg-ctgorange px-4 py-2 font-mono hover:underline"
				download
			>
				Download Programme
			</a>
		</div>
		-->

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
					<option value="Attending">Attending</option>
				</select>
			</div>


			<button
				type="register"
				class="rounded-md border border-ctgblue bg-ctgorange px-4 py-2 font-mono hover:underline disabled:opacity-50"
				disabled={sending}
			>
				{sending ? 'Sending...' : 'Register'}
			</button>

			{#if success}
				<p class="mt-4 text-green-600">✅ Thank you! Your registration has been received. We look forward to welcoming you to the workshop.</p>
			{:else if error}
				<p class="mt-4 text-red-600">{error}</p>
			{/if}
		</form>

		<!-- Programme -->
		<section class="mt-8">
			<h2 class="mb-3.5 border-b border-ctgblue pb-2 text-xl font-medium">
				Workshop Programme
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
					This section focuses on natural language processing for non-Latin script
					languages, especially where the resulting data, models, or analytical outputs
					challenge conventional modes of scholarly presentation. 
					Keynote:
            		<strong>Prof. Dr. Ingo Scholtes</strong>
            		(Universität Würzburg).
				</p>

				<h4 class="mt-4 font-bold">Digital Scholarly Communication</h4>
				<p>
					This section focuses on how digital research can be presented beyond the limits
					of the traditional academic paper. Contributions will address interactive
					publications, computational notebooks, dynamic visualizations, narrative
					interfaces, or other forms of digital scholarly output that integrate data,
					method, and interpretation.
					Keynote:
            		<strong>Dr. Maxim G. Romanov</strong>
            		(Universität Hamburg).
				</p>

				<h4 class="mt-4 font-bold">Sustainability of Digital Scholarship</h4>
				<p>
					Digital formats enable new forms of research and presentation, but they also
					introduce challenges related to hosting, maintenance, funding, and institutional
					support. The contributions concentrate on practical strategies for sustaining digital
					research outputs, including low-cost hosting, static and hybrid web architectures,
					dependency management, data preservation, and institutional or community-based
					maintenance models.
					Keynote:
            		<strong>Prof. Dr. Frank Fischer</strong>
            		(Freie Universität Berlin).
				</p>

				<hr class="my-6">

        		<p>
            		<strong>Venue</strong><br>
            		Freie Universität Berlin<br>
            		Otto-von-Simson-Straße 7<br>
            		14195 Berlin
        		</p>

				<br />
				<p><strong>Funding: The event is funded by the Open Science Ambassador-Program of the Berlin University Alliance.</strong><br></p>
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