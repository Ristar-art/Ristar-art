import { createApp } from './app.js';
import { env } from './env.js';

const app = createApp();

const server = app.listen(env.port, () => {
	console.log(`[server] listening on :${env.port} (${env.isProd ? 'production' : 'development'})`);
	console.log(`[server] allowed origins: ${env.allowedOrigins.join(', ')}`);
});

/**
 * Stop accepting connections and let in-flight requests finish before exiting,
 * so a deploy never cuts off an enquiry mid-send.
 */
const shutdown = (signal: string) => {
	console.log(`[server] ${signal} received, shutting down.`);
	server.close(() => process.exit(0));
	setTimeout(() => {
		console.error('[server] forced exit after timeout.');
		process.exit(1);
	}, 10_000).unref();
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
