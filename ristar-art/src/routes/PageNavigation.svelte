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
	<!-- <span class="page-nav-label">sections</span> -->
	<ul>
		{#each sections as section}
			<li style={`padding-right: ${section.level * 0.75}rem`}>
				<a
					href={`#${section.id}`}
					class:active={activeSection === section.id}
					aria-current={activeSection === section.id ? 'true' : undefined}
					onclick={(e) => {
						e.preventDefault();
						scrollToSection(section.id);
					}}
				>
					{section.title}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.page-nav {
		display: none;
	}

	/* Only show once the centered 64rem main leaves enough gutter to the right. */
	@media (min-width: 1300px) {
		.page-nav {
			display: block;
			position: fixed;
			top: 50%;
			right: calc((100vw - 64rem) / 2 - 8.5rem);
			transform: translateY(-50%);
			width: 8rem;
			z-index: 20;
		}
	}

	.page-nav-label {
		display: block;
		font-family: var(--font-display);
		font-size: 0.65rem;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: #ff3e00;
		margin: 0 0.75rem 0.75rem 0;
		text-align: right;
	}

	.page-nav ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		border-right: 2px solid rgba(0, 0, 0, 0.08);
	}

	.page-nav a {
		position: relative;
		display: block;
		padding: 0.4rem 0.75rem;
		font-family: var(--font-display);
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		text-align: right;
		color: #999;
		text-decoration: none;
		transition: color 0.2s;
	}

	.page-nav a::before {
		content: '';
		position: absolute;
		right: -2px;
		top: 50%;
		width: 2px;
		height: 60%;
		background: #ff3e00;
		transform: translateY(-50%) scaleY(0);
		transform-origin: center;
		transition: transform 0.2s;
	}

	.page-nav a:hover {
		color: #ff3e00;
		text-decoration: none;
	}

	.page-nav a.active {
		color: #ff3e00;
	}

	.page-nav a.active::before {
		transform: translateY(-50%) scaleY(1);
	}
</style>
