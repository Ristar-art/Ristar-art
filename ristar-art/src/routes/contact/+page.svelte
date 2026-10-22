<script lang="ts">
	import { Mail, Clock, MapPin, Send, Copy, Check } from '@lucide/svelte';
	import Seo from '$lib/Seo.svelte';
	import { CONTACT_EMAIL, GITHUB_URL } from '$lib/site';
	import { PUBLIC_API_BASE } from '$env/static/public';

	const EMAIL = CONTACT_EMAIL;
	const ICON = '#17181c';

	const projectTypes = [
		'Web Application',
		'Mobile Application',
		'Portfolio Website',
		'SEO / Growth',
		'Other'
	];

	let name = $state('');
	let email = $state('');
	let projectType = $state(projectTypes[0]);
	let message = $state('');
	let company = $state(''); // honeypot — must stay empty
	let status = $state<'idle' | 'sending' | 'sent' | 'error'>('idle');
	let errorMsg = $state('');
	let copied = $state(false);

	const ready = $derived(!!(name.trim() && email.trim() && message.trim()));

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		if (!ready || status === 'sending') return;
		status = 'sending';
		errorMsg = '';
		try {
			// The site is static — enquiries go to the standalone API.
			const res = await fetch(`${PUBLIC_API_BASE}/api/contact`, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ name, email, projectType, message, company })
			});
			const data = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
			status = 'sent';
			name = '';
			email = '';
			message = '';
			projectType = projectTypes[0];
		} catch (err) {
			status = 'error';
			errorMsg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
		}
	}

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(EMAIL);
			copied = true;
			setTimeout(() => (copied = false), 1800);
		} catch {
			/* clipboard unavailable — ignore */
		}
	}

	const channels = [
		{ icon: Clock, k: 'Response', v: '< 24 hours' },
		{ icon: MapPin, k: 'Region', v: 'South Africa' },
		{ icon: Mail, k: 'Timezone', v: 'GMT+2 / SAST' }
	];
</script>

<Seo
	title="Contact — Start a Project | White Robes Development"
	description="Get in touch with White Robes Development to start a fast, conversion-focused web or mobile project. We respond within 24 hours."
/>

<header class="page-head">
	<span class="eyebrow">// contact</span>
	<h1>Let's build<br />something.</h1>
	<p>
		Tell us about the project — scope, timeline, whatever you've got. We'll get back to you within
		a day.
	</p>
</header>

<div class="contact-grid">
	<!-- ── Form ─────────────────────────────────────────── -->
	<form class="form" onsubmit={submit}>
		<div class="form-head">
			<span class="sec-index">// new_message</span>
			<span class="form-status" class:on={status === 'sent'}>
				{#if status === 'sent'}● SENT
				{:else if status === 'sending'}◌ SENDING…
				{:else if status === 'error'}✕ FAILED
				{:else}○ DRAFT{/if}
			</span>
		</div>

		<!-- honeypot: hidden from users, catches bots -->
		<div class="hp" aria-hidden="true">
			<label for="company">Company</label>
			<input id="company" type="text" tabindex="-1" autocomplete="off" bind:value={company} />
		</div>

		<div class="field">
			<label for="name"><span class="fnum">01</span> Name</label>
			<input id="name" type="text" bind:value={name} placeholder="Your name" autocomplete="name" required />
		</div>

		<div class="field">
			<label for="email"><span class="fnum">02</span> Email</label>
			<input id="email" type="email" bind:value={email} placeholder="you@domain.com" autocomplete="email" required />
		</div>

		<div class="field">
			<label for="ptype"><span class="fnum">03</span> Project type</label>
			<div class="select-wrap">
				<select id="ptype" bind:value={projectType}>
					{#each projectTypes as t}<option value={t}>{t}</option>{/each}
				</select>
				<span class="select-caret">▼</span>
			</div>
		</div>

		<div class="field">
			<label for="message"><span class="fnum">04</span> Message</label>
			<textarea id="message" rows="6" bind:value={message} placeholder="Describe your project, goals, and timeline…" required></textarea>
		</div>

		<button type="submit" class="submit" disabled={!ready || status === 'sending'}>
			<Send size={16} color={ready && status !== 'sending' ? '#17181c' : '#5f6066'} strokeWidth={2} />
			{#if status === 'sending'}Sending…{:else if status === 'sent'}Sent ✓{:else}Send Message{/if}
		</button>

		{#if status === 'sent'}
			<p class="note note--ok">
				Message sent. Thanks — we'll get back to you within a day at the email you provided.
			</p>
		{:else if status === 'error'}
			<p class="note note--err">
				{errorMsg} You can also email us directly at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
			</p>
		{/if}
	</form>

	<!-- ── Side panel ───────────────────────────────────── -->
	<aside class="panel">
		<span class="sec-index">// direct</span>

		<button class="email-row" onclick={copyEmail} type="button">
			<span class="email-label">Email</span>
			<span class="email-val">{EMAIL}</span>
			<span class="email-copy">
				{#if copied}<Check size={14} color={ICON} />{:else}<Copy size={14} />{/if}
				{copied ? 'Copied' : 'Copy'}
			</span>
		</button>

		<a class="email-row" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
			<span class="email-label">GitHub</span>
			<span class="email-val">{GITHUB_URL.replace('https://', '')}</span>
			<span class="email-copy">Open →</span>
		</a>

		<dl class="meta">
			{#each channels as c}
				<div class="meta-row">
					<dt><c.icon size={14} color={ICON} strokeWidth={1.75} /> {c.k}</dt>
					<dd>{c.v}</dd>
				</div>
			{/each}
		</dl>

		<div class="avail">
			<span class="avail-dot"></span>
			Available for new projects
		</div>
	</aside>
</div>

<style>
	.page-head {
		padding: 1rem 0 2.5rem;
		border-bottom: 1px solid var(--rule-light);
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
		font-size: clamp(2.2rem, 7vw, 3.6rem);
		letter-spacing: -0.02em;
		line-height: 1;
		color: var(--ink-light);
		margin-bottom: 1.25rem;
	}

	.page-head p {
		font-size: 0.92rem;
		line-height: 1.6;
		color: var(--ink-light-dim);
		max-width: 50ch;
	}

	.sec-index {
		display: inline-block;
		background: var(--accent);
		color: var(--accent-ink);
		padding: 0.15rem 0.45rem;
		align-self: flex-start;
		font-size: 0.68rem;
		letter-spacing: 0.18em;
		font-weight: 500;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		padding: 2.5rem 0 3rem;
	}

	/* ── Form ─────────────────────────────────────────────── */
	.form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--ink-light);
	}

	.form-status {
		font-size: 0.66rem;
		letter-spacing: 0.14em;
		color: var(--ink-light-dim);
	}

	.form-status.on {
		color: var(--ink-light);
	}

	/* honeypot — visually removed but reachable by bots */
	.hp {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	label {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.68rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--ink-light);
	}

	.fnum {
		font-size: 0.6rem;
		color: var(--ink-light-dim);
	}

	input,
	textarea,
	select {
		width: 100%;
		background: var(--bg-light-2);
		border: 1px solid var(--rule-light);
		border-radius: 0;
		color: var(--ink-light);
		font-family: var(--font-mono);
		font-size: 0.88rem;
		padding: 0.8rem 0.9rem;
		transition: border-color 0.14s, box-shadow 0.14s;
		appearance: none;
		-webkit-appearance: none;
	}

	input::placeholder,
	textarea::placeholder {
		color: var(--ink-light-dim);
	}

	input:focus,
	textarea:focus,
	select:focus {
		outline: none;
		border-color: var(--ink-light);
		box-shadow: inset 0 0 0 1px var(--ink-light);
	}

	textarea {
		resize: vertical;
		line-height: 1.6;
	}

	.select-wrap {
		position: relative;
	}

	.select-caret {
		position: absolute;
		right: 0.9rem;
		top: 50%;
		transform: translateY(-50%);
		font-size: 0.6rem;
		color: var(--ink-light);
		pointer-events: none;
	}

	select option {
		background: var(--bg-light-2);
		color: var(--ink-light);
	}

	.submit {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		margin-top: 0.5rem;
		padding: 0.95rem 1.4rem;
		background: var(--accent);
		color: var(--accent-ink);
		font-family: var(--font-mono);
		font-size: 0.76rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		border: 1px solid var(--accent);
		cursor: pointer;
		transition: transform 0.14s, box-shadow 0.14s, background 0.14s, color 0.14s;
	}

	.submit:hover:not(:disabled) {
		transform: translate(-1px, -1px);
		box-shadow: 4px 4px 0 var(--ink-light);
	}

	.submit:disabled {
		background: transparent;
		color: var(--ink-light-dim);
		border-color: var(--ink-light-dim);
		cursor: not-allowed;
	}

	.note {
		font-size: 0.76rem;
		line-height: 1.6;
		color: var(--ink-light-dim);
		border-left: 2px solid var(--accent);
		padding-left: 0.9rem;
		margin: 0;
	}

	.note--err {
		border-left-color: #ff5c5c;
	}

	/* ── Side panel ───────────────────────────────────────── */
	.panel {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		border: 1px solid var(--rule-light);
		padding: 1.5rem;
		height: fit-content;
	}

	.email-row {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 0.25rem 1rem;
		padding: 1rem 0;
		border-bottom: 1px solid var(--rule-light);
		background: none;
		border-left: none;
		border-right: none;
		border-top: none;
		text-align: left;
		cursor: pointer;
		text-decoration: none;
		font-family: var(--font-mono);
		color: var(--ink-light);
		transition: color 0.14s;
	}
	.email-row:first-of-type {
		padding-top: 0.5rem;
	}

	.email-label {
		grid-column: 1;
		font-size: 0.62rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--ink-light-dim);
	}

	.email-val {
		grid-column: 1;
		font-size: 0.82rem;
		letter-spacing: 0.02em;
		color: var(--ink-light);
		word-break: break-all;
	}

	.email-copy {
		grid-column: 2;
		grid-row: 1 / span 2;
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.64rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-light-dim);
		white-space: nowrap;
	}

	.email-row:hover .email-val {
		text-decoration: underline;
		text-decoration-color: var(--accent);
		text-decoration-thickness: 2px;
		text-underline-offset: 3px;
		color: var(--ink-light);
	}
	.email-row:hover .email-copy {
		color: var(--ink-light);
	}

	.meta {
		margin: 1rem 0 0;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.meta-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.7rem 0;
		border-bottom: 1px solid var(--rule-light);
	}
	.meta-row:last-child {
		border-bottom: none;
	}

	.meta dt {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.66rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ink-light-dim);
	}

	.meta dd {
		margin: 0;
		font-size: 0.76rem;
		letter-spacing: 0.04em;
		color: var(--ink-light);
	}

	.avail {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-top: 0.75rem;
		padding-top: 1rem;
		border-top: 1px solid var(--rule-light);
		font-size: 0.66rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ink-light-dim);
	}

	.avail-dot {
		width: 7px;
		height: 7px;
		background: var(--accent);
		box-shadow: 0 0 8px var(--accent);
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.35;
		}
	}

	@media (min-width: 880px) {
		.contact-grid {
			grid-template-columns: 1.5fr 1fr;
			gap: 3.5rem;
			align-items: start;
		}
	}
</style>
