import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Resvg } from '@resvg/resvg-js'
import { buildTerm, resolveVariant } from './src/lib/term-config'
import { ogImageSvg } from './src/lib/og-image'

// Resolve the build variant once so index.html, the app, and the OG image agree.
const term = buildTerm(resolveVariant(process.env.VITE_VARIANT))

// Bundled font makes OG rasterization deterministic on any build host (incl.
// Cloudflare Pages, whose image may not ship Inter — or any font).
const FONT = resolve(dirname(fileURLToPath(import.meta.url)), 'build-assets/fonts/Inter.ttf')

// Rasterize the OG SVG to PNG. Scrapers (Facebook/LinkedIn) don't reliably
// render SVG og:image, so we ship PNG.
function ogPng(): Buffer {
  const resvg = new Resvg(ogImageSvg(term), {
    fitTo: { mode: 'width', value: 1200 },
    font: { fontFiles: [FONT], loadSystemFonts: false, defaultFontFamily: 'Inter' },
  })
  return Buffer.from(resvg.render().asPng())
}

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
    // Emit the generated OG image as a build asset (e.g. dist/og-image-UUID.png).
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: term.ogImage.replace(/^\//, ''),
        source: ogPng(),
      })
    },
    // Serve the same image in `vite dev` so the OG path doesn't 404 locally.
    configureServer(server: { middlewares: { use: (fn: unknown) => void } }) {
      server.middlewares.use((req: any, res: any, next: () => void) => {
        if (req.url === term.ogImage) {
          res.setHeader('Content-Type', 'image/png')
          res.end(ogPng())
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
