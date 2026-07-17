import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { buildTerm, resolveVariant } from './src/lib/term-config'

// Resolve the build variant once so index.html and the app agree.
const term = buildTerm(resolveVariant(process.env.VITE_VARIANT))

// Replace %TERM_*% tokens in index.html at build time so each domain gets
// correct, static <title>/OG metadata (crawlers don't execute JS).
function htmlTerms() {
  return {
    name: 'html-terms',
    transformIndexHtml(html: string) {
      return html
        .replaceAll('%TERM_TITLE%', term.siteTitle)
        .replaceAll('%TERM_NAME%', term.name)
        .replaceAll('%TERM_OG_IMAGE%', term.ogImage)
    },
  }
}

export default defineConfig({
  plugins: [react(), htmlTerms()],
  server: { port: 5173, open: true },
  build: { target: 'es2020' },
})
