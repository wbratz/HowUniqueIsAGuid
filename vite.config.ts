import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { buildTerm, resolveVariant } from './src/lib/term-config'
import { ogImageSvg } from './src/lib/og-image'

// Resolve the build variant once so index.html, the app, and the OG image agree.
const term = buildTerm(resolveVariant(process.env.VITE_VARIANT))

// Everything that differs between the two domains derives from `term`:
//  - %TERM_*% tokens in index.html get static <title>/OG metadata (crawlers
//    don't execute JS, so this must be baked at build time)
//  - the Open Graph share image is generated from the term and emitted to dist
function termPlugin() {
  return {
    name: 'term-plugin',
    transformIndexHtml(html: string) {
      return html
        .replaceAll('%TERM_TITLE%', term.siteTitle)
        .replaceAll('%TERM_NAME%', term.name)
        .replaceAll('%TERM_OG_IMAGE%', term.ogImage)
    },
    // Emit the generated OG image as a build asset (e.g. dist/og-image-UUID.svg).
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: term.ogImage.replace(/^\//, ''),
        source: ogImageSvg(term),
      })
    },
    // Serve the same image in `vite dev` so the OG path doesn't 404 locally.
    configureServer(server: { middlewares: { use: (fn: unknown) => void } }) {
      server.middlewares.use((req: any, res: any, next: () => void) => {
        if (req.url === term.ogImage) {
          res.setHeader('Content-Type', 'image/svg+xml')
          res.end(ogImageSvg(term))
          return
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), termPlugin()],
  server: { port: 5173, open: true },
  build: { target: 'es2020' },
})
