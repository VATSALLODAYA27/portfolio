import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Injects canonical / Open Graph URL tags only when VITE_SITE_URL is set,
 * so no placeholder URLs ever ship. See README → "Before you deploy".
 */
function seoUrlTags(siteUrl: string): Plugin {
  return {
    name: 'seo-url-tags',
    transformIndexHtml(html) {
      const tags = siteUrl
        ? [
            `<link rel="canonical" href="${siteUrl}/" />`,
            `<meta property="og:url" content="${siteUrl}/" />`,
            `<meta property="og:image" content="${siteUrl}/images/portrait-square-512.jpg" />`,
            `<meta name="twitter:image" content="${siteUrl}/images/portrait-square-512.jpg" />`,
          ].join('\n    ')
        : ''
      return html.replace('<!--SEO_URL_TAGS-->', tags)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL ?? '').replace(/\/$/, '')
  return {
    base: env.VITE_BASE || '/',
    plugins: [react(), tailwindcss(), seoUrlTags(siteUrl)],
    build: { chunkSizeWarningLimit: 900 },
  }
})
