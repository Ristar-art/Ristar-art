import express, { type Express } from 'express';
import helmet from 'helmet';
import { env } from './env.js';
import { corsMiddleware } from './middleware/cors.js';
import { globalLimiter } from './middleware/rateLimit.js';
import { errorHandler, notFound } from './middleware/errors.js';
import { contactRouter } from './routes/contact.js';
import { healthRouter } from './routes/health.js';

/**
 * Build the Express app.
 *
 * Kept separate from the listener so it can be imported directly by tests
 * without binding a port.
 */
export function createApp(): Express {
	const app = express();

	app.disable('x-powered-by');
	// Rate limiting reads the client IP, so the proxy depth must be honest.
	app.set('trust proxy', env.trustProxy);

	app.use(helmet());
	app.use(corsMiddleware);
	app.use(globalLimiter);
	// The only payload is a contact form; cap it well below anything abusive.
	app.use(express.json({ limit: '32kb' }));

	app.use(healthRouter);
	app.use(contactRouter);

	app.use(notFound);
	app.use(errorHandler);

	return app;
}
