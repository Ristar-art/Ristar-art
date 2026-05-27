<script lang="ts">
	import { onMount } from 'svelte';
	import { Code, Search, Palette, Mail, Quote } from '@lucide/svelte';
	import PageNavigation from './PageNavigation.svelte';

	const sections = [
		{ id: 'hero', title: 'Intro', level: 0 },
		{ id: 'projects', title: 'Projects', level: 0 },
		{ id: 'services', title: 'Services', level: 0 },
		{ id: 'approach', title: 'Approach', level: 0 },
		{ id: 'testimonials', title: 'Reviews', level: 0 },
		{ id: 'faq', title: 'FAQ', level: 0 },
		{ id: 'cta', title: 'Contact', level: 0 }
	];

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

<section id="hero" class="hero">
	<div class="hero-content">
		<h1>
			<!-- <span class="intro">I'm <span class="highlight">Boiketlo Mochochoko</span></span> -->
			<span class="action">I design</span>
			<span class="differentiator">fast, conversion-focused</span>
			<span class="offer">web & mobile apps</span>
			<span class="audience">for Enterprise & local businesses</span>
		</h1>
	<a href="/contact" class="cta-button">Contact Me</a>
	</div>
	<div class="hero-image">
		<img src="/myheroimage.webp" alt="Boiketlo mochochoko" />
	</div>
</section>
<section id="projects" class="projects">
	<h2>Live Projects</h2>
	<div class="projects-grid">
		<a href="https://sowheretoaccess.com/" target="_blank" rel="noopener" class="project-card">
			<img src="/sowheretoaccess.webp" alt="SowhereToAccess website screenshot" />
			<div class="project-info">
				<h3>SowhereToAccess</h3>
				<p>A comprehensive travel guide platform helping travelers discover and navigate destinations with detailed information and local insights.</p>
				<span class="project-link">View Project →</span>
			</div>
		</a>
		<a href="https://villagetech.co.za/" target="_blank" rel="noopener" class="project-card">
			<img src="/villagetech.webp" alt="Village Tech website screenshot" />
			<div class="project-info">
				<h3>Village Tech</h3>
				<p>Rural technology solutions bringing digital services and connectivity to underserved communities in South Africa.</p>
				<span class="project-link">View Project →</span>
			</div>
		</a>
		<a href="https://www.mtubastluciatourism.co.za/" target="_blank" rel="noopener" class="project-card">
			<img src="/mtubatuba.webp" alt="Mtubatuba St Lucia Tourism website screenshot" />
			<div class="project-info">
				<h3>Mtubatuba St Lucia</h3>
				<p>Official tourism website showcasing the natural beauty, wildlife, and attractions of the iSimangaliso Wetland Park region.</p>
				<span class="project-link">View Project →</span>
			</div>
		</a>
	</div>
	<a href="/projects" class="projects-cta">All Projects →</a>
</section>

<section id="services" class="services">
	<div class="services-label">services</div>
	<div class="services-rule"></div>
	<div class="services-grid">
		<div class="service-card">
			<Code size={32} color="#ff3e00" />
			<h3>Web & App<br>Development</h3>
			<p>Fast, conversion-focused web and mobile applications built with modern technology.</p>
		</div>
		<div class="service-card">
			<Search size={32} color="#ff3e00" />
			<h3>SEO</h3>
			<p>Search engine optimization to improve visibility, drive traffic, and grow your online presence.</p>
		</div>
		<div class="service-card">
			<Palette size={32} color="#ff3e00" />
			<h3>Portfolio<br>Design</h3>
			<p>Custom portfolio websites that showcase your work and leave a lasting impression.</p>
		</div>
		<div class="service-card">
			<Mail size={32} color="#ff3e00" />
			<h3>Email Signature<br>Design</h3>
			<p>Professional, branded email signatures that reinforce your identity in every message.</p>
		</div>
	</div>
</section>

<section id="approach" class="approach">
	<div class="approach-label">approach</div>
	<div class="approach-rule"></div>
	<div class="approach-step">
		<h2><span class="approach-number">01</span> Discovery Call</h2>
		<p class="approach-desc">We talk through your goals, audience, and scope so the project starts with a clear target.</p>
	</div>
	<div class="approach-step">
		<h2><span class="approach-number">02</span> Proposal &amp; Quote</h2>
		<p class="approach-desc">You get a fixed scope, timeline, and price - no surprises, no hidden costs.</p>
	</div>
	<div class="approach-step">
		<h2><span class="approach-number">03</span> Design &amp; Approval</h2>
		<p class="approach-desc">I share mockups for review. We refine together until you sign off on the direction.</p>
	</div>
	<div class="approach-step">
		<h2><span class="approach-number">04</span> Build &amp; Iterate</h2>
		<p class="approach-desc">Development with regular check-ins so you always know where things stand.</p>
	</div>
	<div class="approach-step">
		<h2><span class="approach-number">05</span> Launch &amp; Handover</h2>
		<p class="approach-desc">We go live. You get deployment, a walkthrough, and the docs to run it confidently.</p>
	</div>
	<div class="approach-step">
		<h2><span class="approach-number">06</span> Ongoing Support</h2>
		<p class="approach-desc">Post-launch tweaks and maintenance to keep everything fast and current.</p>
	</div>
</section>

<section id="testimonials" class="testimonials">
	<div class="testimonials-label">testimonials</div>
	<div class="testimonials-rule"></div>
	<figure class="testimonial-card">
		<Quote size={40} color="#ff3e00" class="testimonial-quote-mark" />
		<blockquote>
			Boiketlo is a rare breed of Full Stack Developer who pairs an obsession with high-functioning backend architecture + a genuine care for refining frontend aesthetics and features. He is always on standby, proactively ensuring our systems are secure, updated, and running flawlessly at all times. A Lead Developer who treats digital infrastructure with ultimate ownership and serves as an exceptional Mentor.
B 'Ristar' is an absolute essential for any Team.
		</blockquote>
		<figcaption class="testimonial-author">
			<img src="/Thoto%20R%20Nhlapo.webp" alt="Thoto R Nhlapo" />
			<div class="testimonial-author-info">
				<span class="testimonial-name">Thoto R. Nhlapo</span>
				<span class="testimonial-role">Former Manager</span>
			</div>
		</figcaption>
	</figure>
</section>
<section id="faq" class="faq">
	<div class="faq-label">faq</div>
	<div class="faq-rule"></div>

	<div class="faq-block">
		<h2 class="faq-question"><span class="faq-q">Q/</span> What stack do<br />you use?</h2>
		<ul class="faq-chips">
			<li>React JS</li>
			<li>React Native</li>
			<li>Node.js</li>
			<li>MongoDB</li>
			<li>Firebase</li>
			<li>JavaScript</li>
			<li>HTML / CSS</li>
			<li>Svelte</li>
		</ul>
	</div>

	<div class="faq-block">
		<h2 class="faq-question"><span class="faq-q">Q/</span> What are you<br />good at?</h2>
		<ul class="faq-chips">
			<li>Web &amp; Mobile App Development</li>
			<li>Tech Creativity</li>
			<li>Digital Marketing</li>
			<li>Negotiation</li>
			<li>Critical Thinking</li>
			<li>Leadership</li>
		</ul>
	</div>
</section>
<section id="cta" class="contact-cta">
	<div class="cta-inner">
		<span class="cta-eyebrow">let's work together</span>
		<h2 class="cta-heading">Have a project in mind?</h2>
		<p class="cta-text">
			Whether it's a fast, conversion-focused website or a full mobile app — let's turn
			your idea into something real.
		</p>
		<div class="cta-actions">
			<a href="/contact" class="cta-primary">Start a Project →</a>
			<a href="mailto:mochochokoboiketlo@gmail.com" class="cta-secondary"
				>mochochokoboiketlo@gmail.com</a
			>
		</div>
	</div>
</section>
<style>
	.hero {
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		gap: 2rem;
		padding: 2rem 0;
	}

	.hero-content {
		text-align: center;
		flex: 1;
	}

	.hero-image {
		position: relative;
		width: 100%;
		max-width: 350px;
		border-radius: 8px;
		overflow: visible;
		padding: 14px;
	}

	.hero-image img {
		width: 100%;
		height: auto;
		display: block;
		border-radius: 8px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
		position: relative;
		z-index: 2;
	}

	.hero-image::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 60px;
		height: 60px;
		border-top: 3px solid #ff3e00;
		border-left: 3px solid #ff3e00;
		border-radius: 12px 0 0 0;
		z-index: 1;
	}

	.hero-image::after {
		content: '';
		position: absolute;
		bottom: 0;
		right: 0;
		width: 60px;
		height: 60px;
		border-bottom: 3px solid #ff3e00;
		border-right: 3px solid #ff3e00;
		border-radius: 0 0 12px 0;
		z-index: 1;
	}

	h1 {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		font-size: 1.8rem;
		line-height: 1.2;
	}

	.intro {
		font-family: var(--font-body);
		font-size: 0.6em;
		font-weight: 300;
		opacity: 0.8;
	}

	.highlight {
		font-style: italic;
		color: #ff3e00;
	}

	.action {
		font-size: 1em;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.differentiator {
		font-family: var(--font-body);
		font-size: 0.7em;
		font-weight: 600;
		color: #333;
		background: linear-gradient(90deg, #ff3e00, #ff6b00);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.offer {
		font-size: 1.1em;
		font-weight: 400;
	}

	.audience {
		font-family: var(--font-body);
		font-size: 0.65em;
		font-weight: 400;
		color: #666;
	}

	.cta-button {
		display: inline-block;
		margin-top: 1.5rem;
		padding: 0.875rem 2rem;
		background: linear-gradient(90deg, #ff3e00, #ff6b00);
		color: white;
		font-weight: 600;
		font-size: 1rem;
		border-radius: 50px;
		text-decoration: none;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.cta-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(255, 62, 0, 0.35);
	}

	.projects {
		padding: 4rem 0;
		text-align: center;
	}

	.projects-grid {
		text-align: left;
	}

	.projects h2 {
		font-size: 2rem;
		text-align: center;
		margin-bottom: 2rem;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	.project-card {
		border-radius: 12px;
		text-decoration: none;
		color: inherit;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		transition: transform 0.3s, box-shadow 0.3s;
		position: relative;
		padding: 14px;
		overflow: visible;
	}

	.project-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
	}

	.project-card::before,
	.project-card::after {
		content: '';
		position: absolute;
		width: 50px;
		height: 50px;
		z-index: 1;
		border-color: #ff3e00;
		border-style: solid;
		border-width: 0;
	}

	.project-card:nth-child(odd)::before {
		top: 0;
		left: 0;
		border-top-width: 3px;
		border-left-width: 3px;
		border-radius: 12px 0 0 0;
	}

	.project-card:nth-child(odd)::after {
		bottom: 0;
		right: 0;
		border-bottom-width: 3px;
		border-right-width: 3px;
		border-radius: 0 0 12px 0;
	}

	.project-card:nth-child(even)::before {
		top: 0;
		right: 0;
		border-top-width: 3px;
		border-right-width: 3px;
		border-radius: 0 12px 0 0;
	}

	.project-card:nth-child(even)::after {
		bottom: 0;
		left: 0;
		border-bottom-width: 3px;
		border-left-width: 3px;
		border-radius: 0 0 0 12px;
	}

	.project-card img {
		width: 100%;
		height: auto;
		border-radius: 8px;
		display: block;
		position: relative;
		z-index: 2;
	}

	.project-info {
		padding: 1.5rem;
	}

	.project-info h3 {
		font-family: var(--font-display);
		font-size: 1.25rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: 400;
		margin-bottom: 0.5rem;
	}

	.project-info p {
		font-size: 0.9rem;
		color: #666;
		margin-bottom: 1rem;
	}

	.project-link {
		color: #ff3e00;
		font-weight: 600;
	}

	.projects-cta {
		display: inline-block;
		margin-top: 2rem;
		padding: 0.75rem 1.75rem;
		background: linear-gradient(90deg, #ff3e00, #ff6b00);
		color: white;
		font-weight: 600;
		font-size: 0.95rem;
		border-radius: 50px;
		text-decoration: none;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.projects-cta:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(255, 62, 0, 0.35);
	}

	.approach {
		padding: 6rem 0;
		text-align: center;
	}

	.approach-label {
		font-family: var(--font-display);
		font-size: 0.75rem;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: #ff3e00;
		margin-bottom: 1rem;
	}

	.approach-rule {
		width: 2rem;
		height: 2px;
		background: #ff3e00;
		margin: 0 auto 3rem;
		border: none;
	}

	.approach-step {
		padding: 1.5rem 0;
		border-top: 1px solid rgba(0,0,0,0.06);
	}

	.approach h2 {
		font-size: 2.5rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin: 0;
		line-height: 1.2;
		color: #222;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	.approach-desc {
		font-family: var(--font-body);
		font-size: 0.95rem;
		color: #666;
		line-height: 1.6;
		max-width: 540px;
		margin: 0.75rem auto 0;
	}

	.approach-number {
		font-family: var(--font-display);
		font-size: 1rem;
		color: #ff3e00;
		letter-spacing: 0.1em;
		margin-right: 0.75rem;
		display: inline-block;
		vertical-align: middle;
	}

	.services {
		padding: 4rem 0;
		text-align: center;
	}

	.services-label {
		font-family: var(--font-display);
		font-size: 0.75rem;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: #ff3e00;
		margin-bottom: 1rem;
	}

	.services-rule {
		width: 2rem;
		height: 2px;
		background: #ff3e00;
		margin: 0 auto 3rem;
		border: none;
	}

	.services-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	.service-card {
		background: white;
		border-radius: 12px;
		padding: 2rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		transition: transform 0.3s, box-shadow 0.3s;
		text-align: left;
	}

	.service-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
	}

	.service-card h3 {
		font-family: var(--font-display);
		font-size: 1.5rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: 400;
		margin: 0.75rem 0 0.75rem;
		color: #222;
		line-height: 1.2;
	}

	.service-card p {
		font-size: 0.9rem;
		color: #666;
		margin: 0;
		line-height: 1.6;
	}

	.testimonials {
		padding: 4rem 0;
		text-align: center;
	}

	.testimonials-label {
		font-family: var(--font-display);
		font-size: 0.75rem;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: #ff3e00;
		margin-bottom: 1rem;
	}

	.testimonials-rule {
		width: 2rem;
		height: 2px;
		background: #ff3e00;
		margin: 0 auto 3rem;
		border: none;
	}

	.testimonial-card {
		position: relative;
		max-width: 640px;
		margin: 0 auto;
		padding: 2.5rem 2rem;
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		text-align: center;
	}

	.testimonial-card::before,
	.testimonial-card::after {
		content: '';
		position: absolute;
		width: 60px;
		height: 60px;
		border-color: #ff3e00;
		border-style: solid;
		border-width: 0;
		z-index: 1;
	}

	.testimonial-card::before {
		top: 0;
		left: 0;
		border-top-width: 3px;
		border-left-width: 3px;
		border-radius: 12px 0 0 0;
	}

	.testimonial-card::after {
		bottom: 0;
		right: 0;
		border-bottom-width: 3px;
		border-right-width: 3px;
		border-radius: 0 0 12px 0;
	}

	.testimonial-card :global(.testimonial-quote-mark) {
		margin: 0 auto 1rem;
		display: block;
		opacity: 0.85;
	}

	.testimonial-card blockquote {
		margin: 0;
		font-size: 1.1rem;
		line-height: 1.7;
		color: #333;
		font-style: italic;
	}

	.testimonial-author {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-top: 2rem;
	}

	.testimonial-author img {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		object-fit: cover;
		border: 2px solid #ff3e00;
	}

	.testimonial-author-info {
		display: flex;
		flex-direction: column;
		text-align: left;
	}

	.testimonial-name {
		font-family: var(--font-display);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #222;
	}

	.testimonial-role {
		font-size: 0.85rem;
		color: #666;
	}

	.faq {
		padding: 4rem 0;
	}

	.faq-label {
		font-family: var(--font-display);
		font-size: 0.75rem;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: #ff3e00;
		margin-bottom: 1rem;
		text-align: center;
	}

	.faq-rule {
		width: 2rem;
		height: 2px;
		background: #ff3e00;
		margin: 0 auto 3rem;
		border: none;
	}

	.faq-block {
		padding: 2.5rem 0;
		border-top: 1px solid rgba(0, 0, 0, 0.06);
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	.faq-question {
		font-family: var(--font-display);
		font-size: 2rem;
		line-height: 1.1;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		font-weight: 400;
		color: #222;
		margin: 0;
	}

	.faq-q {
		color: #ff3e00;
		font-weight: 700;
		margin-right: 0.4rem;
	}

	.faq-chips {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.faq-chips li {
		font-family: var(--font-display);
		font-size: 0.8rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: #333;
		padding: 0.5rem 1.1rem;
		border: 1.5px solid rgba(255, 62, 0, 0.35);
		border-radius: 50px;
		cursor: default;
		transition: transform 0.2s, background 0.2s, color 0.2s, border-color 0.2s;
	}

	.faq-chips li:hover {
		background: linear-gradient(90deg, #ff3e00, #ff6b00);
		color: white;
		border-color: transparent;
		transform: translateY(-2px);
	}

	.contact-cta {
		padding: 4rem 0 6rem;
	}

	.cta-inner {
		position: relative;
		background: linear-gradient(135deg, #ff3e00, #ff6b00);
		border-radius: 16px;
		padding: 3.5rem 1.75rem;
		text-align: center;
		color: white;
		box-shadow: 0 12px 40px rgba(255, 62, 0, 0.3);
	}

	.cta-inner::before,
	.cta-inner::after {
		content: '';
		position: absolute;
		width: 50px;
		height: 50px;
		border-color: rgba(255, 255, 255, 0.6);
		border-style: solid;
		border-width: 0;
	}

	.cta-inner::before {
		top: 1rem;
		left: 1rem;
		border-top-width: 3px;
		border-left-width: 3px;
		border-radius: 8px 0 0 0;
	}

	.cta-inner::after {
		bottom: 1rem;
		right: 1rem;
		border-bottom-width: 3px;
		border-right-width: 3px;
		border-radius: 0 0 8px 0;
	}

	.cta-eyebrow {
		display: block;
		font-family: var(--font-display);
		font-size: 0.75rem;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		opacity: 0.85;
		margin-bottom: 1rem;
	}

	.cta-heading {
		font-family: var(--font-display);
		font-size: 2.25rem;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		font-weight: 400;
		line-height: 1.1;
		margin: 0 0 1rem;
	}

	.cta-text {
		max-width: 520px;
		margin: 0 auto 2rem;
		font-size: 1.05rem;
		line-height: 1.6;
		opacity: 0.95;
	}

	.cta-actions {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
	}

	.cta-primary {
		display: inline-block;
		background: white;
		color: #ff3e00;
		font-weight: 700;
		padding: 0.875rem 2rem;
		border-radius: 50px;
		text-decoration: none;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.cta-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
	}

	.cta-secondary {
		color: white;
		text-decoration: none;
		font-size: 0.95rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.5);
		padding-bottom: 2px;
		transition: border-color 0.2s;
	}

	.cta-secondary:hover {
		border-color: white;
	}

	@media (min-width: 768px) {
		.faq {
			padding: 6rem 0;
		}

		.contact-cta {
			padding: 6rem 0 8rem;
		}

		.cta-inner {
			padding: 5rem 3rem;
		}

		.cta-heading {
			font-size: 3rem;
		}

		.cta-actions {
			flex-direction: row;
			justify-content: center;
			gap: 2rem;
		}

		.faq-block {
			grid-template-columns: 0.85fr 1.15fr;
			gap: 3rem;
			align-items: start;
		}

		.faq-question {
			font-size: 2.75rem;
		}

		.approach {
			padding: 8rem 0;
		}

		.approach h2 {
			font-size: 4rem;
		}

		.approach-number {
			font-size: 1.5rem;
		}

		.services {
			padding: 6rem 0;
		}

		.services-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.service-card h3 {
			font-size: 1.75rem;
		}

		.hero {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			gap: 4rem;
			padding: 4rem 0;
		}

		.hero-content {
			text-align: left;
			flex: 1;
		}

		.hero-image {
			flex: 1;
			max-width: 450px;
		}

		.hero-image::before {
			width: 90px;
			height: 90px;
		}

		.hero-image::after {
			width: 90px;
			height: 90px;
		}

		h1 {
			font-size: 2.8rem;
			gap: 0.5rem;
		}

		.intro {
			font-size: 0.5em;
		}

		.offer {
			font-size: 1.2em;
		}

		.audience {
			font-size: 0.55em;
		}

		.projects-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
