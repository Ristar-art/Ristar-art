<script lang="ts">
	const pdf = '/CV%20of%20Boiketlo%20Mochochoko.pdf';

	let interactive = $state(false);

	// Hide the viewer controls/scrollbar until the user clicks the PDF.
	const src = $derived(
		interactive
			? `${pdf}#view=FitH&toolbar=1&navpanes=0`
			: `${pdf}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`
	);

	const facts = [
		{ k: 'Role', v: 'Full-Stack Developer' },
		{ k: 'Focus', v: 'Web & Mobile Apps' },
		{ k: 'Region', v: 'Johannesburg / South Africa' },
		{ k: 'Status', v: 'Available for work' }
	];
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About Boiketlo Mochochoko" />
</svelte:head>

<header class="page-head">
	<span class="eyebrow">// about</span>
	<h1>About Me</h1>
	<p>
		Here's a closer look at my background, skills, and experience. Read through my CV below, or
		download a copy for later.
	</p>
	<dl class="facts">
		{#each facts as f}
			<div class="fact">
				<dt>{f.k}</dt>
				<dd>{f.v}</dd>
			</div>
		{/each}
	</dl>
</header>

<section class="cv">
	<header class="sec-head">
		<span class="sec-index">// doc</span>
		<h2>Curriculum Vitae</h2>
		<span class="sec-meta">PDF / A4</span>
	</header>

	<figure class="cv-frame">
		{#key interactive}
			<iframe {src} title="CV of Boiketlo Mochochoko"></iframe>
		{/key}
		{#if !interactive}
			<button class="cv-overlay" onclick={() => (interactive = true)}>
				<span class="cv-overlay-hint">Click to interact →</span>
			</button>
		{/if}
	</figure>

	<a class="btn-download" href="/CV%20of%20Boiketlo%20Mochochoko.pdf" download>Download CV ↓</a>
</section>

<style>
	.page-head {
		padding: 1rem 0 2.5rem;
		border-bottom: 1px solid var(--rule-dark);
		max-width: 60rem;
	}

	.eyebrow {
		display: inline-block;
		font-size: 0.68rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 1.25rem;
	}

	.page-head h1 {
		font-size: clamp(2rem, 6vw, 3.2rem);
		letter-spacing: -0.02em;
		line-height: 1;
		color: var(--ink-dark);
		margin-bottom: 1.25rem;
	}

	.page-head p {
		font-size: 0.92rem;
		line-height: 1.6;
		color: var(--ink-dark-dim);
		max-width: 52ch;
	}

	.facts {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0;
		margin: 2rem 0 0;
		border: 1px solid var(--rule-dark);
	}

	.fact {
		padding: 0.85rem 1rem;
		border-right: 1px solid var(--rule-dark);
		border-bottom: 1px solid var(--rule-dark);
	}

	.facts dt {
		font-size: 0.6rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--rule-dark);
		margin-bottom: 0.35rem;
	}

	.facts dd {
		margin: 0;
		font-size: 0.8rem;
		letter-spacing: 0.04em;
		color: var(--ink-dark);
	}

	/* ── Section header (matches landing pattern) ─────────── */
	.sec-head {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		padding-bottom: 1.1rem;
		margin-bottom: 2.5rem;
		border-bottom: 1px solid var(--ink-dark);
	}

	.sec-index {
		font-size: 0.72rem;
		letter-spacing: 0.18em;
		color: var(--accent);
		font-weight: 500;
	}

	.sec-head h2 {
		font-size: clamp(1.4rem, 3vw, 2.1rem);
		letter-spacing: -0.01em;
		color: var(--ink-dark);
	}

	.sec-meta {
		margin-left: auto;
		font-size: 0.68rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-dark-dim);
	}

	.cv {
		padding: 3rem 0 2rem;
	}

	/* ── CV frame: A4 proportions + lime corner brackets ─── */
	.cv-frame {
		position: relative;
		width: 100%;
		max-width: 620px;
		margin: 0 auto;
		padding: 0.6rem;
		border: 1px solid var(--rule-dark);
		background: var(--bg-dark-2);
	}

	.cv-frame::before,
	.cv-frame::after {
		content: '';
		position: absolute;
		width: 20px;
		height: 20px;
		border: 2px solid var(--accent);
		z-index: 4;
	}
	.cv-frame::before {
		top: -1px;
		left: -1px;
		border-right: none;
		border-bottom: none;
	}
	.cv-frame::after {
		bottom: -1px;
		right: -1px;
		border-left: none;
		border-top: none;
	}

	.cv-frame iframe {
		width: 100%;
		aspect-ratio: 210 / 297;
		border: none;
		background: white;
		display: block;
		position: relative;
		z-index: 2;
	}

	.cv-overlay {
		position: absolute;
		inset: 0.6rem;
		z-index: 3;
		border: none;
		background: rgba(10, 10, 10, 0.06);
		cursor: pointer;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding-bottom: 1rem;
		transition: background 0.2s;
	}

	.cv-overlay:hover {
		background: rgba(10, 10, 10, 0.12);
	}

	.cv-overlay-hint {
		font-family: var(--font-mono);
		font-weight: 700;
		font-size: 0.66rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--accent-ink);
		background: var(--accent);
		padding: 0.5rem 1rem;
		transition: transform 0.2s;
	}

	.cv-overlay:hover .cv-overlay-hint {
		transform: translate(-1px, -1px);
		box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.4);
	}

	.btn-download {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		margin: 2rem auto 0;
		padding: 0.8rem 1.6rem;
		background: var(--accent);
		color: var(--accent-ink);
		font-family: var(--font-mono);
		font-size: 0.74rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		text-decoration: none;
		border: 1px solid var(--accent);
		transition: transform 0.14s, box-shadow 0.14s;
	}

	.btn-download:hover {
		transform: translate(-1px, -1px);
		box-shadow: 4px 4px 0 var(--rule-dark);
		text-decoration: none;
	}

	.cv {
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}

	@media (min-width: 560px) {
		.facts {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
