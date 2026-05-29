import { redirect } from '@sveltejs/kit';
import { signIn } from '../../auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const session = await locals.auth();
	if (session?.user) {
		redirect(303, url.searchParams.get('redirectTo') ?? '/dashboard');
	}
	return {};
};

// The signIn action reads `providerId` and `redirectTo` from the submitted form.
export const actions: Actions = { default: signIn };
