<script>
	import emailjs from '@emailjs/browser';

	let name = '';
	let email = '';
	let project = '';
	let institution = '';
	let pi = '';
	let url = '';
	let comments = '';
	const formType = 'contributor'; // Predefined as "contributor"

	let success = false;
	let error = '';
	let sending = false;

	/** @param {Event} event */
	const sendContributorRequest = async (event) => {
		event.preventDefault();
		success = false;
		error = '';
		sending = true;

		// Build dynamic email subject
		const subject = `Contribution Request Received: ${project || 'No Project Provided'}`;

		const templateParams = {
			name,
			email,
			project,
			institution,
			pi,
			url,
			comments,
			subject, // dynamic subject line
			formType, // 'contributor'
			isContributor: true,
			isConsultation: false
		};

		try {
			await emailjs.send(
				'service_s513c3i', // Your EmailJS service ID
				'template_nqj4aum', // Your EmailJS template ID
				templateParams,
				'5SbE9iKVe1cS7XMy2' // Your EmailJS public key
			);
			success = true;
			// Reset fields
			name = email = project = institution = pi = url = comments = '';
		} catch (err) {
			error = '❌ Failed to send message. Please try again later.';
			console.error('Error:', err);
		} finally {
			sending = false;
		}
	};
</script>

<div class="flex justify-center px-4">
	<div class="mb-4 w-full max-w-6xl rounded-lg bg-ctgtan p-4">
		<form on:submit|preventDefault={sendContributorRequest}>
			<h2 class="mb-3 text-xl font-medium">Become a Contributor</h2>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div>
					<label for="name" class="mb-3.5">Your Name*</label>
					<input
						id="name"
						type="text"
						bind:value={name}
						required
						class="mt-1 w-full rounded border-ctgblue p-2"
					/>
				</div>
				<div>
					<label for="email" class="mb-3.5">Your Email*</label>
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
				<label for="project" class="mb-3.5">Project Name*</label>
				<input
					id="project"
					type="text"
					bind:value={project}
					required
					class="mt-1 w-full rounded border-ctgblue p-2"
				/>
			</div>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div>
					<label for="institution" class="mb-3.5">Institution</label>
					<input
						id="institution"
						type="text"
						bind:value={institution}
						class="mt-1 w-full rounded border-ctgblue p-2"
					/>
				</div>
				<div>
					<label for="pi" class="mb-3.5">Principal Investigator</label>
					<input
						id="pi"
						type="text"
						bind:value={pi}
						class="mt-1 w-full rounded border-ctgblue p-2"
					/>
				</div>
			</div>

			<div>
				<label for="url" class="mb-3.5">Project URL</label>
				<input
					id="url"
					type="url"
					bind:value={url}
					placeholder="https://example.com (optional)"
					class="mt-1 w-full rounded border-ctgblue p-2"
				/>
			</div>

			<div>
				<label for="comments" class="mb-3.5">Additional Comments</label>
				<textarea
					id="comments"
					bind:value={comments}
					rows="4"
					class="mt-1 w-full rounded border-ctgblue p-2"
				></textarea>
			</div>

			<button
				type="submit"
				class="rounded-md border border-ctgblue border-slate-800 bg-ctgorange px-4 py-2 font-mono hover:underline"
				disabled={sending}
			>
				{sending ? 'Sending...' : 'Submit'}
			</button>

			{#if success}
				<p class="mt-4 text-green-600">✅ Your contribution request was sent successfully!</p>
			{:else if error}
				<p class="mt-4 text-red-600">{error}</p>
			{/if}
		</form>
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
	textarea {
		padding: 0.5rem;
		font-size: 1rem;
	}
	label,
	p {
		color: black;
	}
</style>
