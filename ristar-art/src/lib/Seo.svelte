<script lang="ts">
	import { page } from '$app/state';
	import {
		SITE_NAME,
		SITE_URL,
		DEFAULT_TITLE,
		DEFAULT_DESCRIPTION,
		OG_IMAGE,
		absolute
	} from '$lib/site';

	let {
		title = DEFAULT_TITLE,
		description = DEFAULT_DESCRIPTION,
		image = OG_IMAGE,
		type = 'website',
		noindex = false,
		jsonld = undefined
	}: {
		title?: string;
		description?: string;
		image?: string;
		type?: string;
		noindex?: boolean;
		jsonld?: unknown;
	} = $props();

	// Canonical URL from the current path (strip query/hash).
	const canonical = $derived(absolute(page.url.pathname));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}

	<!-- Open Graph -->
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={image} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	{#if jsonld}
		{@html `<script type="application/ld+json">${JSON.stringify(jsonld)}<\/script>`}
	{/if}
</svelte:head>
