<script lang="ts">
	import { page } from '$app/state';
	import { Menu, X } from '@lucide/svelte';

	let open = $state(false);

	// close the mobile menu whenever the route changes
	$effect(() => {
		page.url.pathname;
		open = false;
	});
</script>

<header>
	<a href="/" class="logo">Ristar<span class="logo-accent">-art</span></a>

	<nav id="primary-nav" class:open>
		<ul>
			<li aria-current={page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/" onclick={() => (open = false)}>Home</a>
			</li>
			<li aria-current={page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about" onclick={() => (open = false)}>About</a>
			</li>
			<li aria-current={page.url.pathname.startsWith('/projects') ? 'page' : undefined}>
				<a href="/projects" onclick={() => (open = false)}>Projects</a>
			</li>
			<li aria-current={page.url.pathname.startsWith('/blog') ? 'page' : undefined}>
				<a href="/blog" onclick={() => (open = false)}>Blog</a>
			</li>
			<li aria-current={page.url.pathname.startsWith('/contact') ? 'page' : undefined}>
				<a href="/contact" onclick={() => (open = false)}>Contact</a>
			</li>
		</ul>
	</nav>

	<div class="header-actions">
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

		<button
			class="menu-toggle"
			aria-label={open ? 'Close menu' : 'Open menu'}
			aria-expanded={open}
			aria-controls="primary-nav"
			onclick={() => (open = !open)}
		>
			{#if open}
				<X size={28} />
			{:else}
				<Menu size={28} />
			{/if}
		</button>
	</div>
</header>

<style>
	header {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background: #e9eae4;
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.menu-toggle {
		display: none;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		color: #333;
		transition: color 0.2s ease;
	}

	.menu-toggle:hover {
		color: #ff3e00;
	}

	.logo {
		font-family: var(--font-display);
		font-size: 1.75rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #1a1a1a;
		text-decoration: none;
	}

	.logo-accent {
		color: #ff3e00;
	}

	nav ul {
		display: flex;
		gap: 1.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	nav a {
		font-family: var(--font-body);
		font-size: 0.9rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #333;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	nav a:hover {
		color: #ff3e00;
	}

	nav li[aria-current='page'] a {
		color: #ff3e00;
	}

	.github {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.github svg {
		width: 28px;
		height: 28px;
		color: #333;
		transition: color 0.2s ease;
	}

	.github:hover svg {
		color: #ff3e00;
	}

	@media (max-width: 768px) {
		.menu-toggle {
			display: flex;
			align-items: center;
		}

		nav {
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			background: #e9eae4;
			overflow: hidden;
			max-height: 0;
			transition: max-height 0.3s ease;
			box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
			z-index: 30;
		}

		nav.open {
			max-height: 22rem;
		}

		nav ul {
			flex-direction: column;
			gap: 0;
			padding: 0.5rem 0;
		}

		nav li {
			width: 100%;
		}

		nav a {
			display: block;
			padding: 0.9rem 2rem;
			font-size: 0.95rem;
		}
	}
</style>
