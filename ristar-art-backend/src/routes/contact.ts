import { Router } from 'express';
import { contactLimiter } from '../middleware/rateLimit.js';
import { looksLikeBot, parseContact } from '../lib/validation.js';
import { EmailError, sendEnquiry } from '../services/email.js';

export const contactRouter: Router = Router();

contactRouter.post('/api/contact', contactLimiter, async (req, res) => {
	const payload = req.body;
	if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
		res.status(400).json({ error: 'Invalid request body.' });
		return;
	}

	// Answer the honeypot with a success so the bot has nothing to learn.
	if (looksLikeBot(payload)) {
		res.json({ ok: true });
		return;
	}

	const parsed = parseContact(payload as Record<string, unknown>);
	if (!parsed.ok) {
		res.status(400).json({ error: 'Validation failed.', errors: parsed.errors });
		return;
	}

	try {
		await sendEnquiry(parsed.value);
	} catch (err) {
		if (err instanceof EmailError) {
			res.status(err.status).json({
				error:
					err.status === 503
						? 'Email service is not configured. Please email directly for now.'
						: err.message
			});
			return;
		}
		throw err;
	}

	res.json({ ok: true });
});
