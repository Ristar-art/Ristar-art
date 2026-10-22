<script lang="ts">
	import { page } from '$app/state';
	import Seo from '$lib/Seo.svelte';
	import { SITE_NAME } from '$lib/site';

	const status = $derived(page.status);
	const is404 = $derived(status === 404);
	const heading = $derived(is404 ? 'Page not found' : 'Something broke');
	const message = $derived(
		is404
			? "The page you're looking for doesn't exist, moved, or never did."
			: (page.error?.message ?? 'An unexpected error occurred. Try again in a moment.')
	);
</script>

<Seo title={`${status} — ${heading} | ${SITE_NAME}`} description={message} noindex />

<section class="err">
	<span class="err-tag">// error</span>
	<p class="err-code">{status}</p>
	<h1>{heading}</h1>
	<p class="err-msg">{message}</p>

	<div class="err-actions">
		<a href="/" class="btn btn--accent">← Back home</a>
		<a href="/projects" class="btn btn--ghost">View work</a>
		<a href="/contact" class="btn btn--ghost">Contact</a>
	</div>
</section>

<style>
	.err {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 1rem;
		min-height: 60vh;
		padding: clamp(3rem, 10vw, 7rem) 0;
	}

	.err-tag {
		display: inline-block;
		background: var(--accent);
		color: var(--accent-ink);
		padding: 0.15rem 0.45rem;
		align-self: flex-start;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
	}

	.err-code {
		font-family: var(--font-mono);
		font-weight: 700;
		font-size: clamp(4rem, 18vw, 9rem);
		line-height: 0.9;
		letter-spacing: -0.04em;
		color: var(--ink-light);
		margin: 0;
	}

	.err h1 {
		font-size: clamp(1.4rem, 4vw, 2.2rem);
		letter-spacing: -0.01em;
		margin: 0;
	}

	.err-msg {
		max-width: 46ch;
		color: var(--ink-light-dim);
		font-size: 0.92rem;
		line-height: 1.6;
		margin: 0;
	}

	.err-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1rem;
	}

	.btn {
		font-family: var(--font-mono);
		font-size: 0.74rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		padding: 0.7rem 1.2rem;
		text-decoration: none;
		border: 1px solid var(--rule-light);
		transition: all 0.14s ease;
	}

	.btn--accent {
		background: var(--accent);
		color: var(--accent-ink);
		border-color: var(--accent);
	}

	.btn--accent:hover {
		text-decoration: none;
		opacity: 0.88;
	}

	.btn--ghost {
		background: transparent;
		color: var(--ink-light);
	}

	.btn--ghost:hover {
		text-decoration: none;
		border-color: var(--accent);
		color: var(--ink-light);
	}
</style>
