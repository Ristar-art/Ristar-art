import rateLimit from 'express-rate-limit';

/**
 * Throttle enquiries per IP. Generous enough that a person retrying a failed
 * send is never blocked, tight enough that the form is not a spam relay.
 *
 * Requires `trust proxy` to be set correctly when running behind a proxy,
 * or every visitor shares the proxy's IP and one bot locks out the form.
 */
export const contactLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 5,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
	message: {
		error: 'Too many enquiries from this address. Please try again in a little while.'
	}
});

/** Broad backstop against hammering any endpoint. */
export const globalLimiter = rateLimit({
	windowMs: 60 * 1000,
	limit: 120,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
	message: { error: 'Too many requests.' }
});
