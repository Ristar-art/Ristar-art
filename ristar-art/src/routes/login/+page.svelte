<script lang="ts">
	import { page } from '$app/state';

	// Carry through any ?redirectTo the guard set, defaulting to the dashboard.
	const redirectTo = $derived(page.url.searchParams.get('redirectTo') ?? '/dashboard');
</script>

<svelte:head>
	<title>Sign in — RISTAR_ART</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="login">
	<div class="card">
		<span class="kicker">// Access</span>
		<h1>Sign in</h1>
		<p class="lead">Authenticate with your Google account to continue.</p>

		<form method="POST">
			<input type="hidden" name="providerId" value="google" />
			<input type="hidden" name="redirectTo" value={redirectTo} />

			<button type="submit" class="google-btn">
				<svg viewBox="0 0 48 48" aria-hidden="true">
					<path
						fill="#EA4335"
						d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
					/>
					<path
						fill="#4285F4"
						d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
					/>
					<path
						fill="#FBBC05"
						d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
					/>
					<path
						fill="#34A853"
						d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
					/>
				</svg>
				<span>Continue with Google</span>
			</button>
		</form>

		<p class="fine">
			By continuing you agree to our terms of use. We only read your name, email and avatar.
		</p>
	</div>
</section>

<style>
	.login {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4rem 0;
	}

	.card {
		width: 100%;
		max-width: 26rem;
		background: var(--bg-dark-2);
		border: 1px solid var(--rule-dark);
		padding: 2.5rem 2rem;
	}

	.kicker {
		display: block;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 0.9rem;
	}

	h1 {
		font-size: 2rem;
		margin: 0 0 0.6rem;
	}

	.lead {
		color: var(--ink-dark-dim);
		font-size: 0.9rem;
		margin: 0 0 2rem;
	}

	form {
		margin: 0;
	}

	.google-btn {
		width: 100%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 0.85rem 1rem;
		background: var(--ink-dark);
		color: var(--ink-light);
		border: 1px solid var(--ink-dark);
		font-family: var(--font-mono);
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		cursor: pointer;
		transition: background 0.12s ease, border-color 0.12s ease, transform 0.06s ease;
	}

	.google-btn:hover {
		background: var(--accent);
		border-color: var(--accent);
		color: var(--accent-ink);
	}

	.google-btn:active {
		transform: translateY(1px);
	}

	.google-btn svg {
		width: 20px;
		height: 20px;
		flex-shrink: 0;
	}

	.fine {
		margin: 1.5rem 0 0;
		font-size: 0.68rem;
		line-height: 1.6;
		color: var(--rule-light);
		color: var(--ink-dark-dim);
	}
</style>
