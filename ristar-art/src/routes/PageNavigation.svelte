<script lang="ts">
	let {
		sections,
		activeSection,
		scrollToSection
	}: {
		sections: { id: string; title: string; level: number }[];
		activeSection: string;
		scrollToSection: (id: string) => void;
	} = $props();
</script>

<nav class="page-nav" aria-label="Page sections">
	<span class="page-nav-label">// index</span>
	<ul>
		{#each sections as section, i}
			<li>
				<a
					href={`#${section.id}`}
					class:active={activeSection === section.id}
					aria-current={activeSection === section.id ? 'true' : undefined}
					onclick={(e) => {
						e.preventDefault();
						scrollToSection(section.id);
					}}
				>
					<span class="num">{String(i + 1).padStart(2, '0')}</span>
					<span class="label">{section.title}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.page-nav {
		display: none;
	}

	/* Self-contained dark HUD panel so the lime accent reads correctly
	   regardless of the (dark or light) section scrolling behind it. */
	@media (min-width: 1440px) {
		.page-nav {
			display: block;
			position: fixed;
			top: 50%;
			right: max(1.25rem, calc((100vw - var(--container)) / 2 - 9rem));
			transform: translateY(-50%);
			z-index: 20;
			background: var(--bg-dark);
			border: 1px solid var(--rule-dark);
			padding: 0.85rem 0.9rem;
		}
	}

	.page-nav-label {
		display: block;
		font-family: var(--font-mono);
		font-size: 0.56rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--accent);
		margin: 0 0 0.65rem 0;
	}

	.page-nav ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.page-nav a {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0 0.4rem 0.65rem;
		border-left: 1px solid var(--rule-dark);
		font-family: var(--font-mono);
		font-size: 0.64rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink-dark-dim);
		text-decoration: none;
		transition: color 0.15s, border-color 0.15s;
	}

	.page-nav a .num {
		font-size: 0.54rem;
		color: var(--rule-dark);
		transition: color 0.15s;
	}

	.page-nav a:hover {
		color: var(--ink-dark);
		border-color: var(--ink-dark-dim);
		text-decoration: none;
	}

	.page-nav a.active {
		color: var(--accent);
		border-color: var(--accent);
	}

	.page-nav a.active .num,
	.page-nav a:hover .num {
		color: var(--accent);
	}
</style>
