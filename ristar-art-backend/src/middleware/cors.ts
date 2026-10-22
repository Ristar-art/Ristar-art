import cors from 'cors';
import { env } from '../env.js';

/**
 * Strict origin allowlist.
 *
 * Requests with no Origin header (curl, server-to-server, health probes) are
 * allowed through — CORS only governs what a browser will hand to page script,
 * so blocking them buys nothing and breaks uptime checks.
 */
export const corsMiddleware = cors({
	origin(origin, callback) {
		if (!origin || env.allowedOrigins.includes(origin)) {
			callback(null, true);
			return;
		}
		callback(new Error(`Origin not allowed: ${origin}`));
	},
	methods: ['GET', 'POST', 'OPTIONS'],
	allowedHeaders: ['Content-Type'],
	maxAge: 86_400
});
