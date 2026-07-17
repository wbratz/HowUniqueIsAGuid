// Open Graph share image, generated from the active term at build time so both
// domains stay visually identical except the word — same single-source-of-truth
// idea as the <title>. Emitted to dist/ by the vite.config plugin; the app never
// imports this at runtime. Pure (string in, string out).
import type { Term } from './term-config'

export function ogImageSvg(term: Term): string {
  const domain = `howuniqueisa${term.variant.toLowerCase()}.com`
  const sample = '3f2504e0-4f89-41d3-9a0c-0305e82c3301'
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="50%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="card" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0b0f17"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="80" y="96" width="1040" height="438" rx="28" fill="url(#card)" stroke="#ffffff" stroke-opacity="0.08"/>
  <text x="600" y="250" text-anchor="middle" font-family="Inter, 'Segoe UI', system-ui, -apple-system, sans-serif" font-size="76" font-weight="800" fill="#ffffff">${term.siteTitle}</text>
  <text x="600" y="330" text-anchor="middle" font-family="Inter, 'Segoe UI', system-ui, -apple-system, sans-serif" font-size="34" font-weight="600" fill="#a78bfa">2¹²² ≈ 5.3 undecillion possibilities</text>
  <text x="600" y="378" text-anchor="middle" font-family="Inter, 'Segoe UI', system-ui, -apple-system, sans-serif" font-size="26" fill="#ffffff" fill-opacity="0.6">More than the atoms in 10 billion Earths</text>
  <rect x="360" y="424" width="480" height="52" rx="12" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.08"/>
  <text x="600" y="458" text-anchor="middle" font-family="'SF Mono', 'Fira Code', ui-monospace, Menlo, monospace" font-size="24" fill="#ffffff" fill-opacity="0.75" letter-spacing="1">${sample}</text>
  <text x="600" y="516" text-anchor="middle" font-family="Inter, 'Segoe UI', system-ui, -apple-system, sans-serif" font-size="22" font-weight="600" fill="#ffffff" fill-opacity="0.4" letter-spacing="2">${domain}</text>
</svg>
`
}
