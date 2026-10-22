/**
 * Runtime configuration, read once at boot.
 *
 * Anything the server cannot run correctly without is checked here so a
 * misconfigured deploy fails on startup rather than on a visitor's first
 * enquiry. Values that only degrade a feature warn instead.
 */

const isProd = process.env.NODE_ENV === 'production';

/** Split a comma-separated env var into trimmed, non-empty entries. */
const list = (value: string | undefined): string[] =>
	(value ?? '')
		.split(',')
		.map((entry) => entry.trim())
		.filter(Boolean);

const fatal = (message: string): never => {
	console.error(`[env] ${message}`);
	process.exit(1);
};

const port = Number(process.env.PORT ?? 8080);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
	fatal(`PORT must be a valid port number, got "${process.env.PORT}".`);
}

// In development, allow the SvelteKit dev and preview servers out of the box.
const corsOrigins = list(process.env.CORS_ORIGINS);
if (isProd && corsOrigins.length === 0) {
	fatal('CORS_ORIGINS is required in production — set the site origin(s).');
}
const allowedOrigins = corsOrigins.length
	? corsOrigins
	: ['http://localhost:5173', 'http://localhost:4173'];

const resendApiKey = process.env.RESEND_API ?? process.env.RESEND_API_KEY;
if (!resendApiKey) {
	// Not fatal: the server still serves health checks and returns a clean
	// 503 from the contact route, which is easier to diagnose than a crash.
	console.warn('[env] RESEND_API is not set — the contact form will return 503.');
}

/**
 * `trust proxy` for Express. Behind a reverse proxy this must be set or
 * rate limiting buckets every visitor under the proxy's IP.
 */
const parseTrustProxy = (value: string | undefined): boolean | number | string => {
	if (value === undefined || value === '') return false;
	if (/^(1|true|yes|on)$/i.test(value)) return 1;
	if (/^(0|false|no|off)$/i.test(value)) return false;
	const hops = Number(value);
	return Number.isInteger(hops) ? hops : value;
};

export const env = {
	isProd,
	port,
	allowedOrigins,
	trustProxy: parseTrustProxy(process.env.TRUST_PROXY),
	resendApiKey,
	contactTo: process.env.CONTACT_TO ?? 'mochochokoboiketlo@gmail.com',
	resendFrom: process.env.RESEND_FROM ?? 'White Robes Development <onboarding@resend.dev>'
} as const;
