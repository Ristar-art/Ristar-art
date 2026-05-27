<script lang="ts">
	import Header from './Header.svelte';
	import './layout.css';

	let { children } = $props();

	const year = new Date().getFullYear();
</script>

<div class="app">
	<Header />
	<main>{@render children()}</main>

	<footer>
		<div class="footer-inner">
			<div class="footer-brand">
				<span class="footer-logo">Ristar<span class="footer-logo-accent">-art</span></span>
				<p>Fast, conversion-focused web &amp; mobile apps for enterprise and local businesses.</p>
			</div>

			<nav class="footer-col" aria-label="Footer">
				<span class="footer-heading">Explore</span>
				<a href="/">Home</a>
				<a href="/about">About</a>
				<a href="/projects">Projects</a>
				<a href="/blog">Blog</a>
				<a href="/contact">Contact</a>
			</nav>

			<div class="footer-col">
				<span class="footer-heading">Get in touch</span>
				<a href="mailto:mochochokoboiketlo@gmail.com">mochochokoboiketlo@gmail.com</a>
				<a
					href="https://github.com/Ristar-art"
					target="_blank"
					rel="noopener noreferrer"
					class="footer-social"
				>
					<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path
							d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
						/>
					</svg>
					GitHub
				</a>
			</div>
		</div>

		<div class="footer-bottom">
			<p>© {year} Ristar-art. All rights reserved.</p>
			<p>Designed &amp; built by Boiketlo Mochochoko.</p>
		</div>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		background: #1a1a1a;
		color: rgba(255, 255, 255, 0.7);
		width: 100%;
	}

	.footer-inner {
		max-width: 64rem;
		margin: 0 auto;
		padding: 3rem 1rem 2rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		box-sizing: border-box;
	}

	.footer-logo {
		font-family: var(--font-display);
		font-size: 1.5rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: white;
	}

	.footer-logo-accent {
		color: #ff3e00;
	}

	.footer-brand p {
		margin: 0.75rem 0 0;
		font-size: 0.9rem;
		line-height: 1.6;
		max-width: 30ch;
	}

	.footer-heading {
		display: block;
		font-family: var(--font-display);
		font-size: 0.7rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #ff3e00;
		margin-bottom: 1rem;
	}

	.footer-col {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	footer a {
		color: rgba(255, 255, 255, 0.7);
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.2s;
	}

	footer a:hover {
		color: #ff3e00;
		text-decoration: none;
	}

	.footer-social {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.footer-social svg {
		width: 18px;
		height: 18px;
	}

	.footer-bottom {
		max-width: 64rem;
		margin: 0 auto;
		padding: 1.5rem 1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: 0.8rem;
		box-sizing: border-box;
	}

	.footer-bottom p {
		margin: 0;
	}

	@media (min-width: 768px) {
		.footer-inner {
			grid-template-columns: 2fr 1fr 1.5fr;
			gap: 3rem;
			padding: 4rem 1rem 2.5rem;
		}

		.footer-bottom {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>
