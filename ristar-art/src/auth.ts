import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';

// AUTH_SECRET, AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET are read automatically
// from the environment by Auth.js (see .env.example). trustHost is required
// when running behind adapter-node / any non-Vercel host.
export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [Google],
	trustHost: true,
	callbacks: {
		// Persist the Google profile picture onto the session so the UI can show it.
		async jwt({ token, profile }) {
			if (profile?.picture) token.picture = profile.picture;
			return token;
		},
		async session({ session, token }) {
			if (session.user && typeof token.picture === 'string') {
				session.user.image = token.picture;
			}
			return session;
		}
	}
});
