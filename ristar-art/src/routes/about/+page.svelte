<script lang="ts">
	const pdf = '/CV%20of%20Boiketlo%20Mochochoko.pdf';

	let interactive = $state(false);

	// Hide the viewer controls/scrollbar until the user clicks the PDF.
	const src = $derived(
		interactive
			? `${pdf}#view=FitH&toolbar=1&navpanes=0`
			: `${pdf}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`
	);
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About Boiketlo Mochochoko" />
</svelte:head>

<div class="text-column">
	<h1>About Me</h1>
	<p>
		Here's a closer look at my background, skills, and experience. Have a read through my CV
		below, or download a copy for later.
	</p>
</div>

<section class="cv">
	<div class="cv-label">curriculum vitae</div>
	<div class="cv-rule"></div>

	<figure class="cv-frame">
		{#key interactive}
			<iframe {src} title="CV of Boiketlo Mochochoko"></iframe>
		{/key}
		{#if !interactive}
			<button class="cv-overlay" onclick={() => (interactive = true)}>
				<span class="cv-overlay-hint">Click to interact</span>
			</button>
		{/if}
	</figure>

	<a class="cv-download" href="/CV%20of%20Boiketlo%20Mochochoko.pdf" download>Download CV ↓</a>
</section>

<style>
	.text-column p {
		font-size: 1rem;
		color: #666;
		line-height: 1.6;
	}

	.cv {
		padding: 2rem 0 4rem;
		text-align: center;
	}

	.cv-label {
		font-family: var(--font-display);
		font-size: 0.75rem;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: #ff3e00;
		margin-bottom: 1rem;
	}

	.cv-rule {
		width: 2rem;
		height: 2px;
		background: #ff3e00;
		margin: 0 auto 2.5rem;
		border: none;
	}

	.cv-frame {
		position: relative;
		max-width: 800px;
		margin: 0 auto;
		padding: 14px;
	}

	.cv-frame iframe {
		width: 100%;
		/* match the PDF's A4 page so the full page shows without scrolling */
		aspect-ratio: 594.95996 / 841.91998;
		border: none;
		border-radius: 8px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
		background: white;
		display: block;
		position: relative;
		z-index: 2;
	}

	.cv-overlay {
		position: absolute;
		inset: 14px;
		z-index: 3;
		border: none;
		background: transparent;
		border-radius: 8px;
		cursor: pointer;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding-bottom: 1rem;
	}

	.cv-overlay-hint {
		font-family: var(--font-display);
		font-size: 0.7rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: white;
		background: rgba(26, 26, 26, 0.85);
		padding: 0.5rem 1.1rem;
		border-radius: 50px;
		transition: background 0.2s, transform 0.2s;
	}

	.cv-overlay:hover .cv-overlay-hint {
		background: #ff3e00;
		transform: translateY(-2px);
	}

	.cv-frame::before,
	.cv-frame::after {
		content: '';
		position: absolute;
		width: 60px;
		height: 60px;
		border-color: #ff3e00;
		border-style: solid;
		border-width: 0;
		z-index: 1;
	}

	.cv-frame::before {
		top: 0;
		left: 0;
		border-top-width: 3px;
		border-left-width: 3px;
		border-radius: 12px 0 0 0;
	}

	.cv-frame::after {
		bottom: 0;
		right: 0;
		border-bottom-width: 3px;
		border-right-width: 3px;
		border-radius: 0 0 12px 0;
	}

	.cv-download {
		display: inline-block;
		margin-top: 2rem;
		padding: 0.875rem 2rem;
		background: linear-gradient(90deg, #ff3e00, #ff6b00);
		color: white;
		font-weight: 600;
		font-size: 1rem;
		border-radius: 50px;
		text-decoration: none;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.cv-download:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(255, 62, 0, 0.35);
		text-decoration: none;
	}

	@media (min-width: 768px) {
		.cv-frame::before,
		.cv-frame::after {
			width: 90px;
			height: 90px;
		}
	}
</style>
