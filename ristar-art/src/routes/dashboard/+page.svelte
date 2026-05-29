<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const user = $derived(data.user);
</script>

<svelte:head>
	<title>Dashboard — RISTAR_ART</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="dash">
	<span class="kicker">// Dashboard</span>

	<div class="head">
		<div class="profile">
			{#if user?.image}
				<img src={user.image} alt="" referrerpolicy="no-referrer" />
			{:else}
				<div class="avatar-fallback">{(user?.name ?? user?.email ?? '?').slice(0, 1)}</div>
			{/if}
			<div>
				<h1>{user?.name ?? 'Signed in'}</h1>
				<p class="email">{user?.email}</p>
			</div>
		</div>

		<form method="POST">
			<button type="submit" class="signout">Sign out</button>
		</form>
	</div>

	<p class="lead">You're authenticated. This area is protected — only signed-in users reach it.</p>
</section>

<style>
	.dash {
		flex: 1;
		padding: 3rem 0;
	}

	.kicker {
		display: block;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 1.5rem;
	}

	.head {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--rule-dark);
	}

	.profile {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.profile img,
	.avatar-fallback {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		border: 1px solid var(--rule-dark);
		object-fit: cover;
	}

	.avatar-fallback {
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bg-dark-2);
		color: var(--accent);
		font-weight: 700;
		font-size: 1.4rem;
		text-transform: uppercase;
	}

	h1 {
		font-size: 1.5rem;
		margin: 0;
	}

	.email {
		margin: 0.25rem 0 0;
		font-size: 0.8rem;
		color: var(--ink-dark-dim);
	}

	.signout {
		background: none;
		border: 1px solid var(--rule-dark);
		color: var(--ink-dark);
		font-family: var(--font-mono);
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		padding: 0.6rem 1.1rem;
		cursor: pointer;
		transition: border-color 0.12s ease, color 0.12s ease;
	}

	.signout:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	.lead {
		margin: 2rem 0 0;
		color: var(--ink-dark-dim);
		max-width: 60ch;
	}
</style>
