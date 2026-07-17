// Single source of truth for the site's terminology.
//
// The exact same site ships under two domains that differ ONLY by a word:
//   howuniqueisaguid.com  -> "GUID"  (Microsoft's name)
//   howuniqueisauuid.com  -> "UUID"  (everyone else's name — same 128-bit thing)
//
// The variant is chosen at BUILD TIME via the VITE_VARIANT env var so each
// Cloudflare Pages project bakes correct, per-domain <title>/OG tags (social
// scrapers don't run JS, so this can't be a runtime hostname swap).
//
// This module is intentionally pure (no `import.meta`, no browser APIs) so it
// can be imported from BOTH the app (via ./term) and vite.config.ts.

export type Variant = 'GUID' | 'UUID'

export interface Term {
  variant: Variant
  /** Singular, as branded: "GUID" | "UUID" */
  name: string
  /** Plural, as branded: "GUIDs" | "UUIDs" */
  names: string
  /** The *other* name, for "also called …": "UUID" | "GUID" */
  alsoCalled: string
  /** Plural of the other name: "UUIDs" | "GUIDs" */
  alsoCalledPlural: string
  /** Acronym expansion, singular: "Globally Unique Identifier" | "Universally Unique Identifier" */
  expansion: string
  /** Plural expansion, e.g. "Globally Unique Identifiers" */
  expansionPlural: string
  /** "How Unique is a GUID?" | "How Unique is a UUID?" */
  siteTitle: string
  /** Filename of the variant's Open Graph image in /public */
  ogImage: string
}

const DATA: Record<Variant, Omit<Term, 'variant' | 'siteTitle' | 'ogImage'>> = {
  GUID: {
    name: 'GUID',
    names: 'GUIDs',
    alsoCalled: 'UUID',
    alsoCalledPlural: 'UUIDs',
    expansion: 'Globally Unique Identifier',
    expansionPlural: 'Globally Unique Identifiers',
  },
  UUID: {
    name: 'UUID',
    names: 'UUIDs',
    alsoCalled: 'GUID',
    alsoCalledPlural: 'GUIDs',
    expansion: 'Universally Unique Identifier',
    expansionPlural: 'Universally Unique Identifiers',
  },
}

export function resolveVariant(input: string | undefined | null): Variant {
  return String(input ?? '').toUpperCase() === 'UUID' ? 'UUID' : 'GUID'
}

export function buildTerm(variant: Variant): Term {
  const d = DATA[variant]
  return {
    variant,
    ...d,
    siteTitle: `How Unique is a ${d.name}?`,
    ogImage: `/og-image-${variant}.png`,
  }
}
