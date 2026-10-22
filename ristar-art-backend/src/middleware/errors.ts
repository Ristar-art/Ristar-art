import type { NextFunction, Request, Response } from 'express';

export function notFound(_req: Request, res: Response): void {
	res.status(404).json({ error: 'Not found.' });
}

/**
 * Last-resort error handler.
 *
 * Logs the real cause server-side and returns a generic message, so an
 * unexpected failure never leaks a stack trace or internal detail to a client.
 */
export function errorHandler(
	err: unknown,
	_req: Request,
	res: Response,
	next: NextFunction
): void {
	if (res.headersSent) {
		next(err);
		return;
	}

	const message = err instanceof Error ? err.message : String(err);

	// A rejected origin from the CORS middleware is a client problem, not ours.
	if (message.startsWith('Origin not allowed')) {
		console.warn(`[cors] ${message}`);
		res.status(403).json({ error: 'Origin not allowed.' });
		return;
	}

	console.error('[error]', err);
	res.status(500).json({ error: 'Something went wrong. Please try again later.' });
}
