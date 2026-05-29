import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handle as authHandle } from './auth';

/** Routes that require an authenticated session. */
const PROTECTED = ['/dashboard'];

const authorization: Handle = async ({ event, resolve }) => {
	if (PROTECTED.some((path) => event.url.pathname.startsWith(path))) {
		const session = await event.locals.auth();
		if (!session?.user) {
			const redirectTo = event.url.pathname + event.url.search;
			redirect(303, `/login?redirectTo=${encodeURIComponent(redirectTo)}`);
		}
	}
	return resolve(event);
};

export const handle = sequence(authHandle, authorization);
