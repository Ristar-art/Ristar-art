<script lang="ts">
	import { onMount } from 'svelte';
	import { Code, Search, Palette, Mail, Quote } from '@lucide/svelte';
	import PageNavigation from './PageNavigation.svelte';

	const ACCENT = '#ccff00';

	const sections = [
		{ id: 'hero', title: 'Intro', level: 0 },
		{ id: 'projects', title: 'Work', level: 0 },
		{ id: 'services', title: 'Stack', level: 0 },
		{ id: 'approach', title: 'Process', level: 0 },
		{ id: 'testimonials', title: 'Signal', level: 0 },
		{ id: 'faq', title: 'Spec', level: 0 },
		{ id: 'cta', title: 'Contact', level: 0 }
	];

	const projects = [
		{
			href: 'https://sowheretoaccess.com/',
			img: '/sowheretoaccess.webp',
			name: 'SowhereToAccess',
			domain: 'sowheretoaccess.com',
			desc: 'An e-commerce marketplace focused on African brands. A platform that helps local African entrepreneurs, creators, and businesses (especially from South Africa/townships) sell their products to a wider audience, both locally and globally.'
		},
		{
			href: 'https://villagetech.co.za/',
			img: '/villagetech.webp',
			name: 'Village Tech',
			domain: 'villagetech.co.za',
			desc: 'A technology solution providing online and blended technology training, skills development, and learnerships to improve digital skills in Africa, especially in South Africa.'
		},
		{
			href: 'https://www.mtubastluciatourism.co.za/',
			img: '/mtubatuba.webp',
			name: 'Mtubatuba St Lucia',
			domain: 'mtubastluciatourism.co.za',
			desc: 'Official tourism site showcasing the natural beauty, wildlife, and attractions of the Mtubatuba,st Lucia and Dukuduku region and theit surroundings.'
		}
	];

	const services = [
		{ icon: Code, title: 'Web & App Development', desc: 'Fast, conversion-focused web and mobile applications built with modern technology.' },
		{ icon: Search, title: 'SEO', desc: 'Search optimization to improve visibility, drive traffic, and grow your online presence.' },
		{ icon: Palette, title: 'Portfolio Design', desc: 'Custom portfolio websites that showcase your work and leave a lasting impression.' },
		{ icon: Mail, title: 'Email Signature Design', desc: 'Professional, branded email signatures that reinforce your identity in every message.' }
	];

	const steps = [
		{ title: 'Discovery Call', desc: 'We talk through your goals, audience, and scope so the project starts with a clear target.' },
		{ title: 'Proposal & Quote', desc: 'You get a fixed scope, timeline, and price — no surprises, no hidden costs.' },
		{ title: 'Design & Approval', desc: 'I share mockups for review. We refine together until you sign off on the direction.' },
		{ title: 'Build & Iterate', desc: 'Development with regular check-ins so you always know where things stand.' },
		{ title: 'Launch & Handover', desc: 'We go live. You get deployment, a walkthrough, and the docs to run it confidently.' },
		{ title: 'Ongoing Support', desc: 'Post-launch tweaks and maintenance to keep everything fast and current.' }
	];

	const stack = ['React JS', 'React Native', 'Node.js', 'MongoDB', 'Firebase', 'JavaScript', 'HTML / CSS', 'Svelte'];
	const strengths = ['Web & Mobile Dev', 'Tech Creativity', 'Digital Marketing', 'Negotiation', 'Critical Thinking', 'Leadership'];

	let activeSection = $state('hero');

	function scrollToSection(id: string) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) activeSection = entry.target.id;
				}
			},
			{ rootMargin: '-45% 0px -50% 0px' }
		);
		for (const s of sections) {
			const el = document.getElementById(s.id);
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Ristar-art: Home</title>
	<meta name="description" content="Home page of Ristar-art" />
</svelte:head>

<PageNavigation {sections} {activeSection} {scrollToSection} />

<!-- ── HERO ─────────────────────────────────────────────── -->
<section id="hero" class="sec sec--dark hero">
	<div class="shell hero-grid">
		<div class="hero-content">
			<span class="eyebrow">Boiketlo Mochochoko / Full-Stack Developer</span>
			<h1>
				<span>I design</span>
				<span class="accent">fast, conversion-focused</span>
				<span>web &amp; mobile apps</span>
				<span class="dim">for enterprise &amp; local business<span class="caret">_</span></span>
			</h1>
			<p class="hero-sub">
				Engineered front to back. Shipped fast. Built to convert.
			</p>
			<div class="hero-actions">
				<a href="/contact" class="btn btn--accent">Contact Me <span>→</span></a>
				<a href="/projects" class="btn btn--ghost">View Work</a>
			</div>
		</div>

		<figure class="hero-image">
			<img src="/heropic.webp" alt="Boiketlo Mochochoko" />
			<figcaption>
				<span>RISTAR</span>
				<span class="ok">● ONLINE</span>
			</figcaption>
		</figure>
	</div>
	<div class="hero-marquee" aria-hidden="true">
		<div class="marquee-track">
			{#each Array(2) as _}
				<span>SVELTE</span><span>·</span><span>REACT</span><span>·</span><span>NODE</span><span>·</span><span>TYPESCRIPT</span><span>·</span><span>MONGODB</span><span>·</span><span>FIREBASE</span><span>·</span><span>SEO</span><span>·</span>
			{/each}
		</div>
	</div>
</section>

<!-- ── WORK ─────────────────────────────────────────────── -->
<section id="projects" class="sec sec--light">
	<div class="shell">
		<header class="sec-head">
			<span class="sec-index">// 01</span>
			<h2>Deployed</h2>
			<span class="sec-meta">{projects.length} live builds</span>
		</header>

		<div class="grid-3">
			{#each projects as p, i}
				<a href={p.href} target="_blank" rel="noopener" class="card">
					<div class="card-img">
						<img src={p.img} alt={`${p.name} screenshot`} />
						<span class="card-tag">{String(i + 1).padStart(2, '0')}</span>
					</div>
					<div class="card-body">
						<h3>{p.name}</h3>
						<span class="card-domain">{p.domain}</span>
						<p>{p.desc}</p>
						<span class="card-link">View Project →</span>
					</div>
				</a>
			{/each}
		</div>

		<a href="/projects" class="btn btn--dark all-link">All Projects →</a>
	</div>
</section>

<!-- ── STACK / SERVICES ─────────────────────────────────── -->
<section id="services" class="sec sec--dark">
	<div class="shell">
		<header class="sec-head">
			<span class="sec-index">// 02</span>
			<h2>Capabilities</h2>
			<span class="sec-meta">What I ship</span>
		</header>

		<div class="grid-services">
			{#each services as s, i}
				<div class="service">
					<span class="service-idx">{String(i + 1).padStart(2, '0')}</span>
					<s.icon size={26} color={ACCENT} strokeWidth={1.5} />
					<h3>{s.title}</h3>
					<p>{s.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ── PROCESS / APPROACH ───────────────────────────────── -->
<section id="approach" class="sec sec--light">
	<div class="shell">
		<header class="sec-head">
			<span class="sec-index">// 03</span>
			<h2>Process</h2>
			<span class="sec-meta">06 stages</span>
		</header>

		<ol class="steps">
			{#each steps as step, i}
				<li class="step">
					<span class="step-num">{String(i + 1).padStart(2, '0')}</span>
					<h3 class="step-title">{step.title}</h3>
					<p class="step-desc">{step.desc}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<!-- ── SIGNAL / TESTIMONIAL ─────────────────────────────── -->
<section id="testimonials" class="sec sec--dark">
	<div class="shell">
		<header class="sec-head">
			<span class="sec-index">// 04</span>
			<h2>Signal</h2>
			<span class="sec-meta">Field report</span>
		</header>

		<figure class="quote">
			<Quote size={32} color={ACCENT} strokeWidth={1.5} />
			<blockquote>
				Boiketlo is a rare breed of Full Stack Developer who pairs an obsession with
				high-functioning backend architecture with a genuine care for refining frontend
				aesthetics and features. He is always on standby, proactively ensuring our systems are
				secure, updated, and running flawlessly at all times. A Lead Developer who treats
				digital infrastructure with ultimate ownership and serves as an exceptional Mentor.
				B 'Ristar' is an absolute essential for any Team.
			</blockquote>
			<figcaption>
				<img src="/Thoto%20R%20Nhlapo.webp" alt="Thoto R Nhlapo" />
				<span class="q-name">Thoto R. Nhlapo</span>
				<span class="q-role">Former Manager</span>
			</figcaption>
		</figure>
	</div>
</section>

<!-- ── SPEC / FAQ ───────────────────────────────────────── -->
<section id="faq" class="sec sec--light">
	<div class="shell">
		<header class="sec-head">
			<span class="sec-index">// 05</span>
			<h2>Spec</h2>
			<span class="sec-meta">Stack &amp; strengths</span>
		</header>

		<div class="spec-block">
			<h3 class="spec-q"><span>Q/</span> What stack do you use?</h3>
			<ul class="chips">
				{#each stack as item}<li>{item}</li>{/each}
			</ul>
		</div>

		<div class="spec-block">
			<h3 class="spec-q"><span>Q/</span> What are you good at?</h3>
			<ul class="chips">
				{#each strengths as item}<li>{item}</li>{/each}
			</ul>
		</div>
	</div>
</section>

<!-- ── CONTACT / CTA ────────────────────────────────────── -->
<section id="cta" class="sec sec--dark cta">
	<div class="shell">
		<div class="cta-panel">
			<span class="cta-eyebrow">// let's work together</span>
			<h2 class="cta-heading">Have a project<br />in mind?</h2>
			<p class="cta-text">
				Whether it's a fast, conversion-focused website or a full mobile app — let's turn your
				idea into something real.
			</p>
			<div class="cta-actions">
				<a href="/contact" class="btn btn--invert">Start a Project →</a>
				<a href="mailto:mochochokoboiketlo@gmail.com" class="cta-mail">mochochokoboiketlo@gmail.com</a>
			</div>
		</div>
	</div>
</section>

<style>
	/* ── Section scaffolding ──────────────────────────────── */
	.sec {
		width: 100%;
		padding: clamp(3.5rem, 8vw, 7rem) 0;
	}

	.sec--dark {
		background: var(--bg-dark);
		color: var(--ink-dark);
		--fg: var(--ink-dark);
		--fg-dim: var(--ink-dark-dim);
		--rule: var(--rule-dark);
	}

	.sec--light {
		background: var(--bg-light);
		color: var(--ink-light);
		--fg: var(--ink-light);
		--fg-dim: var(--ink-light-dim);
		--rule: var(--rule-light);
	}

	.shell {
		max-width: var(--container);
		margin: 0 auto;
		padding: 0 var(--gutter);
	}

	.sec-head {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		padding-bottom: 1.1rem;
		margin-bottom: 2.5rem;
		border-bottom: 1px solid var(--fg);
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
		color: var(--fg);
	}

	.sec-meta {
		margin-left: auto;
		font-size: 0.68rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--fg-dim);
	}

	/* ── Buttons ──────────────────────────────────────────── */
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
		transition: background 0.14s, color 0.14s, border-color 0.14s, transform 0.14s;
	}

	.btn:hover {
		text-decoration: none;
		transform: translate(-1px, -1px);
	}

	.btn--accent {
		background: var(--accent);
		color: var(--accent-ink);
	}
	.btn--accent:hover {
		box-shadow: 4px 4px 0 var(--rule-dark);
	}

	.btn--ghost {
		background: transparent;
		color: var(--ink-dark);
		border-color: var(--rule-dark);
	}
	.btn--ghost:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	.btn--dark {
		background: var(--ink-light);
		color: var(--bg-light);
		border-color: var(--ink-light);
	}
	.btn--dark:hover {
		background: var(--accent);
		color: var(--accent-ink);
		border-color: var(--accent);
	}

	.btn--invert {
		background: var(--accent-ink);
		color: var(--accent);
		border-color: var(--accent-ink);
	}
	.btn--invert:hover {
		box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.35);
	}

	/* ── Hero ─────────────────────────────────────────────── */
	.hero {
		padding-top: clamp(3rem, 7vw, 6rem);
		padding-bottom: 0;
		overflow: hidden;
		border-bottom: 1px solid var(--rule-dark);
	}

	.hero-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		align-items: center;
		padding-bottom: clamp(3rem, 7vw, 6rem);
	}

	.eyebrow {
		display: inline-block;
		font-size: 0.68rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--ink-dark-dim);
		padding-bottom: 1.25rem;
		margin-bottom: 1.5rem;
		border-bottom: 1px solid var(--rule-dark);
	}

	.hero h1 {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
		font-size: clamp(2rem, 7vw, 3.6rem);
		line-height: 1.02;
		letter-spacing: -0.02em;
	}

	.hero h1 .accent {
		color: var(--accent);
	}

	.hero h1 .dim {
		color: var(--ink-dark-dim);
		font-size: 0.62em;
		letter-spacing: 0;
		margin-top: 0.4rem;
	}

	.caret {
		color: var(--accent);
		animation: blink 1.1s step-end infinite;
		font-weight: 400;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	.hero-sub {
		margin: 1.75rem 0 2rem;
		font-size: 0.95rem;
		color: var(--ink-dark-dim);
		max-width: 38ch;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.hero-image {
		position: relative;
		margin: 0;
		border: 1px solid var(--rule-dark);
		padding: 0.6rem;
	}

	.hero-image::before,
	.hero-image::after {
		content: '';
		position: absolute;
		width: 18px;
		height: 18px;
		border: 2px solid var(--accent);
	}
	.hero-image::before {
		top: -1px;
		left: -1px;
		border-right: none;
		border-bottom: none;
	}
	.hero-image::after {
		bottom: -1px;
		right: -1px;
		border-left: none;
		border-top: none;
	}

	.hero-image img {
		width: 100%;
		height: auto;
		display: block;
		filter: grayscale(0.15) contrast(1.05);
	}

	.hero-image figcaption {
		display: flex;
		justify-content: space-between;
		padding: 0.6rem 0.2rem 0.1rem;
		font-size: 0.62rem;
		letter-spacing: 0.16em;
		color: var(--ink-dark-dim);
	}

	.hero-image figcaption .ok {
		color: var(--accent);
	}

	/* ── Hero marquee ─────────────────────────────────────── */
	.hero-marquee {
		border-top: 1px solid var(--rule-dark);
		overflow: hidden;
		white-space: nowrap;
		padding: 0.9rem 0;
	}

	.marquee-track {
		display: inline-flex;
		gap: 1.5rem;
		animation: scroll 28s linear infinite;
	}

	.marquee-track span {
		font-size: 0.72rem;
		letter-spacing: 0.22em;
		color: var(--ink-dark-dim);
	}

	@keyframes scroll {
		to {
			transform: translateX(-50%);
		}
	}

	/* ── Grids ────────────────────────────────────────────── */
	.grid-3 {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}

	/* ── Project cards ────────────────────────────────────── */
	.card {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--rule-strong-light);
		background: var(--bg-light);
		color: var(--ink-light);
		text-decoration: none;
		transition: transform 0.14s, box-shadow 0.14s, border-color 0.14s;
	}

	.card:hover {
		transform: translate(-2px, -2px);
		box-shadow: 6px 6px 0 var(--accent);
		text-decoration: none;
	}

	.card-img {
		position: relative;
		border-bottom: 1px solid var(--rule-strong-light);
		overflow: hidden;
		aspect-ratio: 16 / 10;
	}

	.card-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		filter: grayscale(1) contrast(1.05);
		transition: filter 0.2s;
	}

	.card:hover .card-img img {
		filter: grayscale(0);
	}

	.card-tag {
		position: absolute;
		top: 0;
		left: 0;
		background: var(--accent-ink);
		color: var(--accent);
		font-size: 0.66rem;
		letter-spacing: 0.1em;
		padding: 0.3rem 0.55rem;
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
		color: var(--ink-light);
	}

	.card-domain {
		font-size: 0.66rem;
		letter-spacing: 0.08em;
		color: var(--accent-ink);
		opacity: 0.55;
		margin: 0.35rem 0 0.85rem;
	}

	.card-body p {
		font-size: 0.82rem;
		line-height: 1.55;
		color: var(--ink-light-dim);
		margin: 0 0 1.25rem;
		flex: 1;
	}

	.card-link {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-light);
	}

	.all-link {
		margin-top: 2.5rem;
	}

	/* ── Services ─────────────────────────────────────────── */
	.grid-services {
		display: grid;
		grid-template-columns: 1fr;
		border-top: 1px solid var(--rule-dark);
	}

	.service {
		position: relative;
		padding: 2rem 0;
		border-bottom: 1px solid var(--rule-dark);
	}

	.service-idx {
		display: block;
		font-size: 0.66rem;
		letter-spacing: 0.18em;
		color: var(--rule-dark);
		margin-bottom: 1rem;
	}

	.service h3 {
		font-size: 1.05rem;
		letter-spacing: 0.01em;
		margin: 1rem 0 0.6rem;
		color: var(--ink-dark);
	}

	.service p {
		font-size: 0.82rem;
		line-height: 1.6;
		color: var(--ink-dark-dim);
		max-width: 42ch;
	}

	/* ── Process steps ────────────────────────────────────── */
	.steps {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--rule-light);
	}

	.step {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.3rem 1.25rem;
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--rule-light);
	}

	.step-num {
		grid-row: span 2;
		font-size: 1.6rem;
		font-weight: 700;
		color: var(--accent-ink);
		opacity: 0.18;
		line-height: 1;
	}

	.step-title {
		font-size: 1.05rem;
		letter-spacing: 0.01em;
		color: var(--ink-light);
	}

	.step-desc {
		font-size: 0.84rem;
		line-height: 1.6;
		color: var(--ink-light-dim);
		max-width: 60ch;
		margin: 0;
	}

	/* ── Testimonial ──────────────────────────────────────── */
	.quote {
		position: relative;
		margin: 0;
		border: 1px solid var(--rule-dark);
		padding: clamp(1.75rem, 4vw, 3rem);
		max-width: 760px;
	}

	.quote blockquote {
		margin: 1.25rem 0 2rem;
		font-size: clamp(0.95rem, 2vw, 1.15rem);
		line-height: 1.7;
		color: var(--ink-dark);
	}

	.quote figcaption {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 0.1rem 1rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--rule-dark);
	}

	.quote figcaption img {
		grid-row: span 2;
		width: 48px;
		height: 48px;
		object-fit: cover;
		border: 1px solid var(--accent);
		filter: grayscale(1);
	}

	.q-name {
		font-weight: 700;
		font-size: 0.8rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--ink-dark);
	}

	.q-role {
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		color: var(--ink-dark-dim);
	}

	/* ── Spec / FAQ ───────────────────────────────────────── */
	.spec-block {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
		padding: 2.25rem 0;
		border-bottom: 1px solid var(--rule-light);
	}
	.spec-block:first-of-type {
		border-top: 1px solid var(--rule-light);
	}

	.spec-q {
		font-size: clamp(1.2rem, 3vw, 1.8rem);
		letter-spacing: -0.01em;
		color: var(--ink-light);
		line-height: 1.1;
	}

	.spec-q span {
		color: var(--accent-ink);
		background: var(--accent);
		padding: 0 0.3rem;
		margin-right: 0.4rem;
	}

	.chips {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		align-content: flex-start;
	}

	.chips li {
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink-light);
		padding: 0.5rem 0.9rem;
		border: 1px solid var(--rule-strong-light);
		transition: background 0.14s, color 0.14s, border-color 0.14s;
		cursor: default;
	}

	.chips li:hover {
		background: var(--accent-ink);
		color: var(--accent);
		border-color: var(--accent-ink);
	}

	/* ── CTA ──────────────────────────────────────────────── */
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
	@media (min-width: 768px) {
		.hero-grid {
			grid-template-columns: 1.15fr 0.85fr;
			gap: 3.5rem;
		}

		.grid-3 {
			grid-template-columns: repeat(3, 1fr);
		}

		.grid-services {
			grid-template-columns: repeat(2, 1fr);
			column-gap: 3rem;
		}

		.service {
			padding: 2.25rem 0;
		}

		.step {
			grid-template-columns: auto 14rem 1fr;
			gap: 2rem;
			align-items: baseline;
		}
		.step-num {
			grid-row: auto;
			font-size: 1.4rem;
		}

		.spec-block {
			grid-template-columns: 0.9fr 1.1fr;
			gap: 3rem;
			align-items: start;
		}
	}

	@media (min-width: 1024px) {
		.step-num {
			font-size: 1.6rem;
		}
	}
</style>
