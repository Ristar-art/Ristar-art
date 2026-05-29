import { redirect } from '@sveltejs/kit';
import { signOut } from '../../auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	// Belt-and-braces: the hooks guard already redirects, but keep the page safe.
	if (!session?.user) redirect(303, '/login?redirectTo=/dashboard');
	return { user: session.user };
};

export const actions: Actions = { default: signOut };
