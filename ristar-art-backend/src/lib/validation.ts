/** Shared helpers for sanitising and validating untrusted request bodies. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Remove CR/LF so a value can't be used for email header injection. */
export const oneLine = (value: string): string => value.replace(/[\r\n]+/g, ' ').trim();

export const escapeHtml = (value: string): string =>
	value.replace(/[&<>"']/g, (char) => {
		switch (char) {
			case '&':
				return '&amp;';
			case '<':
				return '&lt;';
			case '>':
				return '&gt;';
			case '"':
				return '&quot;';
			default:
				return '&#39;';
		}
	});

export type ContactInput = {
	name: string;
	email: string;
	projectType: string;
	message: string;
};

export type ContactParseResult =
	| { ok: true; value: ContactInput }
	| { ok: false; errors: Record<string, string> };

/**
 * Validate a contact-form submission.
 *
 * Mirrors the client-side rules so a visitor never sees a surprise rejection,
 * but is the only check that actually counts — the client can be bypassed.
 */
export function parseContact(payload: Record<string, unknown>): ContactParseResult {
	const name = oneLine(String(payload.name ?? ''));
	const email = oneLine(String(payload.email ?? ''));
	const projectType = oneLine(String(payload.projectType ?? 'General'));
	const message = String(payload.message ?? '').trim();

	const errors: Record<string, string> = {};
	if (!name) errors.name = 'Name is required.';
	else if (name.length > 120) errors.name = 'Name is too long.';

	if (!email) errors.email = 'Email is required.';
	else if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.';
	else if (email.length > 200) errors.email = 'Email is too long.';

	if (!message) errors.message = 'Message is required.';
	else if (message.length > 5000) errors.message = 'Message is too long (5000 char max).';

	if (projectType.length > 80) errors.projectType = 'Project type is too long.';

	if (Object.keys(errors).length) return { ok: false, errors };
	return { ok: true, value: { name, email, projectType, message } };
}

/** Honeypot: real users never fill this field, bots usually do. */
export const looksLikeBot = (payload: Record<string, unknown>): boolean =>
	typeof payload.company === 'string' && payload.company.trim() !== '';
