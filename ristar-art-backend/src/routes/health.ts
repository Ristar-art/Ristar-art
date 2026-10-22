import { Router } from 'express';
import { env } from '../env.js';

export const healthRouter: Router = Router();

/** Liveness probe for the host's uptime checks. */
healthRouter.get('/health', (_req, res) => {
	res.json({
		ok: true,
		uptime: Math.round(process.uptime()),
		email: env.resendApiKey ? 'configured' : 'missing'
	});
});
