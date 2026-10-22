// Central site metadata. Change SITE_URL here when the domain moves and every
// canonical, Open Graph URL, sitemap and JSON-LD reference updates with it.
export const SITE_URL = 'https://whiterobesdevelopment.co.za';

export const SITE_NAME = 'White Robes Development';
export const LEGAL_NAME = 'White Robes Development';
/** Founder / lead developer, credited on the about page and in JSON-LD. */
export const FOUNDER = 'Boiketlo Mochochoko';
/**
 * Public enquiry address. TODO: swap to info@whiterobesdevelopment.co.za once
 * the mailbox exists, and update `TO` in src/routes/api/contact/+server.ts.
 */
export const CONTACT_EMAIL = 'mochochokoboiketlo@gmail.com';
export const GITHUB_URL = 'https://github.com/Ristar-art';

export const DEFAULT_TITLE =
	'White Robes Development — Web & Mobile App Development in South Africa';
export const DEFAULT_DESCRIPTION =
	'White Robes Development builds fast, conversion-focused web and mobile applications for enterprise and local business — Svelte, React, Node, TypeScript. Based in Johannesburg, South Africa.';
export const OG_IMAGE = `${SITE_URL}/heropic.webp`;

/** Build an absolute URL from a site-root-relative path. */
export const absolute = (path = '/') => new URL(path, SITE_URL).href;
