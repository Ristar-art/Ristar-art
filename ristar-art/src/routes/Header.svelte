<script lang="ts">
	import { page } from '$app/state';
	import { Menu, X } from '@lucide/svelte';

	let open = $state(false);

	const links = [
		{ href: '/', label: 'Home', match: (p: string) => p === '/' },
		{ href: '/about', label: 'About', match: (p: string) => p === '/about' },
		{ href: '/projects', label: 'Projects', match: (p: string) => p.startsWith('/projects') },
		// { href: '/blog', label: 'Blog', match: (p: string) => p.startsWith('/blog') },
		{ href: '/contact', label: 'Contact', match: (p: string) => p.startsWith('/contact') }
	];

	// close the mobile menu whenever the route changes
	$effect(() => {
		page.url.pathname;
		open = false;
	});

	const user = $derived(page.data.session?.user);
</script>

<header>
	<div class="bar">
		<a href="/" class="logo">
			RISTAR<span class="logo-accent">_ART</span>
		</a>

		<nav id="primary-nav" class:open aria-label="Primary">
			<ul>
				{#each links as link, i}
					<li aria-current={link.match(page.url.pathname) ? 'page' : undefined}>
						<a href={link.href} onclick={() => (open = false)}>
							<span class="idx">{String(i + 1).padStart(2, '0')}</span>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="header-actions">
			<span class="status" aria-hidden="true">
				<span class="dot"></span>AVAILABLE
			</span>

			<a
				href="https://github.com/Ristar-art"
				target="_blank"
				rel="noopener noreferrer"
				class="github"
				aria-label="GitHub profile"
			>
				<svg viewBox="0 0 24 24" fill="currentColor">
					<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
				</svg>
			</a>

			{#if user}
				<a href="/dashboard" class="account" aria-label="Dashboard">
					{#if user.image}
						<img src={user.image} alt="" referrerpolicy="no-referrer" />
					{:else}
						<span class="account-fallback">{(user.name ?? user.email ?? '?').slice(0, 1)}</span>
					{/if}
				</a>
			<!-- {:else}
				<a href="/login" class="login">Login</a> -->
			{/if}

			<button
				class="menu-toggle"
				aria-label={open ? 'Close menu' : 'Open menu'}
				aria-expanded={open}
				aria-controls="primary-nav"
				onclick={() => (open = !open)}
			>
				{#if open}
					<X size={22} />
				{:else}
					<Menu size={22} />
				{/if}
			</button>
		</div>
	</div>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 50;
		background: var(--bg-dark);
		border-bottom: 1px solid var(--rule-dark);
	}

	.bar {
		max-width: var(--container);
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 var(--gutter);
		height: 56px;
	}

	.logo {
		font-family: var(--font-mono);
		font-weight: 700;
		font-size: 1.05rem;
		letter-spacing: 0.04em;
		color: var(--ink-dark);
		text-decoration: none;
	}

	.logo:hover {
		text-decoration: none;
	}

	.logo-accent {
		color: var(--accent);
	}

	nav ul {
		display: flex;
		gap: 1.75rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	nav a {
		display: inline-flex;
		align-items: baseline;
		gap: 0.4rem;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--ink-dark-dim);
		text-decoration: none;
		transition: color 0.12s ease;
	}

	nav a .idx {
		font-size: 0.6rem;
		color: var(--rule-dark);
		transition: color 0.12s ease;
	}

	nav a:hover {
		color: var(--ink-dark);
		text-decoration: none;
	}

	nav a:hover .idx {
		color: var(--accent);
	}

	nav li[aria-current='page'] a {
		color: var(--accent);
	}

	nav li[aria-current='page'] a .idx {
		color: var(--accent);
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}

	.status {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.62rem;
		font-weight: 500;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--ink-dark-dim);
	}

	.status .dot {
		width: 7px;
		height: 7px;
		background: var(--accent);
		display: inline-block;
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

	.menu-toggle {
		display: none;
		background: none;
		border: 1px solid var(--rule-dark);
		padding: 0.3rem;
		cursor: pointer;
		color: var(--ink-dark);
		transition: border-color 0.12s ease, color 0.12s ease;
	}

	.menu-toggle:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	.github {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--ink-dark-dim);
		transition: color 0.12s ease;
	}

	.github svg {
		width: 20px;
		height: 20px;
	}

	.github:hover {
		color: var(--accent);
	}

	.login {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--accent-ink);
		background: var(--accent);
		padding: 0.4rem 0.85rem;
		text-decoration: none;
		transition: opacity 0.12s ease;
	}

	.login:hover {
		text-decoration: none;
		opacity: 0.85;
	}

	.account {
		display: inline-flex;
		line-height: 0;
	}

	.account img,
	.account-fallback {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		border: 1px solid var(--rule-dark);
		object-fit: cover;
		transition: border-color 0.12s ease;
	}

	.account:hover img,
	.account:hover .account-fallback {
		border-color: var(--accent);
	}

	.account-fallback {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: var(--bg-dark-2);
		color: var(--accent);
		font-size: 0.8rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	@media (max-width: 820px) {
		.status {
			display: none;
		}

		.menu-toggle {
			display: inline-flex;
			align-items: center;
		}

		nav {
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			background: var(--bg-dark);
			border-bottom: 1px solid var(--rule-dark);
			overflow: hidden;
			max-height: 0;
			transition: max-height 0.25s ease;
			z-index: 30;
		}

		nav.open {
			max-height: 24rem;
		}

		nav ul {
			flex-direction: column;
			gap: 0;
			padding: 0.5rem 0;
		}

		nav li {
			width: 100%;
			border-top: 1px solid var(--rule-dark);
		}

		nav a {
			display: flex;
			padding: 0.95rem var(--gutter);
			font-size: 0.8rem;
		}
	}
</style>
