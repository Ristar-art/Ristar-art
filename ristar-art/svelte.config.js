import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Fully static output: every route is prerendered to HTML at build time
		// and the result in `build/` can be served by any static host or CDN.
		// Anything that needs a server lives in ../ristar-art-backend.
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			// Not an SPA fallback: static hosts (Netlify, Cloudflare Pages,
			// GitHub Pages, nginx) serve 404.html with a real 404 status, so
			// this is what gives an unknown path the site's own error page
			// instead of the host's default.
			fallback: '404.html',
			precompress: true,
			strict: true
		}),
		alias: {
			'@/*': './src/lib/*'
		}
	}
};

export default config;
