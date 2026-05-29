<script lang="ts">
	const projects = [
		{
			href: 'https://sowheretoaccess.com/',
			img: '/sowheretoaccess.webp',
			name: 'SowhereToAccess',
			domain: 'sowheretoaccess.com',
			year: '2024',
			tags: ['E-commerce', 'SvelteKit', 'Node.js'],
			desc: 'An e-commerce marketplace focused on African brands. A platform that helps local African entrepreneurs, creators, and businesses (especially from South Africa/townships) sell their products to a wider audience, both locally and globally.'
		},
		{
			href: 'https://villagetech.co.za/',
			img: '/villagetech.webp',
			name: 'Village Tech',
			domain: 'villagetech.co.za',
			year: '2023',
			tags: ['EdTech', 'WordPress'],
			desc: 'A technology solution providing online and blended technology training, skills development, and learnerships to improve digital skills in Africa, especially in South Africa.'
		},
		{
			href: 'https://www.mtubastluciatourism.co.za/',
			img: '/mtubatuba.webp',
			name: 'Mtubatuba St Lucia',
			domain: 'mtubastluciatourism.co.za',
			year: '2023',
			tags: ['Tourism', 'Web App', 'SEO'],
			desc: 'Official tourism site showcasing the natural beauty, wildlife, and attractions of the Mtubatuba, St Lucia and Dukuduku region and their surroundings.'
		}
	];
</script>

<svelte:head>
	<title>Projects — Ristar-art</title>
	<meta name="description" content="Selected work by Boiketlo Mochochoko — live web and mobile builds." />
</svelte:head>

<header class="page-head">
	<span class="eyebrow">// work</span>
	<h1>Projects</h1>
	<p>
		A selection of live builds — from e-commerce marketplaces to tourism and training platforms.
		Each one shipped, deployed, and running in production.
	</p>
	<dl class="facts">
		<div class="fact">
			<dt>Builds</dt>
			<dd>{projects.length} live</dd>
		</div>
		<div class="fact">
			<dt>Focus</dt>
			<dd>Web &amp; Mobile</dd>
		</div>
		<div class="fact">
			<dt>Region</dt>
			<dd>South Africa</dd>
		</div>
		<div class="fact">
			<dt>Status</dt>
			<dd>Available for work</dd>
		</div>
	</dl>
</header>

<section class="work">
	<header class="sec-head">
		<span class="sec-index">// 01</span>
		<h2>Deployed</h2>
		<span class="sec-meta">{projects.length} live builds</span>
	</header>

	<div class="grid-3">
		{#each projects as p, i}
			<a href={p.href} target="_blank" rel="noopener noreferrer" class="card">
				<div class="card-img">
					<img src={p.img} alt={`${p.name} screenshot`} loading="lazy" />
					<span class="card-tag">{String(i + 1).padStart(2, '0')}</span>
					<span class="card-year">{p.year}</span>
				</div>
				<div class="card-body">
					<h3>{p.name}</h3>
					<span class="card-domain">{p.domain}</span>
					<p>{p.desc}</p>
					<ul class="card-tags">
						{#each p.tags as tag}<li>{tag}</li>{/each}
					</ul>
					<span class="card-link">View Project →</span>
				</div>
			</a>
		{/each}
	</div>
</section>

<section class="cta">
	<div class="cta-panel">
		<span class="cta-eyebrow">// more on the way</span>
		<h2 class="cta-heading">Want to be<br />the next build?</h2>
		<p class="cta-text">
			More projects are being added soon. If you've got an idea, let's turn it into something
			real and shippable.
		</p>
		<div class="cta-actions">
			<a href="/contact" class="btn btn--invert">Start a Project →</a>
			<a href="mailto:mochochokoboiketlo@gmail.com" class="cta-mail"
				>mochochokoboiketlo@gmail.com</a
			>
		</div>
	</div>
</section>

<style>
	/* ── Page header (matches /about pattern) ─────────────── */
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
		max-width: 56ch;
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

	.work {
		padding: 3rem 0 1rem;
	}

	/* ── Grid ─────────────────────────────────────────────── */
	.grid-3 {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}

	/* ── Project cards (dark variant) ─────────────────────── */
	.card {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--rule-dark);
		background: var(--bg-dark-2);
		color: var(--ink-dark);
		text-decoration: none;
		transition: transform 0.14s, box-shadow 0.14s, border-color 0.14s;
	}

	.card:hover {
		transform: translate(-2px, -2px);
		box-shadow: 6px 6px 0 var(--accent);
		border-color: var(--accent);
		text-decoration: none;
	}

	.card-img {
		position: relative;
		border-bottom: 1px solid var(--rule-dark);
		overflow: hidden;
		aspect-ratio: 16 / 10;
	}

	.card-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		filter: grayscale(1) contrast(1.05);
		transition: filter 0.2s, transform 0.3s;
	}

	.card:hover .card-img img {
		filter: grayscale(0);
		transform: scale(1.03);
	}

	.card-tag {
		position: absolute;
		top: 0;
		left: 0;
		background: var(--accent);
		color: var(--accent-ink);
		font-size: 0.66rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		padding: 0.3rem 0.55rem;
	}

	.card-year {
		position: absolute;
		top: 0;
		right: 0;
		background: var(--bg-dark);
		color: var(--ink-dark-dim);
		font-size: 0.62rem;
		letter-spacing: 0.1em;
		padding: 0.3rem 0.55rem;
		border-left: 1px solid var(--rule-dark);
		border-bottom: 1px solid var(--rule-dark);
	}

	.card-body {
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.card-body h3 {
		font-size: 1rem;
		letter-spacing: 0.02em;
		color: var(--ink-dark);
	}

	.card-domain {
		font-size: 0.66rem;
		letter-spacing: 0.08em;
		color: var(--accent);
		margin: 0.35rem 0 0.85rem;
	}

	.card-body p {
		font-size: 0.82rem;
		line-height: 1.55;
		color: var(--ink-dark-dim);
		margin: 0 0 1.1rem;
		flex: 1;
	}

	.card-tags {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		padding: 0;
		margin: 0 0 1.25rem;
	}

	.card-tags li {
		font-size: 0.6rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-dark-dim);
		padding: 0.3rem 0.55rem;
		border: 1px solid var(--rule-dark);
	}

	.card-link {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--accent);
	}

	/* ── CTA (matches landing pattern) ────────────────────── */
	.cta {
		padding: 3rem 0 1rem;
	}

	.cta-panel {
		position: relative;
		background: var(--accent);
		color: var(--accent-ink);
		padding: clamp(2.5rem, 6vw, 4.5rem);
		border: 1px solid var(--accent);
	}

	.cta-eyebrow {
		display: block;
		font-size: 0.7rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		margin-bottom: 1.5rem;
		opacity: 0.7;
	}

	.cta-heading {
		font-size: clamp(2rem, 6vw, 3.4rem);
		letter-spacing: -0.02em;
		line-height: 1;
		color: var(--accent-ink);
		margin-bottom: 1.5rem;
	}

	.cta-text {
		max-width: 48ch;
		font-size: 0.95rem;
		line-height: 1.6;
		margin-bottom: 2.25rem;
		opacity: 0.85;
	}

	.cta-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.5rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.75rem 1.4rem;
		font-family: var(--font-mono);
		font-size: 0.74rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		text-decoration: none;
		border: 1px solid transparent;
		transition: transform 0.14s, box-shadow 0.14s;
	}

	.btn--invert {
		background: var(--accent-ink);
		color: var(--accent);
		border-color: var(--accent-ink);
	}
	.btn--invert:hover {
		transform: translate(-1px, -1px);
		box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.35);
		text-decoration: none;
	}

	.cta-mail {
		font-size: 0.82rem;
		letter-spacing: 0.04em;
		color: var(--accent-ink);
		border-bottom: 1px solid rgba(0, 0, 0, 0.4);
		padding-bottom: 2px;
	}
	.cta-mail:hover {
		border-color: var(--accent-ink);
		text-decoration: none;
	}

	/* ── Responsive ───────────────────────────────────────── */
	@media (min-width: 560px) {
		.facts {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media (min-width: 768px) {
		.grid-3 {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
