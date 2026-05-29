import { json, type RequestHandler } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

/** Fixed destination for all contact-form submissions. */
const TO = 'mochochokoboiketlo@gmail.com';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Remove CR/LF so values can't be used for header injection. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

const escapeHtml = (s: string) =>
	s.replace(/[&<>"']/g, (c) => {
		switch (c) {
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

export const POST: RequestHandler = async ({ request }) => {
	let payload: Record<string, unknown>;
	try {
		payload = await request.json();
	} catch {
		return json({ error: 'Invalid request body.' }, { status: 400 });
	}

	// Honeypot: real users never fill this; bots usually do.
	if (typeof payload.company === 'string' && payload.company.trim() !== '') {
		return json({ ok: true });
	}

	const name = oneLine(String(payload.name ?? ''));
	const email = oneLine(String(payload.email ?? ''));
	const projectType = oneLine(String(payload.projectType ?? 'General'));
	const message = String(payload.message ?? '').trim();

	const errors: Record<string, string> = {};
	if (!name) errors.name = 'Name is required.';
	if (name.length > 120) errors.name = 'Name is too long.';
	if (!email) errors.email = 'Email is required.';
	else if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.';
	if (!message) errors.message = 'Message is required.';
	if (message.length > 5000) errors.message = 'Message is too long (5000 char max).';

	if (Object.keys(errors).length) {
		return json({ error: 'Validation failed.', errors }, { status: 400 });
	}

	const host = env.SMTP_HOST;
	const user = env.SMTP_USER;
	const pass = env.SMTP_PASS;
	const port = Number(env.SMTP_PORT ?? 465);

	if (!host || !user || !pass) {
		console.error('[contact] SMTP env vars missing (SMTP_HOST / SMTP_USER / SMTP_PASS).');
		return json(
			{ error: 'Email service is not configured. Please email directly for now.' },
			{ status: 503 }
		);
	}

	const transporter = nodemailer.createTransport({
		host,
		port,
		secure: port === 465, // 465 = implicit TLS, 587 = STARTTLS
		auth: { user, pass }
	});

	const subject = `New enquiry — ${projectType} — ${name}`;
	const text = `Name: ${name}\nEmail: ${email}\nProject type: ${projectType}\n\n${message}`;
	const html = `
		<div style="font-family:monospace;line-height:1.6;color:#0a0a0a">
			<h2 style="margin:0 0 12px">New project enquiry</h2>
			<p style="margin:0"><strong>Name:</strong> ${escapeHtml(name)}</p>
			<p style="margin:0"><strong>Email:</strong> ${escapeHtml(email)}</p>
			<p style="margin:0"><strong>Project type:</strong> ${escapeHtml(projectType)}</p>
			<hr style="border:none;border-top:1px solid #ccc;margin:12px 0" />
			<p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
		</div>`;

	try {
		await transporter.sendMail({
			from: env.SMTP_FROM || `Ristar-art Contact <${user}>`,
			to: TO,
			replyTo: `${name} <${email}>`,
			subject,
			text,
			html
		});
	} catch (err) {
		console.error('[contact] sendMail failed:', err);
		return json({ error: 'Could not send your message. Please try again later.' }, { status: 502 });
	}

	return json({ ok: true });
};
