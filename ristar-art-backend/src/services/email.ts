import { env } from '../env.js';
import { escapeHtml, type ContactInput } from '../lib/validation.js';

/** Thrown when the upstream mail provider is unreachable or rejects the send. */
export class EmailError extends Error {
	readonly status: number;

	constructor(message: string, status = 502) {
		super(message);
		this.name = 'EmailError';
		this.status = status;
	}
}

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const TIMEOUT_MS = 15_000;

/**
 * Deliver a contact-form enquiry.
 *
 * `reply_to` carries the sender so replying from the inbox reaches the
 * visitor directly, while `from` stays on a domain verified in Resend.
 */
export async function sendEnquiry(input: ContactInput): Promise<void> {
	if (!env.resendApiKey) {
		throw new EmailError('Email service is not configured.', 503);
	}

	const { name, email, projectType, message } = input;

	const subject = `New enquiry — ${projectType} — ${name}`;
	const text = `Name: ${name}\nEmail: ${email}\nProject type: ${projectType}\n\n${message}`;
	const html = `
		<div style="font-family:monospace;line-height:1.6;color:#17181c">
			<h2 style="margin:0 0 12px">New project enquiry</h2>
			<p style="margin:0"><strong>Name:</strong> ${escapeHtml(name)}</p>
			<p style="margin:0"><strong>Email:</strong> ${escapeHtml(email)}</p>
			<p style="margin:0"><strong>Project type:</strong> ${escapeHtml(projectType)}</p>
			<hr style="border:none;border-top:1px solid #ccc;margin:12px 0" />
			<p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
		</div>`;

	// Abort if Resend is slow, so this never hangs into a proxy 504.
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

	try {
		const res = await fetch(RESEND_ENDPOINT, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${env.resendApiKey}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: env.resendFrom,
				to: [env.contactTo],
				reply_to: `${name} <${email}>`,
				subject,
				text,
				html
			}),
			signal: controller.signal
		});

		if (!res.ok) {
			const detail = await res.text().catch(() => '');
			console.error(`[email] Resend failed (${res.status}):`, detail);
			throw new EmailError('Could not send your message. Please try again later.');
		}
	} catch (err) {
		if (err instanceof EmailError) throw err;
		console.error('[email] Resend request error:', err);
		throw new EmailError('Could not send your message. Please try again later.');
	} finally {
		clearTimeout(timeout);
	}
}
