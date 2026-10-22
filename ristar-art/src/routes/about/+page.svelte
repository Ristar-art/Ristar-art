<script lang="ts">
	import { Code, Search, Palette, Mail, Target, Gauge, MessageSquare, ShieldCheck } from '@lucide/svelte';
	import Seo from '$lib/Seo.svelte';
	import { SITE_URL, SITE_NAME, LEGAL_NAME, FOUNDER, GITHUB_URL, absolute } from '$lib/site';

	const ICON = '#17181c';

	const facts = [
		{ k: 'Studio', v: 'White Robes Development' },
		{ k: 'Focus', v: 'Web & Mobile Apps' },
		{ k: 'Region', v: 'Johannesburg / South Africa' },
		{ k: 'Status', v: 'Taking on new projects' }
	];

	const services = [
		{
			icon: Code,
			title: 'Web & App Development',
			desc: 'Custom web and mobile applications built on modern frameworks — fast to load, straightforward to run, and shaped around how your business actually works.'
		},
		{
			icon: Search,
			title: 'SEO & Technical Growth',
			desc: 'Clean markup, structured data, and page speed done properly, so the work you paid for is the work people can actually find.'
		},
		{
			icon: Palette,
			title: 'Brand & Portfolio Sites',
			desc: 'Sites for firms, practices, and creators who need their presence to look as considered as the work behind it.'
		},
		{
			icon: Mail,
			title: 'Email Signature Design',
			desc: 'Branded, standards-compliant email signatures that render correctly in every client your team sends from.'
		}
	];

	const values = [
		{
			icon: Target,
			title: 'Scope before code',
			desc: 'Every engagement starts with a fixed scope, timeline, and price. You know what you are getting before anything is built.'
		},
		{
			icon: Gauge,
			title: 'Performance is a feature',
			desc: 'Speed, accessibility, and search visibility are built in from the first commit, not bolted on after launch.'
		},
		{
			icon: MessageSquare,
			title: 'You stay in the loop',
			desc: 'Regular check-ins and working previews throughout the build. No silence between kickoff and delivery.'
		},
		{
			icon: ShieldCheck,
			title: 'We own what we ship',
			desc: 'Handover includes deployment, documentation, and a walkthrough — plus ongoing support when you want it.'
		}
	];

	const organizationJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		'@id': `${SITE_URL}/#organization`,
		name: SITE_NAME,
		legalName: LEGAL_NAME,
		url: SITE_URL,
		logo: absolute('/favicon.webp'),
		founder: {
			'@type': 'Person',
			name: FOUNDER,
			jobTitle: 'Founder & Lead Developer',
			sameAs: [GITHUB_URL]
		},
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Johannesburg',
			addressCountry: 'ZA'
		}
	};
</script>

<Seo
	title="About — White Robes Development | South African Software Studio"
	description="White Robes Development is a Johannesburg-based software studio building fast, conversion-focused web and mobile applications for enterprise and local business."
	jsonld={organizationJsonLd}
/>

<header class="page-head">
	<span class="eyebrow">// about</span>
	<h1>About<br />White Robes</h1>
	<p>
		White Robes Development is a South African software studio. We build web and mobile
		applications for enterprise teams and local businesses — the kind that load fast, rank well,
		and hold up long after launch.
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

<!-- ── 01 WHAT WE DO ────────────────────────────────────── -->
<section class="block">
	<header class="sec-head">
		<span class="sec-index">// 01</span>
		<h2>What we do</h2>
		<span class="sec-meta">{services.length} services</span>
	</header>

	<div class="grid-2">
		{#each services as s, i}
			<article class="item">
				<span class="item-idx">{String(i + 1).padStart(2, '0')}</span>
				<s.icon size={24} color={ICON} strokeWidth={1.5} />
				<h3>{s.title}</h3>
				<p>{s.desc}</p>
			</article>
		{/each}
	</div>
</section>

<!-- ── 02 HOW WE WORK ───────────────────────────────────── -->
<section class="block">
	<header class="sec-head">
		<span class="sec-index">// 02</span>
		<h2>How we work</h2>
		<span class="sec-meta">Operating principles</span>
	</header>

	<div class="grid-2">
		{#each values as v, i}
			<article class="item">
				<span class="item-idx">{String(i + 1).padStart(2, '0')}</span>
				<v.icon size={24} color={ICON} strokeWidth={1.5} />
				<h3>{v.title}</h3>
				<p>{v.desc}</p>
			</article>
		{/each}
	</div>
</section>

<!-- ── 03 WHO WE ARE ────────────────────────────────────── -->
<section class="block">
	<header class="sec-head">
		<span class="sec-index">// 03</span>
		<h2>Who we are</h2>
		<span class="sec-meta">Founder</span>
	</header>

	<div class="founder">
		<figure class="founder-img">
			<img src="/myheroimage.webp" alt={FOUNDER} width="640" height="640" loading="lazy" />
		</figure>

		<div class="founder-body">
			<span class="founder-role">Founder &amp; Lead Developer</span>
			<h3 class="founder-name">{FOUNDER}</h3>
			<p>
				White Robes Development was founded by {FOUNDER}, a full-stack developer working across
				Svelte, React, React Native, Node, and TypeScript. Before the studio, he led
				development on production systems where uptime, security, and performance were not
				negotiable — and that standard is what the studio is built on.
			</p>
			<p>
				Every project runs through the same senior hands that scoped it. Your work does not get
				passed down the line — the person who quoted it is the person who builds it.
			</p>
			<p>
				The builds listed under <a href="/projects">Projects</a> are his own work, delivered
				before the studio was formed. They are shown as evidence of capability rather than as
				studio credits.
			</p>
			<a class="founder-link" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
				{GITHUB_URL.replace('https://', '')} →
			</a>
		</div>
	</div>
</section>

<!-- ── CTA ──────────────────────────────────────────────── -->
<section class="cta">
	<div class="cta-panel">
		<span class="cta-eyebrow">// let's work together</span>
		<h2 class="cta-heading">Ready to start<br />building?</h2>
		<p class="cta-text">
			Tell us about the project — scope, timeline, whatever you've got. We'll come back with a
			clear plan and a fixed quote.
		</p>
		<div class="cta-actions">
			<a href="/contact" class="btn btn--invert">Start a Project →</a>
			<a href="/projects" class="cta-alt">See our work</a>
		</div>
	</div>
</section>

<style>
	.page-head {
		padding: 1rem 0 2.5rem;
		border-bottom: 1px solid var(--rule-light);
		max-width: 60rem;
	}

	.eyebrow {
		display: inline-block;
		background: var(--accent);
		color: var(--accent-ink);
		padding: 0.15rem 0.45rem;
		align-self: flex-start;
		font-size: 0.68rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		margin-bottom: 1.25rem;
	}

	.page-head h1 {
		font-size: clamp(2rem, 6vw, 3.2rem);
		letter-spacing: -0.02em;
		line-height: 1;
		color: var(--ink-light);
		margin-bottom: 1.25rem;
	}

	.page-head p {
		font-size: 0.92rem;
		line-height: 1.6;
		color: var(--ink-light-dim);
		max-width: 56ch;
	}

	.facts {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0;
		margin: 2rem 0 0;
		border: 1px solid var(--rule-light);
	}

	.fact {
		padding: 0.85rem 1rem;
		border-right: 1px solid var(--rule-light);
		border-bottom: 1px solid var(--rule-light);
	}

	.facts dt {
		font-size: 0.6rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--ink-light-dim);
		margin-bottom: 0.35rem;
	}

	.facts dd {
		margin: 0;
		font-size: 0.8rem;
		letter-spacing: 0.04em;
		color: var(--ink-light);
	}

	/* ── Section header (matches landing pattern) ─────────── */
	.sec-head {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		padding-bottom: 1.1rem;
		margin-bottom: 2.5rem;
		border-bottom: 1px solid var(--ink-light);
	}

	.sec-index {
		display: inline-block;
		background: var(--accent);
		color: var(--accent-ink);
		padding: 0.15rem 0.45rem;
		align-self: flex-start;
		font-size: 0.72rem;
		letter-spacing: 0.18em;
		font-weight: 500;
	}

	.sec-head h2 {
		font-size: clamp(1.4rem, 3vw, 2.1rem);
		letter-spacing: -0.01em;
		color: var(--ink-light);
	}

	.sec-meta {
		margin-left: auto;
		font-size: 0.68rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-light-dim);
		text-align: right;
	}

	.block {
		padding: 3rem 0 0;
	}

	/* ── Service / value items ────────────────────────────── */
	.grid-2 {
		display: grid;
		grid-template-columns: 1fr;
		border-top: 1px solid var(--rule-light);
	}

	.item {
		padding: 2rem 0;
		border-bottom: 1px solid var(--rule-light);
	}

	.item-idx {
		display: block;
		font-size: 0.66rem;
		letter-spacing: 0.18em;
		color: var(--ink-light-dim);
		margin-bottom: 1rem;
	}

	.item h3 {
		font-size: 1.05rem;
		letter-spacing: 0.01em;
		margin: 1rem 0 0.6rem;
		color: var(--ink-light);
	}

	.item p {
		font-size: 0.84rem;
		line-height: 1.6;
		color: var(--ink-light-dim);
		max-width: 46ch;
		margin: 0;
	}

	/* ── Founder ──────────────────────────────────────────── */
	.founder {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		border-top: 1px solid var(--rule-light);
		padding-top: 2.5rem;
	}

	.founder-img {
		position: relative;
		margin: 0;
		padding: 0.6rem;
		border: 1px solid var(--rule-light);
		max-width: 320px;
	}

	.founder-img::before,
	.founder-img::after {
		content: '';
		position: absolute;
		width: 18px;
		height: 18px;
		border: 2px solid var(--accent);
	}
	.founder-img::before {
		top: -1px;
		left: -1px;
		border-right: none;
		border-bottom: none;
	}
	.founder-img::after {
		bottom: -1px;
		right: -1px;
		border-left: none;
		border-top: none;
	}

	.founder-img img {
		width: 100%;
		height: auto;
		display: block;
	}

	.founder-role {
		display: inline-block;
		background: var(--accent);
		color: var(--accent-ink);
		padding: 0.15rem 0.45rem;
		align-self: flex-start;
		display: block;
		font-size: 0.64rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		margin-bottom: 0.75rem;
	}

	.founder-name {
		font-size: clamp(1.2rem, 3vw, 1.6rem);
		letter-spacing: -0.01em;
		color: var(--ink-light);
		margin-bottom: 1.25rem;
	}

	.founder-body p {
		font-size: 0.88rem;
		line-height: 1.7;
		color: var(--ink-light-dim);
		max-width: 58ch;
		margin: 0 0 1rem;
	}

	.founder-link {
		display: inline-block;
		margin-top: 0.5rem;
		font-size: 0.74rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-light);
		border-bottom: 1px solid var(--rule-light);
		padding-bottom: 2px;
	}

	.founder-link:hover {
		color: var(--ink-light);
		border-color: var(--accent);
		text-decoration: none;
	}

	/* ── CTA ──────────────────────────────────────────────── */
	.cta {
		padding: 4rem 0 3rem;
	}

	.cta-panel {
		background: var(--accent);
		color: var(--accent-ink);
		padding: clamp(2rem, 5vw, 3.5rem);
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
		font-size: clamp(1.8rem, 5vw, 3rem);
		letter-spacing: -0.02em;
		line-height: 1;
		color: var(--accent-ink);
		margin-bottom: 1.25rem;
	}

	.cta-text {
		max-width: 48ch;
		font-size: 0.92rem;
		line-height: 1.6;
		margin-bottom: 2rem;
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
		padding: 0.8rem 1.5rem;
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
		text-decoration: none;
		transform: translate(-1px, -1px);
		box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.35);
	}

	.cta-alt {
		font-size: 0.8rem;
		letter-spacing: 0.04em;
		color: var(--accent-ink);
		border-bottom: 1px solid rgba(0, 0, 0, 0.4);
		padding-bottom: 2px;
	}

	.cta-alt:hover {
		border-color: var(--accent-ink);
		text-decoration: none;
	}

	@media (min-width: 560px) {
		.facts {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media (min-width: 768px) {
		.grid-2 {
			grid-template-columns: repeat(2, 1fr);
			column-gap: 3rem;
		}

		.item {
			padding: 2.25rem 0;
		}

		.founder {
			grid-template-columns: 320px 1fr;
			gap: 3rem;
			align-items: start;
		}
	}
</style>
